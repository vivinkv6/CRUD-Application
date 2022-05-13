var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
});

//create and update data
app.post('/adduser',(req,res)=>{
    var name = req.body.username;
    var dob = req.body.dob;
    var occupation = req.body.occupation;
    var key = req.body.userid;
    var obj={};

    var details={
        "name":name,
        "dob":dob,
        "occupation":occupation
    }
obj[key]=details;

fs.readFile('user.json','utf8',(err,data)=>{
    data = JSON.parse(data);
    data[key]=obj[key];

    var updateData = JSON.stringify(data);

    fs.writeFile('user.json',updateData,(err)=>{
        res.end('Add User Successfully');
    });
});
});

//read data
app.post('/getuser',(req,res)=>{
fs.readFile('user.json',(err,data)=>{
    var users = JSON.parse(data);
    var user = users[req.body.getuserid];
    res.end(JSON.stringify(user));
});
});

//delete data
app.post('/removeuser',(req,res)=>{
    fs.readFile('user.json',(err,data)=>{
        data = JSON.parse(data);
        delete data[req.body.removeuser];
        var updateuser=JSON.stringify(data);
        fs.writeFile('user.json',updateuser,(err)=>{
            res.end('Remove User Details');
        });
    });
    });

//All data
app.post('/alluser',(req,res)=>{
    fs.readFile('user.json',(err,data)=>{
     res.end(data);
    });
    });


app.listen(8080,()=>{
    console.log('server started');
});