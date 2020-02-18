const express = require('express');
const bodyParser = require('body-parser');

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

app.listen(3000, () => {
  console.log('The app is running on port 3000')
});