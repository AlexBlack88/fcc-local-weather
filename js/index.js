//Go, jQuery, go!

$(document).ready(function(){
  
  // an array of icons which then will change depending on the weather conditions 
  icons = [
    'https://cdn.rawgit.com/AlexBlack88/8171203c936647c0a10d1564c296dcdd/raw/c59b51f46b7579c637b1c40db9f248082e0c5940/thunder.svg',
    'https://cdn.rawgit.com/AlexBlack88/88cdfd236ebfaa45d5e7843dea6ff6e4/raw/30d54e3faea0c5eb8cfec71ccc3194c7bdefc399/rainy-3.svg',
    'https://cdn.rawgit.com/AlexBlack88/56abd4539ebd7cadaa2b5b89c007e11e/raw/736be100b37f7d56a08bdb7a0d3f86c49628115e/rainy-6.svg',
    'https://cdn.rawgit.com/AlexBlack88/093829721cdfb16f61f3127c7d16be72/raw/97948cbc94c75e25cebb2dd686789f18200e2eac/snowy-6.svg',
    'https://cdn.rawgit.com/AlexBlack88/8581dcba0a92879c2b35683c2d8ddfa5/raw/f91d5a77431dd2231733dae06b550ee13e3d8e37/cloudy-day-1.svg',
    'https://cdn.rawgit.com/AlexBlack88/71646c046ba64fa40ce47eea3035b5df/raw/a37d18972c301462c172da1e79f0fc1da94859a0/day.svg',
    'https://cdn.rawgit.com/AlexBlack88/c1d16c03e7221f5be9e9d350281d6416/raw/9bce683097326fed86ca53f9710457605e87c3b8/cloudy.svg'
  ]
  
  var F = false;
  
  //display current temp in celsius
  function fToCel(C, F) {
    if(F) return Math.round(C * (9 / 5) +32) + '&deg; F'
    return Math.round(C) + '&deg; C';
  }
  
  //render function
  function exe(data, F) {
    
    var temp = fToCel(data.main.temp, F);
    var condition = data.weather[0].description;
    
    $('#temp').html(temp);
    $('#condition').html(condition);
    
  }
  
  //get location and weather data and render all
  $.getJSON('https://freegeoip.net/json/').done(function(location){
    //console.log(location);
    $('#city').html(location.city + " ");
    $('#country').html(location.country_name);
    
    
     $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat='+location.latitude+'&lon='+location.longitude+'&units=metric&appid=1d2c48e39d2932aae567b74b284ada27', function(data){
      
      
       exe(data, F);
       // C to F changer
       $('#fc').click(function(){
         F = !F;
         exe(data, F);
       })
       //dynamically changes icons depending on weather  conditions
       var id = data.weather[0].id;
       var iconIndex;
       var iconId = [299, 499, 599, 699, 799, 800];
       
       iconId.push(id);
       iconIndex = iconId.sort().indexOf(id);
       
       $('#icon').html('<img src='+icons[iconIndex]+'>');
       
      });
    
    });
  
  });

//That's All Guys