const controllers = require('../api/controllers');
import pThrottle from 'p-throttle';
const throttle = pThrottle({
    limit: 2,
    interval: 1000
});

const resolvers = {
    Query: {
        getUserRepos: (parent, args, context, info) => {

            console.log(args.user);
            return controllers.getUserRepos(args.user);
        },
        getRepoInfo: throttle( (parent, args, context, info) => {
            return controllers.getRepoInfo(args.user, args.repoName);
        },1,500)
    }
}

module.exports = {resolvers};