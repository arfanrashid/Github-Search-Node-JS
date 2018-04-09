// index.js
'use strict';
var async = require("async");
// Helper Functions ParseQueryString
//Added reuired dependencies
var request = require('request'),
_ = require('underscore');

// adds parameters that describe how the results are displayed to the end of the url
function addResultParameters(params, url) {
    // add the page number to the end of the query, if a page is specified
        if (typeof params['page'] !== 'undefined') {
            url += '&page=' + params['page'];
        }
    
        // add sort if exists
        if (typeof params['sort'] !== 'undefined') {
            url += '&sort=' + params['sort'];
        }
    
        // add order if exists
        if (typeof params['order'] !== 'undefined') {
            url += '&order=' + params['order'];
        }
    
        return url;
    };
    
    // Parsing Query string and converting signs to hexa decimals
    function ParseQueryString(symbol) {
        var res;
    
        switch (symbol) {
            case '<':
            res = '%3C';
                break;
    
            case '=':
            res = '%3D';
                break;
    
            case '>':
            res = '%3E';
                break;
    
            default:
            res = symbol;
                break;
        }
    
        return res;
    };
    
    // function to add the first + sign in a query
    // checks to see if this is the first element in the query or not
    function appendPlusSymbol(url) {
        // checks to see where the last character in the string is a =
        if (url[url.length - 1] === '=') {
            return '';
        } else {
            return '+';
        }
    };
    
    // CLASS DEFINITION AND METHODS
    
    // Create SearchGithub class
    function SearchGithub(options) {
        if (!(this instanceof SearchGithub)) {
            return new SearchGithub(options);
        }
    
        if (_.isEmpty(options)) {
            throw new Error('Please pass in your username and password!');
        }
    
        // create static member of this class that holds the authentication information
        this.auth = {
            username: options['username'],
            password: options['password']
        };
    
        // create a static variable that holds the options that need to be passed into the GET request
        this.options = {
            url: '',
            headers: {
                'User-Agent': this.auth.username,
                // add authorization to header so that you can send authenticated headers
                'Authorization': 'Basic ' + new Buffer(this.auth.username + ':' + this.auth.password).toString('base64')
            }
        };
    
        this.endpoints = {
            base: 'https://api.github.com',
            usersUrl: '/search/users',
            reposUrl: '/search/repositories',
            issuesUrl: '/search/issues',
            codeUrl: '/search/code'
        };
    }
    // method to query projects
    SearchGithub.prototype.searchProjects = async function(params, callback) {
        // throw error if the callback is not a function
        if (typeof callback !== 'function') {
            throw new Error('Callback must be a function!');
        }
    
        // ensure that some parameters are passed into the method
        if (_.isEmpty(params) || params === null) {
            throw new Error('Invalid parameters!');
        }
    
        var url = this.endpoints.base + this.endpoints.reposUrl + '?q=';
    
        if (typeof params === 'string') {
            url += params;
        } else if (typeof params === 'object') {
    
            // add the term part first, since it is added differently
            if (typeof params['term'] !== 'undefined') {
                url += params['term'];
            }
    
            // go through members of the JSON object passed into the method
            for (var k in params) {
                if (k === 'forks' || k === 'stars' || k === 'size') {
                    // forks, stars and size allows user to pass in comparison operators >, <, =
                    // convert first element in string, and then concatenate the remainder of the string
                    url += appendPlusSymbol(url) + k + ':' + ParseQueryString(params[k][0]) + params[k].substring(1, params[k].length);
                } else if (k !== 'term' && k !== 'page' && k !== 'sort' && k !== 'order') {
                    // term, page, sort and order are handled separately/ differently 
                    url += 	appendPlusSymbol(url) + k + ':' + params[k];
                }
            }
    
            // add last parts to the url if any of them are defined
            url = addResultParameters(params, url);
        }
    
        // Print the url we are pinging
        console.log('Querying at endpoint: ' + url);
    
        // updated this.options to hold the new url
        this.options.url = url;
    
        // use request module to ping url
        request.get(this.options, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                // pass our result to the callback
                callback(JSON.parse(body));
            }
        });
    
        // return current instance of SearchGithub
        return this;
    };
    
    module.exports = SearchGithub;