const postModel = require("../Models/postModel")


exports.CreatePost = async function(req,res){
    try {
        let data = req.body
        let {title,body,createdBy} = data
        if(!title)return res.status(400).send({status:false,message:"Pls provide Title"})
        if(!body)return res.status(400).send({status:false,message:"Pls provide body"})
        if(!createdBy)return res.status(400).send({status:false,message:"Pls provide createdBy"})
        let checkunique = await postModel.findOne({title})
        if(checkunique)return res.status(400).send({status:false,message:"Pls provide a UNIQUE title"})
        let createPost = await postModel.create(data)
        return res.status(201).send({status:true,data:createPost})
    } catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
}

exports.getAllPosts = async function(req,res){
    try {
        let getAllPosts = await postModel.find({isDeleted:false}).populate("createdBy",{name:1,_id:0})
        return res.status(200).send({status:true,data:getAllPosts})
    } catch (error) {
        return res.status(500).send({status:true,message:error.message})
    }
}

exports.getpostById = async function(req,res){
    try {
        let _id = req.params.id
        let getpostById = await postModel.findById(_id)
        if(!getpostById || getpostById.isDeleted == true)return res.status(404).send({status:false,message:"No post found"})
        return res.status(200).send({status:true,data:getpostById})
    } catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
}

exports.updatePost = async function(req,res){
    try {
        let id = req.params.id
        let data = req.body
        let updatePost = await postModel.findByIdAndUpdate(id,{$set:data},{new:true})
        if(!updatePost)return res.status(404).send({status:false,message:"No post found"})
        return res.status(200).send({status:true,data:updatePost})
    } catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
}

exports.deletePost = async function(req,res){
    try {
        let id = req.params.id
        let deletePost = await postModel.findOneAndUpdate({_id:id,isDeleted:false},{$set:{isDeleted:true}},{new:true})
        if(!deletePost)return res.status(404).send({status:false,message:"No post found"})
        return res.status(200).send({status:true,data:"Deleted Successfully"})
    } catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
}