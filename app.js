//Converter Class 
var Converter = require("csvtojson").core.Converter;
var fs = require("fs");

//new converter instance 
var csvConverter = new Converter({constructResult:true});

if(!process.argv[2]) throw "Must pass directory";
var csvFileDirectory = process.argv[2].toString();

var currentFileName;

// process.argv.forEach(function (val, index, array) {
// });


//end_parsed will be emitted once parsing finished 
csvConverter.on("end_parsed",function(jsonObj){
  fs.writeFile(currentFileName + ".json", JSON.stringify(jsonObj), function(err) {
    if(err) return console.log(err);
    console.log("The file was saved!");
  }); 
});

var getAllFiles = function(dir) {
    var results = [];

    fs.readdirSync(dir).forEach(function(file) {

        file = dir+'/'+file;
        var stat = fs.statSync(file);

        if (stat && stat.isDirectory()) {
            results = results.concat(getAllFiles(file))
        } else results.push(file);

    });

    return results;
};
var files = getAllFiles(csvFileDirectory);

files.forEach(function(fileName){
  if(!/.csv$/.test(fileName)) return;
	currentFileName = fileName;
	var fileStream = fs.createReadStream(fileName);
	//read from file
	fileStream.pipe(csvConverter);
});