    const  {mongoose, Schema, model} = require('mongoose')

    const UserSchema = new Schema({
        username: {
            type: String,
            required:true,
            unique: true,
            minLength: 4
        },
        email: {
            type: String,
            required:true,
            unique: true
        },
        password: {
            type: String,
            required:true
        },
        profilePicture: {
            type: String,
            require:true,
            default: ""
        },


    },
    {timestamps: true}
    );

    module.exports = model("User", UserSchema)


    