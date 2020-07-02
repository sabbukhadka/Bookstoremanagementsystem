const express = require('express');
const multer = require('multer');
const path = require("path");

//storage
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, file.fieldname+'-'+Date.now()+ ext);
        
    }
});

const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        let err = new Error('only image files are allowed');
        err.status=400;
        return callback(err, false);
    }
    callback(null, true);
};

const upload = multer({
    storage: storage,
    fileFilter: imageFileFilter,
    limits:{
        fileSize:1024 *1024
    }
           
})

const uploadRouter = express.Router();

uploadRouter.route('/')
    .post(upload.single('myFile'), (req, res, next) => {
        res.json(req.file);
    });

module.exports = uploadRouter;