const alertBox = document.getElementById('alertBox');
const alertText = document.getElementById('alertText');
const body = document.querySelector('body');
const btnClearLoop = document.getElementById('btnClearLoop');
const btnCopyColor = document.getElementById('btnCopyColor');
const btnStartLoop = document.getElementById('btnStartLoop');
const buttons = Array.from(document.getElementsByTagName('button'));
const colorBox = document.getElementById('colorBox');
const colorBoxColorDisplay = document.querySelector('#outputLoopSpeed');
const colorBoxHeader = document.querySelector('#colorBox h1');
const colorBoxSubheader = document.querySelector('#colorBox h2');
const colorBoxText = document.querySelector('#colorBox p');
const GETloopSpeed = document.getElementById('inputLoopSpeed');
const header = document.getElementById('header');
const subheader = document.getElementById('subheader');

function init() {
	showAlert('Press the button or set a loop!', 'note', 10000);
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
	buttons.forEach((button) => {
		button.style.backgroundColor = color;
		button.style.color = 'white';
	});
	header.style.color = color;
	colorBox.style.backgroundColor = color;
	colorBoxSubheader.innerHTML = `${color.toUpperCase()}`;
	adjustColorsByLum(color);
	console.log(color);
}

// function copyColor(color) {
// 	const copiedColor = color;
// 	copiedColor.select();
// 	document.execCommand('copy');
// 	showAlert(`Color copied to the clipboard`, 'success', 3000);
// }

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
		subheader.style.color = 'whitesmoke';
		colorBoxHeader.style.color = '#232323';
		colorBoxSubheader.style.color = '#232323';
		colorBoxText.style.color = '#232323';
		colorBoxColorDisplay.style.color = '#232323';
	} else {
		body.style.backgroundColor = 'whitesmoke';
		subheader.style.color = '#232323';
		colorBoxHeader.style.color = 'whitesmoke';
		colorBoxSubheader.style.color = 'whitesmoke';
		colorBoxText.style.color = 'whitesmoke';
		colorBoxColorDisplay.style.color = 'whitesmoke';
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

function loopBg() {
	if (GETloopSpeed.value === '') {
		console.log('empty');
		// alert();
		showAlert('Please enter a loop speed time!', 'error', 3000);
	} else if (GETloopSpeed.value < 0) {
		showAlert('Please choose only positive numbers!', 'error', 2000);
	} else {
		if (GETloopSpeed.value < 100) {
			buttons.forEach((button) => {
				button.style.transition = 'background-color .0s ease-in-out';
			});
			body.style.transition = 'background-color .0s ease-in-out';
			colorBox.style.transition = 'background-color .0s ease-in-out';
			header.style.transition = 'background-color .0s ease-in-out';
		} else {
			if (GETloopSpeed.value > 100) {
				buttons.forEach((button) => {
					button.style.transition = 'background-color .3s ease-in-out';
				});
				body.style.transition = 'background-color .3s ease-in-out';
				colorBox.style.transition = 'background-color .3s ease-in-out';
				header.style.transition = 'background-color .3s ease-in-out';
			}
		}

		// Set Loop speed time
		showAlert(`Loop set with a speed of ${GETloopSpeed.value} ms!`, 'success', 3000);

		colorBoxColorDisplay.innerText = GETloopSpeed.value;
		colorBoxHeader.innerHTML = '🔁';
		colorBoxText.style.display = 'block';
		btnClearLoop.style.display = 'block';
		btnStartLoop.style.display = 'none';
		GETloopSpeed.style.opacity = '0';
		window.scrollTo(0, 0);
		// Set loop
		let loop = setInterval(changeBackground, GETloopSpeed.value);
		// Clear button listener
		btnClearLoop.addEventListener('click', function() {
			clearInterval(loop);
			showAlert('Loop stopped!', 'success', 2000);
			colorBoxHeader.innerHTML = 'Press me 👆';
			colorBoxText.style.display = 'none';
			btnClearLoop.style.display = 'none';
			btnStartLoop.style.display = 'block';
			GETloopSpeed.style.opacity = '1';
			GETloopSpeed.value = '';
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
