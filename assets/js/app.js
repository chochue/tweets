//variables
const listaTweets = document.getElementById('lista-tweets');

//Event Listeners
eventListeners();

function eventListeners(){
    //Cuando se envia el formulario
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);
    //borrar Tweet
    listaTweets.addEventListener('click', borrarTweet);
    document.addEventListener('DOMContentLoaded', localStorageListo);
}


//funciones


//Añadir tweet del formulario

function agregarTweet(e){
    e.preventDefault();
    //leer el valor del textarea
    const tweet = document.getElementById('tweet').value;
    // crear boton eliminar
    crearBoton(tweet);
    //añadir a local storage
    agregarTweetLocalStorage(tweet);
    }

function borrarTweet(e){
    e.preventDefault();
    if (e.target.className === 'borrar-tweet'){
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);
        
    }
}

function agregarTweetLocalStorage(tweet){
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    tweets.push(tweet);
    localStorage.setItem('tweets', JSON.stringify(tweets));
    
}

function obtenerTweetsLocalStorage(){
    let tweets;
    if (localStorage.getItem('tweets') === null){
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets') );
    }
    return tweets;
}

function localStorageListo(){
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    tweets.forEach(function(tweet) {
        crearBoton(tweet);
    });
}

function crearBoton(tweet){
    const btnBorrar = document.createElement('a');
    btnBorrar.classList = 'borrar-tweet';
    btnBorrar.innerText = 'X'; 
    const li = document.createElement('li');
    li.innerText = tweet.trim();
    li.appendChild(btnBorrar);
    listaTweets.appendChild(li);
}

function borrarTweetLocalStorage(tweet){
    let tweets, tweetBorrar;
    tweetBorrar = tweet.substring(0, tweet.length -1);
    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet, index){
        if( tweetBorrar === tweet){
            tweets.splice(index, 1)
           }
        localStorage.setItem('tweets', JSON.stringify(tweets));         
    });
    
    
}