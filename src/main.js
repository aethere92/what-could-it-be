// Caesar cipher functions
function caesarCipher(str, shift) {
	return str
		.split('')
		.map((char) => {
			if (char.match(/[a-z]/i)) {
				const code = char.charCodeAt(0);
				const isUpperCase = code >= 65 && code <= 90;
				const base = isUpperCase ? 65 : 97;
				return String.fromCharCode(((((code - base + shift) % 26) + 26) % 26) + base);
			}
			return char;
		})
		.join('');
}

// Define your steps here
const steps = [
	{
		text: '🎄 Welcome to Your Special Christmas Gift Reveal! 🎁',
		description: 'Get ready for a festive adventure to discover your gift!',
	},
	{
		text: 'First Challenge: Decode the Secret Message!',
		description: 'This message has been shifted by 3 letters in the alphabet. Can you decode it?',
		cipher: caesarCipher('Your gift is warm and cozy', 3),
		input: {
			placeholder: 'Enter the decoded message...',
			correct: 'Your gift is warm and cozy',
		},
	},
	{
		text: 'Second Challenge: Decode the Secret Message!',
		description: "It's still shifted, but differently.",
		cipher: caesarCipher('What does a blacksmith use to create armor?', -3),
		input: {
			placeholder: 'Enter the decoded message...',
			correct: 'Forge',
		},
	},
	{
		text: 'What am I?',
		input: {
			placeholder: 'Guess what it might be...',
			correct: 'nerd',
		},
	},
	{
		text: "🎉 Congratulations! You've discovered your gift! 🎁",
		description: "It's a brand new hoodie! I hope you'll love wearing it!",
		image: 'images/gift.webp',
		final: true,
	},
];

let currentStep = 0;

// Create snowflakes
function createSnow() {
	const snowContainer = document.getElementById('snow');
	for (let i = 0; i < 50; i++) {
		const snowflake = document.createElement('div');
		snowflake.style.left = Math.random() * 100 + 'vw';
		snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
		snowflake.style.opacity = Math.random();
		snowflake.style.width = snowflake.style.height = Math.random() * 5 + 5 + 'px';
		snowContainer.appendChild(snowflake);
	}
}

// Confetti animation for the final reveal
function createConfetti() {
	const canvas = document.getElementById('confetti');
	const ctx = canvas.getContext('2d');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	const pieces = [];
	const numberOfPieces = 200;
	const colors = [
		'#f44336',
		'#e91e63',
		'#9c27b0',
		'#673ab7',
		'#3f51b5',
		'#2196f3',
		'#03a9f4',
		'#00bcd4',
		'#009688',
		'#4CAF50',
	];

	for (let i = 0; i < numberOfPieces; i++) {
		pieces.push({
			x: Math.random() * canvas.width,
			y: Math.random() * canvas.height - canvas.height,
			rot: Math.random() * 360,
			sp: Math.random() * 6 + 3,
			color: colors[Math.floor(Math.random() * colors.length)],
		});
	}

	function animate() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		pieces.forEach((p) => {
			p.y += p.sp;
			p.rot += p.sp / 2;
			if (p.y > canvas.height) p.y = -20;

			ctx.save();
			ctx.translate(p.x, p.y);
			ctx.rotate((p.rot * Math.PI) / 180);

			ctx.fillStyle = p.color;
			ctx.fillRect(-5, -5, 10, 10);

			ctx.restore();
		});

		requestAnimationFrame(animate);
	}

	animate();
}

function createStepElement(step, index) {
	const div = document.createElement('div');
	div.className = `step ${index === 0 ? 'active' : ''}`;

	const title = document.createElement('h2');
	title.textContent = step.text;
	div.appendChild(title);

	if (step.description) {
		const desc = document.createElement('p');
		desc.textContent = step.description;
		div.appendChild(desc);
	}

	if (step.cipher) {
		const cipherBox = document.createElement('div');
		cipherBox.className = 'cipher-box';
		cipherBox.textContent = step.cipher;
		div.appendChild(cipherBox);
	}

	if (step.image) {
		const img = document.createElement('img');
		img.src = step.image;
		img.alt = `Step ${index + 1}`;
		div.appendChild(img);
	}

	if (step.input) {
		const input = document.createElement('input');
		input.type = 'text';
		input.placeholder = step.input.placeholder;
		input.addEventListener('input', (e) => validateInput(e.target.value, step.input.correct));
		div.appendChild(input);
	}

	return div;
}

function validateInput(value, correct) {
	const nextBtn = document.getElementById('nextBtn');
	nextBtn.disabled = value.toLowerCase().trim() !== correct.toLowerCase();
}

function navigate(direction) {
	const container = document.getElementById('stepContainer');
	const steps = container.getElementsByClassName('step');

	steps[currentStep].classList.remove('active');
	currentStep += direction;
	steps[currentStep].classList.add('active');

	if (steps[currentStep].querySelector('input')) {
		steps[currentStep].querySelector('input').value = '';
	}

	if (currentStep === steps.length - 1) {
		createConfetti();
	}

	updateButtons();
	updateProgressBar();
}

function updateButtons() {
	const prevBtn = document.getElementById('prevBtn');
	const nextBtn = document.getElementById('nextBtn');

	prevBtn.disabled = currentStep === 0;
	nextBtn.disabled = currentStep === steps.length - 1;

	const currentStepData = steps[currentStep];
	if (currentStepData.input) {
		const input = document.querySelector('.step.active input');
		validateInput(input.value, currentStepData.input.correct);
	}
}

function updateProgressBar() {
	const progress = (currentStep / (steps.length - 1)) * 100;
	document.querySelector('.progress-bar').style.width = `${progress}%`;
}

// Initialize
window.onload = function () {
	const container = document.getElementById('stepContainer');
	steps.forEach((step, index) => {
		container.appendChild(createStepElement(step, index));
	});
	updateButtons();
	updateProgressBar();
	createSnow();
};
