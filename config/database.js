const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
    uri: 'mongodb://111111:11111111@ds155288.mlab.com:55288/blingblingblog',
    secret: 'crypto',
    db: 'blingblingblog',
}