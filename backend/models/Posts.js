const  {mongoose, Schema, model} = require('mongoose')

const PostSchema = new Schema({
    title: {
        type: String,
        required:true,
        unique: true
    },
    desc: {
        type: String,
        required:true,
    },
    photo: {
        type: String,
    },
    username: {
        type: String,
        required:true,
    },
    userId: {
        type: String,
        required:true,
    },
    categories: {
        type: Array,
    },


},
{timestamps: true}
);

module.exports = model("Post", PostSchema)


