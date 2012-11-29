fs=require('fs');
module.exports=function(){
	return {
		getRoom:function(req,res){
			fs.readFile('./room.html',function(error,data){
				if(error){
					res.end(error)
				}else{
					res.setHeader('Content-Type', 'text/html');
					res.end(data.toString());
				}
			});
		}
	}
}