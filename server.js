const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/foroArcadex07', { useNewUrlParser: true, useUnifiedTopology: true });

// Definir el esquema de preguntas
const questionSchema = new mongoose.Schema({
    text: String,
    username: String,
    likes: { type: Number, default: 0 },
    answers: [{ username: String, text: String }]
});

const Question = mongoose.model('Question', questionSchema);

// Obtener todas las preguntas
app.get('/questions', async (req, res) => {
    const questions = await Question.find();
    res.json(questions);
});

// Crear una nueva pregunta
app.post('/questions', async (req, res) => {
    const question = new Question(req.body);
    await question.save();
    res.status(201).json(question);
});

// Incrementar el like
app.post('/questions/:id/like', async (req, res) => {
    const question = await Question.findById(req.params.id);
    question.likes++;
    await question.save();
    res.json(question);
});

// Agregar una respuesta
app.post('/questions/:id/answers', async (req, res) => {
    const question = await Question.findById(req.params.id);
    question.answers.push(req.body);
    await question.save();
    res.json(question);
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
