const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbOperations = require('./dbOperations');
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

//below are all of my API endpoints

//initially used to make sure server was working
app.get('/', (req, res) => {
  res.send('Hello World from Node.js server!');
});

//get all authors to put in table
app.get('/authors', async (req, res) => {
  try{
    const authors = await dbOperations.getAuthors();
    res.json(authors);//gives array of authors in json file (accessible in this endpoint)
  } catch (error){
    console.error('Error retrieving authors data: ', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

//get all books (titles) to put in table
app.get('/books', async (req, res) => {
  try{
    const books = await dbOperations.getBooks();
    res.json(books);
  } catch (error){
    console.error('Error retrieving books data: ', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

//update a particular authors field(s)
app.put('/authors/:id', async (req, res) => {
  try{//may need adjustments for line below
    const id = req.params.id;
    const data = req.body;
    const updatedAuthor = await dbOperations.updateAuthor(id, data);
    res.json(updatedAuthor);
  } catch(error){
    console.error('Error updating author: ', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

//create a new author (new record)
app.post('/authors/create', async (req, res) => {
  try{
    const data = req.body;
    const newAuthor = await dbOperations.createAuthor(data);
    res.json(newAuthor);
  } catch(error){
    console.error('Error creating new author: ', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

//deletes author selected by user
app.delete('/authors/:id', async (req, res) => {
  try{
    const id = req.params.id;
    const deletedAuthor = await dbOperations.deleteAuthor(id);
    res.json(deletedAuthor);
  } catch(error){
    console.error('Error updating author: ', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});