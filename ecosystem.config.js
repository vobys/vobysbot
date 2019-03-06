module.exports = {
    apps: [{
        name: "vobysbot",
        script: "./vobys.js",
        env: {
            NODE_ENV: "development",
        },
        env_production: {
            NODE_ENV: "production",
        }
    }]
};
