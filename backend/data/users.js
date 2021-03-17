const bycriptjs = require('bcryptjs')
const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bycriptjs.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Jhon Doe',
    email: 'jhon@example.com',
    password: bycriptjs.hashSync('123456', 10),
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: bycriptjs.hashSync('123456', 10),
  },
]
module.exports = users
