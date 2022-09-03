const {repositoryInfo} = require("../models/RepositoryInfo")
const { generateOptions } = require('./utils');
const https = require('https');

/*
const listUserRepos = async function (req, res) {
    const user = req.params.user;
    const reponame = req.params.reponame;
    
    const options = generateOptions( '/users/' + user + '/repos') 
}*/

const getUserRepos = async function (req, res) {
    const user = req.params.user;
    const options = generateOptions( '/users/' + user + '/repos') 

    https.get(options, function (apiResponse) {
        apiResponse.pipe(res);
    }).on('error', (e) => {
        console.log(e);
        res.status(500).send(constants.error_message);
    })
    
}

const getRepo= async function (req, res) {
    const user = req.params.user;
    const reponame = req.params.reponame;
    const options = generateOptions('/repos/' + user + '/' + reponame) 
    

    https.get(options, function (apiResponse) {
        apiResponse.pipe(res);
    }).on('error', (e) => {
        console.log(e);
        res.status(500).send(constants.error_message);
    })
}

const getRepoFiles= async function (req, res) {
    const user = req.params.user;
    const reponame = req.params.reponame;
    const options = generateOptions( '/repos/' + user + '/' + reponame + '/git/trees/master?recursive=1') 
    
    https.get(options, function (apiResponse) {
        apiResponse.pipe(res);
    }).on('error', (e) => {
        console.log(e);
        res.status(500).send(constants.error_message);
    })
}

const getRepoHooks= async function (req, res) {
    const user = req.params.user;
    const reponame = req.params.reponame;
    const options = generateOptions( '/repos/' + user + '/' + reponame + '/hooks') 
    
    https.get(options, function (apiResponse) {
        apiResponse.pipe(res);
    }).on('error', (e) => {
        console.log(e);
        res.status(500).send(constants.error_message);
    })
}

module.exports = { getRepo, getUserRepos , getRepoFiles, listUserRepos, getRepoHooks }
