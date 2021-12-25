// lencer le fichier demo.js ----------------------- node demo.js ---------------
//https://www.youtube.com/watch?v=fbYExfeFsI0

const {MongoClient} = require('mongodb');

async function main(){
    const url = "mongodb+srv://TutoUser:TUserPas@cluster0.ip6sl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const client = new MongoClient(url);
    try{
        await client.connect();
        await listDatabases(client);
    }catch(e){
        console.error(e);
    }finally{
        await client.close();
    }
}
main().catch(console.error);
async function listDatabases(client){
   const databasesList = await client.db().admin().listDatabases();
   databasesList.databases.forEach(db =>{
       console.log(`- ${db.name}`);
   });
}