class Config {
  constructor() {
    this.env = 'production'
    this.PORT = process.env.PORT || 5000
    this.API_BASE = '/api'
    this.DATABASE_HOST = 'tuffi.db.elephantsql.com'
    this.DATABASE_PORT = process.env.DATABASE_PORT || 5432
    this.DATABASE = 'bnlfkanu'
    this.DATABASE_USERNAME = 'bnlfkanu'
    this.DATABASE_PASSWORD = process.env.DATABASE_PASSWORD
  }
}

module.exports = new Config()