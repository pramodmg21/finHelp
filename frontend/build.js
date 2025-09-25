const { build } = require('vite');

build({
  configFile: './vite.config.js'
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
