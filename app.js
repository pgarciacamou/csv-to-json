//Converter Class 
var Converter = require("csvtojson").core.Converter;
var fs = require("fs");

var csvFileName = "./test.csv";
var fileStream = fs.createReadStream(csvFileName);

//new converter instance 
var csvConverter = new Converter({constructResult:true});

//end_parsed will be emitted once parsing finished 
csvConverter.on("end_parsed",function(jsonObj){
  fs.writeFile("./test.json", JSON.stringify(jsonObj), function(err) {
    if(err) return console.log(err);
    console.log("The file was saved!");
  }); 
});

//read from file 
fileStream.pipe(csvConverter);