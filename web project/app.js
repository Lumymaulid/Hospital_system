const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();
 
 
// Server Listening
app.listen(3001, () => {
    console.log('Server is running at port 3001');
});
 
const mysql = require('mysql');
 
const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'Hospital'
});
 
connection.connect(function(error){
    if(!!error) console.log(error);
    else console.log('Database Connected!');
}); 

//set views file
app.set('views',path.join(__dirname,'views'));
// Add this line before defining routes
app.use(express.static(path.join(__dirname, 'public')));

 
//set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



// ...

app.get('/', (req, res) => {
  res.render('login', {
    title: 'Login Page'
  });
});

app.post('/', (req, res) => {
  const { username, password } = req.body;

  // Perform authentication logic here
  if (username === 'halima' && password === 'halima') {
    // Successful login, redirect to PPP page
    console.log('Login successful!');
    const redirectUrl = '/index';
    res.redirect(redirectUrl);
  } else {
    // Invalid credentials, redirect back to login page or show an error message
    console.log('Invalid username or password');
    res.redirect('/index'); // or res.render('login', { errorMessage: 'Invalid credentials' });
  }
});


app.get('/index', (req, res) => {
  let sql = "SELECT * FROM registration";
  let query = connection.query(sql, (err, rows) => {
    if (err) throw err;
    res.render('index', {
      title: 'Dashboard',
      index: rows
    });
  });
});

// ...


app.get('/services', (req, res) => {
  res.render('services',{
      title:'page1'
  }
  );
});

app.get('/doctor', (req, res) => {
  res.render('doctor',{
      title:'page2'
  }
  );
});

//now
app.get('/regtable', (req, res) => {
  let sql = "SELECT * FROM registration";
  let query = connection.query(sql, (err, rows) => {
      if (err) throw err;
      res.render('regtable', {
          title: 'registerform',
          regtable: rows 
      });
  });
});

app.get('/register',(req, res) =>{
  res.render('register')
});

app.get('/regtable',(req, res) =>{
  res.render('regtable')
});
// app.post('/submit', (req, res) => {
//   const name = req.body.name;
//   const age = req.body.age;
//   const address = req.body.address;
//   const phone = req.body.phone;
//   const medicalHistory = req.body.medicalHistory;

//   const sql = "INSERT INTO registration (name, age, address, phone, medicalhistory) VALUES (?, ?, ?, ?, ?)";
//   connection.query(sql, [name, age, address, phone, medicalHistory], (err, result) => {
//     if (err) {
//       console.log('Error inserting record:', err);
//       res.render('error', {
//         message: 'Error inserting record'
//       });
//     } else {
//       console.log("Record inserted successfully");
//       res.redirect('/register');
//     }
//   });
// });
app.post('/submit', (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const address = req.body.address;
  const phone = req.body.phone;
  const medicalHistory = req.body.medicalHistory;

  const sql = "INSERT INTO registration (name, age, address, phone, medicalhistory) VALUES (?, ?, ?, ?, ?)";
  connection.query(sql, [name, age, address, phone, medicalHistory], (err, result) => {
    if (err) {
      console.log('Error inserting record:', err);
      res.status(500).json({ error: 'Error inserting record' });
    } else {
      console.log("Record inserted successfully");
      res.redirect('regtable');
    }
  });
});


// app.post('/submit', (req, res) => {
//   const rowId = req.body['row-id']; // Retrieve the row ID from the hidden input field
//   const name = req.body.name;
//   const age = req.body.age;
//   const address = req.body.address;
//   const phone = req.body.phone;
//   const medicalHistory = req.body.medicalhistory;

//   // Update the corresponding row in the database
//   const sql = "UPDATE registration SET name = ?, age = ?, address = ?, phone = ?, medicalhistory = ? WHERE id = ?";
//   connection.query(sql, [name, age, address, phone, medicalhistory, rowId], (err, result) => {
//     if (err) throw err;
//     console.log("Record updated successfully");
//     res.redirect('/register');
//   });
// });


  app.get('/delete/:id', (req, res) => {
    const rowId = req.body['id']; // Retrieve the row ID from the hidden input field
    
    // Delete the corresponding row from the database
    const sql = "DELETE FROM registration WHERE name = ?";
    connection.query(sql, [rowId], (err, result) => {
      if (err) throw err;
      console.log("Record deleted successfully");
      res.redirect('/regtable');
    });
  });





// appointment form

// app.get('/appointment', (req, res) => {
//   res.render('appointment',{
//       title:'page3'
//   }
//   );
// });



  app.get('/appointment', (req, res) => {
    const sql = "SELECT * FROM appointment";

      connection.query(sql, (err, rows) => {
        if (err) throw err;
        res.render('appointment',{
          appointment: rows
        });
      });
  });
  

  // Handle form submission
app.post('/submitApp', (req, res) => {
  const date = req.body.date;
  const time = req.body.time;
  const doctor = req.body.doctor;

  if (!doctor) {
    res.status(400).send('Doctor value is required');
    return;
  }

  const sql = 'INSERT INTO appointment (date, time, doctor) VALUES (?, ?, ?)';
  connection.query(sql, [date, time, doctor], (err, result) => {
    if (err) {
   
   
   
   
   
   
   
   
   
   
   
   
   
  
      console.error('Error inserting record:', err);
      res.status(500).send('Error inserting record');
    } else {
      console.log('Record inserted successfully');
      res.redirect('/appointment');
    }
  });
});
  
  


// contact
app.get('/contact', (req, res) => {
  res.render('contact',{
      title:'page1'
  }
  );
});


app.get('/Tableregister/api/v1', (req, res) => {
  let sql = "SELECT * FROM registration";
  let query = connection.query(sql, (err, rows) => {
      if (err) throw err;
      res.json(rows);
  });
});


app.get('/Tableapp/api/v1', (req, res) => {
  const sql = "SELECT * FROM appointment";

    connection.query(sql, (err, rows) => {
      if (err) throw err;
      res.json(rows);
       
    });
});












