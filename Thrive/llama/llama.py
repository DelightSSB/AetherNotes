from fastapi import FastAPI
from pydantic import BaseModel
from pymongo import MongoClient
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
from llama_cpp import Llama
from dotenv import load_dotenv
import os

MODELPATH="./Llama-2-7b.Q5_K_M.gguf"
llm = Llama(model_path=MODELPATH)

# Connect to MongoDB
load_dotenv()
ATLAS_URI = os.getenv("ATLAS_URI")
client = MongoClient(ATLAS_URI)
db = client["Thrive"]
collection = db["ThriveNotes"]

# Initialize FastAPI
app = FastAPI()

# Define request model
class QueryRequest(BaseModel):
    question: str

# Retrieve relevant documents from MongoDB
def fetch_relevant_docs():
    docs = collection.find().limit(5)  
    return " ".join([doc["notes"] for doc in docs])

# Query LLaMA 2 with user question + document context
def query_llm(question):
    context = fetch_relevant_docs()
    prompt = f"Context:\n{context}\n\nQuestion: {question}\nAnswer:"

    response = llm(prompt, max_tokens=512, stop=["\n"])
    return response["choices"][0]["text"].strip()  

# Define API route
@app.post("/query")
async def answer_question(request: QueryRequest):
    answer = query_llm(request.question)
    return {"answer": answer}

if __name__ == "__main__":
    print("LLaMA 2 CLI - Ask me anything!")
    while True:
        question = input("You: ")
        if question.lower() in ["exit"]:
            print("Goodbye!")
            break
        answer = query_llm(question)
        print(f"AI: {answer}\n")

