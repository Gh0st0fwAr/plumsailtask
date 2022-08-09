<template>
   <div class="widget__card">
      
      <div class="widget__title">{{data.name}}</div>
      <div class="widget__box">
         <img :src="`http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`" class="widget__picture"></img>
         <div class="widget__temperature">{{ (weatherInfo.main.temp - 273).toFixed(1) + '&#176;C'}}</div>
      </div>
      <div class="widget__data">
         <div class="widget__row widget__text">{{'Feels like ' + 
            (weatherInfo.main.feels_like - 273).toFixed(1) + '&#176;C. ' + capitalize(weatherInfo.weather[0].description)}}</div>
         <div class="widget__row">
            <div class="widget__block">
               <div class="widget__icon"></div>
               <div class="widget__subtitle">{{weatherInfo.wind.speed + 'm/s ' + weatherInfo.wind.deg + 'deg'}}</div>
            </div>
            <div class="widget__block">
               <div class="widget__icon"></div>
               <div class="widget__subtitle">{{weatherInfo.main.pressure + 'hPa'}}</div>
            </div>
         </div>
         <div class="widget__row">
            <div class="widget__block">
               <div class="widget__subtitle">Humidity</div>
               <div class="widget__value">{{weatherInfo.main.humidity + '%'}}</div>
            </div>
            <div class="widget__block">
               <div class="widget__subtitle">Dew point:</div>
               <div class="widget__value">0&#176;C</div>
            </div>
         </div>
         <div class="widget__row">
            <div class="widget__block">
               <div class="widget__subtitle">Visibility:</div>
               <div class="widget__value">{{weatherInfo.visibility / 1000 + 'km'}}</div>
            </div>
         </div>
      </div>
   </div>
</template>


<script>

import axios from 'axios';

export default {
   props: {
      data: Object
   },
   data() {
      return {
         apiKey: '40fa139243d6032d069e693237b2d614',
         // Data in order to avoid error in the initial rendering
         weatherInfo: {
         "coord": {
            "lon": -122.08,
            "lat": 37.39
         },
         "weather": [
            {
               "id": 800,
               "main": "Clear",
               "description": "clear sky",
               "icon": "01d"
            }
         ],
         "base": "stations",
         "main": {
            "temp": 282.55,
            "feels_like": 281.86,
            "temp_min": 280.37,
            "temp_max": 284.26,
            "pressure": 1023,
            "humidity": 100
         },
         "visibility": 10000,
         "wind": {
            "speed": 1.5,
            "deg": 350
         },
         "clouds": {
            "all": 1
         },
         "dt": 1560350645,
         "sys": {
            "type": 1,
            "id": 5122,
            "message": 0.0139,
            "country": "US",
            "sunrise": 1560343627,
            "sunset": 1560396563
         },
         "timezone": -25200,
         "id": 420006353,
         "name": "Mountain View",
         "cod": 200
         }   
      }
   },
   methods: {
      capitalize(string) {
         return string.charAt(0).toUpperCase() + string.slice(1);
      },
      requestWeather() {
         axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.data.lat}&lon=${this.data.lon}&appid=${this.apiKey}`).then(r => {
            this.weatherInfo = r.data
         })
      }
   },
   created() {
      this.requestWeather()
   }
}
</script>