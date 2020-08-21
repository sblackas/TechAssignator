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
// Premiere page

server.get("/", async function(req, res) { 
    let data = await fetch("http://localhost:8000/studentsList/");
    data = await data.json();
    res.render("../views/indexHome.ejs", {studentName : data});
    // res.status(200).send();
})

// Deuxieme page List of Student

server.get("/studentslist", async function(req,res) {
    
    let data = await fetch("http://localhost:8000/studentsList/");
    data = await data.json(); // Données traduites du json en valeur JS dans la variable data
    // let students = []; // Tableau vide
    // for (let student of data) { // Boucle à travers tous nos eleves pour recuperer le nom de l'etudiant à chaque fois 
    //     students.push(student.name);
    // }
    res.render("../views/studentList.ejs", {studentName : data}); //entre les accolades je fais un nom de variable puis students=tableau
    // res.send('eeeeeeeeee')
})

server.post("/addstudent", async function(req,res) {
    // le `body` d'une requête est TOUJOURS un objet, il faut donc fabriquer cet objet 
    let objet = {
        name: req.body.name // on met ce que la personne a tapé dans un objet, à la clé `name`
    }
    
    await fetch("http://localhost:8000/studentsList/", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(objet)}) // JSON.stringify(objet) = on transforme l'objet en JSON, car pour envoyer des données, il faut que ce soit du JSON (ou du urlencoded)
    res.redirect("/studentslist");

})

server.post("/deleteStudent", async function(req,res) {
    console.log("http://localhost:8000/studentsList/" + req.body.name);
    await fetch(`http://localhost:8000/studentsList/${req.body.name}`, {method: "DELETE", headers: {"Content-Type": "application/json"}})
    res.redirect("/studentslist");
})

// Troisieme page : Assignation

server.get("/techWatchAssignation", async function(req,res) {
    let data = await fetch("http://localhost:8000/watchList/");
    data = await data.json();
    console.log(data);
    res.render("../views/assignator.ejs", {watchList : data});
    res.status(200);

})

server.post("/createTechWatch", async function(req, res) {
    // le `body` d'une requête est TOUJOURS un objet, il faut donc fabriquer cet objet 
    console.log(req.body);
    let objet = {
        name: req.body.name,
        nombre: parseInt(req.body.nombre),
        deadline : req.body.date
    }
    await fetch("http://localhost:8000/watchList/", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(objet)}) // JSON.stringify(objet) = on transforme l'objet en JSON, car pour envoyer des données, il faut que ce soit du JSON (ou du urlencoded)
    res.redirect("/techWatchAssignation");
})

async function createTechWatch(nombre) {
    let data = await fetch("http://localhost:8000/studentsList/");
    data = await data.json();
    let assignedWatch = []; //tableau avec sujet etudiants et deadline
    for (let i=0; i < nombre.length; i++) {
        let random = Math.floor((Math.random()) * assignedWatch.length);
        assignedWatch.push(data[random].name);
        assignedWatch.splice(random, 1);
    }   
await fetch("http://localhost:8000/watchList/"), {
    method:"POST", headers: {"Content-Type": "application/json"}, body: JSON.strinfify({
        name: req.body.name,
        nombre: req.body.nombre,
        deadline : req.body.date,
        watch : assignedWatch
    })}

    
    res.redirect("/techWatchAssignation");
}

createTechWatch();


// Quatrieme page : Historique

server.get("/history", async function(req,res) {
    res.status(200);

})

server.listen(8080);