async function speakAsync(text) {
  return new Promise(async (resolve, reject) => {
    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "es-EU";

      utterance.onend = () => resolve();
      utterance.onerror = (err) => reject(err);
      
      speechSynthesis.speak(utterance);
    } catch (err) {
      reject(err);
    }
  });
}

document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('#tts').forEach(ttsEl=>ttsEl.addEventListener('click',tts))
})

async function tts(event) {
  let button = event.target;
  if (button.style.cursor == 'progress') return false;
  button.style.cursor = 'progress';
  let pub = button.parentElement.parentElement;
  let content = `
${pub.querySelector('h1').textContent}
${Array.from(pub.querySelector('.tag')).map(t=>t.textContent).join(', ')}
${document.body.querySelector('p').textContent}
${document.body.querySelector('#pfp span').title}
  `;
  await speakAsync(content);
  button.style.cursor = 'auto';
}
