const basicInfo = require('./basicInfo');
const servers = require('./servers');
const components = require('./components');
const tags = require('./tags');
const authApis = require('./authApis');

module.exports = {
    ...basicInfo,
    ...servers,
    ...components,
    ...tags,
    ...authApis
};