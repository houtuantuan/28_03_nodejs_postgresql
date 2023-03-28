const { Router } = require('express')
const pool = require('./db')
const routerOrders = Router()

routerOrders
  .get('/', async (req, res) => {
    try {
      const data = await pool.query('SELECT * from orders')
      res.json(data.rows)
    } catch (e) {
      console.log(e)
      res.sendStatus(500)
    }
  })
  .get('/:id', async (req, res) => {
    try {
      const data = await pool.query('SELECT * FROM orders WHERE id=$1', [
        req.params.id
      ])
      res.json(data.rows)
    } catch (e) {
      console.log(e)
      res.sendStatus(500)
    }
  })
  .post('/', async (req, res) => {
    try {
      const data = await pool.query(
        'INSERT INTO orders (price, date,user_id) VALUES ($1,$2,$3) ',
        [req.body.price, req.body.date, req.body.user_id]
      )
      res.json(data.rows)
    } catch (e) {
      console.log(e)
    }
  })
  .put('/:id', async (req, res) => {
    try {
      const data = await pool.query(
        'UPDATE orders SET price=$1, date=$2,user_id=$3 WHERE id=$4',
        [req.body.price, req.body.date, req.body.user_id, req.params.id]
      )
      res.json(data.rows)
    } catch (e) {
      console.log(e)
    }
  })
  .delete('/:id', async (req, res) => {
    try {
      const data = await pool.query('DELETE FROM orders WHERE id=$1', [
        req.params.id
      ])
      res.json(data.rows)
    } catch (e) {
      console.log(e)
    }
  })

module.exports = routerOrders
