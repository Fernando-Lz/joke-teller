// VoiceRSS Javascript SDK
const APIkey = '7ad30d1dc45a4f1584f7eb38d800f978';
const jokesApiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Text to speech minified sdk
const VoiceRSS = {
  speech(e) { this._validate(e), this._request(e); }, _validate(e) { if (!e) throw 'The settings are undefined'; if (!e.key) throw 'The API key is undefined'; if (!e.src) throw 'The text is undefined'; if (!e.hl) throw 'The language is undefined'; if (e.c && e.c.toLowerCase() != 'auto') { let a = !1; switch (e.c.toLowerCase()) { case 'mp3': a = (new Audio()).canPlayType('audio/mpeg').replace('no', ''); break; case 'wav': a = (new Audio()).canPlayType('audio/wav').replace('no', ''); break; case 'aac': a = (new Audio()).canPlayType('audio/aac').replace('no', ''); break; case 'ogg': a = (new Audio()).canPlayType('audio/ogg').replace('no', ''); break; case 'caf': a = (new Audio()).canPlayType('audio/x-caf').replace('no', ''); } if (!a) throw `The browser does not support the audio codec ${e.c}`; } }, _request(e) { const a = this._buildRequest(e); const t = this._getXHR(); t.onreadystatechange = function () { if (t.readyState == 4 && t.status == 200) { if (t.responseText.indexOf('ERROR') == 0) throw t.responseText; audioElement.src = t.responseText, audioElement.play(); } }, t.open('POST', 'https://api.voicerss.org/', !0), t.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8'), t.send(a); }, _buildRequest(e) { const a = e.c && e.c.toLowerCase() != 'auto' ? e.c : this._detectCodec(); return `key=${e.key || ''}&src=${e.src || ''}&hl=${e.hl || ''}&r=${e.r || ''}&c=${a || ''}&f=${e.f || ''}&ssml=${e.ssml || ''}&b64=true`; }, _detectCodec() { const e = new Audio(); return e.canPlayType('audio/mpeg').replace('no', '') ? 'mp3' : e.canPlayType('audio/wav').replace('no', '') ? 'wav' : e.canPlayType('audio/aac').replace('no', '') ? 'aac' : e.canPlayType('audio/ogg').replace('no', '') ? 'ogg' : e.canPlayType('audio/x-caf').replace('no', '') ? 'caf' : ''; }, _getXHR() { try { return new XMLHttpRequest(); } catch (e) {} try { return new ActiveXObject('Msxml3.XMLHTTP'); } catch (e) {} try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch (e) {} try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch (e) {} try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch (e) {} try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch (e) {} throw 'The browser does not support HTTP request'; },
};

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
