class Config {
  constructor() {
    this.env = 'test'
    this.PORT = process.env.PORT || 5000
    this.API_BASE = '/api'
    this.DATABASE = process.env.DATABASE || 'parking_test'
    this.DATABASE_USERNAME = process.env.DATABASE_USERNAME || 'postgres'
    this.DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || 'root'
  }
}

module.exports = new Config()