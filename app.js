//Converter Class 
var Converter = require("csvtojson").core.Converter;
var fs = require("fs");

//new converter instance 
var csvConverter = new Converter({constructResult:true});

//end_parsed will be emitted once parsing finished 
csvConverter.on("end_parsed",function(jsonObj){
  fs.writeFile("./test.json", JSON.stringify(jsonObj), function(err) {
    if(err) return console.log(err);
    console.log("The file was saved!");
  }); 
});

//var csvFileDirectory = "Users/angelo/adtile/capture-Pedometer2D/csv/WalkingData/";

var csvFileDirectory = "../../capture-Pedometer2D/csv/WalkingData/";

//var csvFileDirectory = __dirname;

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
	var fileStream = fs.createReadStream(csvFileDirectory + fileName);
	//read from file 
	fileStream.pipe(csvConverter);
});