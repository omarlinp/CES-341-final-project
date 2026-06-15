/* This document is to access data from the database */
const mongodb = require('./db');
ObjectId = require('mongodb').ObjectId;

/*this is for handling the game collection*/
const getGamesData = async (req, res) => {
    try{
        const GET = await mongodb
                            .getDb()
                            .collection(process.env.COLLECTION_GAMES)
                            .find();

                GET.toArray().then((lists) => {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).json(lists);
                })
    }catch(err){
        res.status(500).json({ message: 'Error fetching games data', error: err });
    }
    
}

const getGameById = async (req, res) => {
    const gameId = new ObjectId(req.params.id);
    if (!ObjectId.isValid(gameId)) {
        res.status(400).json({ message: 'Invalid game ID' });
        return;
    }
    try{
        const GET = await mongodb
            .getDb()
            .collection(process.env.COLLECTION_GAMES)
            .find({ _id: gameId });
        GET.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
        })
    }catch(err){
        res.status(500).json({ message: 'Error fetching game data', error: err });
    }
    
}
const createGame = async (req, res) => {
    const game = {
        title: req.body.title,
        description: req.body.description,
        ReleaseDate: req.body.ReleaseDate,
        SteamLink: req.body.SteamLink,
        studio: req.body.studio,
        publisher: req.body.publisher,
        genre: req.body.genre,
        rating: req.body.rating


    };

    try{
        const POST = await mongodb.getDb().collection(process.env.COLLECTION_GAMES).insertOne(game);
            if (POST.acknowledged) {
                res.status(201).json(POST);
            }
    }catch(err){
        res.status(500).json({ message: 'Error creating game', error: err });
    }
    
}
const updateGame = async (req, res) => {
    const gameId = new ObjectId(req.params.id);
    const game = {
        title: req.body.title,
        description: req.body.description,
        ReleaseDate: req.body.ReleaseDate,
        SteamLink: req.body.SteamLink,
        studio: req.body.studio,
        publisher: req.body.publisher,
        genre: req.body.genre,
        rating: req.body.rating


    };
    try{
        const PUT = await mongodb.getDb().collection(process.env.COLLECTION_GAMES).replaceOne({ _id: gameId }, game);
        if (PUT.acknowledged) {
            res.status(204).json(PUT);
        }
    }catch(err){
        res.status(500).json({ message: 'Error updating game', error: err });
    }
}
const deleteGame = async (req, res) => {
    const gameId = new ObjectId(req.params.id);
    try{
        const DELETE = await mongodb.getDb().collection(process.env.COLLECTION_GAMES).deleteOne({ _id: gameId });
        if (DELETE.acknowledged) {
            res.status(204).json(DELETE);
        }
    }catch(err){
        res.status(500).json({ message: 'Error deleting game', error: err });
    }
}
/*this is for handling the user collection*/
const getUsersData = async (req, res) => {
    try{
    const result = 
        await mongodb
        .getDb()
        .collection(process.env.COLLECTION_USERS)
        .find();
        
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
            })
    }catch(err){
        res.status(500).json({ message: 'Error fetching users data', error: err });
    }
    
}
const getUserById = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    if (!ObjectId.isValid(userId)) {
        res.status(400).json({ message: 'Invalid user ID' });
        return;
    }
    try{
        const result = await mongodb
            .getDb()
            .collection(process.env.COLLECTION_USERS)
            .find({ _id: userId });
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        });
    }catch(err){
        res.status(500).json({ message: 'Error fetching user data', error: err });
    }
}
const createUser = async (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        type: req.body.type
    };

    try {
        const POST = await mongodb.getDb().collection(process.env.COLLECTION_USERS).insertOne(user);
        if (POST.acknowledged) {
            return res.status(201).json(POST);
        }
    } catch(err) {
        return res.status(500).json({ message: 'Error creating user', error: err });
    }
}
const updateUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const user = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        type: req.body.type
    };
    try{
        const PUT = await mongodb.getDb().collection(process.env.COLLECTION_USERS).replaceOne({ _id: userId }, user);
        if (PUT.acknowledged) {
            res.status(204).json(PUT);
        }
    }catch(err){
        res.status(500).json({ message: 'Error updating user', error: err });
    }
}
const deleteUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    try{
        const DELETE = await mongodb.getDb().collection(process.env.COLLECTION_USERS).deleteOne({ _id: userId });
        if (DELETE.acknowledged) {
            res.status(204).json(DELETE);
        }
    }catch(err){
        res.status(500).json({ message: 'Error deleting user', error: err });
    }
}

module.exports = {
    getGamesData,
    getGameById,
    createGame,
    updateGame,
    deleteGame,
    getUsersData,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}