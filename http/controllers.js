const repositoryInfo = require("../models/RepositoryInfo")
const constants = require('../constants');
const { generateOptions } = require('./utils');
const https = require('https');
const fetch = require('node-fetch');


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
        let repoInfo = {}
        let generalInfo = fetch('https://api.github.com/repos/' + user + '/' + reponame, {
            method: "GET"
        })
        let webhooks = fetch('https://api.github.com/repos/' + user + '/' + reponame + '/hooks', {
            method: "GET",
            headers: {
              Accept: "application/vnd.github+json",
              Authorization: "Bearer " + constants.GITHUB_ACCESS_TOKEN
            }
        })
        let fileTree = fetch('https://api.github.com/repos/' + user + '/' + reponame + '/git/trees/master?recursive=1', {
            method: "GET",
            headers: {
              Accept: "application/vnd.github+json",
              Authorization: "Bearer " + constants.GITHUB_ACCESS_TOKEN
            }
        })
        
        fileTree = (await fileTree).json();
        let ymlPath = await repositoryInfo.getFirstYmlPath((await fileTree).tree);
        console.log (await ymlPath)
        
        generalInfo = (await generalInfo).json();
        webhooks = (await webhooks).json();
        
        //console.log(await generalInfo)
        //console.log(await webhooks)
        //console.log(await fileTree)
    
    }

    const getRepoFiles= async function (req, res) {
        const user = req.params.user;
        const reponame = req.params.reponame;
        const options = generateOptions( '/repos/'+user+'/'+reponame+'/contents/.github/workflows/test.yml') 
        
        https.get(options, function (apiResponse) {
            apiResponse.pipe(res);
        }).on('error', (e) => {
            console.log(e);
            res.status(500).send(constants.error_message);
        })
    }


module.exports = { getRepo, getUserRepos, getRepoFiles}
