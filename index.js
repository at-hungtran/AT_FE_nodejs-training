const app = require('./src/lib/Express');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;
const dbName = 'photographer';
mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`);

if (!module.parent) {
  app.listen(port, onStarted);
  app.on('error', onError);
  app.on('listening', onListening);
}
 
function onStarted() {
  console.info(`Server started on port ${port})`);
}

function onError(e) {
  console.error(`ERROR: ${e}`);
}

function onListening() {
  console.info(`Server is listening on port ${port}`);
}

module.exports = app;
