const mongodb = require("../model/db");

async function find (id){
    console.log('Finding user with id:', id);

    const result = await mongodb
            .getDb()
            .collection(process.env.COLLECTION_USERS)
            .find({ google_Id: id })
            .toArray();
    if (result.length > 0) {
        console.log('User found:', result[0]);
        return result[0];
    }else {
        console.log('No user found with id:', id);
        return null;
    }

}
async function create(profile) {
    const user = {
        google_Id: profile.id,
        username: profile.displayName,
        email: profile.emails[0].value,
        type: 'google'
    };
    
    try {
        const POST = await mongodb.getDb().collection(process.env.COLLECTION_USERS).insertOne(user);
        if (POST.acknowledged) {
            console.log('User created successfully:', POST);
            return POST;
        }
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

module.exports = {
    find,
    create
}