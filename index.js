document.addEventListener("DOMContentLoaded", () => {
getMonsters();
createForm();
let backButton = document.getElementById('back');
let forwardButton = document.getElementById('forward');
backButton.addEventListener('click', backButtonAction);
forwardButton.addEventListener('click', forwardButtonAction);
});

let page = 1;
let allMonsters;

const getMonsters = () => {
  return fetch('http://localhost:3000/monsters')
  .then(res => res.json())
  .then(json => {
    allMonsters = json;
    showMonsters(allMonsters.slice(0, 50));
  });
}

const showMonsters = (monsters) => {
  let container = document.getElementById('monster-container');
  container.innerHTML = '';
  monsters.forEach(monster => {
    let div = document.createElement("div");
    let h2 = document.createElement("h2");
    let h4 = document.createElement('h4');
    let p = document.createElement('p');
    h2.innerHTML = monster.name;
    h4.innerHTML = monster.age;
    p.innerHTML = monster.description;
    div.appendChild(h2);
    div.appendChild(h4);
    div.appendChild(p);
    container.appendChild(div);
  })
}

const createForm = () => {
  let form = document.createElement("form");
  let input1 = document.createElement("input");
  let input2 = document.createElement("input");
  let input3 = document.createElement('input');
  let submit = document.createElement('input');
  submit.addEventListener('click', newMonster);

  form.setAttribute('method', 'post');
  form.setAttribute('action', 'http://localhost:3000/monsters');

  input1.setAttribute('type', 'text');
  input1.setAttribute('name', 'name');
  input1.setAttribute('placeholder', 'name');

  input2.setAttribute('type', 'text');
  input2.setAttribute('name', 'age');
  input2.setAttribute('placeholder', 'age');

  input3.setAttribute('type', 'text');
  input3.setAttribute('name', 'description');
  input3.setAttribute('placeholder', 'description');

  submit.setAttribute('type', 'submit');
  submit.setAttribute('type', 'submit');

  form.appendChild(input1);
  form.appendChild(input2);
  form.appendChild(input3);
  form.appendChild(submit);

  let container = document.getElementById('create-monster');
  container.appendChild(form);
}

const backButtonAction = event => {
  if (page === 1) return;
  page--;
  renderMonsters();
}

const forwardButtonAction = event => {
  if (page * 50 > allMonsters.length) return;
  page++;
  renderMonsters();
}

const newMonster = event => {
  event.preventDefault();
  let form = document.querySelector('form');
  let name = form.name.value;
  let age = form.age.value;
  let description = form.description.value;
  storMonster(name, age, description);
}

const storMonster = (name, age, description) => {
  fetch ('http://localhost:3000/monsters', {
    headers: {'Content-Type': 'application/json'},
    method: "POST",
    body: JSON.stringify({name: name, age: age, description: description})
  })
  .then(res => res.json())
  .then(json => {
    allMonsters.push(json);
  });
}

const renderMonsters = () => {
  let endIndex = page * 50;
  showMonsters(allMonsters.slice(endIndex - 50, endIndex));
}
