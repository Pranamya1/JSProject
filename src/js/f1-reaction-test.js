let bestScore = null;

function startReactionTest() {
  const reactionTestContainer = document.getElementById(
    "reaction-test-container"
  );
  reactionTestContainer.innerHTML = `
        <div class="test-instructions" style="height: 20%;">
            <p>Wait for the lights to turn green, then click as fast as you can!</p>
        </div>
        <div class="test-area-container" id="test-area-container">
            <div class="test-area" id="test-area">
                <div class="lights" id="light"></div>
                <div class="lights" id="light"></div>
                <div class="lights" id="light"></div>
                <div class="lights" id="light"></div>
                <div class="lights" id="light"></div>
            </div>
            <div class="currant-score" id="current-score">Current Score: 0 ms</div>
        </div>
        <div class="try-again" id="try-again">
            <button onclick="randomDelay()">Try Again</button>
        </div>
    `;
  randomDelay();
}

function randomDelay() {
  const delay = [
    720, 1040, 1180, 1290, 1460, 1630, 1750, 1880, 2030, 2170, 2290, 2440, 2580,
    2690, 2770, 2830, 2890, 2930, 2970, 3000,
  ];

  let randomTime = delay[Math.floor(Math.random() * delay.length)];
  const lights = document.querySelectorAll(".lights");
  console.log(randomTime);
  // Turn lights red one by one
  for (let i = 0; i < lights.length; i++) {
    setTimeout(() => {
      setTimeout(() => {
        lights[i].style.backgroundColor = "red";
      }, 1000 * i);
    }, 1000);
  }

  //   if user clicked before green
  setTimeout(() => {
    document.addEventListener("click", function earlyClick() {
      const reactionTestContainer = document.getElementById(
        "reaction-test-container"
      );
      reactionTestContainer.innerHTML = `
        <div class="clicked-early">
            <p>Jump Start :(</p>
            <button onclick="startReactionTest()">Start Test</button>
        </div>`;
    });
  }, 1000);
  //   Record start time
  let reactionStartTime;

  // After all lights are red, after delay turn green
  // calculating reaction time
  setTimeout(() => {
    lights.forEach((light) => (light.style.backgroundColor = "green"));
    reactionStartTime = performance.now();

    // detect click after green
    document.addEventListener("click", function handleClick() {
      const reactionEndTime = performance.now();
      const reaction = Math.floor(reactionEndTime - reactionStartTime);

      // Update current score
      document.getElementById(
        "current-score"
      ).innerText = `Current Score: ${reaction} ms`;

      // Update best score
      if (bestScore === null || reaction < bestScore) {
        bestScore = reaction;
        document.getElementById(
          "best-score"
        ).innerText = `Best Score: ${bestScore} ms`;
      }

      document.removeEventListener("click", handleClick);
    });
  }, randomTime + 5000);
}

// setTimeout(() => {
//   console.log("This runs after 1 second");
// }, 3000); // 1000 ms = 1s