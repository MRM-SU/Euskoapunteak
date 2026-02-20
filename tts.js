async function speakAsync(text) {
  return new Promise(async (resolve, reject) => {
    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "es-EU";
      speechSynthesis.speak(utterance);
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
