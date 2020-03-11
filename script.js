const MENU = document.getElementById('menu');
const CLOSE_BUTTON = document.getElementById('close-btn');
const FORM = document.getElementById('form');

function scrollToElement(pageElement) {
    var positionX = 0,
        positionY = 0;

    while(pageElement !== null){
        positionX += pageElement.offsetLeft;
        positionY += pageElement.offsetTop;
        pageElement = pageElement.offsetParent;
        window.scrollTo(positionX, positionY);
    }
}


MENU.addEventListener('click', (event) => {
    MENU.querySelectorAll('li').forEach(el => el.classList.remove('active'));
    const element = event.target;
    element.classList.add('active');
    const dataSelector = element.getAttribute("data-selector");
    let elToScroll = document.querySelector(dataSelector);
    console.log(dataSelector);
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

