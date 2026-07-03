// ==========================
// DETALHES.JS - PARTE 1
// ==========================

// Lê os parâmetros da URL
const params = new URLSearchParams(window.location.search);

const id = params.get("id");
const tipo = params.get("tipo") || "movie";

// Elementos da página
const banner = document.getElementById("banner");
const titulo = document.getElementById("titulo");
const descricao = document.getElementById("descricao");

const posterImg = document.getElementById("poster");
const nome = document.getElementById("nome");
const nota = document.getElementById("nota");
const data = document.getElementById("data");
const generos = document.getElementById("generos");
const sinopse = document.getElementById("sinopse");

// Dados do filme atual
let filmeAtual = null;

// ==========================
// CARREGAR DETALHES
// ==========================

window.onload = async () => {

    carregarDetalhes();

};

// ==========================
// BUSCAR DADOS
// ==========================

async function carregarDetalhes() {

    filmeAtual = await detalhes(id, tipo);

    if (!filmeAtual) {

        alert("Não foi possível carregar o filme.");

        return;

    }

    preencherTela();

}

// ==========================
// PREENCHER TELA
// ==========================

function preencherTela() {

    const tituloFilme =
        filmeAtual.title || filmeAtual.name;

    titulo.textContent = tituloFilme;

    nome.textContent = tituloFilme;

    descricao.textContent =
        filmeAtual.overview || "Sem descrição disponível.";

    sinopse.textContent =
        filmeAtual.overview || "Sem sinopse.";

    nota.textContent =
        filmeAtual.vote_average
            ? filmeAtual.vote_average.toFixed(1)
            : "-";

    data.textContent =
        filmeAtual.release_date ||
        filmeAtual.first_air_date ||
        "-";

    posterImg.src = poster(filmeAtual.poster_path);

    posterImg.alt = tituloFilme;

    banner.style.backgroundImage =
        `url(${backdrop(filmeAtual.backdrop_path)})`;

    // Gêneros
    if (filmeAtual.genres) {

        generos.textContent =
            filmeAtual.genres
                .map(g => g.name)
                .join(", ");

    } else {

        generos.textContent = "-";

    }

}
// ==========================
// DETALHES.JS - PARTE 2
// ==========================

// Botões
const btnTrailer = document.getElementById("trailer");
const btnFavorito = document.getElementById("favorito");
const elencoDiv = document.getElementById("elenco");

// ==========================
// CARREGAR TRAILER
// ==========================

async function carregarTrailer() {

    const dados = await trailer(id, tipo);

    if (!dados || !dados.results || dados.results.length === 0) {

        btnTrailer.disabled = true;
        btnTrailer.innerText = "Trailer indisponível";
        return;

    }

    const video =
        dados.results.find(v => v.site === "YouTube")
        || dados.results[0];

    btnTrailer.onclick = () => {

        window.open(
            `https://www.youtube.com/watch?v=${video.key}`,
            "_blank"
        );

    };

}

// ==========================
// CARREGAR ELENCO
// ==========================

async function carregarElenco() {

    const dados = await elenco(id, tipo);

    if (!dados || !dados.cast) return;

    elencoDiv.innerHTML = "";

    dados.cast.slice(0, 12).forEach(ator => {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <img src="${
                ator.profile_path
                ? poster(ator.profile_path)
                : "assets/no-image.png"
            }">

            <div class="info">

                <h3>${ator.name}</h3>

                <p>${ator.character || ""}</p>

            </div>
        `;

        elencoDiv.appendChild(card);

    });

}

// ==========================
// FAVORITOS
// ==========================

btnFavorito.onclick = () => {

    let favoritos =
        JSON.parse(localStorage.getItem("favoritos")) || [];

    const existe =
        favoritos.find(f => f.id == filmeAtual.id);

    if (existe) {

        alert("Este título já está nos favoritos.");

        return;

    }

    favoritos.push({

        id: filmeAtual.id,

        tipo: tipo,

        titulo: filmeAtual.title || filmeAtual.name,

        poster: filmeAtual.poster_path,

        nota: filmeAtual.vote_average

    });

    localStorage.setItem(
        "favoritos",
        JSON.stringify(favoritos)
    );

    alert("Adicionado aos favoritos!");

};

// ==========================
// CHAMADAS
// ==========================

carregarTrailer();

carregarElenco();
// ==========================
// DETALHES.JS - PARTE 3
// ==========================

const relacionadosDiv = document.getElementById("relacionados");

// ==========================
// CARREGAR RECOMENDAÇÕES
// ==========================

async function carregarRelacionados() {

    const dados = await recomendacoes(id, tipo);

    if (!dados || !dados.results) {

        relacionadosDiv.innerHTML =
            "<p>Nenhuma recomendação encontrada.</p>";

        return;

    }

    relacionadosDiv.innerHTML = "";

    dados.results.slice(0, 12).forEach(item => {

        if (!item.poster_path) return;

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

            window.location =
                `detalhes.html?id=${item.id}&tipo=${tipo}`;

        };

        relacionadosDiv.appendChild(card);

    });

}

// ==========================
// INICIALIZAÇÃO
// ==========================

window.addEventListener("load", () => {

    carregarRelacionados();

});

// ==========================
// ROLAR AO TOPO
// ==========================

window.scrollTo({

    top: 0,

    behavior: "smooth"

});

// ==========================
// LOG
// ==========================

console.log("Página de detalhes carregada com sucesso.");
