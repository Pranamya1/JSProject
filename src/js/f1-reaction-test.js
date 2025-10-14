// best score (null b'coz if null = 0 the best score will always be zero)
let bestScore = null;

// function to start game (change screen) after user starts playing
function startReactionTest() {
  // div where screen changes
  const reactionTestContainer = document.getElementById(
    "reaction-test-container"
  );
  // changing screen
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
   `;
  //  start the game after changing the screen
  backmakerScreen();
}

// function to start test
function startingTest() {
  // ramdom timeings
  const delay = [
    720, 1040, 1180, 1290, 1460, 1630, 1750, 1880, 2030, 2170, 2290, 2440, 2580,
    2690, 2770, 2830, 2890, 2930, 2970, 3000,
  ];

  // random function generates a random number from 0 - 19 which acts as the index number for delay array and
  // chooses the time to turn lights green after all lights are red
  let randomTime = delay[Math.floor(Math.random() * delay.length)];

  // selecting all 5 lights via .lights class to change querry selector liberary function
  const lights = document.querySelectorAll(".lights");

  // turning lights red one by one using set time out lib function
  // delaying the turning red of first light by .7 sec
  setTimeout(() => {
    for (let i = 0; i < lights.length; i++) {
      setTimeout(() => {
        lights[i].style.backgroundColor = "red";
      }, 1000 * i);
    }
  }, 700);

  // detecting if user clicks b4 turning all lights to green
  // activating and deactivating addeventlistener to detect jump start
  for (let i = 0; i < lights.length; i++) {
    setTimeout(() => {
      function earlyClick() {
        // if jump start direct towards the jump start screen
        jumpStartScr();
      }

      // activateing eventlistener
      document.addEventListener("click", earlyClick);

      // to detect the jump start after all lights went red
      const removeDelay = (i === lights.length - 1) ? randomTime : 1000;

      // deactivate listener after removeDelay
      setTimeout(() => {
        document.removeEventListener("click", earlyClick);
      }, removeDelay);
    }, 1000 * i);
  }

  // stating to record time to measure score in ms
  let reactionStartTime;

  // calculating reaction time && turning lights green
  setTimeout(() => {

    // turning all lights green at once

    lights.forEach((light) => (light.style.backgroundColor = "green"));

    // using performance.now to record precise time in ms 
    reactionStartTime = performance.now();

    // detect click after green
    document.addEventListener("click", function handleClick() {

      // ending reaction time after detecting a click after lights are green
      const reactionEndTime = performance.now();

      // calculating the time 
      const reaction = Math.floor(reactionEndTime - reactionStartTime);

      // update current score after calculating the score
      document.getElementById("current-score").innerText = `Current Score: ${reaction} ms`;

      // if current score is less than previous best score is updated to current score or
      // if user is playing for first time it will be null
      if (bestScore === null || reaction < bestScore) {
        bestScore = reaction;
        document.getElementById("best-score").innerText = `Best Score: ${bestScore} ms`;
      }

      if (reaction <= 200) {
        poleScreen(reaction)
      }
      else if (reaction <= 400) {
        midFieldScreen(reaction)
      }
      else {
        backmakerScreen(reaction)
      }

      // removing eventlistener
      document.removeEventListener("click", handleClick);
    });
  }, randomTime + 5000);
}

// function for jump screen
function jumpStartScr() {

  // showing jumpstart screen on reaction-test-container
  const reactionTestContainer = document.getElementById(
    "reaction-test-container"
  );
  reactionTestContainer.innerHTML = `
        <div class="clicked-early">
            <p>Jump Start :(</p>
        </div>`;
        // showes jump start screen for 1 sec and then restarts the game
  setTimeout(() => {
    // restarts
    startReactionTest()
  }, 1000)
}

// if user wants to stop playing
function stopPlaying() {
  const reactionTestContainer = document.getElementById(
    "reaction-test-container"
  );
  reactionTestContainer.innerHTML = `
       <div class="reaction-test-container" id="reaction-test-container">
                <!-- instructions -->
                <div class="test-instructions">
                    <p>
                        Click the "Start Test" button to begin. When "Red" light turn "Green", click as quickly as
                        possible to measure your reaction time. Try to beat your best score!
                    </p>
                </div>

                <!-- start btn container -->
                <div class="test-start_btn-container">
                    <!-- start btn -->
                    <button onclick="startReactionTest()">Start Test</button>
                </div>

                <!-- show light area -->
                <div class="show_light_area">
                    <!-- lights -->
                    <div class="lights"></div>
                    <div class="lights"></div>
                    <div class="lights"></div>
                    <div class="lights"></div>
                    <div class="lights"></div>
                </div>
            </div>
    `;
}

function poleScreen(reaction) {
  console.log("Pole position");
    // div where screen changes
  const reactionTestContainer = document.getElementById(
    "reaction-test-container");

    reactionTestContainer.innerHTML = `
      <div class="pole-screen">
        <div class="pole-screen-overlay">
          <div class="pole-title"><h1>Pole Position</h1>
            <p>Current score: ${reaction}</p><div>
          </div>
          <div class="pole-btns">
            <button onclick="startReactionTest()">Play Again</button>
            <button onclick="stopPlaying()">Back</button>
          </div>
        </div>
      </div>
    `
}

function midFieldScreen(reaction) {
  // div where screen changes
  const reactionTestContainer = document.getElementById(
    "reaction-test-container");

    reactionTestContainer.innerHTML = `
      <div class="pole-screen">
        <div class="pole-screen-overlay">
          <div class="pole-title"><h1>Mid Field Runner</h1>
            <p>Current score: ${reaction}</p><div>
          </div>
          <div class="pole-btns">
            <button onclick="startReactionTest()">Play Again</button>
            <button onclick="stopPlaying()">Back</button>
          </div>
        </div>
      </div>
    `
}

function backmakerScreen(reaction) {
  // div where screen changes
  const reactionTestContainer = document.getElementById(
    "reaction-test-container");

    reactionTestContainer.innerHTML = `
      <div class="pole-screen">
        <div class="pole-screen-overlay">
          <div class="pole-title"><h1>Back Maker</h1>
            <p>Current score: ${reaction}</p><div>
          </div>
          <div class="pole-btns">
            <button onclick="startReactionTest()">Play Again</button>
            <button onclick="stopPlaying()">Back</button>
          </div>
        </div>
      </div>
    `
}
 