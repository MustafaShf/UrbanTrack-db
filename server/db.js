// Database configuration for Windows Authentication
const dbConfig = {
  user: process.env.DB_USER, // Replace with your DB username
  password: process.env.DB_PASSWORD, // Replace with your DB password
  server: process.env.DB_SERVER, // Replace with your DB server
  database: process.env.DB_DATABASE, // Replace with your DB name
  options: {
      encrypt: true, // Use encryption if required
      trustServerCertificate: true, // Use this if you're not using a trusted certificate
  },
};

module.exports = dbConfig;