const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  fs.readdir("./files", (err, files) => {
    if (err) throw err;
    console.log(files);
    res.render("index", { files: files });
  });
});

app.post("/create", (req, res) => {
  fs.writeFile(
    `./files/${req.body.title
      .split(" ")
      .map((v) => v[0].toUpperCase() + v.slice(1))
      .join("")}.txt`,
    req.body.details,
    (err) => {
      res.redirect("/");
    }
  );
});

app.get('/note/:title', (req, res) => {
    let title = req.params.title;
    // fs.readdir()
    // res.send(title)
    fs.readFile(`./files/${title}.txt`, 'utf-8' , (err, fileData) => {
        if (err) throw err;
        res.render('file', {fileName: title, description: fileData})
    })
})

app.listen(3000);
