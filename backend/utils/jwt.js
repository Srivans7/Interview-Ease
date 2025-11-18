
const jwt =require('jsonwebtoken');
// import CryptoJS from 'crypto-js';

const getJwt = (object, expiresIn = '30d')=> {
  const secret = "hereismylittlesecret";
  const options = {
    algorithm: 'HS256', // Use HS256 algorithm
    expiresIn: expiresIn,
  };

  // Sign the JWT with the payload, secret key, and options
  const token = jwt.sign({ payload: object }, secret, options);
  return token;
}


module.exports = {getJwt};