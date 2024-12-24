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
		description:
			'Get ready for a festive adventure to discover your gift! For each question, please remember the first letter of the answer.',
	},
	{
		text: 'Q1: Country names',
		description: 'Choose the correct answer:',
		multipleChoice: {
			question: 'This country is known for its fjords and Viking history. What is it?',
			choices: ['Netherlands', 'Norway', 'Greece', 'Italy'],
			correctIndex: 1,
			solution: 'Correct! Norway was indeed known for its viking history.',
		},
	},
	{
		text: 'Q2: Fantasy',
		description: 'Choose the correct answer:',
		multipleChoice: {
			question: 'In Dungeons & Dragons, which creature is a massive being made of earth?',
			choices: ['Eagle', 'Earth Elemental', 'Dragon', 'Unicorn'],
			correctIndex: 1,
			solution: 'Correct! Earth Elemental is the answer.',
		},
	},
	{
		text: 'Q3: Rock Music',
		description: 'Choose the correct answer:',
		multipleChoice: {
			question: 'Which iconic bassist played for Pink Floyd?',
			choices: ['Paul McCartney', 'Robert Trujillo', 'John Paul Jones', 'Roger Waters'],
			correctIndex: 3,
			solution: 'Correct! Roger Waters is the legendary bassist of Pink Floyd.',
		},
	},
	{
		text: 'Q4: D&D',
		description: 'Choose the correct answer:',
		multipleChoice: {
			question: 'Which class in D&D specializes in shapeshifting and has a powerful connection to nature?',
			choices: ['Druid', 'Ranger', 'Fighter', 'Warlock'],
			correctIndex: 0,
			solution:
				'Correct! Druids are powerful spellcasters connected to nature with the ability to change their shape at will.',
		},
	},
	{
		text: 'Q5: Rock Music',
		description: 'Choose the correct answer:',
		multipleChoice: {
			question: 'Which band wrote the song called "Rhiannon"?',
			choices: ['Fleetwood Mac', 'Foreigner', 'Floyd', 'Foo Fighters'],
			correctIndex: 0,
			solution: 'Correct! Fleetwood Mac created this iconic song.',
		},
	},
	{
		text: 'Q6: D&D',
		description: 'Choose the correct answer:',
		multipleChoice: {
			question:
				'Which monstrous creature from D&D is famous for its size and quick temper and usually carries a greatclub?',
			choices: ['Ogre', 'Wolf', 'Zombie', 'Beholder'],
			correctIndex: 0,
			solution: 'Correct! Ogre is the answer.',
		},
	},
	{
		text: 'Q7: Country names',
		description: 'Choose the correct answer:',
		multipleChoice: {
			question: "This country's shape is said to look like a fish. Which is it?",
			choices: ['Peru', 'India', 'Japan', 'Romania'],
			correctIndex: 3,
			solution: 'Correct! The shape of Romania does indeed look like a fish when seen from afar.',
		},
	},
	{
		text: 'Q8: Fantasy',
		description: 'Choose the correct answer:',
		multipleChoice: {
			question: 'Which mythical creature is a hybrid of a lion and an eagle, commonly found in fantasy worlds?',
			choices: ['Manticore', 'Griffin', 'Dragon', 'Gargoyle'],
			correctIndex: 1,
			solution: 'Correct! Griffin is the answer.',
		},
	},
	{
		text: 'Q9: Fantasy',
		description: 'Choose the correct answer:',
		multipleChoice: {
			question: 'In The Lord of the Rings, what race does Legolas belong to?',
			choices: ['Orc', 'Elf', 'Dwarf', 'Hobbit'],
			correctIndex: 1,
			solution: 'Correct! Legolas is an Elf prince from the Woodland Realm.',
		},
	},
	{
		text: 'Q10: Decode the Secret Message!',
		description: 'This message has been shifted by 3 letters in the alphabet. Can you decode it?',
		cipher: caesarCipher('Your gift is warm and cozy', 3),
		input: {
			placeholder: 'Enter the decoded message...',
			correct: 'Your gift is warm and cozy',
		},
	},
	{
		text: 'Final challenge: Spell out the letters!',
		description:
			"Previously, each question contained an answer whose first letter was a key to unlocking the name of your gift. Now it's time to put it all together.",
		input: {
			placeholder: 'Enter the letters from the answers.',
			correct: 'NERDFORGE',
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

	if (step.multipleChoice) {
		const choicesContainer = document.createElement('div');
		choicesContainer.className = 'choices-container';

		const question = document.createElement('div');
		question.className = 'question';
		question.textContent = step.multipleChoice.question;

		step.multipleChoice.choices.forEach((choice, i) => {
			const button = document.createElement('button');
			button.className = 'choice-btn';
			button.textContent = choice;
			button.addEventListener('click', () => handleChoiceClick(button, i, step.multipleChoice));
			choicesContainer.appendChild(button);
		});

		const solution = document.createElement('div');
		solution.className = 'solution';
		solution.textContent = step.multipleChoice.solution;

		div.appendChild(question);
		div.appendChild(choicesContainer);
		div.appendChild(solution);
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

	if (!Array.isArray(correct)) {
		nextBtn.disabled = value.toLowerCase().trim() !== correct.toLowerCase();
	} else {
		nextBtn.disabled = !correct.map((i) => i.toLowerCase()).includes(value.toLowerCase());
	}
}

function handleChoiceClick(button, choiceIndex, multipleChoice) {
	const nextBtn = document.getElementById('nextBtn');
	const allChoices = button.parentElement.getElementsByClassName('choice-btn');
	const solution = button.parentElement.nextElementSibling;

	// Reset all buttons
	Array.from(allChoices).forEach((btn) => {
		btn.classList.remove('correct', 'incorrect');
	});

	if (choiceIndex === multipleChoice.correctIndex) {
		button.classList.add('correct');
		solution.classList.add('visible');
		nextBtn.disabled = false;
	} else {
		button.classList.add('incorrect');
	}
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

	const currentStepData = steps[currentStep];
	if (currentStepData.input) {
		const input = document.querySelector('.step.active input');
		validateInput(input.value, currentStepData.input.correct);
	} else if (currentStepData.multipleChoice) {
		const correctChoice = document.querySelector('.step.active .choice-btn.correct');
		nextBtn.disabled = !correctChoice;
	} else {
		nextBtn.disabled = currentStep === steps.length - 1;
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
