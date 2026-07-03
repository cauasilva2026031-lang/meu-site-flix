// ==========================
// APP.JS - PARTE 1
// ==========================

// Elementos da página
const banner = document.getElementById("banner");
const bannerTitulo = document.getElementById("bannerTitulo");
const bannerDescricao = document.getElementById("bannerDescricao");

const trendingDiv = document.getElementById("trending");
const popularDiv = document.getElementById("popular");
const topRatedDiv = document.getElementById("topRated");
const seriesDiv = document.getElementById("series");

const campoBusca = document.getElementById("campoBusca");
const resultadoBusca = document.getElementById("resultadoBusca");
const buscaDiv = document.getElementById("busca");

// ==========================
// INICIALIZAÇÃO
// ==========================

window.onload = async () => {

    carregarBanner();

    carregarEmAlta();

    carregarPopulares();

    carregarTopRated();

    carregarSeries();

};

// ==========================
// BANNER
// ==========================

async function carregarBanner() {

    const dados = await emAlta();

    if (!dados || !dados.results) return;

    const filme =
        dados.results[Math.floor(Math.random() * dados.results.length)];

    banner.style.backgroundImage =
        `url(${backdrop(filme.backdrop_path)})`;

    bannerTitulo.innerText = filme.title;

    bannerDescricao.innerText =
        filme.overview || "Sem descrição disponível.";

}

// ==========================
// CRIAR CARD
// ==========================

function criarCard(item) {

    const card = document.createElement("div");

    card.className = "card";

    card.innerHTML = `
        <img src="${poster(item.poster_path)}">

        <div class="info">

            <h3>${item.title || item.name}</h3>

            <div class="nota">
                ⭐ ${item.vote_average.toFixed(1)}
            </div>

        </div>
    `;

    card.onclick = () => {

        const tipo = item.media_type || (item.title ? "movie" : "tv");

        window.location =
            `detalhes.html?id=${item.id}&tipo=${tipo}`;

    };

    return card;

}

// ==========================
// EM ALTA
// ==========================

async function carregarEmAlta() {

    const dados = await emAlta();

    if (!dados) return;

    trendingDiv.innerHTML = "";

    dados.results.forEach(item => {

        trendingDiv.appendChild(criarCard(item));

    });

}

// ==========================
// POPULARES
// ==========================

async function carregarPopulares() {

    const dados = await filmesPopulares();

    if (!dados) return;

    popularDiv.innerHTML = "";

    dados.results.forEach(item => {

        popularDiv.appendChild(criarCard(item));

    });

}

// ==========================
// TOP RATED
// ==========================

async function carregarTopRated() {

    const dados = await topRated();

    if (!dados) return;

    topRatedDiv.innerHTML = "";

    dados.results.forEach(item => {

        topRatedDiv.appendChild(criarCard(item));

    });

}

// ==========================
// SÉRIES
// ==========================

async function carregarSeries() {

    const dados = await series();

    if (!dados) return;

    seriesDiv.innerHTML = "";

    dados.results.forEach(item => {

        seriesDiv.appendChild(criarCard(item));

    });

}
// ==========================
// APP.JS - PARTE 2
// ==========================

// Pesquisa em tempo real
let tempoBusca;

campoBusca.addEventListener("input", () => {

    clearTimeout(tempoBusca);

    const texto = campoBusca.value.trim();

    if (texto.length === 0) {

        resultadoBusca.style.display = "none";

        buscaDiv.innerHTML = "";

        return;

    }

    tempoBusca = setTimeout(() => {

        pesquisarFilmes(texto);

    }, 500);

});

// ==========================
// PESQUISA
// ==========================

async function pesquisarFilmes(texto) {

    const dados = await pesquisar(texto);

    buscaDiv.innerHTML = "";

    resultadoBusca.style.display = "block";

    if (!dados || !dados.results) {

        buscaDiv.innerHTML = "<p>Nenhum resultado encontrado.</p>";

        return;

    }

    dados.results.forEach(item => {

        if (!item.poster_path) return;

        buscaDiv.appendChild(criarCard(item));

    });

}

