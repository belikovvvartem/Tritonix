function toggleAnswer(element) {
    const answer = element.nextElementSibling;
    const arrow = element.querySelector('.arrow');

    if (answer.classList.contains("active")) {
        answer.classList.remove("active");
        arrow.style.transform = "rotate(0deg)";
    } else {
        answer.classList.add("active");
        arrow.style.transform = "rotate(330deg)";
    }
}