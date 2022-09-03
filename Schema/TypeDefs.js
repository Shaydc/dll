const { gql } = require('apollo-server-express')

const typeDefs = gql`

    type Repository {
    name: String!
    size: Int!
    owner: String!
    }

    type RepositoryInfo {
        name: String!
        size: Int!
        owner: String!
        private: Boolean!
        number_of_files_in_repo: Int!
        first_yml_file_content: String!
        active_webhooks: Int!
    }

    #Queries:
    type Query{
        getAllReposInfo: [RepositoryInfo!]!
    }
`;

module.exports = { typeDefs };