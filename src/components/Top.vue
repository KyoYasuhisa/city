<template>
  <div class="city">
    <div class="city-list">
      <li v-for="(city, idx) in cities" :key="idx"
          @click="viewCity(city.id)">
        <span class="region">{{city.region}}</span>
        <h2>{{city.name}}, <span>{{city.nation}}</span></h2>
        <span class="discription">{{city.discription}}</span>
        <p class="user">{{city.user}}さんが追加しました。</p>
      </li>
      <div class="city-view"
            v-if="isView"> 
        <div class="view-box"
             v-if="isEdit">
          <input type="text" placeholder="都市名" v-model="selectedCity.name">
          <input type="text" placeholder="都市の所在国" v-model="selectedCity.nation">
          <input type="text" placeholder="都市の所在地域" v-model="selectedCity.region">
          <textarea type="text" placeholder="都市の概要" v-model="selectedCity.discription">
          </textarea>
          <div class="btns">
            <p class="btn"
               @click="isEdit = false">cancel</p>
            <p class="btn"
               @click="saveCity()">save</p>
          </div>
        </div>    
        <div class="view-box"
             v-else>
          <p class="name">{{selectedCity.name}}</p>
          <p class="area">{{selectedCity.nation}}, {{selectedCity.region}}</p>
          <p class="discription">{{selectedCity.discription}}</p>
          <div class="btns"
               v-if="selectedCity.user == user.displayName 
                  || selectedCity.user == 'guest'">
            <p class="btn"
               @click="isEdit = true">edit</p>
            <p class="btn"
               @click="deleteCity()">delete</p>   
          </div>
        </div>
        <div class="bg"
             @click="isView = false"></div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import { db } from '../main'
export default {
  name: 'Top',
  data () {
    return {
      cities: [],
      selectedCity: {},
      selectedCityId: "",
      isView: false,
      isEdit: false,
      user: {},
      username: ''
    }
  },
  firestore () {
    return {
      cities: db.collection('cities').orderBy('name')
    }
  },
  created () {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user
    })
  },
  methods: {
    viewCity (id) {
      db.collection('cities').doc(id).get()
        .then(snapshot => {
          this.selectedCity = snapshot.data()
      })
      this.selectedCityId = id
      this.isView = true
    },
    deleteCity () {
      db.collection('cities').doc(this.selectedCityId)
        .delete()
        .then( () => {
          this.isView = false
        })
    },
    saveCity () {
      if (this.user) {
        this.username = this.user.displayName
      } else {
        this.username = 'guest'
      }
      db.collection('cities').doc(this.selectedCityId)
        .set({ 'name'         : this.selectedCity.name, 
               'nation'       : this.selectedCity.nation, 
               'region'       : this.selectedCity.region,
               'discription'  : this.selectedCity.discription,
               'user'         : this.username,
               'uid'          : this.user.uid
        }).then( () => {
          this.isEdit = false
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  .city-list
    display flex 
    flex-wrap wrap
    justify-content center
    margin-top 50px

    li 
      position relative
      list-style none
      width 250px
      margin 10px
      padding 15px 10px 50px
      border 1px solid #eee
      font-size 12px
      cursor pointer  

      h2
        font-size 15px
      
      .region
        background #555
        color #fff
        padding 5px 20px
        border-radius 20px
      
      .user
        position absolute
        bottom 0
        left 0
        width 100% 
        background #555
        color #fff
        margin 0
        padding 5px 0

  .city-view

    .view-box
      width 60%
      padding 10px
      background #fff
      position fixed
      top 100px
      left 50%
      margin-left -30%
      z-index 10 

      .name
        border 2px solid #555
        border-radius 10px
        padding 5px 15px
        margin 10px 0 0
        display inline-block
      
      .area
        padding-bottom 15px
        margin 10px -10px
        border-bottom 1px solid #eee

      .discription
        padding 0 10%
      
      .btns
        display flex
        flex-wrap wrap
        justify-content center

        .btn
          width 100px
          text-align center
          background #555
          color #fff
          margin 5px
          padding 5px 0
          border-radius 5px
          cursor pointer
      
      input, textarea
        display block
        width 90%
        margin 10px auto
        font-size 15px
        padding 10px
        border 1px solid #eee
        border-radius 5px
      
      textarea 
        height 100px
        resize none

    .bg
      background rgba(0,0,0,.9)
      position fixed
      top 0
      left 0
      right 0
      bottom 0
</style>
