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

// Requete DELETE

async function deleteStudent(element) {
    let client;
    try { 
        client = await MongoClient.connect("mongodb://localhost:27017/", {useUnifiedTopology: true});
        let db = client.db("TechWatchAssignator");
        await db.collection("Students").deleteOne({name : element}); // dans le deleteOne il faut que ce soit un objet
    } catch (error) {
        console.log("Oups, something went wrong! Here are the details:") 
        console.log(error) 
    } finally { 
        client.close();
    }
}

api.delete("/studentsList/:name", function(req,res) {
    console.log(req);
    deleteStudent(req.params.name);
    res.send();
})


// Pour la troisième page, faire une nouvelle collection pour les veilles

async function createTechWatch() {
    const client = await MongoClient.connect("mongodb://localhost:27017/", {useUnifiedTopology: true});
    const db = await client.db('TechWatchAssignator');

    api.post('/watchList', function (req,res) {
        db.collection('veilles').insertOne({name: req.body.name, subject: req.body.subject, deadline : req.body.deadline, nombre : req.body.nombre })
        res.send('envoyer')
    })

    api.get('/watchList', async function (req,res) {
        let results = await db.collection("veilles").find().toArray(); // results va etre un tableau qui affiche toutes les donnees 
        res.json(results);
    })

   
}


createTechWatch();


api.listen(8000);