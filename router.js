const { Router } = require('express')
const pool = require('./db')
const router = Router()

router
  .get('/', async (req, res) => {
    try {
      const data = await pool.query('SELECT * from users')
      res.json(data.rows)
    } catch (e) {
      console.log(e)
      res.sendStatus(500)
    }
  })
  .get('/:id', async (req, res) => {
    try {
      const data = await pool.query('SELECT * FROM users WHERE id=$1;', [
        req.params.id
      ])
      res.json(data.rows[0])
    } catch (e) {
      console.log(e)
      res.sendStatus(500)
    }
  })
  .post('/', 
  
  async (req, res) => {
    try {
      const body = req.body
      const data = await pool.query(
        'INSERT INTO users (first_name, last_name, age) VALUES ($1, $2, $3);',
        [body.first_name, body.last_name, body.age]
      )
      res.json(data)
    } catch (e) {
      console.log(e)
      res.sendStatus(500)
    }
  })
  .put('/:id', async (req, res) => {
    try {
      const body = req.body
      const data = await pool.query(
        'UPDATE users SET first_name=$1, last_name=$2, age=$3 WHERE id =$4;',
        [body.first_name, body.last_name, body.age, req.params.id]
      )
      res.json(data)
    } catch (e) {
      console.log(e)
      res.sendStatus(500)
    }
  })
  .delete('/:id', async (req, res) => {
    try {
      const data = await pool.query('DELETE FROM users WHERE id =$1;', [
        req.params.id
      ])
      res.json(data)
    } catch (e) {
      console.log(e)
      res.sendStatus(500)
    }
  })

module.exports = router
