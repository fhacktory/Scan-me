var fs = require('fs');
var spawn = require('child_process').spawn;

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
		var imageIndex = clickNB;

    var scanProcess  = spawn('cat', ['./raw/img0.tiff']);


    scanProcess.stdout.on('data', function(data){
      console.log(data);
    });





    scanProcess.on('close', function(code,signal){
      console.log("scan done");

      var convertProcess =  spawn('convert', ['-quality','60', './raw/img0.tiff', './pictures/img'+imageIndex+'.jpg'])
              
      convertProcess.stderr.on('data', function(data){
        console.log('' + data);
      })

      convertProcess.on('close', function(code,signal){
        console.log("convert done");
        console.log(arguments)
        //scanned ended 
        clickNB++;

        cameraInUse = false;

      });


    });

    


		return true;
	}else{
		//cannot scan, it is already in use !
		return false;
	}


}

function jpgFromRaw(image){

}
