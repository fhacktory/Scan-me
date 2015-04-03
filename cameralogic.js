var fs = require('fs');
var mkdirp = require('mkdirp');
var spawn = require('child_process').spawn;

var cameraInUse = false;
var clickNB = -1;



exports.LD = 100;
exports.SD = 300;
exports.HD = 600;
exports.UHD = 1200;


//is directory missing ?
var stats = fs.lstatSync('./raw');
if (!stats.isDirectory()) {
  mkdirp('./raw', function(err) { 
    console.log ('created missing raw folder');
  });
}

var stats = fs.lstatSync('./pictures');
if (!stats.isDirectory()) {
  mkdirp('./pictures', function(err) { 
    console.log ('created missing pictures folder');
  });
}

//get the current clickNB
console.log('trying to determine clickNB');
fs.readdir( './raw', function(err, list) {
  if(err)
      throw err;
  var regex = new RegExp("img(\\d+)\.tiff");
  list.forEach( function(item) {
    var matches = item.match(regex);
    if( matches ) {
      if(matches[1] > clickNB){
        clickNB =  parseInt(matches[1]) + 1 ;
        console.log('found photo for click : ' + matches[1]);
      }
    }else{
      console.log(matches);
    }

  }); 
});





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

    var scanProcess  = spawn('scanimage', ['-x', '300', '-y', '300', '--format=tiff'/*, '>','./raw/img'+imageIndex+'.tiff'*/]);

    fs.writeFile('./raw/img'+imageIndex+'.tiff','',function(){
      console.log('file initiated');
    })


    scanProcess.stdout.on('data', function(data){
      fs.appendFile('./raw/img'+imageIndex+'.tiff', data, function(){
        console.log('worte chunk');
      })
    });

    scanProcess.stderr.on('data', function(data){
        console.log('' + data);
      })


    scanProcess.on('close', function(code,signal){
      console.log("scan done");

      var convertProcess =  spawn('convert', ['-quality','60', './raw/img'+imageIndex+'.tiff', './pictures/img'+imageIndex+'.jpg'])
              
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
