window.onload = function() {
    document.getElementById("start-button").onclick = function() {
      startGame();
      document.getElementById("start-button").style.display = "none";
    };
  
    function startGame() {
  //    document.getElementById("game-board").classList =[];
      const canvas = document.getElementById("game-canvas")
      const ctx = canvas.getContext("2d")
      const game = new Game(ctx)
      game.run()
    }
  };