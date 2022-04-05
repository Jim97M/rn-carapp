const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
    id: Schema.ObjectId,
    email: {type: String, unique: true},
    name: {type: String, trim: true, default: null},
    phone: {type: String, trim: true, default: null},
    image: {type: String, trim: true, default: null},
    password: {type: String, required: true},
    provider: {type: Object, default: null},
    forgetKey: {type: String, required: true},
    fcmToken: {type: String},
    isAdmin: {type: Boolean, default: false}
},
   {timestamps: true}
);

UserSchema.statics.ConvertToHash = async(password) => {
    return bcrypt.hashSync(password, 10);
}

UserSchema.statics.isPasswordEqual = async (password, passwordFromDatabase) => {
    return bcrypt.compare(password, passwordFromDatabase);
};

module.exports = mongoose.model("user", UserSchema);
