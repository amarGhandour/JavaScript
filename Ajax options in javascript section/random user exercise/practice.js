let loadBtn = document.getElementById('load-btn');

function deleteChildren(outputDiv) {
    while (outputDiv.firstChild) {
        outputDiv.firstChild.remove();
    }
}

function outputPerson(person) {
    let outputDiv = document.getElementById('output');

    deleteChildren(outputDiv);

    let nameP = document.createElement('p');
    let pText = document.createTextNode(`name: ${person.name.first} ${person.name.last}`);

    let img = document.createElement('img');
    img.src = person.picture.large;

    nameP.appendChild(pText);


    outputDiv.appendChild(nameP);
    outputDiv.appendChild(img);
}

loadBtn.addEventListener('click', function (e) {

    let request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        try {
            if (request.readyState === 4 && request.status === 200) {
                let text = request.responseText;
                let data = JSON.parse(text);
                let person = data.results[0];
                outputPerson(person);
            }
        } catch (e) {
            console.log('error:', request.status, e);
        }

    }

    request.open('GET', 'https://randomuser.me/api');
    request.send();
});
