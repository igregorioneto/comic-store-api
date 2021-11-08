require("dotenv").config();
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

module.exports = {
    connectionString: `mongodb+srv://${dbUser}:${dbPassword}@cluster0.mtuay.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
}
