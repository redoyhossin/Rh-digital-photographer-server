const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const Port = process.env.Port || 5000;



// medleware set
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.j9rm2ly.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function photographyervice() {
  try {
    const servicesCollection = client.db('photographyervice').collection('services ');
    app.get('/allservices', async (req, res) => {
      const query = {};
      const cursor = servicesCollection.find(query)
      const user = await cursor.toArray();
      res.send(user)
    });
    
  }
  finally {
    
  }
}
photographyervice().catch(console.dir);





app.get('/', (req, res) => {
    res.send('now run server2');
  });
  
  
  app.listen(Port, () => {
    console.log('Port run')
  })
  