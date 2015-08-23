

//� �������� ������������ ������������� ����� ������ � ������ ����� ���������� ���������� API ��������� ����� �� ����������� �������� � �������� ������������.
// ������� ������ �� ���������, ������ �����.

var map

var homeSize = 222 // ������ ����� ���������� ������ � ������ �� �����

var home = [
	// �������
	{color : 'brown', points : [ [-2, -1], [-2, 3], [2, 3], [2, -1] ], },
	// �����������
	{color : 'red', points : [ [ -3, -1], [ 3, -1], [0, -3] ]},

]; // � ��������� ������� - �� ������� ; ����� ��� � ����� ��������

// ����� ����� (������ � ��������������� ����)
var mapCenter = {
	zoom: 11,
	center: {
		lat: 55.7508302, 
		lng: 37.6131286 
	}
};

// ����� ������ (���� ����� ������)
var homePlace = {
	// ���������� ������ ����
	lat : mapCenter.center.lat,
	lng : mapCenter.center.lng,
};


function initMap() {

	// �����
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: mapCenter.zoom,
		center: mapCenter.center, 
		mapTypeId: google.maps.MapTypeId.TERRAIN
	})

  	// ����� ������� ����� ������ � ������� ���   geometry.spherical �����������
  	var center = new google.maps.LatLng(homePlace.lat, homePlace.lng)
  
  	for (var i in home){
	  	// ������������ ���������� ������ � lat/lng
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

		// �������� �������
		var poly = new  google.maps.Polygon({
			paths: paths,
			strokeColor: home[i].color,
			strokeOpacity: 0.8,
			strokeWeight: 4,
			fillColor: '#FF0000',
			fillOpacity: 0
		})
		
		// �������� ��� � �����
		poly.setMap(map)

	}

}


