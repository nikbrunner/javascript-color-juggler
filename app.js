const body = document.querySelector('body');
const header = document.getElementById('header');
const subheader = document.getElementById('subheader');
const buttons = Array.from(document.getElementsByTagName('button'));
const backgroundPlayground = document.getElementById('backgroundPlayground');
const backgroundPlaygroundHeader = document.querySelector('#backgroundPlayground h1');
const backgroundPlaygroundSubheader = document.querySelector('#backgroundPlayground h2');
const backgroundPlaygroundText = document.querySelector('#backgroundPlayground p');
const backgroundPlaygroundColorDisplay = document.querySelector('#UIoutputLoopSpeedTime');
const statusBox = document.getElementById('statusBox');
const statusText = document.getElementById('statusText');
const UIbtnClearLoop = document.getElementById('btnClearLoop');
const UIbtnStartLoop = document.getElementById('btnStartLoop');
const UIbtnCopyColor = document.getElementById('btnCopyColor');

function init() {
	showAlert('Press the button or set a loop!', 'note', 10000);
	UIbtnClearLoop.style.display = 'none';
	backgroundPlaygroundText.style.display = 'none';
	setIntervalX(changeBackground, 750, 3);
	backgroundPlayground.style.transition = 'background-color 1s ease-in-out';
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
	backgroundPlayground.style.backgroundColor = color;
	backgroundPlaygroundSubheader.innerHTML = `${color.toUpperCase()}`;
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
		backgroundPlaygroundHeader.style.color = '#232323';
		backgroundPlaygroundSubheader.style.color = '#232323';
		backgroundPlaygroundText.style.color = '#232323';
		backgroundPlaygroundColorDisplay.style.color = '#232323';
	} else {
		body.style.backgroundColor = 'whitesmoke';
		subheader.style.color = '#232323';
		backgroundPlaygroundHeader.style.color = 'whitesmoke';
		backgroundPlaygroundSubheader.style.color = 'whitesmoke';
		backgroundPlaygroundText.style.color = 'whitesmoke';
		backgroundPlaygroundColorDisplay.style.color = 'whitesmoke';
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
	const UIGETloopSpeedTime = document.getElementById('iptLoopSpeedTime');
	if (UIGETloopSpeedTime.value === '') {
		console.log('empty');
		// alert();
		showAlert('Please enter a loop speed time!', 'error', 3000);
	} else if (UIGETloopSpeedTime.value < 0) {
		showAlert('Please choose only positive numbers!', 'error', 2000);
	} else {
		if (UIGETloopSpeedTime.value < 100) {
			buttons.forEach((button) => {
				button.style.transition = 'background-color .0s ease-in-out';
			});
			body.style.transition = 'background-color .0s ease-in-out';
			backgroundPlayground.style.transition = 'background-color .0s ease-in-out';
			header.style.transition = 'background-color .0s ease-in-out';
		} else {
			if (UIGETloopSpeedTime.value > 100) {
				buttons.forEach((button) => {
					button.style.transition = 'background-color .3s ease-in-out';
				});
				body.style.transition = 'background-color .3s ease-in-out';
				backgroundPlayground.style.transition = 'background-color .3s ease-in-out';
				header.style.transition = 'background-color .3s ease-in-out';
			}
		}

		// Set Loop speed time
		showAlert(`Loop set with a speed of ${UIGETloopSpeedTime.value} ms!`, 'success', 3000);

		backgroundPlaygroundColorDisplay.innerText = UIGETloopSpeedTime.value;
		backgroundPlaygroundHeader.innerHTML = '🔁';
		backgroundPlaygroundSubheader.style.display = 'none';
		backgroundPlaygroundText.style.display = 'block';
		UIbtnClearLoop.style.display = 'block';
		UIbtnStartLoop.style.display = 'none';
		UIGETloopSpeedTime.style.opacity = '0';
		window.scrollTo(0, 0);
		// Set loop
		let loop = setInterval(changeBackground, UIGETloopSpeedTime.value);
		// Clear button listener
		UIbtnClearLoop.addEventListener('click', function() {
			clearInterval(loop);
			showAlert('Loop stopped!', 'success', 2000);
			backgroundPlaygroundHeader.innerHTML = 'Press me 👆';
			backgroundPlaygroundSubheader.style.display = 'block';
			backgroundPlaygroundText.style.display = 'none';
			UIbtnClearLoop.style.display = 'none';
			UIbtnStartLoop.style.display = 'block';
			UIGETloopSpeedTime.style.opacity = '1';
			UIGETloopSpeedTime.value = '';
		});
	}
}

function showAlert(message, className, duration) {
	// Set opacity for statusbox
	statusBox.style.opacity = 1;
	// Add class
	statusBox.className = `alert ${className}`;
	// Add text
	statusText.innerHTML = message;
	// Timeout after 3 seconds
	setTimeout(function() {
		statusBox.style.opacity = 0;
		statusText.innerHTML = '';
	}, duration);
}
