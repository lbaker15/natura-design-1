// Put your application javascript here
gsap.registerPlugin(ScrollTrigger);

let items = Array.from(document.querySelectorAll('.flex'));
let pNotMoving = Array.from(document.querySelectorAll('.p-not-moving'));
let navbarCustom = document.querySelector('.navbar-custom');
let menuItem = Array.from(document.querySelectorAll('.menu-item'));
let minus = document.getElementById('minus');
let plus = document.getElementById('plus');
let quantity = document.getElementById('quantity');
let contactSection = document.querySelector('.contact-section');

if (contactSection) {
    let tlOpacity = gsap.timeline({
        scrollTrigger: {
            trigger: '.header-contact',
            start: "bottom 100%",
            end: "bottom 0%",
            scrub: 0.5,
        }
    });
    tlOpacity.fromTo(contactSection, {y:0}, {y:-75})
    let tlOpacity2 = gsap.timeline({
        scrollTrigger: {
            trigger: '.header-contact',
            start: "bottom 100%",
            end: "bottom 0%",
            scrub: 0.5,
        }
    });
    tlOpacity2.fromTo('.right h2', {y:0}, {y:-75})
    let tlOpacity3 = gsap.timeline({
        scrollTrigger: {
            trigger: '.header-contact',
            start: "bottom 100%",
            end: "bottom 0%",
            scrub: 0.5,
        }
    });
    tlOpacity3.fromTo('.right h4', {y:0}, {y:-75})
}

//PRODUCT SECTION
if (minus) {
minus.addEventListener('click', () => {
    if (quantity.value > 0) {
    let num = quantity.value - 1;
    quantity.value = num;
    }
})
}
if (plus) {
plus.addEventListener('click', () => {
    if (quantity.value < 1000) {
    let num = Number(quantity.value) + 1;
    quantity.value = num;
    }
})
}



//FRONT PAGE ANIMATIONS
let tlOpacity = gsap.timeline({
        scrollTrigger: {
            trigger: '.hero-image',
            start: "bottom 100%",
            end: "bottom 20%",
            scrub: 1,
        }
});
tlOpacity.fromTo('.hero-image', {scale: 1.2}, {scale: 1})
let tlSvg = gsap.timeline({
    scrollTrigger: {
        trigger: '.svg-edit',
        start: "bottom 100%",
        end: "bottom 20%",
        scrub: 1,
    }
});
tlSvg.fromTo('.svg-edit', {rotate: 0}, {rotate: 360})

if (window.innerWidth > 900) {
items.map((item, i) => {
    let top = item.querySelector('.p-top');
    let btm = item.querySelector('.p-bottom');
    
    if (i === 0) {
        let moveMe = gsap.timeline({
            scrollTrigger: {
                trigger: item,
                start: "top 100%",
                end: "bottom 0%",
                scrub: 1,
            }
        });
        moveMe.fromTo('.move-me', {height: 100}, {height: 0})
    }

    let tlOpacity = gsap.timeline({
        scrollTrigger: {
            trigger: item,
            start: "top 100%",
            end: "bottom 0%",
            scrub: 1,
        }
    });
    tlOpacity.fromTo(top, {height: 100}, {height: 0})

    let value = (i !== items.length-1) ? items[i+1] : document.querySelector('.about')
    let tlBtm = gsap.timeline({
        scrollTrigger: {
            trigger: value,
            start: "top 100%",
            end: "bottom 0%",
            scrub: 1,
        }
    });
    tlBtm.fromTo(btm, {height: 0}, {height: 100})

    let p = gsap.timeline({
        scrollTrigger: {
            trigger: value,
            start: "top 100%",
            end: "bottom 0%",
            scrub: 1,
            //markers: {startColor: 'red'},
        }
    });
    p.fromTo(pNotMoving[i], {y: 0}, {y: -100})

    if (i === items.length - 1) {
        let p2 = gsap.timeline({
            scrollTrigger: {
                trigger: '.about',
                start: "top 100%",
                end: "bottom 0%",
                scrub: 1,
                //markers: {startColor: 'red'},
            }
        });
        p2.fromTo('.about', {marginTop: 0}, {marginTop: -100})
    }
})
} else {
    items.map((item, i) => {
    })
}





