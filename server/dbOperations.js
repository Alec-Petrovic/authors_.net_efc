var config=require('./dbConnect');
const sql=require('msnodesqlv8');

//retrieves all authors from database
async function getAuthors(){
    return new Promise((resolve, reject) => {
        sql.query(config, "SELECT * FROM authors", (err, rows) => {
          if (err) {
            console.error('Error fetching data from database:', err);
            reject(err);
          } else {
            console.log('Connected to database. Received rows:', rows);
            resolve(rows);
          }
        });
      });
}

//retrieves all books (titles) from pubs database
async function getBooks(){
  return new Promise((resolve, reject) => {
    sql.query(config, "SELECT * FROM titles", (err, rows) => {
      if (err) {
        console.error('Error fetching data from database:', err);
        reject(err);
      } else {
        console.log('Connected to database. Received rows:', rows);
        resolve(rows);
      }
    });
  });
}

/*updates author in database (given au_id and authors data of
  author being updated) */
async function updateAuthor(id, data){
  return new Promise((resolve, reject) => {
    //'destructuring assignment' to get data from author and assign each to its own variable
    const {au_fname, au_lname, phone, address, city, state, zip, contract} = data;
    //switches contract value to bit value for query
    const isContract = (contract === 'true' || contract === true) ? 1 : 0;

    const updateQuery = 
    'UPDATE authors SET au_fname = ?, au_lname = ?, phone = ?, address = ?, city = ?, state = ?, zip = ?, contract = ? WHERE au_id = ?';

    //execute query using the parameters (au_id and authors data)
    sql.query(config, updateQuery, [au_fname, au_lname, phone, address, city, state, zip, isContract, id], (err, result) => {
      if (err) {
        console.error('Error updating author:', err);
        reject(err);
      } else {
        console.log('Author updated successfully.');
        resolve(result);
      }
    });
  });
}

//creates new author
async function createAuthor(data){
  return new Promise((resolve, reject) => {
    //'destructuring assignment' to get data from author and assign each to its own variable
    const {au_fname, au_lname, phone, address, city, state, zip, contract} = data;
    const isContract = (contract === 'true' || contract === true) ? 1 : 0;
    let au_id = generateRandomAu_id();

    const newAuthorQuery = 
    'INSERT INTO authors VALUES (?, ?, ?, ?, ?, ?, ? ,?, ?)';
    sql.query(config, newAuthorQuery, [au_id, au_lname, au_fname, phone, address, city, state, zip, isContract], (err, result) => {
      if (err) {
        console.error('Error creating new author:', err);
        reject(err);
      } else {
        console.log('Author created successfully.');
        resolve(result);
      }
    });
  });
}

//deletes selected author
async function deleteAuthor(id){
  return new Promise((resolve, reject) => {
    const deleteQuery = 'DELETE FROM titleauthor WHERE au_id = ? DELETE FROM authors WHERE au_id = ?';
    sql.query(config, deleteQuery, [id, id], (err, result) => {
      if (err) {
        console.error('Error deleting author:', err);
        reject(err);
      } else {
        console.log('Author deleted successfully.');
        resolve(result);
      }
    })
  })
}

//used to generate an au_id for each author created
function generateRandomAu_id() {
  // Generate random numbers for each part of the SSN format
  const firstPart = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  const secondPart = Math.floor(Math.random() * 100).toString().padStart(2, '0');
  const thirdPart = Math.floor(Math.random() * 10000).toString().padStart(4, '0');

  // Concatenate the parts with dashes
  return `${firstPart}-${secondPart}-${thirdPart}`;
}

module.exports={
 getAuthors:getAuthors,
 updateAuthor:updateAuthor,
 createAuthor:createAuthor,
 deleteAuthor:deleteAuthor,
 getBooks:getBooks
}