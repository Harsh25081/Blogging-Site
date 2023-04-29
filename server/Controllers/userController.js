const jwt = require("jsonwebtoken")
const userModel = require("../Models/userModel")

exports.createUser = async function(req,res){
    try {
        let data = req.body
        let {name,email,password}=data
        if(!name)return res.status(400).send({status:false,message:"Pls provide name"})
        if(!email)return res.status(400).send({status:false,message:"Pls provide email"})
        if(!password)return res.status(400).send({status:false,message:"Pls provide password"})
        let createUser = await userModel.create(data)
        return res.status(200).send({status:true,data:createUser})
    } catch (error) {
        res.status(500).send({status:false,message:error.message})
    }
}

exports.login = async function(req,res){
    try {
        let data = req.body
        let {email,password} = data
        if(data.length==0)return res.status(400).send({status:false,message:"Pls provide email and password"})
        if(!email)return res.status(400).send({status:false,message:"Pls provide email"})
        if(!password)return res.status(400).send({status:false,message:"Pls provide password"})
        let userData = await userModel.findOne({email,password})
        if(!userData)return res.status(404).send({status:false,message:"No user exists"})
        const token = jwt.sign({
            userId:userData._id
        },"Blogging-Site")
        return res.status(200).send({status:true,data:token,userData})
    } catch (error) {
        res.status(500).send({status:false,message:error.message})
    }
}

// exports.getAllUsers = async function(req,res){
//     try {
//         const getAllUsers = await userModel.find()
//         return res.status(200).send({status:true,data:getAllUsers})
//     } catch (error) {
//         res.status(500).send({status:false,message:error.message})
//     }
// }