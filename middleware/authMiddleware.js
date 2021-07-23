const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const auth =  async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const result = jwt.verify(token, 'secretkey123');
        const bulunanUser = await User.findById({ _id: result._id });

        if (bulunanUser) {
            req.user = bulunanUser;
        } else {
            throw new Error('Lütfen giriş yapın!');
        }

        next();

    } catch (error) {
        next(error);
    }
}

module.exports = auth;