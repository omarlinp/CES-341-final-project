/* This document is to access data from the database */
const mongodb = require('./db');
ObjectId = require('mongodb').ObjectId;

/*this is for handling the game collection*/
const getGamesData = async (req, res) => {
    
}
/*this is for handling the user collection*/
const getUsersData = async (req, res) => {}

module.exports = {
    getGamesData,
    getUsersData
}