const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGO_URL;
const dbName = process.env.DATABASE_NAME;

let db;

const connectToDatabase =  (callback) => {
    if (db) {
        console.log('Already connected to database');
        return callback(null, db);
    }
    MongoClient.connect(url).then(client => {
        db = client.db(dbName);
        console.log('Connected to database successfully');
        callback(null, db);

    }).catch(err => {
        console.error('Failed to connect to database', err);
        callback(err);
    });
}

const getDb = () => {
    if (!db) {
        throw new Error('Database not initialized.');
    }
    return db;
}

module.exports = {
    connectToDatabase,
    getDb
};