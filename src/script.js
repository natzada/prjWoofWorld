// Carrossel de imagens (#home)
const slider = document.querySelector('.slider');
const slideContent = document.querySelector('.slide-content');
const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');
const radioButtons = document.querySelectorAll('.slide-content input[type="radio"]');
const manualButtons = document.querySelectorAll('.nav-manual .manual-btn');
const autoButtons = document.querySelectorAll('.nav-auto div');
let slideIndex = 0; // Índice baseado em 0 para facilitar cálculos
const totalSlides = 5;

// Função para atualizar o slide atual
function updateSlide() {
    if (!slideContent) {
        console.error('Elemento .slide-content não encontrado.');
        return;
    }
    // Atualiza a posição do carrossel
    slideContent.style.transform = `translateX(-${slideIndex * 20}%)`;

    // Atualiza o botão de rádio
    const radio = radioButtons[slideIndex];
    if (radio) {
        radio.checked = true;
    } else {
        console.error(`Botão de rádio para slide ${slideIndex + 1} não encontrado.`);
    }

    // Atualiza os indicadores automáticos
    autoButtons.forEach((btn, index) => {
        btn.classList.toggle('active', index === slideIndex);
    });
}

// Função para ir ao próximo slide
function nextSlide() {
    slideIndex = (slideIndex + 1) % totalSlides;
    updateSlide();
}

// Função para ir ao slide anterior
function prevSlide() {
    slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
    updateSlide();
}

// Inicializa o carrossel
if (slider && slideContent && prevBtn && nextBtn && radioButtons.length === totalSlides && manualButtons.length === totalSlides && autoButtons.length === totalSlides) {
    updateSlide();

    // Adiciona eventos aos botões prev/next
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Adiciona eventos aos indicadores manuais
    manualButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            slideIndex = index;
            updateSlide();
        });
    });

    // Navegação automática
    let autoSlideInterval = setInterval(nextSlide, 5000);

    // Pausa a navegação automática ao interagir
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    slider.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(nextSlide, 5000);
    });
} else {
    console.error('Erro na inicialização do carrossel: um ou mais elementos não foram encontrados.');
    console.log({
        slider: !!slider,
        slideContent: !!slideContent,
        prevBtn: !!prevBtn,
        nextBtn: !!nextBtn,
        radioButtons: radioButtons.length,
        manualButtons: manualButtons.length,
        autoButtons: autoButtons.length
    });
}
// Carrossel de produtos (#products)
const productCarousel = document.querySelector('#products .carousel');
const productItems = document.querySelectorAll('#products .carousel-item');
const totalProductItems = productItems.length;
const productItemWidth = productItems[0].offsetWidth;
let productIndex = 3;

function setupProductCarousel() {
    const firstItems = Array.from(productItems).slice(0, 3);
    const lastItems = Array.from(productItems).slice(-3);

    lastItems.forEach(item => productCarousel.insertBefore(item.cloneNode(true), productItems[0]));
    firstItems.forEach(item => productCarousel.appendChild(item.cloneNode(true)));

    productCarousel.style.transform = `translateX(-${productIndex * productItemWidth}px)`;
}

function moveProductSlide(step) {
    productIndex += step;

    productCarousel.style.transition = 'transform 0.5s ease';
    productCarousel.style.transform = `translateX(-${productIndex * productItemWidth}px)`;

    productCarousel.addEventListener('transitionend', function resetProductPosition() {
        if (productIndex <= 2) {
            productIndex = totalProductItems + 2;
            productCarousel.style.transition = 'none';
            productCarousel.style.transform = `translateX(-${productIndex * productItemWidth}px)`;
        } else if (productIndex >= totalProductItems + 3) {
            productIndex = 3;
            productCarousel.style.transition = 'none';
            productCarousel.style.transform = `translateX(-${productIndex * productItemWidth}px)`;
        }
        productCarousel.removeEventListener('transitionend', resetProductPosition);
    }, { once: true });
}

setupProductCarousel();

document.querySelector('#products .next').addEventListener('click', () => moveProductSlide(1));
document.querySelector('#products .prev').addEventListener('click', () => moveProductSlide(-1));

// Carrossel de planos (#pet-plans)
let planSlideIndex = 0;
const planSlides = document.querySelector('#pet-plans .carousel-slides');
const totalPlanSlides = document.querySelectorAll('#pet-plans .slide').length;
const planDots = document.querySelectorAll('#pet-plans .dot');

function updatePlanSlide() {
    planSlides.style.transform = `translateX(-${planSlideIndex * 310}px)`;
    planDots.forEach(dot => dot.classList.remove('active'));
    planDots[planSlideIndex].classList.add('active');
}

document.querySelector('#pet-plans .next').addEventListener('click', () => {
    planSlideIndex = (planSlideIndex + 1) % totalPlanSlides;
    updatePlanSlide();
});

document.querySelector('#pet-plans .prev').addEventListener('click', () => {
    planSlideIndex = (planSlideIndex - 1 + totalPlanSlides) % totalPlanSlides;
    updatePlanSlide();
});

planDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        planSlideIndex = index;
        updatePlanSlide();
    });
});

setInterval(() => {
    planSlideIndex = (planSlideIndex + 1) % totalPlanSlides;
    updatePlanSlide();
}, 5000);

// Carrossel de feedbacks (#feedbacks)
let feedbackIndex = 0;
const feedbackCarousel = document.querySelector('#feedbacks .feedback-slides');
const feedbackSlides = document.querySelectorAll('#feedbacks .feedback-slide');
const totalFeedbackSlides = feedbackSlides.length;

function updateFeedbackSlide() {
    feedbackCarousel.style.transform = `translateX(-${feedbackIndex * 100}%)`;
    feedbackCarousel.style.transition = 'transform 0.5s ease-in-out';
}

function moveFeedbackSlide(step) {
    feedbackIndex = (feedbackIndex + step + totalFeedbackSlides) % totalFeedbackSlides;
    updateFeedbackSlide();
}

// Inicializa o carrossel
updateFeedbackSlide();

// Adiciona eventos aos botões
const feedbackNextBtn = document.querySelector('#feedbacks .feedback-nav button:last-child');
const feedbackPrevBtn = document.querySelector('#feedbacks .feedback-nav button:first-child');

if (feedbackNextBtn && feedbackPrevBtn) {
    feedbackNextBtn.addEventListener('click', () => moveFeedbackSlide(1));
    feedbackPrevBtn.addEventListener('click', () => moveFeedbackSlide(-1));
} else {
    console.error('Botões de navegação do carrossel de feedbacks não encontrados.');
}

