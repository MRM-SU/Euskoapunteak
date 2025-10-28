document.addEventListener('DOMContentLoaded', async (event) => {
    let spreadsheet = await fetch('https://sheets.googleapis.com/v4/spreadsheets/1OtOYmlJOY9b4onvYjBtL21585g_DaaHWiqLH6oIlp_g/values/bdd?key=AIzaSyDwRrD670SxWVqtuPmHpVyb5PxoptznkY4')
        .then(response => response.json())
        .then(json => json.values);
    
    spreadsheet.values.slice(1).forEach(([time,file,tags,gmail]) => {
        file.split(', ').forEach((url) => {
            let btn = document.body.appendChild(document.createElement('button'))
            btn.textContent = 'Descargar';
        })
        tags.split(', ').forEach((tag) => {
            let span = document.body.appendChild(document.createElement('span'))
            span.textContent = tag
        })
    })
})