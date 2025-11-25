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


async function main() {
  var spreadsheet;
  var sheet;
  try {
    let id = parseInt(window.location.hash.slice(1))
    if (Number.isNaN(id)) {
      alert('Invalid ID')
      return
    }
    spreadsheet = await fetch('https://sheets.googleapis.com/v4/spreadsheets/1OtOYmlJOY9b4onvYjBtL21585g_DaaHWiqLH6oIlp_g/values/bdd?key=AIzaSyDwRrD670SxWVqtuPmHpVyb5PxoptznkY4')
          .then(response => response.json());
    sheet = spreadsheet.values[id+1];
    report = await fetch('https://sheets.googleapis.com/v4/spreadsheets/1OtOYmlJOY9b4onvYjBtL21585g_DaaHWiqLH6oIlp_g/values/salaketak?key=AIzaSyDwRrD670SxWVqtuPmHpVyb5PxoptznkY4')
          .then(response => response.json()).then(response => response.values.slice(1));
    ban = await fetch('https://sheets.googleapis.com/v4/spreadsheets/1OtOYmlJOY9b4onvYjBtL21585g_DaaHWiqLH6oIlp_g/values/ban?key=AIzaSyDwRrD670SxWVqtuPmHpVyb5PxoptznkY4')
          .then(response => response.json()).then(response => response.values.slice(1));
    ok = true;
    report.forEach(r => {
      if (r[2] == id) {
        ban.forEach(_ => {
          if (parseInt(_[1]) >= 3 && _[0] == r) {
            ok = 'TRUE'
          }
        })
        if (ok == 'TRUE') {
          ok = true
        } else {
          throw new Error('Apunte hau salatu edo jetsi egin da, ez dago eskuragarri');
          ok = false;
        }
      }
    })
    ban.forEach(_ => {
      console.log(parseInt(_[1]) >= 3,_,sheet[3])
      if (parseInt(_[1]) >= 3 && _[0] == sheet[3]) {
        throw new Error('Erabiltzaile honek erabilera debekatuta du');
        ok = false;
      }
    })
    if (!ok) return;
    console.warn(sheet)
    if (sheet == undefined) {
      throw new Error('Invalid ID');
    }
  } catch ( error ) {
    document.body.innerHTML = `<h1>Error</h1><h3>${error.message}</h3><button onclick="window.parent.close();window.parent.postMessage({action: 'hash',hash: ''}, '*');">Bueltatu</button>`
    document.body.classList.add('error');
    return
  } finally {
    document.querySelector('#title').textContent = sheet[4];
    document.querySelector('#sub').textContent = sheet[5];
    sheet[2].split(',').forEach(tag => {
      let tag_ = document.querySelector('#title').appendChild(document.createElement('span'));
      tag_.id = 'tag';
      tag_.textContent = tag.trim();
    })
    let gmail_ = document.body.appendChild(document.createElement('span'));
    gmail_.id = 'gmail';
    gmail_.textContent = sheet[3];
    gmail_.onclick = () => window.open(`mailto:${sheet[3]}`);
    gmail_.title = 'Mezu bat bidali'

    let download_ = document.body.appendChild(document.createElement('button'));
    download_.textContent = `Deskargatu ${sheet[1].split(',').length} fitxategi`;
    download_.onclick = ()=> sheet[1].split(',').forEach(DownloadDrive);

    document.body.appendChild(document.createElement('br'))
    document.body.appendChild(document.createElement('h3')).textContent = 'Fitxategiak'
    sheet[1].split(',').forEach(async url => {
      let a = document.body.appendChild(document.createElement('a'));



      let cURL = 'https://www.googleapis.com/drive/v3/files/'+getFileID(url)+'?fields=name&key=AIzaSyDwRrD670SxWVqtuPmHpVyb5PxoptznkY4';
      console.log(cURL);
      let li = a.appendChild(document.createElement('li'));
      li.textContent = await fetch(cURL).then(response => response.json()).then(data => data.name);
      
      a.href = url;
    })
  }
}

main()