const  {mongoose, Schema, model} = require('mongoose')

const CategorySchema = new Schema({
    name: {
        type: String,
        require:true
    },
},
);

module.exports = model("Categories", CategorySchema)


