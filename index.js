const express = require('express');
const fs= require('fs');
const bodyParser = require('body-parser'); 
const router = express.Router();

// Data structure to store messages
const data = [];

router.get("/login", (req, res, next) => {
    const form = `
        <html>
        <form onsubmit="localStorage.setItem('username', document.getElementById('username').value)" action="/" method="POST">
            <input id="username" type="text" name="username" placeholder="Username">
            <button type="submit">Login</button>
        </form>
        </html>
    `;
    res.send(form);
});

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", (req, res, next) => {
    fs.readFile('username.txt',(err,data)=>{
        if(err)
        {
            console.log(err)
            data='No chat Exits';
        }
        const mess = ` ${data}
        <html>
         <form action="/" onsubmit="document.getElementById('username').value = localStorage.getItem('username')" method="POST">
            <input type="text" name="message" id="message" placeholder="message">
            <input type="hidden" name="username" id="username">
            <button type="submit">Send message</button>
        </form>
        </html>`;
    res.send(mess);
    })
    
});

router.post("/", (req, res, next) => {
    data.push(`${req.body.username}:${req.body.message}`);
    console.log(data);
    console.log(`${req.body.username}:${req.body.message}`);
    fs.writeFile("username.txt",`${req.body.username}: ${req.body.message}\n`, {flag:'a'},(err)=>{
        err ? console.log(err): res.redirect("/");
    })
     // Redirect back to the message form
});

module.exports = router;
