const express= require("express");
const static= require("express-static");
const bodyParser = require("body-parser");
const multer = require("multer");
const multerObj = multer({dest:"./static/upload"})
const mysql= require("mysql");
const cookieParser= require("cookie-parser");
const cookieSession= require("cookie-session");
const consolidate= require("consolidate");
const expressRoute= require("express-route");

var server = express();
server.listen(8080);

//1.获取请求数据
server.use(multerObj.any());
//2.cookie,session
(function(){
    server.use(cookieParser());
    var keys=[];
    for(var i=0;i<10000;i++){
        keys[i]="a_"+Math.random();
    }
    server.use(cookieSession({
        name:"sess_id",
        keys:keys,
        maxAge:20*60*1000
    }))
})()
//3.模板
server.engine("html",consolidate.ejs);
server.set("views","template");
server.set("view engine","html");

//4.route
server.use("/",require("./route/web")());
server.use("/admin",require("./route/admin")());


//5.default:static
server.use(static("./static/"));