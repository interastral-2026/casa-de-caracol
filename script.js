function initMap() {
    const location = { lat: 38.7169, lng: -9.1390 }; // مختصات فرضی لیسبون

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 18,
        center: location,
        mapTypeId: 'satellite'
    });

    const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: "ساختمان موردنظر",
    });

    marker.addListener("click", () => {
        alert("روی ساختمان کلیک شد! اینجا می‌تونه وارد نمای 3D بشه.");
        // اینجا بعداً بخش Three.js یا مدل 3D رو اضافه می‌کنیم
    });
}

function initMap() {
    const location = { lat: 38.7169, lng: -9.1390 }; // مختصات ساختمان
    const map = new google.maps.Map(document.getElementById("map"), {
      center: location,
      zoom: 19,           // بزرگنمایی بیشتر برای 3D
      mapTypeId: "satellite",
      tilt: 45,           // زاویه دید 3D
      heading: 0,         // چرخش نقشه
    });
  
    const marker = new google.maps.marker.AdvancedMarkerElement({
      position: location,
      map: map,
      title: "ساختمان تستی"
    });
  
    marker.addListener("click", () => {
      alert("روی ساختمان کلیک شد، می‌توانیم مدل 3D را بارگذاری کنیم.");
    });
  }
  