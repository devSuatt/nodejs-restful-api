const createError = require('http-errors');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const listAllUsers = async (req, res) => {
    const allUsers = await User.find({});
    res.json(allUsers);
};

const showMyInformations = (req, res, next) => {
    res.json({ message: req.user });
};

const updateMyInformations = async (req, res, next) => {

    delete req.body.createdAt;
    delete req.body.updatedAt;

    if (req.body.hasOwnProperty('password')) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const { error, value } = User.joiValidationForUpdate(req.body);
    if (error) {
        next(error);
    } else {
        try {
            const result = await User.findByIdAndUpdate({ _id: req.user._id }, req.body, { new: true, useFindAndModify: false, runValidators: true });
            if (result) {
                return res.json(result);
            } else {
                return res.status(404).json({ message: 'user not found!' });
            }
        } catch (error) {
            next(error);
        }
    }

}

const deleteAllUsers = async (req, res, next) => {
    try {
        const result = await User.deleteMany({ isAdmin: false });
        if (result) {
            return res.json({
                message: `tüm kullanıcılar silindi`
            });
        } else {
            throw createError(404, 'user not found!');
        }
    } catch (error) {
        next(error);
    }
};

const deleteMyInformations = async (req, res, next) => {
    try {
        const result = await User.findByIdAndDelete({ _id: req.user._id });
        if (result) {
            return res.json({
                message: `kullanıcı kendi kaydını sildi`
            });
        } else {
            throw createError(404, 'user not found!');
        }
    } catch (error) {
        next(error);
    }
}

const listById = (req, res) => {
    res.json({
        message: "idsi : "
            + req.params.id + " olan"
            + " user listelenecek"
    });
};

const createNewUser = async (req, res, next) => {
    try {
        const eklenecekUser = new User(req.body);
        eklenecekUser.password = await bcrypt.hash(eklenecekUser.password, 10);
        const { error, result } = eklenecekUser.joiValidation(req.body);
        if (error) {
            next(error);
        } else {
            const result = await eklenecekUser.save();
            res.json(result);
        }

    } catch (error) {
        next(error);
        console.log(error);
    }
};

const loginByToken = async (req, res, next) => {
    try {
        const user = await User.login(req.body.email, req.body.password);
        const token = await user.generateToken(user._id);
        res.json({
            message: user.name + " adlı kullanıcı giriş yaptı", 
            token: token
        });
    } catch (error) {
        next(error);
    }
};

const updateById = async (req, res, next) => {

    delete req.body.createdAt;
    delete req.body.updatedAt;

    if(req.body.hasOwnProperty('password')) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const { error, value } = User.joiValidationForUpdate(req.body);
    if (error) {
        next(error);
    } else {
        try {
            const result = await User.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true, useFindAndModify: false, runValidators: true });
            if (result) {
                return res.json(result);
            } else {
                return res.status(404).json({ message: 'user not found!' });
            }
        } catch (error) {
            next(error);
        }
    }

};

const deleteById = async (req, res, next) => {
    try {
        const result = await User.findByIdAndDelete({ _id: req.params.id }, { useFindAndModify: false });
        if (result) {
            return res.json({
                message: `${req.params.id} idli user silindi`
            });
        } else {
            throw createError(404, 'user not found!');
            /*const errorObject = new Error('Kullanıcı Bulunamadı');
            errorObject.errorCode = 404;
            throw errorObject;
            return res.status(404).json({
                message: "user bulunamadı" 
            });*/
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    listAllUsers,
    showMyInformations,
    updateMyInformations,
    deleteAllUsers,
    deleteMyInformations,
    listById,
    createNewUser,
    loginByToken,
    updateById,
    deleteById
}
