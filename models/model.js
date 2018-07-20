const jsORM = require('js-hibernate');
const dbconfig = require('../config/config');
const session = jsORM.session(dbconfig);

const userMap = session.tableMap('user')
    // columnMap(object-name-property, table-name-property, optional-property-config)
    .columnMap('id', 'id', { isAutoIncrement: true })
    .columnMap('first_name', 'first_name')
    .columnMap('last_name', 'last_name')
    .columnMap('username', 'username')
    .columnMap('dob', 'dob')
    .columnMap('email', 'email')
    .columnMap('password', 'password')
    .columnMap('token', 'token');

module.exports = userMap;
