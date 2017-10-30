const http = require("http");
const chalk =require("chalk");
const path =require("path");
const conf=require("./config/Deaultcon");
const route=require("./helper/route");


const server=http.createServer((req,res)=>{
   
    const filePath= path.join(conf.root,req.url);
    route(req,res,filePath);
    

/*
    fs.stat(filePath,(err,stats)=>{
        if(err){
            res.statusCode=404;
            res.setHeader("Content-Type","text/plain");
            res.end(`${filePath} is not a directory`);
            return;
        }
        if(stats.isFile()){
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            fs.createReadStream(filePath).pipe(res);
        }else if(stats.isDirectory()){
            
            fs.readdir(filePath,(err,files)=>{
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                
                res.write(files.join(","));
                res.end(`filePath is ${filePath}`);
            });
        }
     });*/

    // res.statusCode=200;
    // res.setHeader("Content-Type","text/plain");
    // res.writeHead(200, { 'Content-Type': 'text/plain' });
//    res.end(`filePath is ${filePath}`);
   
});
server.listen(conf.port,conf.hostname,()=>{
    const addr = `http://${conf.hostname}:${conf.port}`;
    console.log(`Server started at ${chalk.green(addr)}`);
});