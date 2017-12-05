const stage = process.env.NODE_ENV === 'staging';
const prod = process.env.NODE_ENV === 'production';

if(stage)
  module.exports = '/custom-day-dapp';
else if(prod)
  module.exports = '.';
else
  module.exports = '.';
