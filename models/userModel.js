const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true, // sağındaki solundaki boşlukları siler.
        minlength: 3,
        maxlength: 50,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: { type: String, required: true, trim: true },
    isAdmin: { type: Boolean, default: false }

}, { collection: 'users', timestamps: true });

const schema = Joi.object({
    name: Joi.string().min(3).max(50).trim(),
    userName: Joi.string().min(3).max(50).trim(),
    email: Joi.string().trim().email(),
    password: Joi.string().trim()
});
// yeni bir user eklemek için validation
UserSchema.methods.joiValidation = function (userObject) {
    schema.required();
    return schema.validate(userObject);
}
// update için validation
UserSchema.statics.joiValidationForUpdate = function (userObject) {
    return schema.validate(userObject);
}

UserSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user._id;
    delete user.createdAt;
    delete user.updatedAt;
    delete user.password;
    delete user.__v;

    return user;
}

UserSchema.statics.login = async (email, password) => {

    const { error, value } = schema.validate({ email, password });

    if (error) {
        throw error;
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Email veya şifre hatalı");
    }
    const passwordControl = await bcrypt.compare(password, user.password);
    if (!passwordControl) {
        throw new Error("Email veya şifre hatalı");
    }
    return user;
}

UserSchema.methods.generateToken = async (_id) => {

    const token = await jwt.sign({ _id: _id },
    'secretkey123',
    { expiresIn: '1h' }
    );
    return token;                
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
