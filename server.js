const dotnev = require('dotenv');
const express = require('express');
const mongodb = require('mongodb');


dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
