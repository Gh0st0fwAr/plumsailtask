<template>
   <div class="list">
      <div @click="isEditing = !isEditing" class="list__settings">
         <font-awesome-icon icon="fa-gear" />
      </div>
      <div v-if="!isEditing" class="list__data">
         <weather-card :key="index"  v-for="item, index in cardList" :data='item'></weather-card>            
      </div>
      <div v-else class="list__data">
         <draggable @end="endChangingCallback()" handle=".handle" v-if="isEditing" v-model="cardList">
            <div :key="index" v-for="item, index in cardList" class="list__node">
               <div class="list__block">
                  <div class="list__icon handle">
                     <font-awesome-icon icon="fa-bars" />
                  </div>
                  <div class="list__title">{{item.name}}</div>
               </div>
               <div @click="deleteItem(index)" class="list__icon"><font-awesome-icon icon="fa-trash" /></div>
            </div>
         </draggable>
         <div class="list__new">
            <div class="list__add">Add Location</div>
            <div class="list__box">
               <input :class="{'list__input--error' : error}" v-model="city" type="text" class="list__input">
               <button @click="findCity()" class="list__button">Add</button>
            </div>
            <div v-if="error" class="list__error">Wrong city name</div>
         </div>
      </div>
   </div>
</template>

<script>
import WeatherCard from './weatherCard.vue';
import draggable from 'vuedraggable';
import axios from 'axios';
export default {
   components: {
      weatherCard: () => import('./weatherCard.vue'),
      draggable
   },
   data() {
      return {
         isEditing: false,
         cardList: [],
         apiKey: '40fa139243d6032d069e693237b2d614',
         error: false,
         city: ''
      }
   },
   methods: {
      findCity() {
         axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${this.city}&limit=1&appid=${this.apiKey}&units=metric`).then(r => {
           
            if (r.data.length === 0) {
               this.error = true
            } else {
               this.error = false
               const res = r.data[0];
               S.push('cardList', {
                  name: res.name,
                  lat: res.lat,
                  lon: res.lon
               })
               this.redrawList()
            }

         })
      },
      deleteItem(index) {
         S.splice('cardList', index, 1)
         this.redrawList();
      },
      redrawList() {
         this.cardList = S.get('cardList', true)
      },
      endChangingCallback() {
         S.set('cardList', this.cardList, true, true)
      }
   },
   created() {
      this.cardList = S.set('cardList', [], false, true)['cardList'] || S.get('cardList', true)
   }
}
</script>