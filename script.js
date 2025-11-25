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

var posts;
var fuse;

function search_() {
    const query = document.querySelector('#search input').value;
    const fuseResults = fuse.search(query);
    const matchedSet = new Set(fuseResults.map(r => r.item));
    const matchesBoolean = posts.map(p => matchedSet.has(p));
    console.log(matchesBoolean);
    document.querySelectorAll('#pub').forEach((pub, index) => {
        pub.style.display = matchesBoolean[index] ? 'flex' : 'none';
    })
}

document.addEventListener('DOMContentLoaded', async (event) => {
    document.querySelector('#search input').onchange = search_;
    document.querySelector('#search button').onclick = search_;
    spreadsheet = await fetch('https://sheets.googleapis.com/v4/spreadsheets/1OtOYmlJOY9b4onvYjBtL21585g_DaaHWiqLH6oIlp_g/values/bdd?key=AIzaSyDwRrD670SxWVqtuPmHpVyb5PxoptznkY4')
        .then(response => response.json());

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
        pub.id = 'pub';
        pub.style.cursor = 'pointer';
        pub.onclick = () => window.location.href = `./document.html#${index}`;

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
    })
})