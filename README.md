# anydoor
Tiny NodeJS Static Web server
#range 206
处理部分get请求
使用curl
缓存没有做好

###安装
'''''
npm i -g anydoor
'''''
##使用方法
.....
anydoor #把当前文件夹作为静态资源服务器根目录

anydoor -p  8080 #设置端口号
anydoor -h       #设置localhost
anydoor -d /usr  #设置根目录为 /usr
........
