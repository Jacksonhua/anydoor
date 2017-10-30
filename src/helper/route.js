const fs =require("fs");
const path =require("path");
const config=require("../config/Deaultcon");
const Handlebars =require("handlebars");
const promisify =require("util").promisify;

const tplPath=path.join(__dirname,"../template/dir.tpl")
const source= fs.readFileSync(tplPath);//,utf8
const template=Handlebars.compile(source.toString());

const pro_stat=promisify(fs.stat);
const pro_readdir=promisify(fs.readdir);

module.exports=async function(req,res,filePath){
    try{
        const stats=await pro_stat(filePath);
        if(stats.isFile()){
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            fs.createReadStream(filePath).pipe(res);
        }else if(stats.isDirectory()){
            const files=await pro_readdir(filePath);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            const dir= path.relative(config.root,filePath);
            const data={
                title:path.basename(filePath),
                dir:dir?`/${dir}`:" ",
                files:files

            };
            
            res.end(template(data));
           // res.end(`filePath is ${filePath}`);
            
           
        }
    } catch (ex) {
        console.log(ex)
        res.statusCode=404;
        res.setHeader("Content-Type","text/plain");
        res.end(`${filePath} is not a directory\n ${ex.toString}`);
        return;
    }
}