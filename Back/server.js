const express = require("express");
const fetch = require("node-fetch");
// const serveStatic = require("serve-static");
const server = express();
const ejs = require ("ejs");
const path = require ("path");

server.set('views', path.join(__dirname, '../views'));// ligne pour redefinir le chemin d'un dossier (car mon server.js est dans Back or views n'y est pas donc le server va appeler le dossier dans la racine Back c'est pour cela qu'il ne trouvait pas le .ejs)
server.use(express.urlencoded({extended: true}));
server.use(express.json()); 

server.use(express.static("static")); // Nous permet d'éviter de faire get pour que chaque élément puisse être lu, évite de mettre du js dans l'ejs : le chemin est dans static et va renvoyer le fichier corresppondant. Static lit directement les éléments.

//Recuperer nos donnees, création de nos routes

server.get("/", async function(req, res) { 
    res.status(200);
})

// Deuxieme page List of Student

server.get("/studentslist", async function(req,res) {
    
    let data = await fetch("http://localhost:8000/studentsList/");
    data = await data.json(); // Données traduites du json en valeur JS dans la variable data
    let students = []; // Tableau vide
    for (let student of data) { // Boucle à travers tous nos eleves pour recuperer le nom de l'etudiant à chaque fois 
        students.push(student.name);
    }
    res.render("../views/studentList.ejs", {studentName : students}); //entre les accolades je fais un nom de variable puis students=tableau

})

server.post("/studentslist", async function(req,res) {
    // le `body` d'une requête est TOUJOURS un objet, il faut donc fabriquer cet objet 
    let objet = {
        name: req.body.name // on met ce que la personne a tapé dans un objet, à la clé `name`
    }
    await fetch("http://localhost:8080/studentsList/", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(objet)}) // JSON.stringify(objet) = on transforme l'objet en JSON, car pour envoyer des données, il faut que ce soit du JSON (ou du urlencoded)
    res.redirect("/studentslist");


})

// Troisieme page : Assignation

server.get("/techWatchAssignation", async function(req,res) {
    res.status(200);

})

// Quatrieme page : Historique

server.get("/history", async function(req,res) {
    res.status(200);

})

server.listen(8080);