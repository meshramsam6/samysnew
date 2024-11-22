$(document).ready(function ($) {
    "use strict";

    // Function to load and display products, sorted by categories
    function loadProducts() {
        $.getJSON('products.json', function (data) {
            const products = data.products;

            // Empty the menu container before appending new products
            const menuContainer = $(".menu-list-row .row");
            menuContainer.empty();

            // Get unique categories from the JSON file
            const categories = [...new Set(products.map(product => product.category))];

            // Create and display category filters
            const filterContainer = $(".filters");
            filterContainer.empty();  // Clear previous filters

            // Add the "All" filter
            const allFilter = `
                <li class="filter" data-filter=".all">
                    <img src="assets/images/menu-1.png" alt="">
                    All
                </li>
            `;
            filterContainer.append(allFilter);

            // Loop through categories to generate filters and display products under the respective category
            categories.forEach(function (category) {
                // Get the first product in the category for the filter image
                const categoryProduct = products.find(product => product.category === category);
                const categoryImage = categoryProduct ? categoryProduct.url2 : "assets/images/menu-1.png";  // Fallback image

                const categoryFilter = `
                    <li class="filter" data-filter=".${category.toLowerCase().replace(' ', '-')}" data-category="${category}">
                        <img src="${categoryImage}" alt="${category}" style="width: 60px; height: 20px;">
                        ${category}
                    </li>
                `;
                // Append filter for each category
                filterContainer.append(categoryFilter);

                // Filter the products for the current category
                const filteredProducts = products.filter(function (product) {
                    return product.category === category;
                });

                // Loop through filtered products and create the product HTML
                filteredProducts.forEach(function (product) {
                    const dishBox = `
                        <div class="col-lg-4 col-sm-6 dish-box-wp ${category.toLowerCase().replace(' ', '-')}" data-cat="${category}">
                            <div class="dish-box text-center">
                                <div class="dist-img">
                                    <img src="${product.url2}" alt="${product.name}" style="width: 260px; height: 260px; object-fit: cover;">
                                </div>
                                <div class="dish-rating">
                                    ${getRandomRating()} <i class="uil uil-star"></i>
                                </div>
                                <div class="dish-title">
                                    <h3 class="h3-title">${product.name}</h3>
                                    <p>${product.price} Rs.</p>
                                </div>
                                <div class="dish-info">
                                    <ul>
                                        <li>
                                            <p>Type</p>
                                            <b>${product.category}</b>
                                        </li>
                                        <li>
                                            <p>Persons</p>
                                            <b>2</b>
                                        </li>
                                    </ul>
                                </div>
                                <div class="dist-bottom-row">
                                    <ul>
                                        <li>
                                            <b>${product.price} Rs.</b>
                                        </li>
                                        <li>
                                            <button class="dish-add-btn">
                                                <i class="uil uil-plus"></i>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    `;

                    // Append the product HTML to the container
                    menuContainer.append(dishBox);
                });
            });
        });
    }

    // Call the function to load products
    loadProducts();

    // Function to generate a random rating between 1 and 5
    function getRandomRating() {
        return (Math.random() * 4 + 1).toFixed(1); // Random number between 1 and 5
    }

    var book_table = new Swiper(".book-table-img-slider", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        speed: 2000,
        effect: "coverflow",
        coverflowEffect: {
            rotate: 3,
            stretch: 2,
            depth: 100,
            modifier: 5,
            slideShadows: false,
        },
        loopAdditionSlides: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    var team_slider = new Swiper(".team-slider", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        speed: 2000,

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1.2,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 3,
            },
        },
    });

    jQuery(".filters").on("click", function () {
        jQuery("#menu-dish").removeClass("bydefault_show");
    });

    $(function () {
        var filterList = {
            init: function () {
                $("#menu-dish").mixItUp({
                    selectors: {
                        target: ".dish-box-wp",
                        filter: ".filter",
                    },
                    animation: {
                        effects: "fade",
                        easing: "ease-in-out",
                    },
                    load: {
                        filter: ".all, .breakfast, .lunch, .dinner",
                    },
                });
            },
        };
        filterList.init();
    });

    jQuery(".menu-toggle").click(function () {
        jQuery(".main-navigation").toggleClass("toggled");
    });

    jQuery(".header-menu ul li a").click(function () {
        jQuery(".main-navigation").removeClass("toggled");
    });

    gsap.registerPlugin(ScrollTrigger);

    var elementFirst = document.querySelector('.site-header');
    ScrollTrigger.create({
        trigger: "body",
        start: "30px top",
        end: "bottom bottom",

        onEnter: () => myFunction(),
        onLeaveBack: () => myFunction(),
    });

    function myFunction() {
        elementFirst.classList.toggle('sticky_head');
    }

    var scene = $(".js-parallax-scene").get(0);
    var parallaxInstance = new Parallax(scene);
});

jQuery(window).on('load', function () {
    $('body').removeClass('body-fixed');

    //activating tab of filter
    let targets = document.querySelectorAll(".filter");
    let activeTab = 0;
    let old = 0;
    let dur = 0.4;
    let animation;

    for (let i = 0; i < targets.length; i++) {
        targets[i].index = i;
        targets[i].addEventListener("click", moveBar);
    }

    // initial position on first === All 
    gsap.set(".filter-active", {
        x: targets[0].offsetLeft,
        width: targets[0].offsetWidth
    });

    function moveBar() {
        if (this.index != activeTab) {
            if (animation && animation.isActive()) {
                animation.progress(1);
            }
            animation = gsap.timeline({
                defaults: {
                    duration: 0.4
                }
            });
            old = activeTab;
            activeTab = this.index;
            animation.to(".filter-active", {
                x: targets[activeTab].offsetLeft,
                width: targets[activeTab].offsetWidth
            });

            animation.to(targets[old], {
                color: "#0d0d25",
                ease: "none"
            }, 0);
            animation.to(targets[activeTab], {
                color: "#fff",
                ease: "none"
            }, 0);

        }
    }
});
