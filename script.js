function getFileID(url) {
    return url.match(/https\:\/\/drive\.google\.com\/open\?id\=([^\/]+)/)[1];
}

function DownloadDrive(url) {
    let id = getFileID(url)
    if (id) {
      window.open(`https://drive.usercontent.google.com/u/0/uc?id=${id}&export=download
`,'_blank');
    }
    return true
};

document.addEventListener('DOMContentLoaded', async (event) => {
    let spreadsheet = await fetch('https://sheets.googleapis.com/v4/spreadsheets/1OtOYmlJOY9b4onvYjBtL21585g_DaaHWiqLH6oIlp_g/values/bdd?key=AIzaSyDwRrD670SxWVqtuPmHpVyb5PxoptznkY4')
        .then(response => response.json());
    
    spreadsheet.values.slice(1).forEach(async ([time,files,tags,gmail,title,description]) => {

        let btn = document.body.appendChild(document.createElement('button'))
        btn.textContent = 'Descargar todo';
        btn.onclick = (e) => {
            files.split(', ').forEach((url) => {
                DownloadDrive(url)
            })
        }
        files.split(', ').forEach(file => {
            const id = getFileID(file)
            let img = document.body.appendChild(document.createElement('img'))
            let url = `https://drive.usercontent.google.com/u/0/uc?id=${id}&export=view`

            (async () => {
                const blob = await fetch(url).then(r => r.blob());
                img.src = URL.createObjectURL(blob);
            })();
            //prev.src = `https://drive.google.com/file/d/${id}/preview`
        })
        let pfp = document.body.appendChild(document.createElement('div'));
        const user = gmail.split('@')[0];
        pfp.style.setProperty('--col',Array.from(user).map((_,i)=>user.charCodeAt(i)).reduce((acc,val)=>acc+val,0))
        pfp.innerHTML = await fetch('pfp.svg').then(response => response.text())
    })
})
