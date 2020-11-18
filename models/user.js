const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        dropDups: true,
        validate: [
            {
                // value will be the email the user is attempting to store
                validator: async function (value) {
                    const emailCount = await this.model('User').countDocuments({ email: value });
                    return emailCount === 0; // if equals 0 then email is not used and this returns true, else false 
                },
                message: props => `Please try a different username/password combination.`
            },
            {
                validator: function (value) {
                    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value.toLowerCase());
                },
                message: props => `Please ensure your email address is in the correct format. The email you entered was ${props.value}`
            },
            {
                validator: function (value) {
                    return this.emailConfirmation === value;
                },
                message: props => `Your email and email confirmation must match.`
            }
        ]
    }
});

UserSchema.virtual('emailConfirmation')
.get(function () {
    return this._emailConfirmation;
})
.set(function (value) {
    this._emailConfirmation = value;
});

UserSchema.virtual('passwordConfirmation')
.get(function () {
    return this._passwordConfirmation;
})
.set(function (value) {

    UserSchema.virtual('password')
.get(function () {
    return this._password;
})
.set(function (value) {
    if (this._passwordConfirmation !== value) {
        this.invalidate('password', 'Password and password confirmation must match');
    }
    this._password = value;
});


    this._passwordConfirmation = value;
});

UserSchema.plugin(passportLocalMongoose, {
    usernameField: 'email'
});

module.exports = mongoose.model('User', UserSchema);