// lencer le fichier demo.js ----------------------- node demo.js ---------------
//https://www.youtube.com/watch?v=fbYExfeFsI0

const {MongoClient} = require('mongodb');

async function main(){
    const url = "mongodb+srv://TutoUser:TUserPas@cluster0.ip6sl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const client = new MongoClient(url);
    try{
        await client.connect();
        await createMulipleListings(client, [ //for insertMany must be an array
            {
                name: "Lovly Loft",
                summary: "A charming loft in Paris",
                bedrooms: 1,
                bathrooms: 1
            },
            {
                name: "Lovly sceap 2",
                summary: "A charming loft in Arménie",
                bedrooms: 4,
                bathrooms: 2.5,
                beds: 7,
                last_review: new Date()
            }
        ])

    }catch(e){
        console.error(e);
    }finally{
        await client.close();
    }
}
main().catch(console.error);

//video 15:17
async function createMulipleListings(client, newListing){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertMany(newListing);
    console.log(`${result.insertedCound} new listings created with the following id(s):`)
    console.log(result.insertedIds);
}