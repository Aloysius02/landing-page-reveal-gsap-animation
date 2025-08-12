const Collections = [
    "Urban Nomad",
    "Midnight Bloom",
    "Coastal Luxe",
    "Golden Hour Glam",
    "Desert Mirage",
    "Velvet Dreams",
    "Parisian Whisper",
    "Sapphire Nights",
    "Botanical Muse",
    "Celestial Couture",
    "Tropical Reverie",
    "Lunar Grace",
    "Crimson Dawn",
    "Arctic Glow",
    "Gilded Horizon",
    "Mystic Sands",
    "Ivory Serenity",
    "Wildflower Affair",
    "Spring Blossom",
    "Summer Solstice",
    "Autumn Ember",
    "Winter Frost",
    "Moonlit Mirage",
    "Harbor Breeze"
];
const Services = [
    "Evening Wear Tailoring",
    "Bespoke Suit Design",
    "Wardrobe Styling",
    "Fashion Illustration",
    "Fabric Sourcing",
    "Pattern Making",
    "Alterations & Repairs",
    "Runway Show Styling",
    "Costume Design",
    "Trend Forecasting",
    "Textile Printing",
    "Embroidery & Beading",
    "Lookbook Creation",
    "Accessories Design",
    "Luxury Garment Care",
    "Fabric Dyeing Services",
    "Wardrobe Makeover",
    "Style Profile Creation",
    "Plus-size Custom Design",
    "Pet Clothing Design",
    "Upcycling & Restyling",
    "Menswear Design",
    "Swimwear Design",
    "Outerwear Tailoring"
];

