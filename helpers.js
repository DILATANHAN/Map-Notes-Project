//* Tipi analiz edip ona gore fonksiyonun cagrildigi yere ,tipe denk gelen aciklamayi gonderir. 

export const detecType = (type) => {
    switch (type) {
        case "park":
            
            return "Park Yeri";
        case "home":
           
            return "Ev";
        case "job":
        
            return "is";
        case "goto":
          
            return "ziyaret";
    }
};
//* Local storage i guncelleyecek fonksiyon
export const setStorage = (data) => {
    //* Veriyi locale gondermek icin stringe cevirme
    const strData = JSON.stringify(data);

    //* localStoraga veriyi gonderdik
    localStorage.setItem("notes", strData);
};
var carIcon = L.icon({
    iconUrl: "car.png",
    iconSize: [50, 60],
});
var homeIcon = L.icon({
    iconUrl: "home-marker.png",
    iconSize: [50, 60],
});
var jobIcon = L.icon({
    iconUrl: "job.png",
    iconSize: [50, 60],
});
var visitIcon = L.icon({
    iconUrl: "visit.png",
    iconSize: [50, 60],
});

export const detecIcon = (type) => {
    switch (type) {
      case "park":
        return carIcon;
      case "home":
        return homeIcon;
      case "job":
        return jobIcon;
      case "goto":
        return visitIcon;
    }
  };