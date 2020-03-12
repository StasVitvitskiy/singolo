const MENU = document.getElementById('menu');
const CLOSE_BUTTON = document.getElementById('close-btn');
const FORM = document.getElementById('form');
const IMG = document.getElementById('portfolio');

function scrollToElement(pageElement) {
    let positionX = 0,
        positionY = 0;

    while(pageElement !== null){
        positionX += pageElement.offsetLeft;
        positionY += pageElement.offsetTop;
        pageElement = pageElement.offsetParent;
        window.scrollTo(positionX, positionY);
    }
}
IMG.addEventListener('click', (event) => {
    IMG.querySelectorAll('div').forEach(el => el.classList.remove('img_active'));
    event.target.classList.add('img_active');
});

MENU.addEventListener('click', (event) => {
    MENU.querySelectorAll('li').forEach(el => el.classList.remove('active'));
    const element = event.target;
    element.classList.add('active');
    const dataSelector = element.getAttribute("data-selector");
    let elToScroll = document.querySelector(dataSelector);
    scrollToElement(elToScroll);
});
FORM.addEventListener('submit', (event) => {
    event.preventDefault();
    let subject = document.getElementById('subject').value.toString();
    let description = document.getElementById('description').value.toString();
    if(subject === "") {
        document.getElementById('subjectP').innerText = "Без темы";
    } else {
        document.getElementById('subjectP').innerText = subject;
    }
    if(description === "") {
        document.getElementById('describe').innerText = "Без описания";
    } else {
        document.getElementById('describe').innerText = description;
    }
    document.getElementById('message-block').classList.remove('hidden');
    FORM.reset();

});
CLOSE_BUTTON.addEventListener('click', () => {
    document.getElementById('subjectP').innerText = "";
    document.getElementById('describe').innerText = "";
    document.getElementById('message-block').classList.add('hidden');
});

