// server.js

const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const app = express();



// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), function(req, res) {
  if (req.file) {
    const {originalname, mimetype, size} = req.file
    res.json({
      
      name: originalname,
      type: mimetype,
      size: size
    });
    
  } else {
    res.json({
      err: "Something went wrong"
    });
  }
  
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
