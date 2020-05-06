var express = require('express');
var router = require('./Routes/router');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('UploadedPhotos/240'));
app.use('/720',express.static('UploadedPhotos/720'));



app.use('/',router);


const port = process.env.PORT || 3000;
if(process.env.NODE_ENV === "production")
{
    app.use(express.static('Client/build'));
    
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'Client','build','index.html'));
    });
}
else
{
    app.use(express.static('Client/build'));
}


app.listen(port, ()=>{
    console.log("Server started at port " + port);
});