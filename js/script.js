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

// ==================== LÓGICA DO MODAL DE RETENÇÃO (EXIT INTENT) ====================
const modal = document.getElementById('modal-retencao');
const btnFecharX = document.getElementById('btn-fechar-modal');
const btnFicar = document.getElementById('btn-ficar');

// Função para abrir o modal
function abrirModal() {
    if (modal) {
        modal.classList.add('show');
    }
}

// Função para fechar o modal
function fecharModal() {
    if (modal) {
        modal.classList.remove('show');
    }
}

// Função que monitora a saída do mouse da tela
function dispararAoSair(event) {
    // event.clientY < 20 verifica se o cursor subiu além do topo da página (área das abas)
    if (event.clientY < 20) {
        // Verifica se o modal já foi exibido nesta sessão para não ser chato
        if (!localStorage.getItem('modalExibido')) {
            abrirModal();
            localStorage.setItem('modalExibido', 'true'); // Grava para aparecer só uma vez
            
            // Remove o monitoramento para o modal não tentar abrir de novo
            document.removeEventListener('mouseleave', dispararAoSair);
        }
    }
}

// Adiciona o monitoramento do mouse apenas se o modal não tiver sido exibido ainda
if (!localStorage.getItem('modalExibido')) {
    document.addEventListener('mouseleave', dispararAoSair);
}

// Ouvintes de eventos para fechar ao clicar nos botões
if (btnFecharX) btnFecharX.addEventListener('click', fecharModal);
if (btnFicar) btnFicar.addEventListener('click', fecharModal);

// Fecha o modal caso o usuário clique fora do quadrado do conteúdo (na parte escura)
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        fecharModal();
    }
});