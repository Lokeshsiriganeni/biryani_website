const express = require("express");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const cors = require("cors");
const mysql = require("mysql2");
const multer = require("multer");
const axios = require("axios");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

require("dotenv").config();

const app = express();

// const GOOGLE_CLIENT_ID =
//   "242680999955-r1l07k5jtgb088mev1kl4k647lhghq5t.apps.googleusercontent.com"; // same one used in frontend

// const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

app.use(cors());
app.use(express.json());

// app.use(
//   cors({
//     origin: "https://your-frontend.vercel.app",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

// Test route
app.get("/api", (req, res) => {
  res.json({ users: ["user1", "user2", "user3"] });
});

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Lokesh#098", // ✅ Replace with your real password
  database: "mydb",
  port: 3307, // change if needed
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL");
  }
});

app.get("/api/get_existing_users", (req, res) => {
  const query =
    "SELECT user_name,profile_img,mobile_num FROM user_details_hst_tbl";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      w;
      res.status(500).json({ error: "Error fetching users" });
    } else {
      // console.log("user data is" + results);

      res.json(results);
    }
  });
});

app.post("/api/addOrder", (req, res) => {
  console.log("Received order details:", req.body); // ✅ Debug log

  const { itemName, name, quantity, price, address, number } = req.body;
  console.log(name);
  const sql =
    "INSERT INTO orders (item_name,name, quantity,price, address, mobile_num) VALUES (?,?,?, ?, ?, ?)";

  db.query(
    sql,
    [itemName, name, quantity, price, address, number],
    (err, result) => {
      if (err) {
        console.error("Error inserting order:", err);
        res.status(500).json({ message: "Failed to place order" });
      } else {
        res.status(200).json({ message: "Order placed successfully" });
      }
    }
  );
});

app.listen(5000, () => {
  console.log("🚀 Server started at http://localhost:5000");
});
// C:\Users\lokesh.s\biryani-app\server\server.js

// app.post("/api/auth/google", async (req, res) => {
//   const { token } = req.body;
//   console.log("inside the post");
//   try {
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: GOOGLE_CLIENT_ID,
//     });

//     const payload = ticket.getPayload();

//     const JWT_SECRET = process.env.JWT_SECRET;

//     // Now create your own JWT
//     const userJwt = jwt.sign(
//       {
//         email: payload.email,
//         name: payload.name,
//         picture: payload.picture,
//         sub: payload.sub, // unique Google user ID
//       },
//       JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     res.json({ jwt: userJwt });
//   } catch (err) {
//     console.log("in the catch section");
//     console.error(err);
//     res.status(401).json({ error: "Invalid token" });
//   }
// });

// adding user into table
app.post("/api/userDetails", async (req, res) => {
  const { data } = req.body;
  const { given_name, email } = data;

  const find_user = "SELECT email FROM user_details WHERE email = ?";

  db.query(find_user, [email], (err, result) => {
    if (err) {
      console.error("Database error while finding user:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.length > 0) {
      // User found
      console.log("User already exists:", result);
      return res.status(200).json({ message: "User already exists" });
    } else {
      // User not found, insert new
      const insert_user =
        "INSERT INTO user_details (name, email) VALUES (?, ?)";
      db.query(insert_user, [given_name, email], (err, result) => {
        if (err) {
          console.error("Error inserting user:", err);
          return res
            .status(500)
            .json({ message: "Failed to add user details" });
        } else {
          console.log("New user inserted:", result);
          return res.status(200).json({ message: "User details added" });
        }
      });
    }
  });

  console.log("Processing user details for:", email);
});

const upload = multer({ storage: multer.memoryStorage() });

app.post("/api/upload", upload.single("image"), async (req, res) => {
  try {
    const { name, address, mobile } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No image file received" });
    }

    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "profiles" },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result = await uploadToCloudinary();
    console.log(result.secure_url);

    // ✅ Send back all the data
    // res.json({
    //   name,
    //   address,
    //   mobile,
    //   imageUrl: result.secure_url,
    // });
    const imageUrl = result.secure_url;

    const find_user =
      "SELECT mobile_num FROM user_details_hst_tbl WHERE mobile_num = ?";

    db.query(find_user, [mobile], (err, result) => {
      if (err) {
        console.error("Database error while finding user:", err);
        return res.status(500).json({ message: "Database error" });
      }

      if (result.length > 0) {
        console.log("User already exists:", result);
        return res.status(200).json({ message: "User already exists" });
      } else {
        const unique_id = `${name}_${mobile}`;
        const insert_user =
          "INSERT INTO user_details_hst_tbl (user_name, address,mobile_num,profile_img,unique_id) VALUES (?, ?,?,?,?)";
        db.query(
          insert_user,
          [name, address, mobile, imageUrl, unique_id],
          (err, result) => {
            if (err) {
              console.error("Error inserting user:", err);
              return res
                .status(500)
                .json({ message: "Failed to add user details" });
            } else {
              console.log("New user inserted:", result);
              return res
                .status(200)
                .json({ message: `Details added: ${name}` });
            }
          }
        );
      }
    });
  } catch (err) {
    console.error("Upload error:", err.response?.data || err.message);
    res.status(500).json({
      success: false,
      message: "Upload failed",
      error: err.response?.data || err.message,
    });
  }
});
