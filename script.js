document.querySelectorAll('.nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
})

function calculatePrice() {
    const siteType = parseInt(document.getElementById('siteType').value);
    const pageCount = parseInt(document.getElementById('pageCount').value);
    const responsiveDesign = document.getElementById('responsiveDesign').checked ? parseInt(document.getElementById('responsiveDesign').value) : 0;
    const domainConnection = document.getElementById('domainConnection').checked ? parseInt(document.getElementById('domainConnection').value) : 0;
    const hosting = document.getElementById('hosting').checked ? parseInt(document.getElementById('hosting').value) : 0;
    const googleAnalytics = document.getElementById('googleAnalytics').checked ? parseInt(document.getElementById('googleAnalytics').value) : 0;
    const contactForm = document.getElementById('contactForm').checked ? parseInt(document.getElementById('contactForm').value) : 0;
    const loginForm = document.getElementById('loginForm').checked ? parseInt(document.getElementById('loginForm').value) : 0;
    const totalPrice = siteType + (pageCount * 100) + responsiveDesign + domainConnection + hosting + googleAnalytics + contactForm + loginForm;
    document.getElementById('totalPrice').textContent = totalPrice;
}


/*portfolio*/
// Завантаження даних із JSON
const jsonPaths = ["/projects.json", "/Tritonix/projects.json"];

jsonPaths.forEach((path) => {
    fetch(path)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to load: ${path}`);
            }
            return response.json();
        })
        .then((data) => {
            // Для головної сторінки
            if (document.querySelector("#latest-projects")) {
                const latestProjects = data.slice(-3).reverse(); // Останні 3 проєкти
                renderProjects("#latest-projects", latestProjects, "./");
            }

            // Для сторінки портфоліо
            if (document.querySelector("#all-projects")) {
                renderProjects("#all-projects", data, "../");
            }
        })
        .catch((error) => console.error(error.message));
});


// Функція для створення HTML-структури з посиланням та іконкою стрілки
function renderProjects(containerId, projectList) {
    const container = document.querySelector(containerId);
    if (!container) return;

    const projectsHTML = projectList.map(
        (project) => `
        <a href="${project.link}" target="_blank" class="example-link">
            <div class="example">
                <img src="${project.image}" alt="${project.title}" class="example-foto">
                <h3 class="example-title">${project.title}</h3>
                <div class="example-description">${project.description}</div>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAAAXNSR0IArs4c6QAABTVJREFUaEPtmXvIn2MYx79fQymM2LLlTKZMzpM5jAmZ0woxcjaHRhpFjmPLP0KjRQ6NnOVQo0URsy1bcwyNHFcMOVMk4ev56nl+Xe/zPs9zP7/f733VW656e9/f777u+/rc133d133d90uMQOEIZMb/0JJGA9g0/9kIwC8AfvQPSf89JNKXpyVtDuBIAEcBOALAJg1U3wN4HsBi/ybpyfQkPUFL2gzAPAAzAazbg+U/ANwBYG4v8F1DS7oKwJUANuwBttzlp+yL60ne1s1YraElGfLJPAzqbCwD8DWAb/JYdviMAbANgL0bwJ4BMIPkb23gW0FLGgfgOQC7VQx6P4DHASwh+XudUUkGPwPAWQC2rdB7HcA0kt+mwJPQkuypVRWG3gFwLsnXUkbK7ZLOBDCnYsyPvSIkf24asxFa0igArwKYVBrkniwMLiD5d7fAhb6k9QA8AODk0hgvOgSbxk5BLwAwKwwqAJeTvLlX2AqvX5Nnoth0E8kr6mzUQkualufU2PcykrcOFXDwujPSjaVxDyG5pMpWJbSkdQCsBjAhdLqP5NlDDRzAHwZwShh/Fcl9u4E+LY+3os97JHcdLuAA/imA7YKd40g6HQ6QOk9/VtrZJ5J0jh5WkeR0uDAYeSuD3jMJLWkPAG8GRYfJRJLehMMqklwSOO05pxeyFckvouFBnpZU3s2XkLy9jlbSjgA+ajEb6xxM8ssmXUnXAbgh6Mwi6TqlI1XQK7PTL26A8SS/6hPaB9FUkq70GkWSw+GNoLSY5NEp6BgGq0nukvBMytN2gg+L1vW0JDtpi9zuWpJb1kLnJed3QeFpksf3Ae3j3/m2VSFU2JH0CoCD8s924qi4pwaEh6SJAN4NkAuyJb24D2gXUPby0lRYxHZJjwE4KXw3NhZSZWjPzrMsZA7JuX1Au6u9fChJh0krkeSNd2FQnkDyw+JzGdoHiDdNIfOzimt2l9BvA9gBgO+IhfwKYArJuMFqh63w9BiSnbAtQ7sMdQFfyKPZDOPROsiQJAM6t1qc36fmp5pXbOPQ4QcAB5B8P+VuSa45puR6fwJYvzamrSQpZo9lJIsNUWkr5Ol/gYtaWNLueahFcBf4+5NszOuS4nH+Ocmto/GqPO0bxF650l8ARpP08jZB++bSAS4Ua8CdzgzuUqFq5XyriW2LSE5PQXvjXRuUGusOSX42UN1tQ5Id8HKIcXvRG3NNDfSlme4toW1mlqfvTUH7NIw7fdBMUzFZbg8edw3hvB33zQB1Sd7I8S46jqQvyx2pq/LWAhgf9CaTXNEtbNTPj+c1JL0h60LtVAAPhcYVJCeXleugzwNwV1BeSXK/fqBTfSVtkF0CnIvjkX04yRfaQvtC6wG2Dx3uzgqn81PGe23PSuJFWco8NvRfTvLAqvGa7og+Rn2cRplNcn6vYA1h4Y1fPnkn1T1PpG7jfojxA0sh/9Vt3E9lsaYeMN8UtN8mlle8e9wJ4KI+3z0cgr5anV5aAb97OJZrb0ptX5j8ihSvQLbja9g8kuUQSkaPJGcJ31B2Kim7HNiHpB8mayUJ7Z5Z1TU2OyWfrfC4m23oqaz+fSk7FZfWvedJOsyHCoAT8oKqDOUVnd7mdtMKuhPQUvltosobrsc/APBJDrdzNqnU88NCkucklyhX6Ao69/ox+WtQCqQNg4usq0n6PwStpWvo4PUZeVzak92KV8P74YluO1q/Z+gA74LIGcCTcD1eJ64fHslC5sGsanN90bP0DR0tj4j/bvXsqj47Dqmn+2Rp3X1EQv8DTDzfPXVIKUsAAAAASUVORK5CYII=" class="example-arrow">
            </div>
        </a>`
    ).join('');
    container.innerHTML = projectsHTML;
}



const menuToggle = document.getElementById('menuToggle');
const menuOverlay = document.getElementById('menuOverlay');

// Відкривання/закривання меню
menuToggle.addEventListener('click', () => {
  const isOpen = menuOverlay.classList.toggle('show');
  menuToggle.textContent = isOpen ? '✖' : '☰'; // Зміна тексту кнопки
});

// Закриття меню при кліку на фон
menuOverlay.addEventListener('click', (e) => {
  if (e.target === menuOverlay) {
    menuOverlay.classList.remove('show');
    menuToggle.textContent = '☰';
  }
});

// Закриття меню при виборі посилання
menuOverlay.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuOverlay.classList.remove('show');
    menuToggle.textContent = '☰';
  });
});

