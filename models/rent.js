
  
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RentSchema = new Schema({
    id: Schema.ObjectId,
    hiringType: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    sellerType: { type: String, required: true, trim: true },
    color: { type: String, required: true, trim: true },
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
}, { timestamps: true }
);

module.exports = mongoose.model("rent", RentSchema);