const alertBox = document.getElementById('alertBox');
const alertText = document.getElementById('alertText');
const body = document.querySelector('body');
const btnClearLoop = document.getElementById('btnClearLoop');
const btnStartLoop = document.getElementById('btnStartLoop');
const btnCopyColor = document.getElementById('btnCopyColor');
const colorBox = document.getElementById('colorBox');
const colorBoxHeader = document.querySelector('#colorBox h1');
const colorBoxColorDisplay = document.querySelector('.colorBoxColorDisplay');
const colorBoxSpeedDisplay = document.querySelector('#outputLoopSpeed');
const colorBoxText = document.querySelector('#colorBoxText');
const inputloopSpeed = document.getElementById('inputLoopSpeed');
const header = document.getElementById('header');

function init() {
	// document.addEventListener('DOMContentLoaded', function() {
	// 	const cover = document.querySelector('#cover');
	// 	cover.style.transform = 'translateY(0)';
	// });
	setTimeout(() => {
		const cover = document.querySelector('#cover');
		cover.style.transform = 'translateY(0)';
	}, 1000);
	showAlert('Press the button or set a loop!', 'note', 5000);
	if (window.innerHeight >= 1024) {
		setTimeout(() => {
			showAlert('Also use the copy button! (Only on Desktop)', 'note', 3000);
		}, 5500);
	}
	btnClearLoop.style.display = 'none';
	colorBoxText.style.display = 'none';
	setIntervalX(changeBackground, 750, 3);
	colorBox.style.transition = 'background-color 1s ease-in-out';
}

function getColor() {
	const color = randomColor();
	return color;
}

function changeBackground() {
	const color = getColor();
	header.style.color = color;
	colorBox.style.backgroundColor = color;
	btnCopyColor.style.backgroundColor = 'initial';
	colorBoxColorDisplay.innerHTML = `${color.toUpperCase()}`;
	adjustColorsByLum(color);
}

setTimeout(() => {
	btnCopyColor.addEventListener('click', btnCopy);
}, 8000);

function btnCopy() {
	let currentColorValue = colorBoxColorDisplay.textContent;
	const tempInput = document.createElement('input');
	document.body.appendChild(tempInput);
	currentColorValue = currentColorValue.toLowerCase();
	tempInput.value = currentColorValue;
	tempInput.select();
	document.execCommand('copy');
	document.body.removeChild(tempInput);
	alertBox.style.backgroundColor = currentColorValue;
	btnCopyColor.style.backgroundColor = currentColorValue;
	adjustColorsByLum(currentColorValue);
	window.scrollTo(0, 0);
	showAlert(`${currentColorValue.toUpperCase()} copied!`, 'success', 3000);
}

function randomColor() {
	const r = Math.floor(Math.random() * 256); // pick a "red" from 0 - 255
	const g = Math.floor(Math.random() * 256); // pick a "green" from 0 - 255
	const b = Math.floor(Math.random() * 256); // pick a "blue" from 0 - 255
	return `rgb(${r},${g},${b})`; // RGB (r, g, b)
}

function adjustColorsByLum(color) {
	const step1 = color.replace('rgb(', '');
	const step2 = step1.replace(')', '');
	const step3 = step2.split(',');
	const step4 = step3.map(function(color) {
		return parseInt(color, 10);
	});
	const luminance = step4.reduce((accumulator, currentValue) => {
		return accumulator + currentValue;
	}, 0);

	if (luminance > 500) {
		body.style.backgroundColor = '#232323';
		alertBox.style.color = '#232323';
		// btnCopyColor.style.color = '#232323';
		colorBoxHeader.style.color = '#232323';
		colorBoxColorDisplay.style.color = '#232323';
		colorBoxText.style.color = '#232323';
		colorBoxSpeedDisplay.style.color = '#232323';
	} else {
		body.style.backgroundColor = 'whitesmoke';
		if (alertBox.classList.contains('note')) {
			alertBox.style.color = '#232323';
		} else {
			alertBox.style.color = 'whitesmoke';
		}
		// btnCopyColor.style.color = 'whitesmoke';
		colorBoxHeader.style.color = 'whitesmoke';
		colorBoxColorDisplay.style.color = 'whitesmoke';
		colorBoxText.style.color = 'whitesmoke';
		colorBoxSpeedDisplay.style.color = 'whitesmoke';
	}
}

function setIntervalX(callback, delay, repititions) {
	let x = 0;
	let intervalID = window.setInterval(function() {
		callback();
		if (++x === repititions) {
			window.clearInterval(intervalID);
		}
	}, delay);
}

function loopColorBox() {
	if (inputloopSpeed.value === '') {
		console.log('empty');
		// alert();
		showAlert('Please enter a loop speed time!', 'error', 3000);
	} else if (inputloopSpeed.value < 0) {
		showAlert('Please choose only positive numbers!', 'error', 2000);
	} else {
		if (inputloopSpeed.value < 100) {
			body.style.transition = 'background-color .0s ease-in-out';
			colorBox.style.transition = 'background-color .0s ease-in-out';
			header.style.transition = 'color .0s ease-in-out';
		} else {
			if (inputloopSpeed.value > 100) {
				body.style.transition = 'background-color .3s ease-in-out';
				colorBox.style.transition = 'background-color .3s ease-in-out';
				header.style.transition = 'color .3s ease-in-out';
			}
		}

		// Set Loop speed time
		// ! put all this shit in a function called toggleUiStartLoop or something

		showAlert(`Loop set with a speed of ${inputloopSpeed.value} ms!`, 'success', 3000);

		colorBoxSpeedDisplay.innerText = inputloopSpeed.value;
		colorBoxHeader.innerHTML = '🔁';
		colorBoxText.style.display = 'block';
		btnClearLoop.style.display = 'block';
		btnStartLoop.style.display = 'none';
		inputloopSpeed.style.opacity = '0';
		window.scrollTo(0, 0);
		// Set loop
		let loop = setInterval(changeBackground, inputloopSpeed.value);
		// Clear button listener
		btnClearLoop.addEventListener('click', function() {
			clearInterval(loop);
			showAlert('Loop stopped!', 'success', 2000);
			setTimeout(function() {
				showAlert('Press the button or set a loop!', 'note', 20000);
			}, 3000);
			alertBox.style.display = 'block';
			colorBoxHeader.innerHTML = 'Press me 👆';
			colorBoxText.style.display = 'none';
			btnClearLoop.style.display = 'none';
			btnStartLoop.style.display = 'block';
			inputloopSpeed.style.opacity = '1';
			inputloopSpeed.style.display = 'block';
			inputloopSpeed.value = '';
		});
	}
}

function showAlert(message, className, duration) {
	// Set opacity for alertbox
	alertBox.style.opacity = 1;
	// Add class
	alertBox.className = `alert ${className}`;
	// Add text
	alertText.innerHTML = message;
	// Timeout after 3 seconds
	setTimeout(function() {
		alertBox.style.opacity = 0;
		alertText.innerHTML = '';
	}, duration);
}
