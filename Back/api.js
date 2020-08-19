const express = require("express");
const {MongoClient} = require("mongodb");
const api = express();

api.use(express.urlencoded({extended: true}));
api.use(express.json()); // Ces deux lignes vont nous permettre de pouvoir utiliser le req.body

//Requete POST : pour ajouter des elements

async function addStudent(element) {
    let client;
    try {
        client = await MongoClient.connect("mongodb://localhost:27017", {useUnifiedTopology: true});
        let db = client.db("TechWatchAssignator"); // nom de la base de données
        await db.collection("Students").insertOne(element); // On a inseré un document en l'occurence "Davirak" dans Postman avec key=name value=Davirak
    } catch (error) {
        console.log("Oops, something went wrong, here are the details:");
        console.log(error);
    } finally {
        client.close();
    }
}

api.post("/studentsList", function(req, res) {
    console.log(req.body.name)
    let newStudent = {
        name: req.body.name
    }

    addStudent(newStudent);
    res.send(); // Ici on veut ajouter le nom d'un nouvel élève sans pour autant envoyer qqchose d'où le res.send()
})


// Requete GET : pour afficher les donnees

async function getStudents() { 
    let client;
    try {
        client = await MongoClient.connect("mongodb://localhost:27017/", {useUnifiedTopology: true});
        let db = client.db("TechWatchAssignator");
        let results = await db.collection("Students").find().toArray(); // results va etre un tableau qui affiche toutes les donnees avec le noms et les id
        client.close();
        return results;
    } catch (error) {
        console.log("Oups, something went wrong! Here are the details:")
        console.log(error);
        client.close();
    }
}

api.get("/studentsList", async function(req, res) {
    let students = await getStudents();
    res.json(students); // Ici on veut envoyer nos données dans students qui fait appel à la fonction getStudents(), on met await async car cette fonction est elle même asynchrone et il faut attendre qu'elle s'execute.
})

api.listen(8000);