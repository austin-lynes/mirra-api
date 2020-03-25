require('dotenv').config()

const server = require('./server');

const PORT = process.env.PORT || 4000

server.get('/', (req, res) => {
    res.send('<h1>Mirra Api</h1>')
})

server.listen(PORT, ()=>{
    console.log('Mirra Api open on %s', PORT )
})