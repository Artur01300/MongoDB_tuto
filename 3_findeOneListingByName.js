// lencer le fichier demo.js ----------------------- node demo.js ---------------
//https://www.youtube.com/watch?v=fbYExfeFsI0

const {MongoClient} = require('mongodb');

async function main(){
    const url = "mongodb+srv://TutoUser:TUserPas@cluster0.ip6sl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const client = new MongoClient(url);
    try{
        await client.connect();
        await findOneListingByName(client, "Lovly Loft");//"Lovly Loft" est le nome de de notre événement créé dans le fichier 2_create_insertOne.js/ligne 13

    }catch(e){
        console.error(e);
    }finally{
        await client.close();
    }
}
main().catch(console.error);

// video 17:20
async function findOneListingByName(client, nameOfListing){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").findOne({name: nameOfListing});
    if(result){
        console.log(`Found a listing in the collection with the name '${nameOfListing}'`);
        console.log(result);
    }
    else
    {
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
}