const userRepos = require("../http/controllers")

//counts the number of files in a given repo tree
const getNumOfFiles = async (s) => {
    let numOfFiles = 0;

    s.forEach(element => {
        if (element.type == "blob") numOfFiles++;
    });
    return numOfFiles;
}

const countActiveWebhook = async (s) => {
    if (s.length == 0) return 0
    let active_webhooks = 0
    for (let element in s){
        if (element.active == true) active_webhooks++;
    }
    return active_webhooks;
}

const getFirstYmlPath = async (s) => {
    s.forEach(element => {
        if (element.path.includes('.yml')) return (element.path).replace('New folder/', '');
    });
    return ""
}

const repositoryInfo = async (userRepos) => {
    let repositoryInfo = {};
    
    for (let repo in userRepos){
        const repoFiles = await controllers.getRepoFiles;
        const repoNumOfFiles = await getNumOfFiles(repoFiles.tree);
        console.log(repoNumOfFiles)
        let repoInfo = {};
        repoInfo.name = repo.name;
        repoInfo.owner = repo.owner.login;
        repoInfo.size = repo.size;
        repoInfo.private = repo.private;
    }

}



module.exports = {repositoryInfo, countActiveWebhook, getNumOfFiles, getFirstYmlPath}



