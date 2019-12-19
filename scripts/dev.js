const fs = require('fs'); 

function run() {
   var args = process.argv.slice(2)
   args = args&&args.length>0?args:'dev';

   var env =`process.env.env = '${args}'`;

   var js = readPackageJson();
   if(js.indexOf('process.env.env = ')!= -1){
     const index = find(js,"'",1)
     js = js.toString().substring(index+1)
     js = env + js
   }else{
    js = env + '\n' + js
   }

   writePackageJson(js)

}
run();

function find(str,cha,num){
    var x=str.indexOf(cha);
    for(var i=0;i<num;i++){
        x=str.indexOf(cha,x+1);
    }
    return x;
}

function writePackageJson(string) {
    fs.writeFileSync(getAppJsPath(), string);
}
function readPackageJson() {
    return fs.readFileSync(getAppJsPath());
}
function getAppJsPath() {
    return `${process.cwd()}/App.js`;
}