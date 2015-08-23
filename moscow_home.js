//В браузере отображается интерактивная карта Москвы и поверх карты средствами выбранного API нарисован домик из коричневого квадрата и красного треугольника.
// Заливка домика не требуется, только линии.

var map

var homeSize = 250 // размер одной координаты домика в метрах на карте

var home = [
	// квадрат
	{color : 'brown', points : [ [-2, -1], [-2, 3], [2, 3], [2, -1] ], },
	// треугольник
	{color : 'red', points : [ [ -3, -1], [ 3, -1], [0, -3] ]},

]; // я использую нотацию - не ставить ; кроме как в конце структур

// Центр карты (ёлочка в александровском саду)
var mapCenter = {
	zoom: 11,
	center: {
		lat: 55.7508302, 
		lng: 37.6131286 
	}
};

// место домика (пока возле ёлочки)
var homePlace = {
	// Координаты центра дома
	lat : mapCenter.center.lat,
	lng : mapCenter.center.lng,
};


function initMap() {

	// карта
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: mapCenter.zoom,
		center: mapCenter.center, 
		mapTypeId: google.maps.MapTypeId.TERRAIN
	})

  	// сразу приведём центр домика к удобным для   geometry.spherical координатам
  	var center = new google.maps.LatLng(homePlace.lat, homePlace.lng)
  
  	for (var i in home){
	  	// переобразуем координаты домика в lat/lng
		var paths = home[i].points.map(function(a){ 

			var c = new google.maps.geometry.spherical.computeOffset(
						new google.maps.geometry.spherical.computeOffset(
							center, 
							homeSize*a[1], 
							180 ), 
					homeSize * a[0], 
					90)

			return {lat : c.G, lng : c.K};

		  })

		// нарисуем полигон
		var poly = new  google.maps.Polygon({
			paths: paths,
			strokeColor: home[i].color,
			strokeOpacity: 0.8,
			strokeWeight: 4,
			fillColor: '#FF0000',
			fillOpacity: 0
		})
		
		// привяжем его к карте
		poly.setMap(map)

	}

}
