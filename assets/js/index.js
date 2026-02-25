document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("dessert-container");

    fetch("/assets/data/desserts.json")
        .then(response => response.json())
        .then(data => {
            renderDesserts(data.items, data.currency);
        })
        .catch(error => {
            console.error("Ошибка загрузки JSON:", error);
            container.innerHTML = "<p>Не удалось загрузить товары.</p>";
        });

    function renderDesserts(items, currency) {
        container.innerHTML = "";

        items.forEach(item => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <img src="${item.image}" alt="${item.name}" loading="lazy">
                <h3>${item.name}</h3>
                <p class="description">${item.description}</p>
                <p class="calories">Калорийность: ${item.calories} ккал</p>
                <p class="price">${item.price} ${currency}</p>
                <p class="stock ${item.in_stock ? "available" : "unavailable"}">
                    ${item.in_stock ? "В наличии" : "Нет в наличии"}
                </p>
                <button ${item.in_stock ? "" : "disabled"}>
                    ${item.in_stock ? "Добавить в корзину" : "Недоступно"}
                </button>
            `;

            container.appendChild(card);
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {

    const slider = document.getElementById("articlesSlider");

    fetch("/assets/data/articles.json")
        .then(response => response.json())
        .then(data => {

data.forEach(article => {
    const card = document.createElement("article");
    card.classList.add("article-card");

    // посилання веде на детальну сторінку новини
    card.innerHTML = `
        <a href="/assets/pages/article.html?slug=${article.slug}">
            <div class="card-image">
                <img src="${article.image}" alt="${article.title}">
            </div>
            <div class="card-content">
                <span class="card-category">${article.category}</span>
                <h3>${article.title}</h3>
                <p>${article.excerpt}</p>
                <time datetime="${article.date}">
                    ${new Date(article.date).toLocaleDateString('uk-UA')}
                </time>
            </div>
        </a>
    `;

    slider.appendChild(card);
});

            initAutoSlider(slider);
        });

    // Функція автопрокрутки
    function initAutoSlider(slider) {
        let scrollAmount = 0;
        const scrollStep = 300; // ширина однієї картки
        const delay = 3000; // час між прокрутками у мс

        const interval = setInterval(() => {
            if (scrollAmount >= slider.scrollWidth - slider.clientWidth) {
                scrollAmount = 0; // повернення на початок
            } else {
                scrollAmount += scrollStep;
            }
            slider.scrollTo({ left: scrollAmount, behavior: 'smooth' });
        }, delay);
    }

    // Кнопки навігації
    document.querySelector(".next").addEventListener("click", () => {
        slider.scrollBy({ left: 300, behavior: "smooth" });
    });

    document.querySelector(".prev").addEventListener("click", () => {
        slider.scrollBy({ left: -300, behavior: "smooth" });
    });

});
document.getElementById("contactForm")?.addEventListener("submit", function (e) {
    e.preventDefault();

    const status = document.getElementById("contactStatus");
    status.innerHTML = "Дякуємо! Ваше повідомлення надіслано. Ми зв'яжемося з вами найближчим часом.";

    this.reset();
});
