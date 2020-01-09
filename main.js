'use strict';

function sliderCreate(element, params) {
    let sliderCont = element.querySelector('.slides');
    let sliderItem = element.querySelectorAll('.slider-item');

    // Mini Slider
    let miniSlideItem = document.querySelector('.mini-slider__slides');
    let miniSlider = document.querySelector('.mini-slider');

    // Modal
    let modal = document.querySelector('.modal');
    let link = document.querySelector('.modal-link');
    let button = document.querySelectorAll('.button');
    let modContTitle = document.querySelector('.modal-title');
    let modContText = document.querySelector('.modal-description');
    let modalImg = document.querySelector('.modal-image');

    let indent = sliderItem.length;

    sliderCont.style.width = (indent * 100) + "%";

    let index = 0;
    let nextSlide;
    let prevSlide;
    let interval;
    // let interval = setInterval(function() {scrollSliderFunc(-100)}, 3000);;

    let scrollSliderFunc = function(n){

        index += n;

        if (index <= -(indent) * 100){
            index = 0;
        } else if(index > 0){
            index = -(indent - 1) * 100;
        }
        sliderCont.style.left = `${index}%`;
        miniSlideItem.style.left = `${index}%`;

        if (params.dots) {
            showActivDots(-index / 100);
        }

        function showActivDots(currIndexSlide) {
            let dotsItem = element.getElementsByClassName('slider-dots_item');

            for (let i = 0; i < dotsItem.length; i++) {
                dotsItem[i].className = dotsItem[i].className.replace(" active", "");
            }
            dotsItem[currIndexSlide].className += " active";
        }

    }


    if (params.arrows){
        let next = document.createElement('a');
        next.innerHTML = '&#9658;';
        next.className = 'slider-arrow next';

        let prev = document.createElement('a');
        prev.innerHTML = '&#9668;';
        prev.className = 'slider-arrow prev';
        element.appendChild(prev);

        element.appendChild(next);

        prev.addEventListener('click', function() {
            scrollSliderFunc(100);
        });
        next.addEventListener('click', function(){
            scrollSliderFunc(-100);
        });
    }

    if(params.autoPlay){
        let interval = setInterval(function() {scrollSliderFunc(-100)}, 3000);
        let sliderButton = document.querySelectorAll('.slider-arrow');

        element.addEventListener('mouseover', function() {
            for (let i = 0; i < sliderButton.length; i++) {
                sliderButton[i].style.display = 'flex';
            }
            clearInterval(interval);
        });

        miniSlider.addEventListener('mouseover', function() {
            clearInterval(interval);
        });

        modal.addEventListener('mouseover', function() {
            clearInterval(interval);
        });

        element.addEventListener('mouseout', function() {
            // for (let i = 0; i < sliderButton.length; i++) {
            //     sliderButton[i].style.display = 'none';
            // }
            interval = setInterval(function() {scrollSliderFunc(-100)}, 3000);
        });
    }

    if (params.dots){

        let dots = document.createElement('div');
        dots.className = 'slider-dots';
        element.appendChild(dots);

        for (let i = 0; i < sliderItem.length; i++){
            let createDot = document.createElement('span');
            dots.appendChild(createDot);
            createDot.className = 'slider-dots_item';
        }

        let dotsItem = element.getElementsByClassName('slider-dots_item');

        dotsItem[0].classList.add('active');

        for (let dot of dotsItem) {
            dot.classList.remove('active');
        }

        dotsItem[-index / 100].classList.add('active');

        let dotScrollFunc = function(n){
            scrollSliderFunc(index = -(n * 100 / 2));
        }

        dots.addEventListener('click', function(e) {
            for (let i = 0; i < dotsItem.length; i++) {
                if (e.target.classList.contains('slider-dots_item') && e.target == dotsItem[i]){
                    dotScrollFunc(i);
                }
            }
        });
    }

    if (params.miniSlider) {
        let interval = setInterval(function() {scrollSliderFunc(-100)}, 3000);

        window.addEventListener('click', function (e) {
            if (event.target === modal) {
                modal.style.display = "none";
                interval = setInterval(function () {
                    scrollSliderFunc(-100)
                }, 3000);
            }
        });

        for (let i = 0; i < button.length; i++) {
            button[i].addEventListener('click', function (e) {
                let currentSlide = e.currentTarget;
                let modalTitle = currentSlide.parentElement.children[0].textContent;
                modContTitle.innerHTML = modalTitle;
                let modalContent = currentSlide.parentElement.children[1].textContent;
                modContText.textContent = modalContent;

                if (e.target === button[i]) {
                    let slideImg = sliderItem[i].style.backgroundImage;
                    modalImg.style.backgroundImage = `url(img/slide${[i + 1]}.jpg`;
                    modalImg.style.display = "flex";
                }

                modal.style.display = 'flex';
                clearInterval(interval);
            });

            link.addEventListener('click', function (e) {
                modal.style.display = "none";
            });
        }

    }
    if (params.miniSlider === false){
        miniSlider.style.display = 'none';
    }

}

sliderCreate(document.querySelector('#first'), {
    arrows : true,
    dots : true,
    miniSlider : true,
    autoPlay : true,
});

sliderCreate(document.querySelector('#second'), {
    arrows : true,
    dots: true,
    autoPlay: true,
});




