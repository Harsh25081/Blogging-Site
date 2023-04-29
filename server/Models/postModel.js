const mongoose = require("mongoose")
const objectId = mongoose.Schema.Types.ObjectId

const postSchema = mongoose.Schema(
    {
        title:{type:String,unique:true,required:true},
        body:{type:String,required:true},
        createdBy:{type:objectId,required:true,ref:"Users"},
        isDeleted : {type:Boolean,default:false}
    },{timestamps:true}
)

module.exports = mongoose.model("Post",postSchema)