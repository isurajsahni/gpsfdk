const crypto = require('crypto');

function generateOrderId() {
  const prefix = 'GPS';
  const random = crypto.randomBytes(4).toString('hex').toUpperCase();
  const time = Date.now().toString(36).toUpperCase();
  return `${prefix}${time}${random}`;
}

module.exports = { generateOrderId };
