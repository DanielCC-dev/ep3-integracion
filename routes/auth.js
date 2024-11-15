const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  
  try {
    // Verifica si el usuario ya existe
    let user = await User.findOne({ email });
    if (user) return res.status(400).redirect('/register.html'); 
    
    // Encripta la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crea el nuevo usuario
    user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await user.save();
    // Redirigir a la página de login después del registro exitoso
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Ruta para validar el inicio de sesión de un usuario
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Busca el usuario por el correo electrónico
    const user = await User.findOne({ email });
    if (!user) return res.status(400).redirect('/?error=invalid-email');

    // Compara la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).redirect('/?error=invalid-password');

    // Redirigir después del inicio de sesión exitoso
    res.redirect('/home');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;
