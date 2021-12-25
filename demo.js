// lencer le fichier demo.js ----------------------- node demo.js ---------------
//https://www.youtube.com/watch?v=fbYExfeFsI0

const {MongoClient} = require('mongodb');

async function main(){
    const url = "mongodb+srv://TutoUser:TUserPas@cluster0.ip6sl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const client = new MongoClient(url);
    try{
        await client.connect();
        await findeListingsWithMinimumBedroomsBathroomsAndMostRicentReviews(client, {
            minimumNumberOfBedrooms: 4,
            minimumNumberOfBathrooms: 4,
            maximumNumberOfResults: 5
        });

    }catch(e){
        console.error(e);
    }finally{
        await client.close();
    }
}
main().catch(console.error);

//vidéo 20:15
async function findeListingsWithMinimumBedroomsBathroomsAndMostRicentReviews(client,{
    minimumNumberOfBedrooms = 0,
    minimumNumberOfBathrooms = 0,
    maximumNumberOfResults = Number.MAX_SAFE_INTEGER
} = {}){
   const cursor = client.db("sample_airbnb").collection("listingsAndReviews").find({
        bedrooms: {$gte: minimumNumberOfBathrooms},
        bathrooms: {$gte: minimumNumberOfBathrooms}
        //https://www.w3schools.com/js/tryit.asp?filename=tryjs_array_last
        //-
    }).sort({last_review: -1})//
        .limit(maximumNumberOfResults);
    const results = await cursor.toArray();

    if(results.length > 0){
        console.log(`Found Listing(s) with at least ${minimumNumberOfBedrooms}
        bedrooms and ${minimumNumberOfBathrooms} bathrooms:`);
        results.forEach((result, i) => {
            data = new Date(result.last_review).toDateString();
            console.log();
            console.log(`${i + 1}, name: ${result.name}`);
            console.log(`_id: ${result._id}`);
            console.log(` beddrooms: ${result.bedrooms}`);
            console.log(` bathrooms: ${result.bathrooms}`);
            console.log(` most recent review date: ${new Date(result.last_review).toDateString()}`);
        });
    }
    else
    {
        console.log(`No listings found with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms`);
    }
}