function startRps() {
  const rpsContainer = document.getElementById("rps-container");

  // Replace content when Start button is clicked
  rpsContainer.innerHTML = `
    <div class="rps-container">
      <!-- Instructions -->
      <div class="rps-instructions" id="rps-result">
        <p>Click any one of "Rock", "Paper", or "Scissor".</p>
      </div>

      <div class="rps-show-box-container">
        <div class="rps-show-box">
          <div class="rps-show-box-title">You</div>
          <div class="rps-show-box-img" id="player-choice">❔</div>
        </div>

        <h1>Vs</h1>

        <div class="rps-show-box">
          <div class="rps-show-box-title">Opponent</div>
          <div class="rps-show-box-img" id="opponent-choice">❔</div>
        </div>
      </div>

      <div class="rps-selection-container">
        <button class="rps-selection-box" onclick="chooseNShow('✊')">✊</button>
        <button class="rps-selection-box" onclick="chooseNShow('✋')">✋</button>
        <button class="rps-selection-box" onclick="chooseNShow('✌️')">✌️</button>
      </div>

      <div class="rps-btn">
        <button onclick="startRps()">Play Again</button>
        <button onclick="back()">Back</button>
      </div>
    </div>
  `;
}

function chooseNShow(playerChoice) {
  const rps = ["✊", "✋", "✌️"];
  const opponentChoice = rps[Math.floor(Math.random() * 3)];

  // Display both choices
  document.getElementById("player-choice").innerText = playerChoice;
  document.getElementById("opponent-choice").innerText = opponentChoice;

  // Determine result
  let result;
  if (playerChoice === opponentChoice) {
    result = "It's a Draw 😐";
  } else if (
    (playerChoice === "✊" && opponentChoice === "✌️") ||
    (playerChoice === "✋" && opponentChoice === "✊") ||
    (playerChoice === "✌️" && opponentChoice === "✋")
  ) {
    result = "You Win 🎉";
  } else {
    result = "You Lose 😢";
  }

  // Show result
  document.getElementById("rps-result").innerText = result;

  // Disable buttons after choosing
  const buttons = document.querySelectorAll(".rps-selection-box");
  buttons.forEach(btn => (btn.disabled = true));
}

function back() {
    const rpsContainer = document.getElementById("rps-container");
    rpsContainer.innerHTML = `
         <div class="rps-container" id="rps-container">
                <!-- instructions -->
                <div class="rps-instructions">
                    <p>
                        Click start button and choose any one of "Rock", "Paper", "Scissor" in time.
                    </p>
                </div>
                <div class="rps-show-box-container">
                    <div class="rps-show-box">
                        <div class="rps-show-box-title">You</div>
                        <div class="rps-show-box-img"></div>
                    </div>
                    <h1>Vs</h1>
                    <div class="rps-show-box">
                        <div class="rps-show-box-title">Opponent</div>
                        <div class="rps-show-box-img"></div>
                    </div>
                </div>
                <div class="rps-start-btn-container">
                    <button onclick="startRps()">Start</button>
                </div>
            </div>
    `
}