const {MongoClient} = require("mongodb");

// Creer la collection des Students

client = await MongoClient.connect("mongodb://localhost:27017", {useUnifiedTopology: true});

async function addStudents() {
    let client;
    try {
        let db = client.db("TechWatchAssignator");
        await db.createCollection("Students");
    } catch (error) {
        console.log("Oops, something went wrong, here are the details:");
        console.log(error);
    } finally {
        client.close();
    }
}

addStudents();

//Creer la collection des Veilles

async function addVeilles() {
    let client;
    try {
        // client = await MongoClient.connect("mongodb://localhost:27017", {useUnifiedTopology: true});
        let db = client.db("TechWatchAssignator");
        await db.createCollection("Veilles");
    } catch (error) {
        console.log("Oops, something went wrong, here are the details:");
        console.log(error);
    } finally {
        client.close();
    }
}

addVeilles();

