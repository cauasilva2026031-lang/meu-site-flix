// =====================================
// MAXXFLIX - API.JS
// =====================================

const API_KEY = "5177d85911655b20a5f8203aec57c6d2";

const API_URL = "https://api.themoviedb.org/3";

const IMAGE = "https://image.tmdb.org/t/p/w500";

const BACKDROP = "https://image.tmdb.org/t/p/original";

const LANG = "pt-BR";

// =====================================
// REQUISIÇÃO GENÉRICA
// =====================================

async function request(endpoint){

    try{

        const response = await fetch(
            `${API_URL}${endpoint}?api_key=${API_KEY}&language=${LANG}`
        );

        if(!response.ok){

            throw new Error("Erro na API");

        }

        return await response.json();

    }catch(error){

        console.error(error);

        return null;

    }

}

// =====================================
// BUSCA COM QUERY
// =====================================

async function requestSearch(endpoint,query){

    try{

        const response = await fetch(
            `${API_URL}${endpoint}?api_key=${API_KEY}&language=${LANG}&query=${encodeURIComponent(query)}`
        );

        return await response.json();

    }catch(error){

        console.error(error);

        return null;

    }

}

// =====================================
// FILMES POPULARES
// =====================================

async function filmesPopulares(){

    return await request("/movie/popular");

}

// =====================================
// EM ALTA
// =====================================

async function emAlta(){

    return await request("/trending/movie/week");

}

// =====================================
// TOP RATED
// =====================================

async function topRated(){

    return await request("/movie/top_rated");

}

// =====================================
// LANÇAMENTOS
// =====================================

async function lancamentos(){

    return await request("/movie/now_playing");

}

// =====================================
// SÉRIES
// =====================================

async function series(){

    return await request("/tv/popular");

}

// =====================================
// BUSCA
// =====================================

async function pesquisar(texto){

    return await requestSearch("/search/multi",texto);

}

// =====================================
// DETALHES
// =====================================

async function detalhes(id,tipo="movie"){

    return await request(`/${tipo}/${id}`);

}

// =====================================
// TRAILER
// =====================================

async function trailer(id,tipo="movie"){

    return await request(`/${tipo}/${id}/videos`);

}

// =====================================
// ELENCO
// =====================================

async function elenco(id,tipo="movie"){

    return await request(`/${tipo}/${id}/credits`);

}

// =====================================
// RECOMENDAÇÕES
// =====================================

async function recomendacoes(id,tipo="movie"){

    return await request(`/${tipo}/${id}/recommendations`);

}

// =====================================
// IMAGENS
// =====================================

function poster(path){

    if(!path){

        return "https://placehold.co/500x750?text=Sem+Imagem";

    }

    return IMAGE + path;

}

function backdrop(path){

    if(!path){

        return "";

    }

    return BACKDROP + path;

}
