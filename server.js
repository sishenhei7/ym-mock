const path = require('path');
const express = require('express');
const mockServer = require('./mock-server');

function startServer() {
  const app = express();
  const port = 1234;

  mockServer(app);

  return app.listen(port, () => {
    console.log(`Mock DevServer Started on port ${port}...`);
  });
}

startServer();
