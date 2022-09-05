const repositoryInfo = require("../models/parseRepositoryInfo")
const constants = require('../constants');
const { generateOptions } = require('./utils');
const https = require('https');
const fetch = require('node-fetch');


const getUserRepos = async function (req, res) {
    const user = req.params.user;
    let generalInfo = fetch('https://api.github.com/users/' + user + '/repos' , {
        method: "GET"
    })

    generalInfo = await (await generalInfo).json()
    let repoList = []

    for (let repo of generalInfo){
        let newRepo = {};
        newRepo.name = await repositoryInfo.getRepoName(repo)
        newRepo.owner = await repositoryInfo.getRepoOwner(repo)
        newRepo.size = await repositoryInfo.getRepoSize(repo)
        repoList.push(newRepo)
    }

    res.send(repoList);
}

const getRepoInfo = async function (req, res) {
    const user = req.params.user;
    const reponame = req.params.reponame;

    //make 4 API requests to git (the general info, the file tree, the webhook list and the yaml file
    //the forth requests is using a data point (the first yml file path) from the third request
    let generalInfo = fetch('https://api.github.com/repos/' + user + '/' + reponame, {
        method: "GET"
    })

    let webhooks = fetch('https://api.github.com/repos/' + user + '/' + reponame + '/hooks', {
        method: "GET",
        headers: {
            Accept: "application/vnd.github+json",
            Authorization: "Bearer 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"
        }
    })

    let fileTree = fetch('https://api.github.com/repos/' + user + '/' + reponame + '/git/trees/master?recursive=1', {
        method: "GET",
        headers: {
            Accept: "application/vnd.github+json",
            Authorization: "Bearer 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"
        }
    })

    generalInfo = await (await generalInfo).json()
    webhooks = await (await webhooks).json()
    fileTree = await (await fileTree).json()

    let ymlPath = await repositoryInfo.getFirstYmlPath(fileTree.tree);

    let firstYmlContent = fetch('https://api.github.com/repos/'+user+'/'+reponame+'/contents/'+ymlPath , {
         method: "GET",
         headers: {
           Accept: "application/vnd.github+json",
           Authorization: "Bearer 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"
         }
     })

    firstYmlContent = await (await firstYmlContent).json()

    //create the returned json
    let repoInfo = {}
    repoInfo.name = await repositoryInfo.getRepoName(generalInfo)
    repoInfo.owner = await repositoryInfo.getRepoOwner(generalInfo)
    repoInfo.size = await repositoryInfo.getRepoSize(generalInfo)
    repoInfo.private = await repositoryInfo.getRepoSize(generalInfo)
    repoInfo.numOfFiles = await repositoryInfo.getNumOfFiles(fileTree.tree)
    repoInfo.firstYmlCon = await repositoryInfo.getYamlContent(firstYmlContent)
    repoInfo.activeWebhooks = await repositoryInfo.countActiveWebhook(webhooks)

    res.send(repoInfo)
}

module.exports = { getUserRepos , getRepoInfo }