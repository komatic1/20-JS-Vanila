// we will search from the 
// https://api.lyrics.ovh

const apiURL = 'https://api.lyrics.ovh',
    form = document.querySelector('#form'),
    search = document.querySelector('#search'),
    result = document.querySelector('#result'),
    more = document.querySelector('#more');

// search by song or artist
// variant 1
/*function searchSongs(term) {
    fetch(`${apiURL}/suggest/${term}`)
    .then(res => res.json())
    .then(data => console.log(data));
}*/
// variant 2
async function searchSongs(term) {
    const res = await fetch (`${apiURL}/suggest/${term}`);
    const data = await res.json();

    showData(data);
}

// show data
function showData(data) {
    // 1
    /*let output = '';
    data.data.forEach(song => {
        output += `
        <li>
        <span><strong>${song.artist.name}</strong> - ${song.title}</span>
        <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
        </li>
        `;
    });

    result.innerHTML = `
    <ul class="songs">
    ${output}
    </ul>
    `;
    */

    // 2
    result.innerHTML = `
    <ul class="songs">
    ${data.data.map(song => `<li>
        <span><strong>${song.artist.name}</strong> - ${song.title}</span>
        <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
        </li>`)
    .join('')}
    </ul>
    `;

    if (data.prev || data.next) {
        more.innerHTML = `
        ${data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>` : ''}
        ${data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>` : ''}
        `;
    } else {
        more.innerHTML = '';
    }
}

// more songs
async function getMoreSongs(url) {
    const link = 'https://cors-anywhere.herokuapp.com/' + url.trim();
    const res = await fetch(link);
    const data = await res.json();

    showData(data);
}

// get lyrics
async function getLyrics(artist, song) {
    const res = await fetch(`${apiURL}/v1/${artist}/${song}`);
    const data = await res.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
    result.innerHTML = `<h2><strong>${artist}</strong> - ${song}</h2>
    <span>${lyrics}</span>
    `;
    
    more.innerHTML = '';
}

// event listeners
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value.trim();

    if (!searchTerm) {
        alert('Please type in a search term');
    } else {
        searchSongs(searchTerm);
    }
});

// get lyrics button click
result.addEventListener('click', e => {
    const clickedEl = e.target;

    if (clickedEl.tagName === 'BUTTON') {
        const artist = clickedEl.dataset.artist;
        const song = clickedEl.dataset.songtitle;

        getLyrics(artist, song);
    }
});
