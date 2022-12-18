const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    ime : {type:String}
})

const model = mongoose.model('UserSchema',UserSchema)

module.exports = model
