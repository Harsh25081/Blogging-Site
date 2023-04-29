const jwt = require("jsonwebtoken")

exports.authentication = async function(req,res,next){
    try {
        let token = req.headers["x-api-key"]
        if(!token)return res.status(400).send({status:false,message:"Pls provide token"})
        jwt.verify(token,"Blogging-Site",function (err,decodedToken){
            if(err)return res.status(401).send({status:false,message:err.message})
            req["DecodedData"] = decodedToken
            next()
        })
    } catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
}

