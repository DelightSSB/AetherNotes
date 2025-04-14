const { encode } = require("gpt-3-encoder");

const MAX_TOKENS = 12000; // Leave room for prompt + response
const CHUNK_CHAR_LIMIT = 2000;

function chunkText(text, maxChars = CHUNK_CHAR_LIMIT) {
  const chunks = [];
  for (let i = 0; i < text.length; i += maxChars) {
    chunks.push(text.slice(i, i + maxChars));
  }
  return chunks;
}

function buildContextFromDocuments(docs) {
  let context = "";
  let tokenCount = 0;

  for (const doc of docs) {
    const chunks = chunkText(doc.notes || "");

    for (const chunk of chunks) {
      const section = `Title: ${doc.title}\n${chunk}`;
      const sectionTokens = encode(section).length;

      if (tokenCount + sectionTokens > MAX_TOKENS) {
        return context; // Stop adding when limit is reached
      }

      context += section + "\n\n";
      tokenCount += sectionTokens;
    }
  }

  return context;
}

module.exports = { buildContextFromDocuments };
