import { Espeak } from './espeak.js'

const espeak = new Espeak();

async function speakAsync(text) {
  return new Promise(async (resolve, reject) => {
    try {
      // Genera audio WAV en bytes desde eSpeak
      const wavBytes = await espeak.speak(text, { lang: "eu" });

      // Crea un Blob y un objeto URL para reproducirlo
      const blob = new Blob([wavBytes], { type: "audio/wav" });
      const audio = new Audio(URL.createObjectURL(blob));

      // Espera a que termine la reproducción
      audio.onended = resolve;
      audio.onerror = reject;

      audio.play();
    } catch (err) {
      reject(err);
    }
  });
}

document.addEventListener('DOMContentLoaded',()=>{
  document.querySelector('#tts').addEventListener('click',tts)
})

async function tts() {
  let button = document.querySelector('button#tts');
  if (button.style.cursor == 'progress') return false;
  button.style.cursor = 'progress';
  let content = `
${document.body.querySelector('#title').textContent}
${document.body.querySelector('#sub').textContent}
${document.body.querySelector('#gmail').textContent}
${document.body.querySelector('button:not(#tts)').textContent}
Fitxategiak:
${Array.from(document.querySelectorAll('li')).map(li=>li.textContent).join(',\n')}
  `;
  await speakAsync(content);
  button.style.cursor = 'auto';
}
