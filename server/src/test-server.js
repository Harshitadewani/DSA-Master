const express = require('express');
const app = express();
app.get('/ping', (req, res) => {
  console.log('Ping received!');
  res.send('pong');
});
app.listen(5678, () => console.log('Test server on 5678'));
