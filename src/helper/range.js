module.exports=(totalSize,req,res)=>{
	const range=req.headers["range"];
	if(!range){
		return {code:200};
	}
	const sizes =range.match(/bytes=(\d*)-(\d*)/);
	const end =sizes[2] ||totalSize-1;
	const start =sizes[1]||totalSize-end;
	if(start>end || start<0|| end >totalSize){
		return {code:200};
	}
	res.setHeader("Accept-Ranges","bytes");
	res.setHeader("Content-Rangs",`byte ${start}-${end}/${totalSize}`);
	res.setHeader("Accept-Length",end-start);
	return {
		code:206,
		start:parseInt(start),
		end :parseInt(end)
	};
};
/*
416错误

如果请求中包含了 Range 请求头，并且 Range 中指定的任何数据范围都与当前资源的可用范围不重合
，同时请求中又没有定义 If-Range 请求头，那么服务器就应当返回416状态码。

假如 Range 使用的是字节范围，那么这种情况就是指请求指定的所有数据范围的首字节位置都超过了
当前资源的长度。服务器也应当在返回416状态码的同时，包含一个 Content-Range 实体头，用以指明当前资源的长度。这个响应也被禁止使用 multipart/byteranges 作为其 Content-Type。
*/ 