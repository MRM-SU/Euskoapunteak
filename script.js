function DownloadDrive(url) {
    const match = url.match(/https:\/\/drive\.google\.com\/file\/d\/([^\/]+)\/view/);
    if (match) {
      window.open(match[1],'_blank');
    }
    return true
};

document.addEventListener('DOMContentLoaded', async (event) => {
    let spreadsheet = await fetch('https://sheets.googleapis.com/v4/spreadsheets/1OtOYmlJOY9b4onvYjBtL21585g_DaaHWiqLH6oIlp_g/values/bdd?key=AIzaSyDwRrD670SxWVqtuPmHpVyb5PxoptznkY4')
        .then(response => response.json());
    
    spreadsheet.values.slice(1).forEach(([time,file,tags,gmail]) => {
        file.split(', ').forEach((url) => {
            let btn = document.body.appendChild(document.createElement('button'))
            btn.textContent = 'Descargar';
            btn.onclick = (e) => Download(file)
        })
        tags.split(', ').forEach((tag) => {
            let span = document.body.appendChild(document.createElement('span'))
            span.textContent = tag
        })
    })
})
