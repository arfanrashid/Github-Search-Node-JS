var chai = require('chai');  
var assert = chai.assert;    // Using Assert style
var expect = chai.expect;    // Using Expect style
var should = chai.should();  // Using Should style
var SearchGithub= require("../modules/githubsearch");


describe('Testing Git hub search API:', function() {
  
  it('callback', function(done) 
  {
    var params = {
        'language': 'C#'
    };
  // 1. ARRANGE
  var github = new SearchGithub({username: 'info.arfan.rashid@gmail.com', password: '@Password1'});
  // 2. ACT
  github.searchProjects(params, function(data)
  {
            var result = {succes:true, projects:data};
            assert.equal(result.projects, data);
            done(); 
  });
  }); 
  });
