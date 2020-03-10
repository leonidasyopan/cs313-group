const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const logic = require('./process.js')

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('public/javascript', path.join(__dirname, "public/javascript"))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/math', (req, res) => res.render('pages/math'))
  .get('/process', (req, res) => {

    let firstNumber = Number(req.query.firstNumber),
    secondNumber = Number(req.query.secondNumber),
    operator = req.query.operator,
    result = logic.process(firstNumber,secondNumber,operator);

      res.redirect('results?value=' + result)
  })
  .get('/math_service', (req,res) => {

    let firstNumber = Number(req.query.firstNumber),
    secondNumber = Number(req.query.secondNumber),
    operator = req.query.operator,
    result = logic.process(firstNumber,secondNumber,operator);

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ value: result}))

  })
  .get('/results', (req, res) => {
    res.render('pages/results', {result: req.query.value})
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
