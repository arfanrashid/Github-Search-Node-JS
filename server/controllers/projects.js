const io = require('socket.io')();
SearchGithub= require("../modules/githubsearch");

io.on('connection', (client) => 
{
  console.log("client connected");
});

io.on('GetProjectsResult', (params) => 
{
  console.log('Client is asking results for language ');

  github.searchProjects(params, function(data)
  {
            console.log('Emitting the results');

            var result = {succes:true, projects:data};
            
            io.emit('ProjectsUpdated',  result);

  });

});

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

github.searchProjects(params, function(data)
{
          console.log('Emitting the results');

          var result = {succes:true, projects:data};
          
          io.emit('ProjectsUpdated',  result);

});
 ctx.body = {succes:true, projects:{items:[]}};
  } catch(e) {
   throw e;
      ctx.body = {
        success: false,
        errors: e,
      };
  }
};