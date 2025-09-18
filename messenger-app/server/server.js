const express = require('express');
const cors = require('cors');
const db = require('./db/db');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.post('/api/messages', (req, res) => {
  const { name, phone, message } = req.body;

  console.log(`Новое сообщение: ${JSON.stringify({ name, phone, message })}`);

  if (name.length > 100) {
    return res.status(400).json({ error: 'Имя не должно превышать 100 символов' });
  }

  if (!name || name.length < 2) {
    return res.status(400).json({ error: 'Имя должно содержать минимум 2 символа' });
  }

  const phoneRegex = /^(\+375|80)\d{9}$/;
  if (!phone || !phoneRegex.test(phone)) {
    return res.status(400).json({ error: 'Телефон должен быть в формате +375XXXXXXXXX или 80XXXXXXXXX' });
  }

  if (!message || message.length < 2) {
    return res.status(400).json({ error: 'Сообщение должно содержать минимум 2 символа' });
  }

  if (message.length > 1000) {
    return res.status(400).json({ error: 'Текст сообщения не должен превышать 1000 символов' });
  }

  const query = `INSERT INTO messages (name, phone, message) VALUES (?, ?, ?)`;
  db.run(query, [name, phone, message], function (err) {
    if (err) {
      console.error(`Ошибка при сохранении: ${err.message}`);
      return res.status(500).json({ error: 'Ошибка при сохранении' });
    }
    res.status(201).json({ id: this.lastID, message: 'Сообщение сохранено' });
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});