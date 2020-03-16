module.exports = {
  apps: [
    {
      name: "vobysbot",
      script: "./vobys.js",
      env: {
        NODE_ENV: "development"
      },
      // eslint-disable-next-line camelcase
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};
