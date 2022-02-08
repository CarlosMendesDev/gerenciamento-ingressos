import server from './app.js';

const port =  5000;

  server.listen(port, () => {
    console.log(`Start server on port ${port}! :D`);
  });
