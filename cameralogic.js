var fs = require('fs');

var cameraInUse = false;
var clickNB = 0;


//TODO : init the clickNB by reading the file list 

exports.LD = 100;
exports.SD = 300;
exports.HD = 600;
exports.UHD = 1200;



exports.snap = function (definition){
	return scan(definition);
}


exports.preview = function (){

	return 'preview';
}



function scan(definition){
	if(!cameraInUse){
		cameraInUse=true;
		var imageIndex = clickNB
		setTimeout(function(){
    		//scanned ended 
    		clickNB++;

    		cameraInUse = false;

    		//convert to jpg HD if not preview

    		//convert to jpg LD for web display


		}, 10000);
		return true;
	}else{
		//cannot scan, it is already in use !
		return false;
	}


}

function jpgFromRaw(image){

}
