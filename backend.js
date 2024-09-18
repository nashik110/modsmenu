const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();
const port = 3000;

// Configuración de multer para la carga de archivos
const upload = multer({
    dest: 'uploads/', // Carpeta donde se guardarán los archivos
    limits: { fileSize: 5 * 1024 * 1024 } // Limite de tamaño de archivo: 5MB
});

// Habilitar CORS
app.use(cors());

// Ruta para manejar la carga del archivo
app.post('/upload', upload.single('upload'), (req, res) => {
    if (!req.file || !req.body.email) {
        return res.status(400).send('Archivo y correo electrónico son requeridos.');
    }

    console.log('Archivo recibido:', req.file);
    console.log('Email recibido:', req.body.email);

    res.status(200).send('Recibo enviado correctamente.');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
