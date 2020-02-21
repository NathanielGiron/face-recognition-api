const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const pg = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'nathanielgiron',
    password : '',
    database : 'face_recognition'
  }
});

pg.select().from('users').then(data => {
  console.log(data);
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

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
  res.send(db.users);
});

app.post('/signin', (req, res) =>  {
  if (req.body.email === db.users[0].email && req.body.password === db.users[0].password) {
    res.json(db.users[0]);
  } else {
    res.status(400).json('error logging in');
  }
});

app.post('/register', (req, res) => {
  const {name, email, password} = req.body;
  bcrypt.hash(password, 10, function(err, hash) {
    console.log(hash)
  });
  pg('users')
    .returning('*')
    .insert({
      name: name,
      email: email,
      joined: new Date()
    })
    .then(user => {
      res.json(user[0]);
    })
    .catch(err => res.status(400).json('unable to register'))
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

app.listen(3001, () => {
  console.log('The app is running on port 3001')
});