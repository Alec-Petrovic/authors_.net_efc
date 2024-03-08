const { reset } = require('nodemon');
 const dboperations = require('./dbOperations');
 
 dboperations.getAuthors().then(result=>{
  console.log(result);
 })

 dboperations.updateAuthor().then(result=>{
    console.log(result);
 })

 dboperations.createAuthor().then(result=>{
    console.log(result);
 })

 dboperations.deleteAuthor().then(result=>{
   console.log(result);
})

dboperations.getBooks().then(result=>{
   console.log(result);
})