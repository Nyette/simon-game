$(document).ready(function() {
	
	// Variables

	let colors = ["blue", "green", "red", "yellow"];

	let gameStarted = false;
	
	let level = 0;
	
	let gameSequence = [];
	
	let userSequence = [];

	// Get Random Color

	function getRandomInt(max) {
		let randomInt = Math.floor(Math.random() * max);
		return randomInt;
	}
	
	function getRandomColor(colors) {
		let randomIdx = getRandomInt(colors.length);
		let randomColor = colors[randomIdx];
		return randomColor;
	}

	// Create Buttons

	function createButtons(colors) {
		for (let color of colors) {
			let div = document.createElement("div");
			div.id = color;
			div.className = "btn";
			div.style.backgroundColor = color;
			$(".container").append(div);
		}
	}

	createButtons(colors);

	// Button Effects
	
	function playAudio(color) {
		new Audio(`audio/${color}.mp3`).play();
	}

	function animatePress(color) {
		let btn = $(`#${color}`);
		btn.toggleClass("pressed");
		setTimeout(function() {
			btn.toggleClass("pressed");
		}, 100);
	}

	function handleButton(color) {
		playAudio(color);
		animatePress(color);
	}

	function handleNewLevel() {
		level++;
		$("#level-title").text(`Level ${level}`);
		userSequence = [];
		let newColor = getRandomColor(colors);
		gameSequence.push(newColor);
		setTimeout(function() {
			handleButton(newColor);
		}, 300);
	}

	function handleGameOver() {
		$(".container").toggleClass("hidden");
		new Audio("audio/wrong.mp3").play();
		$("#level-title").text("Game Over");
	}

	function handleReplay() {
		setTimeout(function() {
			$("#level-title").text("Replay");
		}, 1500);
		$("#level-title").click(function() {
			location.reload();
		})
	}

	function checkInput(currentLevel) {
		if (userSequence[currentLevel] === gameSequence[currentLevel]) {
			if (userSequence.length === gameSequence.length) {
				setTimeout(function() {
					handleNewLevel();
				}, 1000);
			}
		} else {
			handleGameOver();
			handleReplay();
		}
	}

	function getInput() {
		$(".btn").click(function(e) {
			userSequence.push(e.target.id);
			handleButton(e.target.id);
			checkInput(userSequence.length - 1);
		})
	}

	$("#level-title").click(function() {
		if (!gameStarted) {
			gameStarted = true;
			$(".container").toggleClass("hidden");
			$("#how-to-play").toggleClass("hidden");
			handleNewLevel();
			getInput();
		}
	})

});