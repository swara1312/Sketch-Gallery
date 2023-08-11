const express = require("express");
const router = new express.Router();
const multerMW = require("../middleware/multerMW")
const model = require("../models/model")
const User = require("../models/user")


router.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(username + " " + password + "from the backend");

  try {
    const user = await User.findOne({ username, password });
    console.log(user);
    if (user) {
      req.session.user = user;
      res.status(200).send({ message: 'Logged in successfully', user });
    } else {
      res.status(401).send({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

router.post('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error logging out:', err);
      res.status(500).send({ message: 'Internal server error' });
    } else {
      res.status(200).send({ message: 'Logged out successfully' });
      console.log("logged out")
    }
  });
});


router.get("/api/retrieve",async(req,res) =>{
    const allSketches = await model.find().sort({createdTime : "ascending"});
    res.send(allSketches)
})

router.post("/api/allSaved", multerMW.single("photo"), (req,res) =>{
    const photo = req.file.filename

    console.log(photo)

    model.create({photo}).then((data) => {
        console.log("upload successful")
        console.log(data);
        res.send(data);
    })
    .catch((err) => console.log(err));
})

router.delete('/api/delete/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
      const deletedImage = await model.findByIdAndDelete(id);
      if (!deletedImage) {
        return res.status(404).send({ message: 'Image not found' });
      }
  
      res.status(200).send({ message: 'Image deleted successfully' });
    } catch (error) {
      console.error('Error deleting image:', error);
      res.status(500).send({ message: 'Internal server error' });
    }
  });

module.exports = router