const bcrypt = require('bcryptjs');
const saltRounds = parseInt(process.env.SALTROUNDS);

function encrypt(password) {
    return bcrypt.hashSync(password, saltRounds);
}

function compare(password, hash) {
    return bcrypt.compareSync(password, hash)
}

module.exports = {
    encrypt,
    compare
}