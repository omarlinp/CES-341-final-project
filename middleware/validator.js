const validatejs = require('../helpers/validate');

const validateGame = (req, res, next) => {
    const validationRules = {
        title: 'required|string',
        description: 'required|string',
        ReleaseDate: 'required|string',
        SteamLink: 'string',
        studio: 'string',
        publisher: 'string',
        genre: 'string',
        rating: 'string'
    };
    validatejs(req.body, validationRules, {}, (err, status) => {
        if (!status) {
            return res.status(412).json({ 
                sucess: false,
                message: 'Validation failed', 
                errorcode: 412,
                errors: err.errors 
            });
        }
        next();
    });
}

const validateUser = (req, res, next) => {
    const validationRules = {
        username: 'required|string',
        email: 'required|email',
    };
    validatejs(req.body, validationRules, {}, (err, status) => {
        if (!status) {
            return res.status(412).json({ 
                sucess: false,
                message: 'Validation failed', 
                errorcode: 412,
                errors: err.errors 
            });
        }
        next();
    });
}

module.exports = {
    validateGame,
    validateUser
};