const mongoose = require('mongoose');
const { compareSync, hashSync, genSaltSync } = require('bcryptjs');

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
});

UserSchema.methods.toJSON = function() {
    let user = this.toObject(); // convierte a un objeto javascript
    delete user.password;
    return user;
};

UserSchema.methods.comparePassword = function(password) {
    return compareSync(password, this.password);
};

UserSchema.pre('save', async function(next) {
    const user = this;

    if (!user.isModified('password')) { // si no se esta modificando
        return next();
    }

    const salt = genSaltSync(10);
    const hashedPassword = hashSync(user.password, salt);
    user.password = hashedPassword;
    next();
});

module.exports = mongoose.model('user', UserSchema);