const Admin = require("../model/Admin")



const updateAdmin = async (req, res, next) => {
    try{
        const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, {$set: req.body}, {$new:true})
        res.status(200).json(updatedAdmin)
    }catch{
        next(err)
    }
}