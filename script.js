const MENU = document.getElementById('menu');
const CLOSE_BUTTON = document.getElementById('close-btn');
const FORM = document.getElementById('form');
const IMG = document.getElementById('portfolio');
const SLIDER = document.getElementById('slider');
const VERTICAL = document.getElementById('vertical');
const HORIZONTAL = document.getElementById('horizontal');
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
VERTICAL.addEventListener('click', (event) => {
        if(VERTICAL.classList.contains("normal-screen-vertical")) {
            event.target.classList.remove("normal-screen-vertical");
            event.target.classList.add("black-screen-vertical");
        } else {
            event.target.classList.remove("black-screen-vertical");
            event.target.classList.add("normal-screen-vertical");
        }
});
HORIZONTAL.addEventListener('click', (event) => {
    if(HORIZONTAL.classList.contains("normal-screen-horizontal")) {
        event.target.classList.remove("normal-screen-horizontal");
        event.target.classList.add("black-screen-horizontal");
    } else {
        event.target.classList.remove("black-screen-horizontal");
        event.target.classList.add("normal-screen-horizontal");
    }
});

IMG.addEventListener('click', (event) => {
    IMG.querySelectorAll('div').forEach(el => el.classList.remove('img_active'));
    if(!event.target.classList.contains('portfolio__photoGrid')) {
        event.target.classList.add('img_active');
    }
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





let items = document.querySelectorAll('.item');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
    currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
    isEnabled = false;
    items[currentItem].classList.add(direction);
    items[currentItem].addEventListener('animationend', function() {
        this.classList.remove('active', direction);
    })
}

function showItem(direction) {
    items[currentItem].classList.add('next', direction);
    const dataBackground = items[currentItem].getAttribute('data-background');
    SLIDER.style.background = dataBackground;
    items[currentItem].addEventListener('animationend', function() {
        this.classList.remove('next', direction);
        this.classList.add('active');
        isEnabled = true;
    })
}

function previousItem(number) {
    hideItem('to-right');
    changeCurrentItem(number - 1);
    showItem('from-left');
}
function nextItem(number) {
    hideItem('to-left');
    changeCurrentItem(number + 1);
    showItem('from-right');
}
document.querySelector('.left').addEventListener('click', function(){
    if(isEnabled) {
        previousItem(currentItem);
    }
});
document.querySelector('.right').addEventListener('click', function(){
    if(isEnabled) {
        nextItem(currentItem);
    }
});



const swipeDetect = (el) => {

    let surface = el;
    let startX = 0;
    let startY = 0;
    let distX = 0;
    let distY = 0;

    let startTime = 0;
    let elapsedTime = 0;


    let threshold = 150;
    let restraint = 100;
    let allowedTime = 300;

    surface.addEventListener('mousedown', function(e) {
        startX = e.pageX;
        startY = e.pageY;
        startTime = new Date().getTime();
        e.preventDefault();
    });

    surface.addEventListener('mouseup', function(e) {
        distX = e.pageX - startX;
        distY = e.pageY - startY;
        elapsedTime = new Date().getTime() - startTime;

        if(elapsedTime <= allowedTime) {
            if(Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
                if(distX > 0) {
                    if(isEnabled) {
                        previousItem(currentItem);
                    }
                } else {
                    if(isEnabled) {
                        nextItem(currentItem);
                    }
                }
            }
        }


        e.preventDefault();
    })


    surface.addEventListener('touchstart', function(e) {
        if(e.target.classList.contains('arrow') || e.target.classList.contains('control')) {
            if(e.target.classList.contains('left')) {
                if(isEnabled) {
                    previousItem(currentItem);
                }
            } else if(e.target.classList.contains('right')) {
                if(isEnabled) {
                    nextItem(currentItem);
                }
            }
        }
        let touchObj = e.changedTouches[0];
        startX = touchObj.pageX;
        startY = touchObj.pageY;
        startTime = new Date().getTime();
        e.preventDefault();
    });

    surface.addEventListener('touchmove', function(e) {
        e.preventDefault();
    });

    surface.addEventListener('touchend', function(e) {
        let touchObj = e.changedTouches[0];
        distX = touchObj.pageX - startX;
        distY = touchObj.pageY - startY;
        elapsedTime = new Date().getTime() - startTime;

        if(elapsedTime <= allowedTime) {
            if(Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
                if(distX > 0) {
                    if(isEnabled) {
                        previousItem(currentItem);
                    }
                } else {
                    if(isEnabled) {
                        nextItem(currentItem);
                    }
                }
            }
        }


        e.preventDefault();
    })
}
let el = document.querySelector('.slider');
swipeDetect(el);

