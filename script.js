const APIkey = '7ad30d1dc45a4f1584f7eb38d800f978';
const jokesApiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Functions

const toggleButton = () => {
  button.toggleAttribute('disabled');
};

const playJoke = (joke) => {
  VoiceRSS.speech({
    key: APIkey,
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
};

const getJoke = async () => {
  let joke = '';
  try {
    const response = await fetch(jokesApiUrl);
    const data = await response.json();
    // For two parts jokes
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else { // For one part jokes
      joke = data.joke;
    }
    toggleButton();
    playJoke(joke);
  } catch (error) {
    console.error(error);
  }
};

// Event listeners

button.addEventListener('click', getJoke);
audioElement.addEventListener('ended', toggleButton);
