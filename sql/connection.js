const mysql = require('mysql')

class Connection {
  constructor() {
    if (!this.pool) {
      console.log('creating connection...')
      this.pool = mysql.createPool({
        connectionLimit: 100,
        host: '34.122.136.235',
        user: 'root',
        password: 't2BgZYbcft6fDF8',
        database: 'admin'
      })
      return this.pool
    }
    return this.pool
  }
}

const instance = new Connection()

module.exports = instance;