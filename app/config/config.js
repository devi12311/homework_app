require('dotenv').config();

module.exports = {
  dbConfig: {
    HOST: process.env.DB_HOST || "localhost",
    USER: process.env.DB_USER || "root",
    PASSWORD: process.env.DB_PASSWORD || "Devi12311!",
    DB: process.env.DB_NAME || "app",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  auth: {
    secret: process.env.AUTH_SECRET || "Llkajsl091jd209821jdkjs!@$%@#"
  }
};
