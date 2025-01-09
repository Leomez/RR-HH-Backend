module.exports = {
    apps: [{
      name: 'app_rr_hh',
      script: './src/index.js',
      watch: true,
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }]
  };
  