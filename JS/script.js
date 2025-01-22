// Kezdő diakép index beállítása és megjelenítése
let slideIndex = 1; // Az első diakép indexe
showSlides(slideIndex); // Az első diakép megjelenítése

// Diakép váltása navigációs gombokkal
function plusSlides(n) { // n: a diaképek számának növelése vagy csökkentésének paramétere, amely értéket a gomb kattintásakor kap 1 vagy -1 értéket vehet fel.
    showSlides(slideIndex += n); // Az aktuális diakép indexének növelése vagy csökkentése
}

// Diaképek megjelenítése
function showSlides(n) { // n: a diakép indexe
    // Az összes diakép kiválasztása
    let slides = document.querySelectorAll(".mySlides");
    
    // Ellenőrizd, hogy vannak-e diaképek, ha nincsenek, ne csinálj semmit
    if (slides.length === 0) return;
    
    // Ha a diakép index nagyobb, mint a diaképek száma, állítsd vissza az indexet 1-re
    if (n > slides.length) {
        slideIndex = 1;
        n = slideIndex;
    }
    
    // Ha a diakép index kisebb, mint 1, állítsd az indexet a diaképek számának megfelelően
    if (n < 1) {
        slideIndex = slides.length;
        n = slides.length;
    }
    
    // Az összes diakép elrejtése
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    // Az aktuális diakép megjelenítése
    slides[slideIndex-1].style.display = "block";
}
// eseménykezelők hozzáadása a különböző funkciókhoz
document.addEventListener('DOMContentLoaded', function() {
    initModal(); // felugró modal ablak inicializálása
    initForms(); // Űrlapok inicializálása
    initCategoryButtons(); // Kategória gombok inicializálása
    checkUrlParams(); // URL paraméterek ellenőrzése
    startAutoSlide();   // Automatikus diavetítés indítása
});

function initModal() {
    const modal = document.getElementById('modal');
    const loginBtn = document.querySelector('.login-btn');
    const closeBtn = document.querySelector('.close-btn');

    loginBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
}

function initForms() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');

    showRegister.addEventListener('click', () => {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    });

    showLogin.addEventListener('click', () => {
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
    });
}

function initCategoryButtons() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const productBoxes = document.querySelectorAll('.product-box');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            console.log(`Selected category: ${category}`); // Debug log
            
            productBoxes.forEach(box => {
                console.log(`Product box classes: ${box.classList}`); // Debug log
                if (category === 'all' || box.classList.contains(category)) {
                    box.style.display = 'block';
                } else {
                    box.style.display = 'none';
                }
            });
            
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
}

function checkUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
        const categoryButton = document.querySelector(`.category-btn[data-category="${categoryParam}"]`);
        if (categoryButton) {
            categoryButton.click();
        }
    }
}

function startAutoSlide() {
    function autoSlide() {
        plusSlides(1);
    }
    setInterval(autoSlide, 5000);
}

