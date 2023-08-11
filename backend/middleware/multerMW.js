const multer = require("multer")
const {v4: uuidv4} = require("uuid")
const path = require("path");
const { callbackify } = require("util");

const storage = multer.diskStorage({
    destination : function(req,file,callback){
        callback(null,"./public/images")
    },
    filename : function(req,file,callback){
        callback(null,`${uuidv4()}_${path.extname(file.originalname)}`)
    },
});

const filter = (req,file,callback) => {
    const allowedFileFormats =["img/jpeg","img/jpg","img/png"]
    if(allowedFileFormats.includes(file.mimetype)){
        callback(null,true);
    }
    else{
        callback(null,false);
    }
}

const uploadMiddleware = multer({storage , filter})

module.exports = uploadMiddleware;