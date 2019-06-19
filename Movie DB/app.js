var express = require("express");
var ejs = require("ejs");
var app = express();
app.use(express.static("public"));
var request = require("request");
app.set("view engine" , "ejs");

var selectedmovie = {
	title : "",
	year: "",
	rated: "",
	released: "",
	runtime:"",
	genre : "",
	director :"",
	writer:"",
	actors :"",
	plot: "",
	language: "",
	country: "",
	awards: "",
	poster : ""
	};

app.get("/results" , function(req, res){
	
	var keyword = req.query.searchquery;
	var url = "http://www.omdbapi.com/?t="+keyword+"&apikey=thewdb";
	console.log(url);
	request(url, function(error , response, body){
		if(!error && response.statusCode ==200){
			var moviedata = JSON.parse(body);
			selectedmovie.title =moviedata.Title;
			selectedmovie.year =moviedata.Year;
			selectedmovie.rated =moviedata.Rated;
			selectedmovie.released =moviedata.Released;
			selectedmovie.runtime =moviedata.Runtime;
			selectedmovie.genre =moviedata.Genre;
			selectedmovie.director =moviedata.Director;
			selectedmovie.writer =moviedata.Writer;
			selectedmovie.actors =moviedata.Actors;
			selectedmovie.plot =moviedata.Plot;
			selectedmovie.language =moviedata.Language;
			selectedmovie.country =moviedata.Country;
			selectedmovie.awards =moviedata.Awards;
			selectedmovie.poster =moviedata.Poster;
			//console.log(selectedmovie);
			res.render("results" , {selectedmovie : selectedmovie });
		}
		
	});	
	
});

app.get("/" , function(req, res){
	
	res.render("searchForm");
});

app.get("*", function(req, res){
	res.render(error);
});

app.listen(3000 , function(){
	
	console.log("server started at port 3000");
	
});