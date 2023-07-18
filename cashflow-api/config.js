require("dotenv").config()


const PORT = process.env.PORT ? Number(process.env.PORT) : 3001
const SECRET_KEY = process.env.SECRET_KEY || "secret_dev"

function getDatabaseUri() {
    const dbUser = process.env.DATABASE_USER || "postgres"
    const dbPass = process.env.DATABASE_PASS ? encodeURI(process.env.DATABASE_PASS) : "postgres"
    const dbHost = process.env.DATABASE_HOST || "localhost"
    const dbPort = process.env.DATABASE_PORT || 5432
    const dbName = process.env.DATABASE_NAME || "cashflow"
    const dbTest = process.env.DATABASE_TEST_NAME || "cashflow_test"
    return process.env.DATABASE_URL || `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
}

const BCRYPT_WORK_FACTOR =  13;

// console.log("process.env" , Object.keys(process.env))
console.log("App Config" )
console.log("PORT:" , PORT)
console.log("SECRET_KEY:" , SECRET_KEY)
console.log("Database URI:" , getDatabaseUri())
console.log("---")

module.exports = {
    PORT,
    SECRET_KEY,
    BCRYPT_WORK_FACTOR,
    getDatabaseUri
}