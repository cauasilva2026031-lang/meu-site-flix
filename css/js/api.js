// ==========================
// CONFIGURAÇÃO DA API
// ==========================

const API_KEY = "5177d85911655b20a5f8203aec57c6d2";

const API = "https://api.themoviedb.org/3";

const IMG = "https://image.tmdb.org/t/p/original";

const IMG_SMALL = "https://image.tmdb.org/t/p/w500";

const LANG = "pt-BR";

// ==========================
// FUNÇÃO GENÉRICA
// ==========================

async function buscar(url){

    try{

        const resposta = await fetch(url);

        if(!resposta.ok){

            throw new Error("Erro na API");

        }

        return await resposta.json();

    }catch(erro){

        console.error(erro);

        return null;

    }

}

// ==========================
// FILMES POPULARES
// ==========================

async function filmesPopulares(){

    return await buscar(
        `${API}/movie/popular?api_key=${API_KEY}&language=${LANG}&page=1`
    );

}

// ==========================
// FILMES EM ALTA
// ==========================

async function emAlta(){

    return await buscar(
        `${API}/trending/movie/week?api_key=${API_KEY}&language=${LANG}`
    );

}

// ==========================
// MELHOR AVALIADOS
// ==========================

async function topRated(){

    return await buscar(
        `${API}/movie/top_rated?api_key=${API_KEY}&language=${LANG}`
    );

}

// ==========================
// SÉRIES
// ==========================

async function series(){

    return await buscar(
        `${API}/tv/popular?api_key=${API_KEY}&language=${LANG}`
    );

}

// ==========================
// BUSCA
// ==========================

async function pesquisar(texto){

    return await buscar(
        `${API}/search/multi?api_key=${API_KEY}&language=${LANG}&query=${encodeURIComponent(texto)}`
    );

}

// ==========================
// DETALHES
// ==========================

async function detalhes(id,tipo="movie"){

    return await buscar(
        `${API}/${tipo}/${id}?api_key=${API_KEY}&language=${LANG}`
    );

}

// ==========================
// TRAILER
// ==========================

async function trailer(id,tipo="movie"){

    return await buscar(
        `${API}/${tipo}/${id}/videos?api_key=${API_KEY}&language=${LANG}`
    );

}

// ==========================
// ELENCO
// ==========================

async function elenco(id,tipo="movie"){

    return await buscar(
        `${API}/${tipo}/${id}/credits?api_key=${API_KEY}&language=${LANG}`
    );

}

// ==========================
// GÊNEROS
// ==========================

async function generosFilme(){

    return await buscar(
        `${API}/genre/movie/list?api_key=${API_KEY}&language=${LANG}`
    );

}

// ==========================
// LANÇAMENTOS
// ==========================

async function lancamentos(){

    return await buscar(
        `${API}/movie/now_playing?api_key=${API_KEY}&language=${LANG}`
    );

}

// ==========================
// IMAGENS
// ==========================

function poster(caminho){

    if(!caminho){

        return "assets/no-image.png";

    }

    return IMG_SMALL + caminho;

}

function backdrop(caminho){

    if(!caminho){

        return "";

    }

    return IMG + caminho;

}
