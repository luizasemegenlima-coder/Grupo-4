// CONTROLE DE FONTE
let tamanhoFonteAtual = 16;
const valorAdicionado = 2;
const valorSubtraido = 2;

const btnAumentaFonte = document.getElementById("btnAumentaTexto");
const btnDiminuiFonte = document.getElementById("btnDiminuiTexto");

if (btnAumentaFonte && btnDiminuiFonte) {
  btnAumentaFonte.addEventListener("click", aumentaFonte);
  btnDiminuiFonte.addEventListener("click", diminuiFonte);
}

function aumentaFonte() {
  if (tamanhoFonteAtual < 24) {
    tamanhoFonteAtual += valorAdicionado;
    document.documentElement.style.fontSize = `${tamanhoFonteAtual}px`;
  }
}

function diminuiFonte() {
  if (tamanhoFonteAtual > 12) {
    tamanhoFonteAtual -= valorSubtraido;
    document.documentElement.style.fontSize = `${tamanhoFonteAtual}px`;
  }
}

// SÍNTESE DE VOZ (LEITURA DA PÁGINA)
let lendo = false;
const btnLeitura = document.getElementById("btnVoz");
const btnPararVoz = document.getElementById("btnPararVoz");

if (btnLeitura) {
  btnLeitura.addEventListener("click", lerEmVozAlta);
}

if (btnPararVoz) {
  btnPararVoz.addEventListener("click", pararLeitura);
}

function lerEmVozAlta() {
  if (lendo) {
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
    } else {
      speechSynthesis.pause();
    }
    return;
  }

  const conteudo = document.querySelector("main");
  if (!conteudo) return;

  const texto = conteudo.innerText;
  const fala = new SpeechSynthesisUtterance(texto);

  fala.lang = "pt-BR";
  fala.rate = 1.0;
  fala.onend = finalizarLeitura;
  fala.onerror = finalizarLeitura;

  speechSynthesis.cancel();
  speechSynthesis.speak(fala);
  lendo = true;
}

function pararLeitura() {
  speechSynthesis.cancel();
  finalizarLeitura();
}

function finalizarLeitura() {
  lendo = false;
}

// GERENCIAMENTO DO MODAL
const btnAjuda = document.querySelector(".container-acoes .botao-ajuda");
const btnFechar = document.querySelector(".botao-fechar");
const modal = document.querySelector(".modal-fundo");

if (btnAjuda && btnFechar && modal) {
  btnAjuda.addEventListener("click", abreModal);
  btnFechar.addEventListener("click", fechaModal);

  // Fechar o modal ao clicar fora dele
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      fechaModal();
    }
  });
}

function abreModal() {
  modal.style.display = "block";
}

function fechaModal() {
  modal.style.display = "none";
}