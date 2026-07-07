// ==================== ANIMAÇÃO DO TÍTULO ONDA ====================
const titulo = document.getElementById('titulo-bandas');

if (titulo) {
    const texto = titulo.textContent;
    titulo.innerHTML = '';
    
    [...texto].forEach((letra, index) => {
        const span = document.createElement('span');
        span.innerHTML = letra === ' ' ? '&nbsp;' : letra;
        span.style.setProperty('--i', index);
        titulo.appendChild(span);
    });
}

// ==================== LÓGICA DO SLIDER DINÂMICO ====================
const slides = document.querySelectorAll('.slide');
const sliderContainer = document.getElementById('bandas-slider');
let slideIndex = 0;
let sliderInterval;

// Função para mudar o slide ativo
function mostrarProximoSlide() {
    // Remove a classe active do slide atual
    slides[slideIndex].classList.remove('active');
    
    // Avança o índice e volta para 0 se chegar ao final da lista
    slideIndex = (slideIndex + 1) % slides.length;
    
    // Adiciona a classe active no novo slide
    slides[slideIndex].classList.add('active');
}

// Inicia o temporizador (2000ms = 2 segundos)
function iniciarSlider() {
    sliderInterval = setInterval(mostrarProximoSlide, 2000);
}

// Para o temporizador
function pararSlider() {
    clearInterval(sliderInterval);
}

// Executa as funções apenas se houver slides na página
if (slides.length > 0) {
    iniciarSlider();

    // Evento: Passar o mouse por cima -> Para a transição
    sliderContainer.addEventListener('mouseenter', pararSlider);

    // Evento: Tirar o mouse de cima -> Retoma a transição
    sliderContainer.addEventListener('mouseleave', iniciarSlider);
}