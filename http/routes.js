//const {repositoryInfo} = require('../models/RepositoryInfo');
const express = require('express');
const controllers=require('./controllers');

const router = express.Router();

router.get('/repo/:user/:reponame', controllers.getRepo)
router.get('/users/:user/repos', controllers.getUserRepos)
router.get('/repos/:user/:reponame/filetree', controllers.getRepoFiles)
//router.get('/repos/:user/:reponame/hooks', controllers.getRepoHooks)

module.exports = router;