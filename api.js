const express = require("express");
const {MongoClient} = require("mongodb");
const api = express();

api.use(express.urlencoded({extended: true}));
api.use(express.json());

// Faire la collection des students
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

api.get("/students", async function(req, res) {
    let students = await getStudents();
    res.json(students); // Ici on veut envoyer nos données dans students qui fait appel à la fonction getStudents(), on met await async car cette fonction est elle même asynchrone et il faut attendre qu'elle s'execute.
})