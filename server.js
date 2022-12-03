const express = require('express');
const app = express();
const path = require('path')
const dotenv = require('dotenv')
const connectDB = require("./config/db")

dotenv.config()
connectDB();

app.use(express.json({ extended: false }))

// app.get('/', (req, res) => {res.send('server running...')});

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"))
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

//serve static assets in production

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('frontend/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname
            , 'frontend', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is running on port ${PORT}`))