const dotenvLoad = require('dotenv-load');
const nextEnv = require('next-env');

dotenvLoad();

const withEnv = nextEnv();
module.exports = withEnv();
