const express = require('express')
let app = express()
// console.log(app)

//route = http method + url
//the callback function receives two arguments(request and response)
//we need to send the status always before the response
app.get('/', (req, res) => {
  // res.status(200).send('<h1>hello from express server</h1>'); //sending html
  res.status(200).json({ message: 'hello, world', status: 200 }) //sending a JSON object
});

//post request
app.post('/', () => {

})

//create a server
const port = 3000;
app.listen(port, () => {
  console.log('server has started')
})
