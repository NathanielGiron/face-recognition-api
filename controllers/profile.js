const handleProfileGet = (req, res, db) => {
  const { id } = req.params;
  db('users').select('*').from('users').where({id})
    .then(user => {
      if (user.length) {
        res.json(user[0])
      } else {
        res.status(400).json('not found')
      }
    })
    .catch(err => {
      res.status(400).json('errror getting user')
    })
}

module.exports = {
  handleProfileGet: handleProfileGet
}