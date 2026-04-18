const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

//uma função assincrona (Pois estamos trabalhando com uma coisa de cada vez)

const criarBanco = async () => {
    const db = await open({
        filename: "./database.db",
        driver: sqlite3.Database,
    });

    // criando tabelas

    await db.exec(`
    
    CREATE TABLE IF NOT EXISTS alimentos(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        alimento TEXT,
        data TEXT,
        quantidade TEXT,
        perecivel TEXT,
        nao_perecivel TEXT, 
        status_entrega TEXT DEFAULT 'Pendente'
    )
        
    `);
    console.log("A tabela dos alimentos foi criada com sucesso");

    await db.exec(`
    CREATE TABLE IF NOT EXISTS roupas(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        peca text,
        tamanho TEXT,
        quantidade TEXT,
        estado TEXT,
        algodao TEXT,
        jeans TEXT,
        status_entrega TEXT DEFAULT 'Pendente'
    )
                    
        `);
    console.log("A tabela das roupas foi criada com sucesso")

    //Insert - C do CRUD - cREATE


    const check_alimentos = await db.get(`SELECT COUNT (*) AS total FROM alimentos`);


    if (check_alimentos.total === 0) {
        await db.exec(`
        INSERT INTO alimentos(alimento, data, quantidade, perecivel, nao_perecivel) 
        VALUES ("sucrilhos", "dia 17", "1", "nao", "sim"), ( "leite", "10/07/2026", "10", "sim", "nao")
        `);

    } else {};

        console.log(`Banco pronto com ${check_alimentos.total} produtos`);

    const check_roupas = await db.get(`SELECT COUNT (*) AS total FROM roupas`);

    if (check_roupas.total === 0) {
        await db.exec(`
            INSERT INTO roupas(peca, tamanho, quantidade, estado, algodao, jeans)
            VALUES ("moletom", "M", "2", "bom", "sim", "nao"), ("calça", "P", "5", "bom", "nao", "sim")
            `)

    } else{};

        console.log(`Banco pronto com ${check_roupas.total} peças`);

    // o Select do crud o READ

    const leralimentos = await db.all("SELECT * FROM alimentos");
    console.table(leralimentos);

    const lerroupas = await db.all("SELECT * FROM roupas");
    console.table(lerroupas);


    //UPDATE
    await db.run(`
        UPDATE alimentos
        SET status_entrega = "Entregue"
        WHERE perecivel = "sim"
        `);

console.log("Todos os alimentos pereciveis foram entregues");

await db.run(`
    UPDATE roupas
    SET status_entrega ="Entregue"
    WHERE estado = "bom"
    `)

    console.log("As peças de roupas em bom estado foram entregues");

//DELETE
await db.run(`DELETE FROM alimentos WHERE id = 2`);

console.log("O registro 2 foi removido")

//Relatório
console.log("Relatório")
const relatório_alimentos = await db.all(`SELECT * FROM alimentos`);

const relatório_roupas = await db.all(`SELECT * FROM roupas`)



};
criarBanco();
