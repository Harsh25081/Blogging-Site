const blogModel = require("../Models/blogModel")
const { getImage } = require("./aws")
const { isValidObjectId } = require("mongoose")


exports.CreateBlog = async function (req, res) {
    try {
        let data = req.body
        let { title, body, createdBy, category } = data
        if (!title) return res.status(400).send({ status: false, message: "Pls provide Title" })
        if (!body) return res.status(400).send({ status: false, message: "Pls provide body" })
        if (!createdBy) return res.status(400).send({ status: false, message: "Pls provide createdBy" })
        if (!isValidObjectId(createdBy)) return res.status(400).send({ status: false, message: "Pls provide createdBy a Valid ObjectId" })
        if (!category) return res.status(400).send({ status: false, message: "Pls provide category" })
        let checkunique = await blogModel.findOne({ title })
        if (checkunique) return res.status(400).send({ status: false, message: "Pls provide a UNIQUE title" })
        if (!["Food", "Travel", "Movies", "Lifestyle", "Fashion","Others"].includes(category)) return res.status(400).send({ status: false, message: "Pls provide category only from - ['Food','Travel','Movies','Lifestyle','Fashion','Others']" })

        let files = req.files
        if (files.length <= 0) return res.status(400).send({ status: false, message: "Pls provide image" });
        data.image = await getImage(files)

        let createblog = await blogModel.create(data)
        return res.status(201).send({ status: true, data: createblog })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

exports.getAllBlogs = async function (req, res) {
    try {
        let getAllblogs = await blogModel.find({ isDeleted: false }).populate("createdBy", { name: 1, _id: 0 })
        if (getAllblogs.length == 0) return res.status(404).send({ status: false, message: "No blog found" })
        return res.status(200).send({ status: true, data: getAllblogs })
    } catch (error) {
        return res.status(500).send({ status: true, message: error.message })
    }
}

exports.getBlogByFilter = async function (req, res) {
    try {
        let filters = req.query
        filters.isDeleted = false
        let getblogByFilter = await blogModel.find(filters).populate("createdBy", { name: 1, _id: 0 })
        if (getblogByFilter.length == 0) return res.status(404).send({ status: false, message: "No blog found" })
        return res.status(200).send({ status: true, data: getblogByFilter })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

exports.updateBlog = async function (req, res) {
    try {
        let id = req.params.id
        if (!isValidObjectId(id)) return res.status(400).send({ status: false, message: "Pls provide valid ObjectId in params" })
        let data = req.body
        let { title, category } = data
        if (title) {
            let checkunique = await blogModel.findOne({ title })
            if (checkunique)
                return res.status(400).send({ status: false, message: "Pls provide a UNIQUE title" })
        }
        if (category) {
            if (!["Food", "Travel", "Fitness", "Lifestyle", "Fashion"].includes(category))
                return res.status(400).send({ status: false, message: "Pls provide category only from - ['Food','Travel','Fitness','Lifestyle','Fashion']" })
        }
        let files = req.files
        if(files){
            if (files.length != 0) { data.image = await getImage(files) }
        }
        let updateblog = await blogModel.findByIdAndUpdate(id, { $set: data }, { new: true })
        if (!updateblog) return res.status(404).send({ status: false, message: "No blog found" })
        return res.status(200).send({ status: true, data: updateblog })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

exports.deleteBlog = async function (req, res) {
    try {
        let id = req.params.id
        if (!isValidObjectId(id)) return res.status(400).send({ status: false, message: "Pls provide valid ObjectId in params" })
        let deleteblog = await blogModel.findOneAndUpdate({ _id: id, isDeleted: false }, { $set: { isDeleted: true } }, { new: true })
        if (!deleteblog) return res.status(404).send({ status: false, message: "No blog found" })
        return res.status(200).send({ status: true, data: "Deleted Successfully" })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}