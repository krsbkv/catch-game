"use strict";

const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timer = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = ["rgb(173,216,230)", "rgb(255,0,0)", "rgb(255,20,147)", "rgb(220,20,60)", "rgb(139,128,0)", "rgb(255,64,223)", "rgb(0,0,139)", "rgb(255,125,0)", "rgb(82,12,176)", "rgb(1,50,32)", "rgb(15,242,140"];

let time = 0;
let score = 0;

startBtn.addEventListener('click', event => {
	event.preventDefault();
	screens[0].classList.add('up');
});

timeList.addEventListener('click', event => {
	if (event.target.classList.contains('screen__time-btn')) {
		time = parseInt(event.target.getAttribute('data-time'));
		screens[1].classList.add('up');
		startGame();
	}
});

board.addEventListener('click', event => {
	if (event.target.classList.contains('circle')) {
		score++;
		event.target.remove();
		createRandomCircle();
	}
});

function startGame() {
	setInterval(decreaseTime, 1000);
	createRandomCircle();
	setTime(time);
}

function decreaseTime() {
	if (time === 0) {
		finishGame();
	} else {
		let current = --time;
		if (current < 10) {
			current = `0${current}`;
		}
		setTime(current);
	}
}

function setTime(value) {
	timer.innerHTML = `00:${value}`;
}

function finishGame() {
	timer.parentNode.classList.add('hide');
	board.innerHTML = `<h1>Score: <span class="primary">${score}</span></h1>`;
	const repeat = document.createElement('a');
	repeat.classList.add('repeat-btn');
	repeat.innerHTML = "Play Again";
	repeat.style.padding = '.5rem 3rem';
	repeat.style.fontSize = '1rem';
	repeat.style.color = 'rgb(255,255,255)';
	repeat.style.borderRadius = '60px';
	repeat.style.background = 'rgb(42,69,178)';
	repeat.style.background = 'linear-gradient(90deg, rgb(255,0,55) 0%, rgb(42,155,124) 100%)';
	repeat.style.letterSpacing = '1px';
	repeat.style.cursor = 'pointer';
	board.append(repeat);

	repeat.addEventListener("click", () => {
		location.reload();
	});
}

function createRandomCircle() {
	const circle = document.createElement('div');
	const size = getRandomNumber(20, 55); 
	const {width,height} = board.getBoundingClientRect();
	const x = getRandomNumber(0, width - size);
	const y = getRandomNumber(0, height - size);
	const color = getRandomColor();
	circle.style.background = color;
	circle.classList.add('circle');
	circle.style.width = `${size}px`;
	circle.style.height = `${size}px`;
	circle.style.top = `${y}px`;
	circle.style.left = `${x}px`;
	board.append(circle);
}

function getRandomNumber(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
	const index = Math.floor(Math.random() * colors.length);
	return colors[index];
}