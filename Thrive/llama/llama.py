from fastapi import FastAPI
from pydantic import BaseModel
from pymongo import MongoClient
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
from llama_cpp import Llama

MODELPATH="./Llama-2-7b.Q5_K_M.gguf"
llm = Llama(model_path=MODELPATH)

# Connect to MongoDB
client = MongoClient("mongodb+srv://kidwellea:<db_password>@thrivenotes.msg8z.mongodb.net/?retryWrites=true&w=majority&appName=ThriveNotes")
db = client["ThriveNotes"]
collection = db["ThriveNotes"]

# Initialize FastAPI
app = FastAPI()

# Define request model
class QueryRequest(BaseModel):
    question: str

# Retrieve relevant documents from MongoDB
def fetch_relevant_docs():
    docs = collection.find().limit(5)  # Adjust limit as needed
    return " ".join([doc["notes"] for doc in docs])

# Query LLaMA 2 with user question + document context
def query_llm(question):
    context = fetch_relevant_docs()
    prompt = f"Context:\n{context}\n\nQuestion: {question}\nAnswer:"

    response = llm(prompt, max_tokens=512, stop=["\n"])  # Generate response
    return response["choices"][0]["text"].strip()  # Extract and clean response

# Define API route
@app.post("/query")
async def answer_question(request: QueryRequest):
    answer = query_llm(request.question)
    return {"answer": answer}

