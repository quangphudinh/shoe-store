const bcrypt = require('bcryptjs');

const users = [
    {
        name : 'Admin',
        email : 'admin@node.com',
        password : bcrypt.hashSync('123456', 10), // 10 is the salt rounds
        isAdmin : true
    },
    {
        name : 'User',
        email : 'user@node.com',
        password : bcrypt.hashSync('123456', 10),
    }
];

module.exports = users;