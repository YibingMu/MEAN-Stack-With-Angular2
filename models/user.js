const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

let emailLengthChecker = (email) => {
    if (!email) {
        return false;
    } else {
        if (email.length < 5 || email.length > 30) {
            return false;
        } else {
            return true;
        }
    }
};

let validEmailChecker = (email) => {
    if (!email) {
        return false;
    } else {
        const regExp = new RegExp(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/);
        return regExp.test(email);
    }
};

let usernameLengthChecker = (username) => {
    if (!username) {
        return false;
    } else {
        if (username.length < 3 || username.length > 15) {
            return false;
        } else {
            return true;
        }
    }
};

let validUsernameChecker = (username) => {
    if (!username) {
        return false;
    } else {
        const regExp = new RegExp(/^[a-zA-Z0-9_-]{3,15}$/);
        return regExp.test(username);
    }
};

let passwordLengthChecker = (password) => {
    if (!password) {
        return false;
    } else {
        if (password.length < 6n || password.length > 16) {
            return false;
        } else {
            return true;
        }
    }
};

let validPasswordChecker = (password) => {
    if (!password) {
        return false;
    } else {
        const regExp = new RegExp(/^[a-zA-Z0-9_-]{6,16}$/);
        return regExp.test(password);
    }
};

const emailValidators = [
    {   validator: emailLengthChecker,
        message: 'E-mail must be at least 5 characters but no more than 30'
    },
    {   validator: validEmailChecker,
        message: 'Must be a valid email'
    }
];

const usernameValidators = [
    {   validator: usernameLengthChecker,
        message: 'Username must be at least 3 characters but no more than 15'
    },
    {   validator: validUsernameChecker,
        message: 'Username cannot contain illegal characters'
    }
];

const passwordValidators = [
    {   validator: passwordLengthChecker,
        message: 'Password must be at least 6 characters but no more than 16'
    },
    {   validator: validPasswordChecker,
        message: 'Password cannot contain illegal characters'
    }
];


 const userSchema = new Schema({
    email: {type: String,
            unique: true,
            required: true,
            lowercase: true,
            validate: emailValidators
    },
     username: {type: String,
                unique: true,
                required: true,
                lowercase: true,
                validate: usernameValidators
     },
     password: {type: String,
                required: true,
                validate: passwordValidators
    }
 });

 userSchema.pre('save', function (next) {
     if (!this.isModified('password')) {
         return next();
     }

     bcrypt.hash(this.password, null, null, (err, hash) => {
         if (err) {
             return next(err);
         }
         this.password = hash;
         next();
     });
 });
 module.exports = mongoose.model('User', userSchema);