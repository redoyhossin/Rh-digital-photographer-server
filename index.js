const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

    const reviewCollection = client.db('photographyervice').collection('revies');

    app.get('/allservices', async (req, res) => {
      const query = {};
      const cursor = servicesCollection.find(query)
      const user = await cursor.toArray();
      res.send(user)
    });
    app.get('/allserviceshome', async (req, res) => {
      const query = {};
      const cursor = servicesCollection.find(query)
      const user = await cursor.limit(3).toArray();
      res.send(user)
    });
    app.get('/allservices/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await servicesCollection.findOne(query);
      res.send(result);
    });
///
    app.post('/allservices', async (req,res)=>{
      const services= req.body;
      const result = await servicesCollection.insertOne(services)
      res.send(result)
      
    });


    ////

    // reviews

    app.post('/reviews', async (req,res)=>{
      const review = req.body;
      const result = await reviewCollection.insertOne(review)
      res.send(result)
      
    });
    
    app.get('/reviews',async (req, res) => {
      let query={}
      if(req.query.email){
      query={
      email:req.query.email
      }
      }
      const cursor = reviewCollection.find(query)
      const reviews= await cursor.toArray ();
      res.send(reviews)
      
    });
    
    app.delete('/reviews/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await reviewCollection.deleteOne(query);
      res.send(result)
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