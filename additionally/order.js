const telegramBotToken = '8055588826:AAE4q3q5UooUwvDB6BxPdBRucdopgEOyiL4';
const telegramChatId = '7034327346';

function submitOrder() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const website = document.getElementById("website").value.trim();
    const situation = document.getElementById("situation").value.trim();
    const service = document.getElementById("service").value.trim();


    if (!name) {
        alert("Будь ласка, введіть ваше ім'я.");
        return;
    }

    if (!email) {
        alert("Будь ласка, введіть вашу пошту.");
        return;
    }

    if (!phone) {
        alert("Будь ласка, введіть ваш номер телефону.");
        return;
    }

    if (!service) {
        alert("Будь ласка, виберіть тип сайту.");
        return;
    }

    // Перевірка валідності email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailPattern.test(email)) {
        alert("Будь ласка, введіть правильний email.");
        return;
    }

    const message = `
        Замовлення🔎:

        Ім'я: ${name}
        Email: ${email}
        Телефон: (+380)${phone}
        Вебсайт: ${website}
        Опис: ${situation}
        Тип сайту: ${service}
    `;

    const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${telegramChatId}&text=${encodeURIComponent(message)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                alert("Дякуємо за замовлення, скоро з вами зв'яжуться наші спеціалісти.");
                document.getElementById("orderForm").reset(); 
            } else {
                alert("Помилка при надсиланні замовлення.");
            }
        })
        .catch(error => {
            alert("Ой халепа, щось пішло не так. Спробуйте ще раз.");
            console.error('Error:', error);
        });
}