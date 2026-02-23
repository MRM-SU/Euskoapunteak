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

var spreadsheet;
var report;
var ban;

var posts;
var fuse;

function isok(id) {
  ok = true;
  report.forEach(_ => {
    if (_[2] == id && !ban.map(_=>_[0]).includes(_[1])) {
      //throw new Error('Apunte hau salatu edo jetsi egin da, ez dago eskuragarri');
      ok = false;
    }
  })
  ban.forEach(_ => {
    console.log(parseInt(_[1]) >= 3,_,spreadsheet[3])
    if (parseInt(_[1]) >= 3 && _[0] == spreadsheet[3]) {
      //throw new Error('Erabiltzaile honek erabilera debekatuta du');
      ok = false;
    }
  })
  return ok;
}

function search_() {
    const query = document.querySelector('#search input').value;
    const fuseResults = fuse.search(query);
    const matchedSet = new Set(fuseResults.map(r => r.item));
    const matchesBoolean = posts.map(p => matchedSet.has(p));
    console.log(matchesBoolean);
    document.querySelectorAll('#pub').forEach((pub, index) => {
        pub.style.display = matchesBoolean[index] && isok(parseInt(pub.getAttribute('pubID'))) ? 'flex' : 'none';
    })
}

document.addEventListener('DOMContentLoaded', async (event) => {
    document.querySelector('#search input').onchange = search_;
    document.querySelector('#search button').onclick = search_;
    report = await fetch('https://sheets.googleapis.com/v4/spreadsheets/1OtOYmlJOY9b4onvYjBtL21585g_DaaHWiqLH6oIlp_g/values/salaketak?key=AIzaSyDwRrD670SxWVqtuPmHpVyb5PxoptznkY4')
          .then(response => response.json()).then(response => response.values.slice(1));
    spreadsheet = await fetch('https://sheets.googleapis.com/v4/spreadsheets/1OtOYmlJOY9b4onvYjBtL21585g_DaaHWiqLH6oIlp_g/values/bdd?key=AIzaSyDwRrD670SxWVqtuPmHpVyb5PxoptznkY4')
        .then(response => response.json());
    ban = await fetch('https://sheets.googleapis.com/v4/spreadsheets/1OtOYmlJOY9b4onvYjBtL21585g_DaaHWiqLH6oIlp_g/values/ban?key=AIzaSyDwRrD670SxWVqtuPmHpVyb5PxoptznkY4')
          .then(response => response.json()).then(response => response.values.slice(1));

    posts = spreadsheet.values.slice(1).map(([time, files, tags, gmail, title, description]) => ({
        time,
        files,
        tags,
        gmail,
        title,
        description
    }));
    fuse = new Fuse(posts, {
        keys: ["title", "description", "tags"],
        threshold: 0.3
    });
    
    spreadsheet.values.slice(1).forEach(async ([time,files,tags,gmail,title,description],index) => {
        let pub = document.body.appendChild(document.createElement('div'));
        pub.style.display = isok(index) ? 'flex' : 'none';
        pub.id = 'pub';
        pub.setAttribute('pubID',index)
        pub.style.cursor = 'pointer';
        
        pub.onclick = () => {
            window.parent.postMessage({
                action: "hash",
                hash: index
            }, "*");
        }

        let main = document.createElement('div');
        main.id = 'main';
        pub.appendChild(main);

        let top = document.createElement('div');
        top.id = 'top';
        main.appendChild(top);

        let tags_ = document.createElement('div');
        tags_.id = 'tags';
        top.appendChild(tags_);

        console.log({time,files,tags,gmail,title,description})
        console.log(title)

        let title_ = top.appendChild(document.createElement('h1'));
        title_.textContent = title
        title_.appendChild(document.createElement('button')).id = 'tts' // -------------------------------- < [ TTS ]
        let description_ = main.appendChild(document.createElement('p'));
        description_.textContent = description

        tags.split(',').forEach(tag => {
            let tag_ = tags_.appendChild(document.createElement('span'));
            tag_.textContent = tag.trim();
            tag_.classList.add('tag');
            tag_.id = 'tag';
        })

        let pfp = pub.appendChild(document.createElement('div'));
        pfp.id = 'pfp';
        const user = gmail.split('@')[0];
        const span = pfp.appendChild(document.createElement('span'));
        span.textContent = user[0].toUpperCase();
        span.title = gmail;
    })

})



