# GitHub Search API in Node

I have build the GitHub search API as well as I added react js application to utilize the Search API. 
 
Following is the guide line to review the code. 
 
The root folder contains following sub folders.
1.	Node_modules
2.	Public
3.	Server
4.	Src
 
First of all if you look into server folder you will find all server related code including the API and controller logic for the application. 
 
Controllers
It contains projects.js file which is our controller for getting and searching the list of the projects.  It utilize the Search API. 
Following Lines are used to utilize the API code. 
 
Var SearchGithub= require("../modules/githubsearch"); //Creating instance of the search module.
 
var github = new SearchGithub({username: <USER NAME>, password: '<Password>'});
 
//Parameters can be in the following format.
JSON.stringify({
 language: this.state.searchQuery,     
 //Complete list of parameters can be viewd from Git Hub Search API version 3. 
        });
 
github.searchProjects(params,    function(data){
                    //Call back function with search result in data parameter.
                  });
 
Modules
This folder contains our API module as a middleware. If you look into the githubsearch file in this folder you will see a lot of comments. Most of the things in this file are self explaining. Let me highlight the main features of this code. 
 
Helper Functions
In the start of the file you will find a couple of helper functions which are used to parse URL and parsing special characters in the URL and other request parameters. 
 
function SearchGithub(options) 
This function is the entry point to the API and it work as a constructor of the API.
 
SearchGithub.prototype.searchProjects = function(params, callback)
This is the prototype for searching repositories in the GitHub. This function contains the main logic of the API. 
 
Test Driven Development

I have used Mocha component of node to write unit tests. You can find testing related code in test/test.js file. 
There are three basic steps which are used for writing unit test cases. 

1. Prepare the data.
2. Act on the data.
3. Assert the results. 

Mocha provide good library to write test cases. It has also functionality to handle asynch calls and callbacks.
