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
        alert("Please enter your name.");
        return;
    }

    if (!email) {
        alert("Please enter your email.");
        return;
    }

    if (!phone) {
        alert("Please enter your number.");
        return;
    }

    if (!service) {
        alert("Please choose the type of website.");
        return;
        }  

    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailPattern.test(email)) {
        alert("Please enter a valid email.");
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
                alert("Thank you for your order, our specialists will contact you soon.");
                document.getElementById("orderForm").reset(); 
            } else {
                alert("Error sending order.");
            }
        })
        .catch(error => {
            alert("Oops, something went wrong. Please try again.");
            console.error('Error:', error);
        });
}
