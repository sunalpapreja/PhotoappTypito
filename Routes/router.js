var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var jimp = require('jimp');
var fs = require('fs')

var storage = multer.diskStorage({
    destination:function(req , file, callback){
        var dir = './UploadedPhotos';
        if(!fs.existsSync(dir))
        {
            fs.mkdirSync(dir);
        }
        var dir1 = './UploadedPhotos/720';
        if(!fs.existsSync(dir1))
        {
            fs.mkdirSync(dir1);
        }
        var dir2 = './UploadedPhotos/240';
        if(!fs.existsSync(dir2))
        {
            fs.mkdirSync(dir2);
        }
        var dir3 = './UploadedPhotos/OriginalPhotos';
        if(!fs.existsSync(dir3))
        {
            fs.mkdirSync(dir3);
        }
        callback(null,dir3);
    },
    filename:function(req,file, callback){
        callback(null, file.originalname );
    }
});

var photos = multer({
    storage:storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname).toLowerCase();
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return callback(new Error('Only jpg, jpeg and png images are allowed'))
        }
        callback(null, true)
    }
})

router.post('/upload',photos.array('image'),(req, res, next)=>{
    console.log("requested")
    const files = req.files;
    files.forEach((file, index)=>{
        var time = Date.now();
        jimp.read(file.path).then((img)=>{
            var height = img.bitmap.height;
            var width = img.bitmap.width;
            if(height<=width)
            {
                width=(720/height)*width;
                height=720;
            }
            else
            {
                height=(720/width)*height;
                width=720;
            }
            img.resize(width,height).write('./UploadedPhotos/720/' + "-" + time + "-" + file.originalname);
        })

        jimp.read(file.path).then((img)=>{
            var height = img.bitmap.height;
            var width = img.bitmap.width;
            if(height<=width)
            {
                width=(240/height)*width;
                height=240;
            }
            else
            {
                height=(240/width)*height;
                width=240;
            }
            img.resize(width,height).write('./UploadedPhotos/240/' + "-" + time + "-" + file.originalname);
        })

    });
    res.send("Done");
});


router.get('/view',(req, res, next)=>{

    var filenames = [];
    var page = req.query.page;
    const startIndex = (page-1)*30;
    const lastIndex = page*30;
    fs.readdir(path.join(__dirname,'../UploadedPhotos/240'),(err,filename)=>{
        filenames = filename;
        if(filenames)
        {
            filenames.sort().reverse();
            filenames = filenames.slice(startIndex,lastIndex);
        }
        console.log(filenames);    
        res.send(filenames);
    });
});


module.exports = router;