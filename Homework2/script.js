// Create API
document.getElementById('btnsubmit').onclick = function() {
    alert("tittle and description has submited");
    }

const getTrackInfo = (url)=>{
    return fetch(url)
        .then((response) =>response.json())
        .catch((err) => {
            console.log(err);
            alert("Fethc data failed!");
        });
};

// Handel form create playlist
const handleSubmit = (e) => {
    e.prefentDefault();
    const formData = new FormData(e.target);
    for (let pair of formData.entries()){
        console.log(pair[0] + ": " + pair[1]);
    }
    console.log(formData);
    alert("We did it");
};

// Load the data
const showLoading = (isLoading) =>{
    const imageCover = document.getElementsByClassName("cover")[0];
    const musicTitle = document.getElementsByClassName("name");
    const musicArtist = document.getElementsByClassName("artist");
    const musicAlbum = document.getElementsByClassName("album");
    const button = document.getElementById("btnplay");
    const elements = [imageCover, musicTitle, musicArtist, musicAlbum, button];
    elements.forEach((element) => {
        if(isLoading){
            element.classList.add("skeleton");
        } else {
            element.classList.remove("skeleton");
        }
    });
};
showLoading(true);

// render Track
const renderTrackData = (data) => {
    const {album, artist, external_url, name} = data;
    const imageCover = document.getElementsByClassName("cover")[0];
    const musicTitle = document.getElementsByClassName("name");
    const musicArtist = document.getElementsByClassName("artist");
    const musicAlbum = document.getElementsByClassName("album");

    // reducing track for many artist
    const artistText = artists.reduce(
        (acc, artist) =>
            (acc += `<a href="${artist.external_urls.spotify}">${artist.name}</a> `),""
    );
    imageCover.innerHTML = `<img class='image' src="${album.images[0].url}" alt="${album.name}">`;
    musicTitle.innerHTML = `<a href="${external_urls.spotify}">${name}</a>`;
    musicArtist.innerHTML = `<a href="${external_urls.spotify}">${artistText}</a>`;
    musicAlbum.innerHTML = `<a href="${album.external_urls.spotify}">${album.name}</a>`;
};

// execute when document is ready
window.addEventListener("load", function(){
    const form = document.getElementsByClassName("playlist-submit");
    form.addEventListener("submit", handleSubmit);
    const trackUrl = 
    "https://gist.githubusercontent.com/aryapradipta9/e6492383477803b233916e01f36d5465/raw/66942c739d66d3774303f84071696aa865a07077/single-sample.json";;

    getTrackInfo(trackUrl).then((data) => {
        console.log(data);
        renderTrackData(data);
        showLoading(false);
    });
});