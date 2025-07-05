<script>
  function scrollToGames() {
    document.getElementById('games').scrollIntoView({ behavior: 'smooth' });
  }

  // Carrega jogos da API
  window.onload = () => {
    const gameContainer = document.getElementById("game-container");
    const loadingMessage = document.querySelector('.games-api h2');

    loadingMessage.textContent = "Carregando jogos...";

    fetch('/api/v1/jogos.php') // Substitua pela URL real da sua API
      .then(response => {
        if (!response.ok) {
          throw new Error("Erro ao carregar jogos.");
        }
        return response.json();
      })
      .then(data => {
        if (!data.status || !Array.isArray(data.data)) {
          throw new Error("Formato da resposta inválido.");
        }

        gameContainer.innerHTML = ""; // Limpa placeholder

        data.data.forEach(game => {
          const div = document.createElement("div");
          div.className = "game-item";
          div.innerHTML = `
            <a href="${game.url_jogo}" target="_blank">
              <img src="${game.imagem}" alt="${game.nome}">
              <div class="game-title">${game.nome}</div>
            </a>
          `;
          gameContainer.appendChild(div);
        });

        loadingMessage.textContent = "Jogos Disponíveis";
      })
      .catch(error => {
        console.error(error);
        loadingMessage.textContent = "Erro ao carregar jogos.";
        gameContainer.innerHTML = "<p>Desculpe, não foi possível carregar os jogos.</p>";
      });
  };
</script>