function getFileID(url) {
    return url.match(/https\:\/\/drive\.google\.com\/open\?id\=([^\/]+)/)[1];
}

function DownloadDrive(url) {
    getFileID(url)
    if (id) {
      window.open(`https://drive.usercontent.google.com/u/0/uc?id=${id}&export=download
`,'_blank');
    }
    return true
};

document.addEventListener('DOMContentLoaded', async (event) => {
    let spreadsheet = await fetch('https://sheets.googleapis.com/v4/spreadsheets/1OtOYmlJOY9b4onvYjBtL21585g_DaaHWiqLH6oIlp_g/values/bdd?key=AIzaSyDwRrD670SxWVqtuPmHpVyb5PxoptznkY4')
        .then(response => response.json());
    
    spreadsheet.values.slice(1).forEach(([time,files,tags,gmail,title,description]) => {

        files.split(', ').forEach((url) => {
            let btn = document.body.appendChild(document.createElement('button'))
            btn.textContent = 'Descargar';
            btn.onclick = (e) => DownloadDrive(url)
        })
        files.split(', ').forEach(file => {
            const id = getFileID(file)
            let prev = document.body.appendChild(document.createElement('iframe'))
            prev.src = `https://drive.google.com/file/d/${id}/preview`
            tags.split(', ').forEach((tag) => {
                let span = document.body.appendChild(document.createElement('span'))
                span.textContent = tag
        })
        })
    })
})
