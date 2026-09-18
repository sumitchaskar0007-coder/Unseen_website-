module.exports = {
  apps: [
    {
      name: 'unseen-studios',
      script: 'server/index.js',
      cwd: __dirname,
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 5040,
      },
    },
  ],
}