document.addEventListener("DOMContentLoaded", event => {
    gsap.registerPlugin(SplitText, CustomEase);

    CustomEase.create("custom", "0.9,0,0.1,1");

    function addGridImages() {
        for (let i = 1; i <= 9; i++) {
            const imgGrid = document.querySelector(".img-grid");

            // create an image container
            const div = document.createElement("div");

            // create img element
            const img = document.createElement("img");
            img.src = `images/img${i}.jpg`;

            //add special class to middle div
            if (i === 5) {
                div.classList.add("centerImg");
            }

            div.appendChild(img);
            imgGrid.appendChild(div);
        }
    }

    function addServicess() {
        const container = document.querySelector(".services");

        // Split Services array into two halves
        const half = Math.ceil(Services.length / 2);
        const firstHalf = Services.slice(0, half);
        const secondHalf = Services.slice(half);

        // Create first div and add the firstHalf into it
        //create and add title into the first div
        const div1 = document.createElement("div");
        const title = document.createElement("h3");
        title.classList.add("item");
        title.textContent = "Services";
        div1.appendChild(title);
        firstHalf.forEach(text => {
            const p = document.createElement("p");
            p.classList.add("item");
            p.textContent = text;
            div1.appendChild(p);
        });

        // Create second div and add the secondHalf into it
        const div2 = document.createElement("div");
        secondHalf.forEach(text => {
            const p = document.createElement("p");
            p.classList.add("item");
            p.textContent = text;
            div2.appendChild(p);
        });

        container.appendChild(div1);
        container.appendChild(div2);
    }

    function addCollections() {
        const container = document.querySelector(".collections");

        // Split collections array into two halves
        const half = Math.ceil(Collections.length / 2);
        const firstHalf = Collections.slice(0, half);
        const secondHalf = Collections.slice(half);

        // Create first div and add the firstHalf into it
        //create and add title into the first div
        const div1 = document.createElement("div");
        const title = document.createElement("h3");
        title.classList.add("item");
        title.textContent = "Collections";
        div1.appendChild(title);
        firstHalf.forEach(text => {
            const p = document.createElement("p");
            p.classList.add("item");
            p.textContent = text;
            div1.appendChild(p);
        });

        // Create second div and add the secondHalf into it
        const div2 = document.createElement("div");
        secondHalf.forEach(text => {
            const p = document.createElement("p");
            p.classList.add("item");
            p.textContent = text;
            div2.appendChild(p);
        });

        container.appendChild(div1);
        container.appendChild(div2);
    }

    function setInitialState() {
        gsap.set(".lists .item", {
            opacity: 0
        });
        gsap.set(".centerImg", {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            scale: 0.6
        });
        gsap.set(".hero-img", {
            opacity: 0
        });
    }

    function init() {
        addGridImages();
        addCollections();
        addServicess();
        setInitialState();
    }

    init();

    //image rotation
    function getRandom() {
        const images = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        // Shuffle using Fisher-Yates
        for (let i = images.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [images[i], images[j]] = [images[j], images[i]];
        }

        return images;
    }

    function startImageRotation() {
        const totalCycles = 44;
        const gridImages = document.querySelectorAll(".img-grid div img");
        const centerImg = document.querySelector(".centerImg img");

        for (let cycle = 0; cycle < totalCycles; cycle++) {
            const randomImages = getRandom();

            gsap.to(
                {},
                {
                    duration: 0,
                    delay: cycle * 0.25,
                    onComplete: () => {
                        gridImages.forEach((img, index) => {
                            //if it is at the last cycle and img is the center image
                            if (
                                cycle === totalCycles - 1 &&
                                img === centerImg
                            ) {
                                img.src = "images/img14.jpg";
                            } else {
                                img.src = `images/img${randomImages[index]}.jpg`;
                            }
                        });
                    }
                }
            );
        }
    }

    //animation
    function startAnimation() {
        const tl = gsap.timeline();

        const mediaQuery = window.matchMedia("(max-width: 1000px)");
        const isMobile = mediaQuery.matches;

        const boxes = document.querySelectorAll(".img-grid div");
        const boxesToAnimateOut = Array.from(boxes).filter((_, i) => i !== 4);

        const splitSlogan = SplitText.create(".slogan h2", {
            type: "chars"
        });
        const words = splitSlogan.chars;
        const leftPart = words.slice(0, 10);
        const rightPart = words.slice(-10);

        //loader animation
        tl.to(".loader h1", {
            backgroundPosition: "0% -50%",
            duration: 2,
            ease: "custom"
        })
            .to(".loader h1", {
                backgroundPosition: "0% -100%",
                duration: 2,
                delay: 0.5,
                ease: "custom"
            })
            .to(".loader h1", {
                scale: 0.8,
                duration: 1,
                ease: "custom"
            })
            .to(
                ".loader",
                {
                    opacity: 0,
                    duration: 1,
                    ease: "custom"
                },
                "<"
            );

        //about animation
        tl.to(
            ".centerImg",
            {
                scale: 1,
                duration: 1,
                ease: "custom",
                onComplete: () => {
                    //reveal images
                    const boxes = document.querySelectorAll(".img-grid div");
                    gsap.to(boxes, {
                        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                        duration: 2,
                        ease: "custom",
                        onComplete: () => {
                            //startImageRotation
                            startImageRotation();
                        }
                    });
                }
            },
            "<"
        )
            .to(
                ".collections .item",
                {
                    opacity: 0.4,
                    duration: 0,
                    stagger: 0.2
                },
                "<"
            )
            .to(
                ".services .item",
                {
                    opacity: 0.4,
                    duration: 0,
                    stagger: 0.2
                },
                "<"
            )
            .to(".collections .item", {
                opacity: 1,
                duration: 0,
                stagger: 0.2
            })
            .to(
                ".services .item",
                {
                    opacity: 1,
                    duration: 0,
                    stagger: 0.2
                },
                "<"
            )
            .to(".collections .item", {
                opacity: 0,
                duration: 0,
                stagger: 0.2
            })
            .to(
                ".services .item",
                {
                    opacity: 0,
                    duration: 0,
                    stagger: 0.2
                },
                "<"
            )
            .to(boxesToAnimateOut, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                duration: 2,
                ease: "custom"
            });

        //hero section animation
        tl.to(".bg-img", {
            opacity: 0,
            duration: 1,
            ease: "custom"
        })
            .to(
                ".centerImg",
                {
                    y: -30,
                    duration: 1,
                    ease: "custom"
                },
                "<"
            )
            .to(
                ".hero-img",
                {
                    y: -30,
                    duration: 0
                },
                "<"
            )
            .to(".hero-img", {
                opacity: 1,
                duration: 0.5
            })
            .to(".hero-img.left", {
                x: isMobile ? -100 : -200,
                duration: 1,
                ease: "custom"
            })
            .to(
                ".hero-img.right",
                {
                    x: isMobile ? 100 : 200,
                    duration: 1,
                    ease: "custom"
                },
                "<"
            )
            .to(".centerImg", {
                width: isMobile ? "120px" : "250px",
                height: "400px",
                duration: 1,
                ease: "custom"
            })
            .to(
                ".hero-img",
                {
                    width: isMobile ? "120px" : "250px",
                    height: "350px",
                    duration: 1,
                    ease: "custom"
                },
                "<"
            )
            .fromTo(
                leftPart,
                {
                    x: "-100vw"
                },
                {
                    x: 0,
                    duration: 1,
                    ease: "custom"
                }
            )
            .fromTo(
                rightPart,
                {
                    x: "100vw"
                },
                {
                    x: 0,
                    duration: 1,
                    ease: "custom"
                },
                "<"
            )
            .fromTo(
                ".logo",
                {
                    y: -100
                },
                {
                    y: 0,
                    duration: 1,
                    ease: "custom"
                },
                "<"
            )
            .fromTo(
                "nav li",
                {
                    y: -100
                },
                {
                    y: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: "custom"
                }
            )
            .fromTo(
                ".slogan button",
                {
                    scale: 0.7,
                    opacity: 0
                },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    ease: "bounce.out"
                }
            );
    }

    startAnimation();
});
