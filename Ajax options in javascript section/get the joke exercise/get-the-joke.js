let loadBtn = document.getElementById('load-btn');

function deleteChildren(outputDiv) {
    while (outputDiv.firstChild) {
        outputDiv.firstChild.remove();
    }
}

function outputJoke(joke) {
    let outputDiv = document.getElementById('output');

    deleteChildren(outputDiv);

    let nameP = document.createElement('p');
    let pText = document.createTextNode(`joke: ${joke.value}`);
    nameP.appendChild(pText);

    let img = document.createElement('img');
    img.src = joke.icon_url;

    outputDiv.appendChild(nameP);
    outputDiv.appendChild(img);
}

loadBtn.addEventListener('click', function (e) {

    fetch('https://api.chucknorris.io/jokes/random')
        .then(response => response.json())
        .then(json => outputJoke(json))
        .catch(error => console.log(error));
});
