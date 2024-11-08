const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/auth');

const app = express();

// Conecta a la base de datos
connectDB();

app.use(express.urlencoded({ extended: true }));

// Middleware para parsear JSON
app.use(express.json());

// Hablitamos el uso de la carpeta public
app.use(express.static('public'));

// Rutas
app.use('/api/auth', userRoutes);


app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/public/register.html');
});

app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/public/home.html');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/login.html'); 
  });  

const PORT = process.env.PORT || 2500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}, http://localhost:2500`));
