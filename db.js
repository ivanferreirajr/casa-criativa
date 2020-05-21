const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./WorkshopDev.db');

db.serialize(function() {
    // Criar a tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS ideias(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
        );
    `);


    // Consultar dados na tabela
    //db.all(`SELECT * FROM ideias`, function(err, rows){
    //    if (err) return console.log(err);
    //    console.log(rows);
    //})

    // Deletar um dado da tabela
    //db.run(`DELETE FROM ideias WHERE id = ?`, [1], function(err) {
    //    if (err) return console.log(err);
    //    console.log("DELETADO", this);
    //})
});

module.exports = db;