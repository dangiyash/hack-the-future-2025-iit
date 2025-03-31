require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
    connectionString: "postgresql://neondb_owner:npg_ptyeYS0KPx1A@ep-fragrant-heart-a5vc71zn-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"
});

// Function to get JSON data from all tables
// Function to get JSON data from all tables
async function fetchDatabaseData() {
    const client = await pool.connect();
    const tableRes = await client.query(`SELECT tablename FROM pg_tables WHERE schemaname = 'public'`);
    const tables = tableRes.rows.map(row => row.tablename);

    let jsonData = {};
    for (const table of tables) {
        try {
            // Fetch rows where table_json is not NULL (assuming table_json contains JSON)
            const dataRes = await client.query(`SELECT * FROM ${table} WHERE table_json IS NOT NULL`);
            jsonData[table] = dataRes.rows;
        } catch (error) {
            console.error(`Error querying table ${table}:`, error.message);
        }
    }

    client.release();
    return jsonData;
}


// Route to handle AI chat queries using Ollama's Mistral
app.post('/ask-data', async (req, res) => {
    try {
        const { query } = req.body;
        const dbData = await fetchDatabaseData();  // Fetch data from Neon DB

        console.log("User Query:", query);
        console.log("Database Data:", JSON.stringify(dbData, null, 2));

        const ollamaResponse = await axios.post("http://localhost:11434/api/generate", {
            model: "llama2",
            prompt: `You have access to this JSON database:\n${JSON.stringify(dbData, null, 2)}\nUser Query: ${query}`,
            stream: false
        });

        console.log("Ollama Response:", ollamaResponse.data);
        res.json({ response: ollamaResponse.data.response });
    } catch (error) {
        console.error("Error in AI processing:", error.response?.data || error.message);
        res.status(500).json({ error: "AI query failed", details: error.message });
    }
});


app.listen(3000, () => console.log("Server running on port 3000"));
