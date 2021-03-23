// Variables

const formulario = document.querySelector('#formulario');
const listaTweet = document.querySelector('#lista-tweets');

let tweets = [];


// Event Listener

(function eventListeners () {
    formulario.addEventListener('submit', agregarTweet);

    document.addEventListener('DOMContentLoaded',() => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        crearHTML();
       })
})(); // Funcion autoejecutable

// Funciones

function agregarTweet(e) {
    e.preventDefault();
    const tweet = document.querySelector('#tweet').value;
    if(tweet === '') {
        mostrarError('El tweet no puede estar vacio');
        return;
    } 
    const tweetObj = {
        id: Date.now(),
        tweet
    }
    tweets = [...tweets, tweetObj];
    crearHTML();
    formulario.reset();

}

function mostrarError (mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('error');
    const error = document.querySelector('#formulario');
    if (!error.lastElementChild.classList.contains('error')) {
        error.appendChild(mensajeError);
        setTimeout(() => {
            mensajeError.remove();
        }, 2000);
    }
}

function crearHTML(){
    limpiarListaTweets();
    if(tweets.length > 0){
        tweets.forEach( tweet =>{
            const bntDelete = document.createElement('a');
            bntDelete.classList.add('borrar-tweet');
            bntDelete.innerText = 'x';

            bntDelete.onclick = () => {
                borrarTweet(tweet.id);
            }

            const li = document.createElement('li');
            li.innerText = tweet.tweet;
            li.appendChild(bntDelete);
            listaTweet.appendChild(li);
        });
    }
    sincronizarStorage();
}

function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function limpiarListaTweets(){
    while (listaTweet.firstChild){
        listaTweet.removeChild(listaTweet.firstChild);
    }
}

function borrarTweet(id){
    tweets = tweets.filter(tweet => tweet.id !=id);
    crearHTML();
}