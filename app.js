const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
let userdata
let seatdata
fs.readFile('data/userdata.json', 'utf-8', (err, data) => {
    if (err) {
        throw err;
    }
    userdata = JSON.parse(data.toString());
    console.log(userdata);
});

fs.readFile('data/seatdata.json', 'utf-8', (err, data) => {
    if (err) {
        throw err;
    }
    seatdata = JSON.parse(data.toString());
    console.log(seatdata);
});

app.use(express.static('public'))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.post('/register', (req, res) => {
  const { username, password } = req.body
  console.log(username, password)
  for (let i = 0; i < userdata.length; i++) { 
    if (userdata[i].username === username) {
      res.send('Username already exists')
      return
    }
  }
  userdata.push({ username, password })
  // console.log(userdata)
  const data = JSON.stringify(userdata);
  fs.writeFile('data/userdata.json', data, (err) => {
      if (err) {
          throw err
      }
      console.log("Register successful. JSON data is saved.")
  })
  res.send('register successful')
})

app.post('/login', (req, res) => {
  const { username, password } = req.body
  let resText='User does not exist'
  for (let i = 0; i < userdata.length; i++){
    if (userdata[i].username === username) {
      if (userdata[i].password === password) {
        resText='Login successful'
        break
      }
      resText='Wrong password'
      break
    }
  }
  res.send(resText)
  console.log(resText)
})

app.get('/seat', (req, res) => {
  
})

app.post('/seat', (req, res) => { 
  const { username, seat } = req.body
  const resText=username+" is trying to book seat "+seat
  res.send(resText)
  console.log(resText)
})

app.post('/delete', (req, res) => { 
  const { username } = req.body
  console.log(username+" is trying to delete account")
  resText="user not found"
  for (let i = 0; i < userdata.length; i++) {
    if (userdata[i].username === username) {
      userdata.splice(i, 1)
      const data = JSON.stringify(userdata);
      fs.writeFile('data/userdata.json', data, (err) => {
        if (err) {
          throw err;
        }
        console.log("Delete successful. JSON data is saved.");
      });
      resText="delete successful"
      break
    }
  }
  res.send(resText)
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})