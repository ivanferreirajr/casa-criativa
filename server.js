const express = require('express');
const server = express();

// configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"));

// habilitar o uso do req.body
server.use(express.urlencoded({ extended: true }));

const nunjucks = require("nunjucks");
nunjucks.configure("views", {
    express: server,
    noCache: true,
});

const db = require('./db');

server.get("/", function(req, res){
    db.all(`SELECT * FROM ideias`, function(err, rows){
        if (err) {
            console.log(err);
            return res.send("Erro no banco de dados");
        }
        
        const reversedIdeias = [...rows].reverse();
        
        let lastIdeias = [];

        for (ideia of reversedIdeias) {
            if (lastIdeias.length < 2) {
                lastIdeias.push(ideia);
            }
        }

        return res.render("index.html", { ideias: lastIdeias });

    });

});

server.get("/ideias", function(req, res){
    db.all(`SELECT * FROM ideias`, function(err, rows){
        if (err) {
            console.log(err);
            return res.send("Erro no banco de dados");
        }

        const reversedIdeias = [...rows].reverse();

        return res.render("ideias.html", { ideias: reversedIdeias });
    });

});

server.post ("/", function (req, res) {
    // Inserir dado na tabela
    const query = `
    INSERT INTO ideias (
        image,
        title,
        category,
        description,
        link
    ) VALUES (?,?,?,?,?);`
    
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link
    ]

    db.run(query, values, function(err) {
        if (err) {
            console.log(err);
            return res.send("Erro no banco de dados");
        }

        return res.redirect("/ideias");
    })
});

server.listen(3001);