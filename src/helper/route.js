const fs =require("fs");
const path =require("path");
const config=require("../config/Deaultcon");
const mime =require("./mime");
const compress=require("./compress");
const range=require("./range");
const Handlebars =require("handlebars");
const promisify =require("util").promisify;

const tplPath=path.join(__dirname,"../template/dir.hbs");
const source= fs.readFileSync(tplPath);//,utf8
const template=Handlebars.compile(source.toString());

const pro_stat=promisify(fs.stat);
const pro_readdir=promisify(fs.readdir);

module.exports=async function(req,res,filePath){
	try{
		const stats=await pro_stat(filePath);
		if(stats.isFile()){
			const contentType=mime(filePath);
			//console.info(contentType);
			//res.writeHead(200, { "Content-Type": contentType });
			
			res.setHeader("Content-Type",contentType);
			let rs;
			const{code,start,end}=range(stats.size,req,res);
			if(code===200){
				res.statusCode=200;
				rs=fs.createReadStream(filePath);
			}else{
				res.statusCode=206;
				rs=fs.createReadStream(filePath,{start,end});
			}
			
			if(filePath.match(config.compress)){
				rs=compress(rs,req,res);
			}
			rs.pipe(res);
		}else if(stats.isDirectory()){
			const files=await pro_readdir(filePath);
			res.writeHead(200, { "Content-Type": "text/html" });
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
		console.info(ex);
		res.statusCode=404;
		res.setHeader("Content-Type","text/plain");
		res.end(`${filePath} is not a directory\n ${ex.toString}`);
		return;
	}
};