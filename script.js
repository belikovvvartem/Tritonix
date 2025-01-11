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
    const multiLanguage = document.getElementById('multiLanguage').checked ? parseInt(document.getElementById('multiLanguage').value) : 0;
    const socialMediaIntegration = document.getElementById('socialMediaIntegration').checked ? parseInt(document.getElementById('socialMediaIntegration').value) : 0;
    const domainConnection = document.getElementById('domainConnection').checked ? parseInt(document.getElementById('domainConnection').value) : 0;
    const hosting = document.getElementById('hosting').checked ? parseInt(document.getElementById('hosting').value) : 0;
    const googleAnalytics = document.getElementById('googleAnalytics').checked ? parseInt(document.getElementById('googleAnalytics').value) : 0;
    const contactForm = document.getElementById('contactForm').checked ? parseInt(document.getElementById('contactForm').value) : 0;
    const loginForm = document.getElementById('loginForm').checked ? parseInt(document.getElementById('loginForm').value) : 0;
    const totalPrice = siteType + (pageCount * 100) + responsiveDesign + multiLanguage + socialMediaIntegration + domainConnection + hosting + googleAnalytics + contactForm + loginForm;
    document.getElementById('totalPrice').textContent = totalPrice;
}


const jsonPaths = ["./projects.json", "./Tritonix/projects.json"];

jsonPaths.forEach((path) => {
    fetch(path)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to load: ${path}`);
            }
            return response.json();
        })
        .then((data) => {
            if (document.querySelector("#latest-projects")) {
                const latestProjects = data.slice(-3).reverse(); 
                renderProjects("#latest-projects", latestProjects);
            }

            if (document.querySelector("#all-projects")) {
                renderProjects("#all-projects", data);
            }
        })
        .catch((error) => console.error(error.message));
});

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
                <div class="example-arrow"><svg width="50" height="50"  transform="rotate(230)" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="m128 28a100 100 0 1 0 100 100 100.11332 100.11332 0 0 0 -100-100zm0 192a92 92 0 1 1 92-92 92.10416 92.10416 0 0 1 -92 92zm42.82812-94.82813a3.99854 3.99854 0 0 1 0 5.65625l-33.94091 33.94141a3.99992 3.99992 0 0 1 -5.65674-5.65674l27.11279-27.11279h-70.34326a4 4 0 0 1 0-8h70.34326l-27.11279-27.11279a3.99992 3.99992 0 0 1 5.65674-5.65674z"/></svg></div>
            </div>
        </a>`
    ).join('');
    container.innerHTML = projectsHTML;
}

const menuToggle = document.getElementById('menuToggle');
const menuOverlay = document.getElementById('menuOverlay');

menuToggle.addEventListener('click', () => {
  const isOpen = menuOverlay.classList.toggle('show');
  menuToggle.textContent = isOpen ? '✖' : '☰'; 
});

menuOverlay.addEventListener('click', (e) => {
  if (e.target === menuOverlay) {
    menuOverlay.classList.remove('show');
    menuToggle.textContent = '☰';
  }
});

menuOverlay.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuOverlay.classList.remove('show');
    menuToggle.textContent = '☰';
  });
});



document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

  
  document.addEventListener("keydown", function (e) {
    if (e.keyCode == 123) { // F12
      e.preventDefault();
    }
  });
  

  
