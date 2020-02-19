const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();

app.use(bodyParser.json());

const db = {
  users: [
    {
      id: '1',
      name: 'John',
      email: 'john@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    },
    {
      id: '2',
      name: 'Mark',
      email: 'mark@gmail.com',
      password: 'apples',
      entries: 0,
      joined: new Date()
    }
  ]
}

app.get('/', (req, res) => {
  res.send('this is working');
});

app.post('/signin', (req, res) =>  {
  if (req.body.email === db.users[0].email && req.body.password === db.users[0].password) {
    res.json('success');
  } else {
    res.status(400).json('error logging in');
  }
});

app.post('/register', (req, res) => {
  const {name, email, password} = req.body;
  bcrypt.hash(password, 10, function(err, hash) {
    console.log(hash)
  });
  db.users.push({
    id: '3',
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  });
  res.json(db.users[db.users.length-1]);
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  db.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if(!found) {
    res.status(404).json('not found');
  }
});

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  db.users.forEach(user => {
    if(user.id === id) {
      found = true;
      user.entries++;
      return res.json(user);
    }
  });
  if(!found) {
    res.status(404).json('not found');
  }
});

app.listen(3000, () => {
  console.log('The app is running on port 3000')
});