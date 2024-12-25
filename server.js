require('dotenv').config(); 

const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
const telegramChatId = process.env.TELEGRAM_CHAT_ID;

app.use(bodyParser.json());

app.post('/send-to-telegram', (req, res) => {
    const { name, email, phone, website, situation, service } = req.body;
    
    const message = `
        Замовлення:
        Ім'я: ${name}
        Email: ${email}
        Телефон: ${phone}
        Вебсайт: ${website}
        Опис: ${situation}
        Тип сайту: ${service}
    `;

    const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${telegramChatId}&text=${encodeURIComponent(message)}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                res.json({ success: true });
            } else {
                res.status(500).json({ success: false, message: "Error sending message" });
            }
        })
        .catch(err => {
            res.status(500).json({ success: false, message: err.message });
        });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
