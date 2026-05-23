/* This document is to access data from the database */
const mongodb = require('./db');
ObjectId = require('mongodb').ObjectId;

/*this is for handling the game collection*/
const getGamesData = async (req, res) => {
    const GET = await mongodb.getDb().collection(process.env.COLLECTION_GAMES).find();
        GET.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
        })
}

const getGameById = async (req, res) => {
    const gameId = new ObjectId(req.params.id);
    const GET = await mongodb
            .getDb()
            .collection(process.env.COLLECTION_GAMES)
            .find({ _id: gameId });
        GET.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
        })
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
    const POST = await mongodb.getDb().collection(process.env.COLLECTION_GAMES).insertOne(game);
    if (POST.acknowledged) {
        res.status(201).json(POST);
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
    const PUT = await mongodb.getDb().collection(process.env.COLLECTION_GAMES).replaceOne({ _id: gameId }, game);
    if (PUT.acknowledged) {
        res.status(204).json(PUT);
    }
}
const deleteGame = async (req, res) => {
    const gameId = new ObjectId(req.params.id);
    const DELETE = await mongodb.getDb().collection(process.env.COLLECTION_GAMES).deleteOne({ _id: gameId });
    if (DELETE.acknowledged) {
        res.status(204).json(DELETE);
    }
}
/*this is for handling the user collection*/
const getUsersData = async (req, res) => {
    const result = await mongodb.getDb().collection(process.env.COLLECTION_USERS).find();
        result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
        })
}
const getUserById = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
            .getDb()
            .collection(process.env.COLLECTION_USERS)
            .find({ _id: userId });
        result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
        })
}
const createUser = async (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        type: req.body.type
    };
    const POST = await mongodb.getDb().collection(process.env.COLLECTION_USERS).insertOne(user);
    if (POST.acknowledged) {
        res.status(201).json(POST);
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
    const PUT = await mongodb.getDb().collection(process.env.COLLECTION_USERS).replaceOne({ _id: userId }, user);
    if (PUT.acknowledged) {
        res.status(204).json(PUT);
    }
}
const deleteUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const DELETE = await mongodb.getDb().collection(process.env.COLLECTION_USERS).deleteOne({ _id: userId });
    if (DELETE.acknowledged) {
        res.status(204).json(DELETE);
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