// lencer le fichier demo.js ----------------------- node demo.js ---------------
//https://www.youtube.com/watch?v=fbYExfeFsI0

const {MongoClient} = require('mongodb');

async function main(){
    const url = "mongodb+srv://TutoUser:TUserPas@cluster0.ip6sl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const client = new MongoClient(url);
    try{
        await client.connect();
        await createListing(client, {
            name: "Lovly Loft",
            summary: "A charming loft in Paris",
            bedrooms: 1,
            bathrooms: 1
        })

    }catch(e){
        console.error(e);
    }finally{
        await client.close();
    }
}
main().catch(console.error);

async function createListing(client, newListing){
    //video 11:49
   const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);
   console.log(`New listing crated with the following id: ${result.insertedId}`)

}