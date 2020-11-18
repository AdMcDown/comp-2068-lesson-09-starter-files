const User = require('../models/user');

exports.index = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    }catch (error) {
        next(error);
    }
};

exports.show = async (req, res, next) => {
    try {

    }catch (error) {
        next(error);
    }
};

exports.create = async (req, res, next) => {
    try {
        console.log(req.body);
        const {
            name,
            email,
            emailConfirmation,
            password,
            passwordConfirmation
        } = req.body;

        const user = await User.register({
            name,
            email,
            emailConfirmation,
            password,
            passwordConfirmation
        }, password);
        res.status(200).json(user);

    }catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {

    }catch (error) {
        next(error);
    }
};

exports.destroy = async (req, res, next) => {
    try {

    }catch (error) {
        next(error);
    }
};
