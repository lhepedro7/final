const sqlite3 = require("sqlite3")
const { open } = require("sqlite")

//uma função assincrona (Pois estamos trabalhando com uma coisa de cada vez)

const criarBanco = async () => {


    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database
    })


    // criando tabelas

    await db.exec(`
    
    CREATE TABLE IF NOT EXISTS alimentos(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        alimento TEXT,
        data TEXT,
        tipo TEXT, 
        status_entrega TEXT DEFAULT 'Pendente'
    
    )
        
    `);
    console.log("A tabela dos alimentos foi criada com sucesso",);


    //Insert - C do CRUD - cREATE

    await db.exec(`
        INSERT INTO alimentos(alimento, data, tipo) 
        VALUES ("sucrilhos", "dia 17", "não perecivel")
        `);


        // o Select do crud o READ 

        const lertudo = await db.all("SELECT * FROM alimentos")
        console.table(lertudo)

};
criarBanco()