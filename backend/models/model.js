const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    photo:{
        type:String,
        required:true,
    },
},{timestamps:true}
);

module.exports = mongoose.model("Upload",userSchema);