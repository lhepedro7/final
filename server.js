const express = require("express"); //ta falando para usar o express 
const {criarBanco} = require ("./database");
const app = express();

app.use(express.json())

//rota raiz

app.get( "/", (req,res) => {

    res.send(`
        <body>

        <h1>Itoshi doações</h1>
        <h2>Gestão das doações</h2>

        </body>
        `);

});

const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`Server http://localhost:${PORT}`)
});

app.get("/Alimentos", async (req,res) => {
const db = await criarBanco();

const tabelaalimentos = await db.all(`SELECT * FROM alimentos`);

res.json(tabelaalimentos);

});

app.get("/Roupas", async (req,res)=>{
    const db = await criarBanco();
    const tabelaroupas = await db.all(`SELECT * FROM roupas`);
    res.json(tabelaroupas)
});