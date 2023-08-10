// importing modules
const notes = require("express").Router();
const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// Get route
notes.get("/", (req, res) => {
  readFile("./db/db.json", "utf8")
    .then((data) => res.status(200).json(JSON.parse(data)))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Server error" });
    });
});

// Post route
notes.post("/", (req, res) => {
  readFile("./db/db.json", "utf8")
    .then((data) => {
      data = JSON.parse(data);
      let id = Date.now().toString();
      req.body.id = id;
      data.push(req.body);
      return data;
    })
    .then((data) => {
      return writeFile(
        "./db/db.json",
        JSON.stringify(data, null, "\t"),
        "utf8"
      ).then(() => data);
    })
    .then((data) => res.status(201).json({ message: "Task added", data: data }))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    });
});

// Delete route,
notes.delete("/:id", (req, res) => {
  readFile("./db/db.json", "utf8")
    .then((data) => {
      data = JSON.parse(data);
      let index;
      for (let i = 0; i < data.length; i++) {
        if (data[i].id == req.params.id) {
          index = i;
          break;
        }
      }
      data.splice(index, 1);
      return data;
    })
    .then((data) => {
      writeFile("./db/db.json", JSON.stringify(data, null, "\t"), "utf8").then(
        () => res.status(204).json({ message: "Task deleted" })
      );
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    });
});


module.exports = notes;