document.addEventListener('DOMContentLoaded', () => {
    //HEADER DISAPPEAR
    let hidden = false;
    let head = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        console.log(document.documentElement.scrollTop)
        if (document.documentElement.scrollTop > 400) {       
            gsap.to(head, {display: 'none', opacity: 0, duration:0.3})
            hidden = true;
            console.log('hidden', hidden)
        } else if (document.documentElement.scrollTop < 400) {
            if (hidden === true) {
                gsap.to(head, {display: 'block', opacity: 1, duration:0.3})
            }
        }
        
        else {
           
        }
    })

    //NAV MENU UNDERLINE EFFECT
    let menuHover = Array.from(document.querySelectorAll('.menu-hover'));
    menuHover.map(item => {
        let line = item.parentElement.querySelector('.line');
        console.log(line)
        gsap.set(line, {width: 0})
        item.addEventListener('mouseover', () => {
            gsap.fromTo(line, {width: 0}, {width: '100%', duration: 0.75})
        })
        item.addEventListener('mouseout', () => {
            gsap.fromTo(line, {width: '100%'}, {width: 0, duration: 0.75})
        })
    })
    
    //CART
    let cartopen = false;
    gsap.set('.dropdown-menu-mine', {display: 'none'})
    document.querySelector('.dropdown-mine').addEventListener('click', () => {
        console.log('click')
        if (window.innerWidth > 640) {
            if (!cartopen) {
                gsap.to('.dropdown-menu-mine', {display: 'block', duration: 0.01})
                cartopen = true;
            } else {
                gsap.to('.dropdown-menu-mine', {display: 'none', duration: 0.01})
                cartopen = false;
            }
        }
    })

    let upBtn = document.getElementById('update-btn-m') 
    if (upBtn) {
        upBtn.addEventListener('click', () => {
            let quantity = Array.from(document.querySelectorAll('.quantity-no'));
            let formData = {'updates': {}}
            //START LOADING SCREEN
            if (window.innerWidth > 800) {
                Array.from(document.querySelectorAll('.q-screen')).map(item => {
                    console.log(item)
                    formData = {...formData, updates: {
                        ...formData.updates,
                        [item.id]: item.value
                    }}
                })
            } else {
                Array.from(document.querySelectorAll('.q-mobile')).map(item => {
                    formData = {...formData, updates: {
                        ...formData.updates,
                        [item.id]: item.value
                    }}
                })
            }

              fetch('/cart/update.js', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
              })
              .then(response => {
                //TURN OFF LOADING SCREEN
                window.location.reload()
                return response.json();
              })
              .catch((error) => {
                //HANDLE OUT OF STOCK
                console.error('Error:', error);
              });
        })
    }

    //FULL MENU ANIMATIONS
    menuItem.map(item => {
        let snipHolder = item.querySelector('.snippet-holder');
        let snipImg = item.querySelector('.snippet-img')
        let h2 = item.querySelector('h2')
        h2.addEventListener('mouseover', () => {
            gsap.fromTo(snipHolder, {skewY: 5}, {height: 250, skewY:0})
    
        })
        h2.addEventListener('mouseout', () => {
            gsap.to(snipHolder, {height: 0})
        })
    })
    //BURGER
    let divArr = Array.from(navbarCustom.querySelectorAll('div'));
    let nav = gsap.timeline({paused: true})
    divArr.map((x, i) => {
        let num = i * 10;
        nav.fromTo(x, {x: 0}, {x: num, duration: 0.15}, '-=0.05')
    })
    let open = false;
    let navopen = gsap.timeline({paused: true})
    divArr.map((x, i) => {
        let num = i * 10;
        if (i===0) {
            navopen.fromTo(x, {opacity: 1, x: 0, y: 0}, {opacity: 0})
        } else if (i===1) {
            navopen.fromTo(x, {rotate: 0, x: 0, y: 0}, {rotate: 45, x: 0, y: 0}, '<')
        } else {
            navopen.fromTo(x, {rotate: 0, x: 0, y: 0}, {rotate: -45, x: 0, y:-14}, '<')
        }
    })
    navopen.fromTo('.menu-custom', {display: 'none', opacity: 0}, {opacity: 1, display: 'block'})
    //OPENING MENU
    navbarCustom.addEventListener('mouseover', () => {
        if (!open) {
            console.log('mouseover')
            nav.restart(0)  
        }
    })
    navbarCustom.addEventListener('mouseout', () => {
        if (!open) {
            console.log('mouseout')
            nav.reverse()
        }
    })
    navbarCustom.addEventListener('click', () => {
        if (!open) {
            open = true;
            navopen.restart(0)
        } else {
            setTimeout(() => open = false, 500)
            navopen.reverse()
        }
    })
})





$('.search').on('click', function () {
    console.log('click')
    $('.search-area').fadeIn();
});

$('.search-area .close-btn').on('click', function () {
    $('.search-area').fadeOut();
});
let ingredientsOpen = false;
let shippingOpen = false;
let ingredMenu = document.querySelector('.ingredients-menu');
let shipMenu = document.querySelector('.shipping-menu');
let nonImagesStick = document.querySelector('.non-images-stick');
gsap.registerPlugin(ScrollToPlugin);

// window.addEventListener('resize', () => {
//     window.location.reload()
// })
$('.prod-ingredients').on('click', function() {
    if (!ingredientsOpen) {
        ingredMenu.style.display = 'flex'
        ingredientsOpen = true;
        shipMenu.style.display = 'none'
        shippingOpen = false;
        console.log(shipMenu)
    } else {
        ingredMenu.style.display = 'none'
        ingredientsOpen = false;
    }
})
$('.prod-shipping').on('click', function() {
    if (!shippingOpen) {
        shipMenu.style.display = 'flex'
        shippingOpen = true;
        ingredMenu.style.display = 'none'
        ingredientsOpen = false;

    } else {
        shipMenu.style.display = 'none'
        shippingOpen = false;
    }
})


let newParallax = Array.from(document.querySelectorAll('.new-parallax'));
newParallax.map(item => {
    gsap.fromTo(item, {scale: 1.05, y: '0%'}, 
    {scale: 1, y: '-18%',
    immediateRender: false, 
    scrollTrigger: {
        trigger: item,
        start: 'top 70%',
        end: "bottom 0%",
        scrub: true,
        markers: true,
    },
    })
})
