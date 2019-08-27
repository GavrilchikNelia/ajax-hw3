const ol = document.createElement('ol');

const response = getReq('https://swapi.co/api/planets/');
response.then( function (result) {
    renderList(document.getElementById('container'), result.results);

});
function getReq(url) {
    return fetch(url)
        .then(data => data.json())
}
 function createList(elem) {
     const li = document.createElement('li');
     li.setAttribute('id', `${elem.name}`);
     li.innerHTML = `<p>Планета: ${elem.name}</p><p>Климат: ${elem.climate}</p><p>Преобладающая месность: ${elem.terrain}</p>`;

     getPersons(elem, li);
     ol.appendChild(li);
     return ol;
 }
function renderList(container, elems) {
    elems.forEach(item => container.appendChild(createList(item)))

}

function getPersons(elem, li) {
    return  getPromise(elem.residents, li)
}
function getPromise(urls, li) {
    let requests = urls.map(url => fetch(url));
    Promise.all(requests)
        .then(responses => Promise.all(responses.map(r => r.json())))
        .then (pers => renderPerson(pers, li));
}
function renderPerson(elems, li) {

const newOl = document.createElement('ol');
    newOl.innerHTML = `<p>Персонажи: </p>`;
    elems.forEach(item => {const p = document.createElement('p');
    p.textContent = `${item.name}`; newOl.appendChild(p)});
    if (newOl.children.length > 1){
li.appendChild(newOl);
    }
}