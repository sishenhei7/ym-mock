const express = require('express');
var cors = require('cors');
const mockServer = require('./mock-server');

function startServer() {
  const app = express();
  const port = 1234;

  app.use(cors());

  mockServer(app);

  return app.listen(port, () => {
    console.log(`Mock DevServer Started on port ${port}...`);
  });
}

startServer();
