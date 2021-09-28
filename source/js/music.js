new Vue({
    el: '#musicapp',
    data:{
      songlist:[
          {id:"1",title:"Check it Out",filename:"Check_It_Out.mp3",description:"BGM of the public space \"The Playground\""},
          {id:"2",title:"Battle of BRS",filename:"Battle_of_BRS.mp3"}
      ],
      currentSong:"1",
    },
    vuetify: new Vuetify(),
})