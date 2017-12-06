const stage = process.env.NODE_ENV === 'staging';
const prod = process.env.NODE_ENV === 'production';

module.exports = {
  'process.env.BACKEND_URL':stage?'/custom-day-dapp':''
}
