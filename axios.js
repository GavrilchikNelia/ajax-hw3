const ol = document.createElement('ol');
const url = 'https://swapi.co/api/planets/';
const response = axios.get(url);
response.then(function (result) {
    renderList(document.getElementById('container'), result.data.results);

});
function getUrl(url) {
    const res = axios.get(url);
    return res;
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
    let requests = urls.map(url => getUrl(url).then(item => item));
    Promise.all(requests)
        .then(responses => Promise.all(responses))
        .then (pers => renderPerson(pers, li));
}
function renderPerson(elems, li) {
    const newOl = document.createElement('ol');
    newOl.innerHTML = `<p>Персонажи: </p>`;
    elems.forEach(item => {const p = document.createElement('p');
        p.textContent = `${item.data.name}`; newOl.appendChild(p)});
    if (newOl.children.length > 1){
        li.appendChild(newOl);
    }
}