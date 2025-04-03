document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carousel-images");
    let images = Array.from(carousel.children);
    const totalImages = images.length;
    let currentIndex = 1; // Inicia no primeiro slide real

    // Clona a primeira e a última imagem para criar o efeito de loop infinito
    function cloneImages() {
        const firstClone = images[0].cloneNode(true);
        const lastClone = images[totalImages - 1].cloneNode(true);

        // Adiciona a cópia no início e no final
        carousel.appendChild(firstClone); // Clone da primeira no final
        carousel.insertBefore(lastClone, images[0]); // Clone da última no início

        // Atualiza a lista de imagens
        images = Array.from(carousel.children);

        // Ajusta a posição inicial para ignorar o clone do final
        carousel.style.transform = `translateX(${-currentIndex * 100}%)`;
    }

    function showSlide(index, instant = false) {
        carousel.style.transition = instant ? "none" : "transform 0.5s ease-in-out";
        carousel.style.transform = `translateX(${-index * 100}%)`;
    }

    function nextSlide() {
        currentIndex++;
        showSlide(currentIndex);

        // Se chegou no clone da primeira imagem, volta para a primeira real sem transição
        if (currentIndex === images.length - 1) {
            setTimeout(() => {
                carousel.style.transition = "none";
                currentIndex = 1;
                showSlide(currentIndex, true);
            }, 500);
        }
    }

    function prevSlide() {
        currentIndex--;
        showSlide(currentIndex);

        // Se chegou no clone da última imagem, volta para a última real sem transição
        if (currentIndex === 0) {
            setTimeout(() => {
                carousel.style.transition = "none";
                currentIndex = images.length - 2;
                showSlide(currentIndex, true);
            }, 500);
        }
    }

    // Inicializa o carrossel
    cloneImages();

    // Define a rotação automática a cada 4 segundos
    let autoSlide = setInterval(nextSlide, 4000);

    document.querySelector(".next").addEventListener("click", function () {
        clearInterval(autoSlide);
        nextSlide();
        autoSlide = setInterval(nextSlide, 4000);
    });

    document.querySelector(".prev").addEventListener("click", function () {
        clearInterval(autoSlide);
        prevSlide();
        autoSlide = setInterval(nextSlide, 4000);
    });
});
