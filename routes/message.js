const express = require("express");
const fs = require("fs");
const data = require("./data");
// const { use } = require('./login');

const router = express.Router();

router.get(`/`, (req, res, next) => {
  fs.readFile("username.txt", (err, data) => {
    if (err) {
      console.log(err);
      data = `No Chat Exists`;
    }
  });
  res.send(`${data}<form action="/" onsubmit= "document.getElementById('username').value=localStorage.getItem('username')"
    method="POST">
    <input id="message" name="message" type="text"placeHolder="message">
    <input type="hidden" name="username" id="username">
    <br/>
    <button type="submit">send</button></form>`);
});
router.post(`/`, (req, res, next) => {
  data.push(`{${req.body.username}:${req.body.message}}`);
  console.log(data);
  // res.send(`<h6>${req.body.username}:${req.body.message}</h6>`)
  console.log(`${req.body.username}:${req.body.message}`);
  fs.writeFile(
    "username.txt",
    `${req.body.username}:${req.body.message}`,
    { flag: "a" },
    (err) => (err ? console.log(err) : res.redirect(`/`))
  );
});
// localStorage.getItem(`username`)

module.exports = router;
