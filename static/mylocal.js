function startpoint(){
    var box = document.getElementById('box');
    var start = document.getElementById('start_point');
    var end = document.getElementById('end_point');
    if (box.checked && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        // document.getElementById('start').value = navigator.geolocation.getCurrentPosition();
    }
    else if (navigator.geolocation == false) {
        alert('Location services unavalible.');
    }
    else if (box.checked != true && start.value == '') {
        alert('Please enter a starting location or select use current location.')
    }
    // else if (end.value == ''){
    //     alert('Please enter an ending point.');
    // }
    else {

    }
}

function showPosition(position)
  {
  alert(position.coords.latitude + " " + position.coords.longitude);
  // post
  // http://uk-postcodes.com/latlng/[latitude],[longitude].xml
  // get response
  // http://uk-postcodes.com/postcode/[postcode].xml
  // trim to fit
  // startpoint.value = [postcode]
  //
  // see jquery post api
  //
  // e.g.
  // http://uk-postcodes.com/latlng/51.7551089,-1.2249575.xml
  // http://uk-postcodes.com/postcode/OX37TS.xml
  }
