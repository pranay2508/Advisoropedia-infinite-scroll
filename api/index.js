const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../api/models/User");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
// const CookieParser = require(cookieParser);
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "yoyoyoyyoyoyoyyyoyoyoyoyoyoy";
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Basic input validation
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email, and password are required." });
  }
  try {
    // Generate salt and hash password

    const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
    // Create user document (details)
    const userDoc = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.json(userDoc);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(422).json({ message: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });

  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id},
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          // Only set the token cookie if the user is not already logged in
          if (!req.cookies.token) {
            res.cookie("token", token, { sameSite: "none", secure: true });
          }
          res.json(userDoc);
        }
      );
    } else {
      res.status(422).json("passnotok");
    }
  } else {
    res.json("not found");
  }
});


// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const userDoc = await User.findOne({ email });

//   if (userDoc) {
//     const passOk = bcrypt.compareSync(password, userDoc.password);
//     if (passOk) {
//       jwt.sign(
//         { email: userDoc.email, id: userDoc._id},
//         jwtSecret,
//         {},
//         (err, token) => {
//           if (err) throw err;
//           res
//             .cookie("token", token, { sameSite: "none", secure: true })
//             .json(userDoc);
//         }
//       );
//     } else {
//       res.status(422).json("passnotok");
//     }
//   } else {
//     res.json("not found");
//   }
// });

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async(err, userData) => {
      if (err) throw err;
    const {name,email,_id} = await User.findById(userData.id);
      res.json({name , email ,_id});
    });
  } else {
    res.json(null);
  }
});

app.post('/logout',(req,res)=>{
  res.clearCookie('token');
  res.send("cleared");
})


app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
