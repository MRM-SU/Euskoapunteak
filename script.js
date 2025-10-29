function DownloadDrive(url) {
    const id = url.match(/https:\/\/drive\.google\.com\/file\/d\/([^\/]+)\/);
    if (id) {
      window.open(`https://drive.usercontent.google.com/u/0/uc?id=${id[1]}&export=download
`,'_blank');
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
            btn.onclick = (e) => DownloadDrive(file)
        })
        tags.split(', ').forEach((tag) => {
            let span = document.body.appendChild(document.createElement('span'))
            span.textContent = tag
        })
    })
})
