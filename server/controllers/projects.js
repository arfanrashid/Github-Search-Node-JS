var wait = require('wait-for-stuff');

SearchGithub= require("../modules/githubsearch");
module.exports.all = async function(ctx) {
var projects = {items:[]};
  ctx.body = {
    projects: projects
  };
};

module.exports.search = async function(ctx) {
  try {
    var params = ctx.request.body;
    	
	var github = new SearchGithub({username: 'info.arfan.rashid@gmail.com', password: '@Password1'});
var body={};
   github.searchProjects(params,    function(data){

    body = { succes: true, projects:data};
  });
 
  wait.for.value(body, 'succes','true');
  console.log(body);
  ctx.body=body;
  } catch(e) {
   throw e;
      ctx.body = {
        success: false,
        errors: e,
      };
  }
};