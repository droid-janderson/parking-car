class Config {
  constructor() {
    this.env = 'development'
    this.PORT = process.env.PORT || 5000
    this.API_BASE = '/api'
    this.DATABASE = 'parking_car'
    this.DATABASE_USERNAME = 'postgres'
    this.DATABASE_PASSWORD = 'root'
  }
}

module.exports = new Config()