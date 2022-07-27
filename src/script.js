import iconImg  from './img/icon-location.svg';

const dataIP = document.querySelector('.data-IP');
const dataLocation  = document.querySelector('.data-location');
const dataTimezone = document.querySelector('.data-timezone');
const dataISP = document.querySelector('.data-ısp');
const dataSection = document.querySelector('.data');
const inputText = document.querySelector('.searchInput');
const searchButton = document.querySelector('.searchButton');
let lat,lng,map;


const getValueOfInput = function(){     
    const  input = inputText.value;
    geoAPI(input);
   
}

// Events (Enter,click)
inputText.addEventListener('keypress',(e) => {
    if(e.key === 'Enter'){
        getValueOfInput();
    }
});

searchButton.addEventListener('click', getValueOfInput);


const geoAPI = async function(input){
    
    try{
    const res  = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_zLbVjPXrKNY0v9Si8fOIY2p6Z1cWE&ipAddress=${input}`);
    if(!res.ok) throw new Error('Problem about process of fetching API');
    const data = await res.json();
   
    // put the data in data section
   
    dataIP.textContent = data.ip;
    dataLocation.textContent = `${data.location.region}, ${data.location.country}`;
    dataTimezone.textContent = `UTC ${data.location.timezone}`;
    dataISP.textContent = data.isp;
    dataSection.style.opacity = 1; // opacity change

    //  assign lat,lng informations
    lat = data.location.lat;
    lng =  data.location.lng;
    
    if (map != undefined) { map.remove(); } //check, if map container is  already  initialized
    createMap(lat,lng);
    
}   catch(err){
    alert(err);
    dataSection.style.opacity = 0;
}   
}


const createMap = function(lat,lng){
    
    map = L.map('map').setView([lat, lng], 15);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const myIcon =  L.icon({ 
        iconUrl: iconImg 
    });
    L.marker([lat,lng], {icon: myIcon}).addTo(map);

}
