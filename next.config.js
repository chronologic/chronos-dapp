const path = require('path');
const glob = require('glob');
const stage = process.env.NODE_ENV === 'staging';

module.exports = {
  assetPrefix: stage? '/custom-day-dapp':'/',
  exportPathMap: function() {
    return {
      './': { page: '/' },
      '/index': { page: '/index' },
      '/step-1': { page: '/step-1' },
      '/step-2': { page: '/step-2' },
      '/step-3': { page: '/step-3'},
      '/step-4': { page: '/step-4'}
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
