const path = require('path');
const glob = require('glob');
const env = require('./env-config');

module.exports = {
  assetPrefix: env['process.env.BACKEND_URL'],
  exportPathMap: function() {
    return {
      './': { page: '/' },
      '/index': { page: '/index' },
      '/chronos': { page: '/chronos/index' },
      '/chronos/step-1': { page: '/chronos/step-1' },
      '/chronos/step-2': { page: '/chronos/step-2' },
      '/chronos/step-3': { page: '/chronos/step-3'},
      '/chronos/step-4': { page: '/chronos/step-4'},
      '/chronos/step-5': { page: '/chronos/step-5'},
      '/debt': { page: '/debt/index' },
      '/debt/step-1': { page: '/debt/step-1' }
    }
  },
  webpack: (config, { dev }) => {

    // Perform customizations to config DISABLE BABEL-LOADER CACHING
    config.module.rules = config.module.rules.map(rule => {
      if(rule.loader === 'babel-loader') {
        rule.options.cacheDirectory = false
      }
      return rule
    })

    config.module.rules.push(
      {
        test: /\.(css|scss)/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]',
        },
      }
      ,
      {
        test: /\.css$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader'],
      }
      ,
      {
        test: /\.s(a|c)ss$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              data: "$backend-url: '" + env['process.env.BACKEND_URL'] + "';",
              includePaths: ['styles', 'node_modules']
                .map(d => path.join(__dirname, d))
                .map(g => glob.sync(g))
                .reduce((a, c) => a.concat(c), []),
            },
          },
        ],
      }
    );
    return config;
  },
};
