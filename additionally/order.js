const telegramBotToken = '8055588826:AAE4q3q5UooUwvDB6BxPdBRucdopgEOyiL4';
const telegramChatId = '7034327346';

function submitOrder() {
    const form = document.getElementById('orderForm');
    const formData = new FormData(form); // Отримуємо всі дані форми, включаючи файл

    // Перевірка обов'язкових полів
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const service = formData.get('service');

    if (!name || !email || !phone || !service) {
        alert('Будь ласка, заповніть усі обов’язкові поля!');
        return; // Зупиняємо виконання функції, якщо дані не введені
    }

    // Формування повідомлення
    const message = `
        🔔 Нова заявка!
        Ім'я: ${name}
        Електронна пошта: ${email}
        Номер телефону: ${phone}
        Вебсайт: ${formData.get('website') || 'Не вказано'}
        Послуга: ${service}
        Опис: ${formData.get('situation') || 'Не вказано' }
    `;

    // Відправка повідомлення та файлу в Telegram
    const file = formData.get('file'); // Отримуємо файл

    // Спочатку відправляємо текстове повідомлення
    fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: telegramChatId,
            text: message,
        }),
    })
    .then((response) => {
        if (response.ok) {
            console.log('Повідомлення успішно відправлено!');

            // Тепер відправимо файл (якщо він є)
            if (file) {
                const formDataForFile = new FormData();
                formDataForFile.append('chat_id', telegramChatId);
                formDataForFile.append('document', file); // Додаємо файл у форму
                formDataForFile.append('caption', 'Файл від користувача');

                fetch(`https://api.telegram.org/bot${telegramBotToken}/sendDocument`, {
                    method: 'POST',
                    body: formDataForFile, // Відправка файлу
                })
                .then((fileResponse) => {
                    if (fileResponse.ok) {
                        alert('Замовлення успішно надіслані!');
                        form.reset();
                    } 
                })
                .catch((error) => {
                    alert('Помилка при відправці файлу: ' + error.message);
                });
            } else {
                alert('Замовлення успішно надіслано!');
                form.reset();
            }
        } else {
            alert('Помилка надсилання! Спробуйте ще раз.');
        }
    })
    .catch((error) => {
        alert('Помилка: ' + error.message);
    });
}
