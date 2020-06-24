// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const app = express();

// our default array of dreams
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// send the default array of dreams to the webpage
// app.post("/api/fileanalyse", (request, response) => {

//   const { name, type, size } = request.file
//    console.log(name, type, size)
//   // express helps us take JS objects and send them as JSON
//   // response.json({
//   //   name,
//   //   type,
//   //   size
//   // });
//   response.send("done")
// });

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
