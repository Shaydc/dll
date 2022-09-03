//const { RepositoriesInfo } = require("../FakeData");

const resolvers = {
    Query: {
        getAllReposInfo () {
            return RepositoriesInfo;
        }
    }
}

module.exports = { resolvers }; 