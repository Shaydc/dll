const userRepos = require("../http/controllers")

//counts the number of files in a given repo tree
const getNumOfFiles = async (j) => {
    let numOfFiles = 0;

    for (let file of j) {
        if (file.type == "blob") numOfFiles++;
    }
    return numOfFiles;
}

const countActiveWebhook = async (j) => {
    if (j.length == 0) return 0
    let active_webhooks = 0
    for (let element in j){
        if (element.active == true) active_webhooks++;
    }
    return active_webhooks;
}


const getFirstYmlPath = async (j) => {
    for(let element of j) {
        if (element.path.includes('.yml')) return (element.path).replace('New folder/', '');
    }
    return "";
}

const getRepoName = async (j) => {
    return j.name;
}

const getRepoOwner = async (j) => {
    return j.owner.login;
}

const getRepoSize = async (j) => {
    return j.size;
}

const getRepoIsPrivate = async (j) => {
    return j.private;
}

const getYamlContent = async (j) => {
    return atob(j.content);
}


module.exports = {getRepoName, getRepoOwner, getRepoSize, getFirstYmlPath, getRepoIsPrivate, countActiveWebhook, getYamlContent, getNumOfFiles}



