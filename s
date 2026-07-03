<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MeuFlix - Catálogo Automático</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Arial', sans-serif;
        }

        body {
            background-color: #141414;
            color: #ffffff;
        }

        header {
            background-color: rgba(0, 0, 0, 0.85);
            padding: 20px 4%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: fixed;
            width: 100%;
            top: 0;
            z-index: 1000;
        }

        .logo {
            color: #E50914;
            font-size: 28px;
            font-weight: bold;
            text-transform: uppercase;
        }

        /* Barra de Pesquisa Automática */
        .busca-container {
            flex-grow: 0.5;
            text-align: right;
        }

        .busca-input {
            width: 80%;
            max-width: 300px;
            padding: 8px 12px;
            border-radius: 4px;
            border: 1px solid #333;
            background-color: #222;
            color: white;
            outline: none;
        }

        .conteudo {
            padding: 100px 4% 40px 4%;
        }

        .secao-titulo {
            font-size: 22px;
            margin-bottom: 20px;
            font-weight: bold;
            border-left: 4px solid #E50914;
            padding-left: 10px;
        }

        .grade-filmes {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 20px;
        }

        .filme-card {
            background-color: #2f2f2f;
            border-radius: 4px;
            overflow: hidden;
            cursor: pointer;
            transition: transform 0.3s ease;
        }

        .filme-card:hover {
            transform: scale(1.05);
        }

        .filme-capa {
            width: 100%;
            height: 250px;
            object-fit: cover;
        }

        .filme-info {
            padding: 12px;
        }

        .filme-titulo {
            font-size: 14px;
            font-weight: bold;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        /* Modal do Player */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.95);
            z-index: 2000;
            justify-content: center;
            align-items: center;
        }

        .modal-conteudo {
            width: 90%;
            max-width: 800px;
            position: relative;
        }

        .fechar-modal {
            position: absolute;
            top: -40px;
            right: 0;
            color: #fff;
            font-size: 30px;
            cursor: pointer;
            background: none;
            border: none;
        }

        .video-container {
            position: relative;
            padding-bottom: 56.25%;
            height: 0;
        }

        .video-container iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
        }
    </style>
</head>
<body>

    <header>
        <div class="logo">MeuFlix</div>
        <div class="busca-container">
            <!-- Pesquisa em tempo real -->
            <input type="text" id="campoBusca" class="busca-input" placeholder="Pesquisar filme ou série..." oninput="filtrarFilmes()">
        </div>
    </header>

    <main class="conteudo">
        <h2 class="secao-titulo" id="tituloPagina">Todos os Títulos</h2>
        <div class="grade-filmes" id="catalogo">
            <!-- O JavaScript vai construir os filmes aqui dentro sozinho -->
        </div>
    </main>

    <div id="meuModal" class="modal">
        <div class="modal-conteudo">
            <button class="fechar-modal" onclick="fecharPlayer()">&times;</button>
            <div class="video-container">
                <iframe id="videoPlayer" src="" allowfullscreen></iframe>
            </div>
        </div>
    </div>

    <script>
        // BANCO DE DADOS AUTOMÁTICO
        // Para adicionar novos filmes, basta copiar uma linha desta lista e mudar os dados
        const meusFilmes = [
            {
                titulo: "Big Buck Bunny",
                capa: "https://unsplash.com",
                video: "https://youtube.com"
            },
            {
                titulo: "Sintel (Animação)",
                capa: "https://unsplash.com",
                video: "https://youtube.com"
            },
            {
                titulo: "Tears of Steel",
                capa: "https://unsplash.com",
                video: "https://youtube.com"
            }
        ];

        // Função que renderiza os filmes na tela automaticamente
        function carregarCatalogo(listaDeFilmes) {
            const container = document.getElementById('catalogo');
            container.innerHTML = ""; // Limpa a tela

            if(listaDeFilmes.length === 0) {
                container.innerHTML = "<p style='color:#666;'>Nenhum título encontrado.</p>";
                return;
            }

            listaDeFilmes.forEach(filme => {
                // Cria a estrutura HTML do card dinamicamente
                const card = document.createElement('div');
                card.className = 'filme-card';
                card.setAttribute('onclick', `abrirPlayer('${filme.video}')`);
                
                card.innerHTML = `
                    <img class="filme-capa" src="${filme.capa}" alt="${filme.titulo}">
                    <div class="filme-info">
                        <div class="filme-titulo">${filme.titulo}</div>
                    </div>
                `;
                
                container.appendChild(card);
            });
        }

        // Sistema de busca automática
        function filtrarFilmes() {
            const termoBusca = document.getElementById('campoBusca').value.toLowerCase();
            const filmesFiltrados = meusFilmes.filter(filme => 
                filme.titulo.toLowerCase().includes(termoBusca)
            );
            carregarCatalogo(filmesFiltrados);
        }

        // Funções do Player
        function abrirPlayer(linkVideo) {
            document.getElementById('videoPlayer').src = linkVideo;
            document.getElementById('meuModal').style.display = 'flex';
        }

        function fecharPlayer() {
            document.getElementById('videoPlayer').src = '';
            document.getElementById('meuModal').style.display = 'none';
        }

        window.onclick = function(event) {
            let modal = document.getElementById('meuModal');
            if (event.target == modal) { fecharPlayer(); }
        }

        // Inicializa o site carregando a lista automática
        carregarCatalogo(meusFilmes);
    </script>
</body>
</html>