// ==========================
// FAVORITOS
// ==========================

function obterFavoritos() {

    return JSON.parse(localStorage.getItem("favoritos")) || [];

}

function salvarFavoritos(lista) {

    localStorage.setItem("favoritos", JSON.stringify(lista));

}

function adicionarFavorito(item) {

    const favoritos = obterFavoritos();

    const existe = favoritos.find(f => f.id === item.id);

    if (existe) {

        alert("Este título já está nos favoritos.");

        return;

    }

    favoritos.push(item);

    salvarFavoritos(favoritos);

    alert("Adicionado aos favoritos!");

}

// ==========================
// BOTÃO ASSISTIR
// ==========================

const btnAssistir = document.getElementById("assistir");

if (btnAssistir) {

    btnAssistir.addEventListener("click", () => {

        alert("A reprodução não está implementada nesta demonstração.");

    });

}

// ==========================
// BOTÃO MAIS INFORMAÇÕES
// ==========================

const btnDetalhes = document.getElementById("detalhes");

if (btnDetalhes) {

    btnDetalhes.addEventListener("click", () => {

        const primeiro = document.querySelector(".card");

        if (primeiro) {

            primeiro.click();

        }

    });

}

// ==========================
// SCROLL SUAVE
// ==========================

document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", e => {

        e.preventDefault();

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

});
// ==========================
// APP.JS - PARTE 3
// ==========================

// Guarda o filme exibido no banner
let filmeBanner = null;

// Atualiza o banner
async function atualizarBanner() {

    const dados = await emAlta();

    if (!dados || !dados.results) return;

    filmeBanner =
        dados.results[Math.floor(Math.random() * dados.results.length)];

    banner.style.backgroundImage =
        `url(${backdrop(filmeBanner.backdrop_path)})`;

    bannerTitulo.textContent =
        filmeBanner.title || filmeBanner.name;

    bannerDescricao.textContent =
        filmeBanner.overview || "Sem descrição disponível.";
}

// ==========================
// ABRIR DETALHES DO BANNER
// ==========================

if (btnDetalhes) {

    btnDetalhes.onclick = () => {

        if (!filmeBanner) return;

        const tipo =
            filmeBanner.media_type || "movie";

        window.location =
            `detalhes.html?id=${filmeBanner.id}&tipo=${tipo}`;

    };

}

// ==========================
// ENTER NA PESQUISA
// ==========================

campoBusca.addEventListener("keydown", function(e){

    if(e.key === "Enter"){

        pesquisarFilmes(campoBusca.value);

    }

});

// ==========================
// LIMPAR PESQUISA
// ==========================

campoBusca.addEventListener("search", function(){

    if(this.value === ""){

        resultadoBusca.style.display = "none";

    }

});

// ==========================
// BOTÃO VOLTAR AO TOPO
// ==========================

const voltarTopo = document.createElement("button");

voltarTopo.innerHTML = "⬆";

voltarTopo.id = "voltarTopo";

document.body.appendChild(voltarTopo);

voltarTopo.style.position = "fixed";
voltarTopo.style.bottom = "20px";
voltarTopo.style.right = "20px";
voltarTopo.style.width = "50px";
voltarTopo.style.height = "50px";
voltarTopo.style.border = "none";
voltarTopo.style.borderRadius = "50%";
voltarTopo.style.cursor = "pointer";
voltarTopo.style.display = "none";
voltarTopo.style.fontSize = "20px";
voltarTopo.style.zIndex = "999";

window.addEventListener("scroll", ()=>{

    if(window.scrollY > 400){

        voltarTopo.style.display="block";

    }else{

        voltarTopo.style.display="none";

    }

});

voltarTopo.onclick=()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

};

// ==========================
// TRATAMENTO DE ERROS
// ==========================

window.addEventListener("error",(erro)=>{

    console.error("Erro:",erro);

});

// ==========================
// LOG
// ==========================

console.log("MaxxFlix iniciado com sucesso.");
