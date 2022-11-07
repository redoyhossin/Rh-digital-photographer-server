const express = require('express');
const cors = require('cors');
const app = express();
const Port = process.env.Port || 5000;



// medleware set
app.use(cors());
app.use(express.json());






app.get('/', (req, res) => {
    res.send('now run server2');
  });
  
  
  app.listen(Port, () => {
    console.log('Port run')
  })
  