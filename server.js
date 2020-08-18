const express = require("express");
const fetch = require("node-fetch");
const server = express();

server.use(express.urlencoded({extended: true}));
server.use(express.json()); 

server.use(express.static("static")); // Nous permet d'éviter de faire get pour que chaque élément puisse être lu, évite de mettre du js dans l'ejs : le chemin est dans static et va renvoyer le fichier corresppondant. Static lit directement les éléments.

//Recuperer nos donnees, création de nos routes

server.get("/", async function(req, res) { 
    res.status(200);
    // let data = await fetch("http://localhost:8000/students/");
    // data = await data.json(); // Données traduites du json en valeur JS dans la variable data
    // let students = []; // Tableau vide
    // for (let student of data) { // Boucle à travers tous nos eleves pour recuperer le nom de l'etudiant à chaque fois 
    //     students.push(student.name);
    // }
    // res.render("index.ejs", {students: students});
})

server.get("/studentslist", async function(res,req) {
    res.status(200);

})

server.get("/techWatchAssignation", async function(res,req) {
    res.status(200);

})

server.get("/history", async function(res,req) {
    res.status(200);

})

server.listen(8080);