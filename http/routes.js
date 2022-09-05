//const {repositoryInfo} = require('../models/RepositoryInfo');
const express = require('express');
const controllers=
    require('./controllers');

const router = express.Router();

router.get('/repos/:user/', controllers.getUserRepos)
router.get('/repos/:user/:reponame', controllers.getRepoInfo)

module.exports = router;