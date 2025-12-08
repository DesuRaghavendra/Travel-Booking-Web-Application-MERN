const bcrypt = require('bcryptjs');

async function generateHashedPassword() {
    const salt = await bcrypt.genSalt(10);  // generate salt
    const hashedPassword = await bcrypt.hash('23BCE0322', salt);  // hash your admin password
    console.log(hashedPassword);  // this will print the hashed password
}

generateHashedPassword();
