import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import { detecIcon, detecType, setStorage } from "./helpers.js";

//! HTML'den gelenler
const form = document.querySelector("form");
const list = document.querySelector("ul");


//! Olay izleyicileri
form.addEventListener("submit",handleSubmit);
list.addEventListener("click", handleClick);

//!Ortak kullanim alani
var map;
var layerGroup = [];
var notes = JSON.parse(localStorage.getItem ("notes")) || [];
var coords = [];

/*

* kullanicinin konumunu ogrenmek icin getCurrentPosition methodunu kullandik ve bizden iki parametre istedi.
* 1. Kullanci konum iznini verdiginde calisacak fonksiyondur.
*2.Kullanici konum iznini vermediginde calisacak fonksiyondur.Kullanci */

navigator.geolocation.getCurrentPosition(loadMap, errorFunction);
function errorFunction() {
    ("hata");
}
//* Haritaya tiklaninca calisir
function onMapClick(e){
    //*Haritaya tiklandiginda  form bileseninin display özelligini flex yaptik
    form.style.display = "flex";
    console.log(e);
    //* Harita da tikladigimiz yerin koordinatlarini coords dizisi icerisine aktardik.
    coords =[e.latlng.lat, e.latlng.lng];
    coords;
}
//* Kullaniciniun konumuna göre haritayi aktarir.
function loadMap(e) {
console.log(e);
    //* 1.Haritanin kurulumu
    map = L.map("map").setView([e.coords.latitude, e.coords.longitude], 10);
    L.control;
    //* Haritanin nasil gozukecegini belirler.
    L.control;
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

 //* 3.Harita da ekrana abasilacak imlecleri tutacagimiz katman
 layerGroup = L.layerGroup().addTo(map);
 //*  localden gelen notlari listeleme
 renderNoteList(notes);

  //* Harita da bir tiklanma oldugunda calisacak fonksiyon.
 map.on("click",onMapClick);
}
function renderMarker(item) {
    console.log(item);
    // L.marker([50.505, 30.57], {icon: myIcon}).addTo(map);
    //marker i olusturur

    L.marker(item.coords, {icon:detecIcon(item.status) })
    .addTo(layerGroup)
    .bindPopup(`${item.desc}`);
}
function handleSubmit(e){
    e.preventDefault();
    e;
    
    //* Sayfanin yenilenmesini engeller.

    const desc = e.target[0].value; //* Formun icerisinde ki text inputun degerini alma.
    const date = e.target[1].value; //* Formun icerisinde ki date inputunun degerini alma.
    const status = e.target[2].value; //* Formun icerisinde ki seleckt yapisinin degerini alma.

  notes.push({
        id: uuidv4(),
        desc,
        date,
        status,
        coords,
    });
    //* Local storage guncelle
    setStorage(notes);

    // * renderNotelist fonksiyonuna parametre olarak notes dizisini gonderdik.
    renderNoteList(notes);

    //* Form gonderildiginde kapat
    form.style.display = "none";
 }
    //* Ekrana notlari aktaracak fonskiyon
    function renderNoteList(item){
        //* Notlar list alanini temizle
        list.innerHTML = "";
        //*Makerlari temizler
        layerGroup.clearLayers();
        //* Herbir not icin fonksiyon bir li etiketi olusturur ve icerisini gunceller.
        item.forEach((item) => {
        const listElement = document.createElement("li");
        //* Bir li etiketi olusturur.
        listElement.dataset.id = item.id; //* Li etiketine data-id ozelligi ekleme.
        listElement.innerHTML = `
        <div>
              <p>${item.desc}</p>
              <p><span>Tarih:</span>${item.date}</p>
              <p><span>Durum:</span>${detecType(item.status)}</p>
            </div>
            <i class="bi bi-x" id="delete"></i>
            <i class="bi bi-airplane-fill" id="fly"></i>
            
            `;
        list.insertAdjacentElement("afterbegin",listElement);
        renderMarker(item);

        });
    }
    //*Note alanin da tiklanma olayini izler
function handleClick(e) {
    //* Guncellenecek elemanin id'sini ogrenmek iocin parentelement yontemini kullandik.
    const id = e.target.parentElement.dataset.id;
    console.log("idd" ,id);
    if(e.target.id === "delete"){
        //* idsini bildigimiz  elemani diziden filter yontemi kullanarak kaldirdik.
     notes= notes.filter((note) => note.id != id );
     setStorage(notes); //* localstorage guncelle
     renderNoteList(notes); //*ekrani guncelle
    } 
    if(e.target.id === "fly") {
      const note =  notes.find((note) => note.id == id); // Tikladigimiz elemanin id si ile dizi icerinde ki elemanlardan herhangi birinin id si eslesirse bul.
        console.log(note);
        map.flyTo(note.coords); //* Haritayi buldugumuz elemana yonlendirmesi icin flyTo methodunu kullandik.
    }
}
