document.addEventListener("DOMContentLoaded", () => {
	listMonsters()
	createForm()

	getForm().addEventListener('submit', createMonster)

	initPageBtns()

});

function getMonsterDiv() {
	return document.querySelector("#monster-container");
}

function getForm() {
	return document.querySelector("#monster-form")
}

function listMonsters() {
	getMonsters(50, 1);
}

function getMonsters(num, page) {
	fetch(`http://localhost:3000/monsters/?_limit=${num}&_page=${page}`)
		.then(response => response.json())
		.then(json => {
			json.forEach(monster => renderMonster(monster));
		});
}

function renderMonster(monster) {
	let div = getMonsterDiv();
	let h2Name = document.createElement("h2");
	let h4Age = document.createElement("h4");
	let pBio = document.createElement("p");

	h2Name.innerText = monster.name;
	h4Age.innerText = 'Age: ' + monster.age;
	pBio.innerText = 'Bio: ' + monster.description;

	div.appendChild(h2Name);
	div.appendChild(h4Age);
	div.appendChild(pBio);
}

function createForm() {
	let div = document.querySelector("#create-monster")

	let form = document.createElement('form')
	form.id = 'monster-form'
	let nameInput = document.createElement('input')
	nameInput.id = 'name';
	nameInput.placeholder = "name..."
	let ageInput = document.createElement('input')
	ageInput.id = 'age'
	ageInput.placeholder = "age ..."
	let bioInput = document.createElement('input')
	bioInput.id = 'bio'
	bioInput.placeholder = "bio ..."
	let submitBtn = document.createElement('button')
	submitBtn.id = 'submit'
	submitBtn.innerText = 'Create'

	form.appendChild(nameInput);
	form.appendChild(ageInput);
	form.appendChild(bioInput);
	form.appendChild(submitBtn);

	div.appendChild(form);	
}

function createMonster(e) {
	e.preventDefault()
	let name = document.querySelector('#name').value
	let age = document.querySelector('#age').value
	let bio = document.querySelector('#bio').value

	let monster = {
		name: name,
		age: age,
		bio: bio
	}
	postMonster(monster)
}

function postMonster(monster) {
	fetch('http://localhost:3000/monsters', {
		method: "POST",
		headers: {
  			"Content-Type": "application/json",
  			accept: "application/json"
		},
 
		body: JSON.stringify(monster)
	
	})
}

function initPageBtns() {
	let page = 1;
	let backBtn = document.querySelector('#back');
	let forwardBtn = document.querySelector('#forward');

	backBtn.addEventListener('click', () => {
		if (page <= 1) {
			alert('no monsters here')
		} else {
			page--;
			getMonsterDiv().innerText = ""
			getMonsters(50, page);
		}
	})

	forwardBtn.addEventListener('click', () => {
		page++;
		getMonsterDiv().innerText = ""
		getMonsters(50, page);
	})
}
