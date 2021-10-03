new Vue({
    el: '#musicapp',
    data:{
      songlist:[
          {id:"1",title:"Check it Out",filename:"./music/Check_It_Out.mp3",description:"BGM of the public space \"The Playground\""},
          {id:"2",title:"Battle of BRS",filename:"./music/Battle_of_BRS.mp3"}
      ],
      audio: new Audio(),
      currentSong: 1,
      currentTime: 0,
      duration: 0,
      perTime: 0,
      isPlaying: false,
      seekerFocused: false,
      src: "./music/Check_It_Out.mp3",
      vol: 1
    },
    vuetify: new Vuetify(),
    mounted: function () {
        this.audio.src = this.src;
        this.audio.load();
        this.audio.addEventListener('canplay', () => {
            this.duration = this.audio.duration;
        });
        this.audio.addEventListener('timeupdate', () => {
            this.currentTime = this.audio.currentTime;
        });
    },
    watch:{
        playing(value) {
            if (value) {
              return this.$refs.audio.play();
            }
            this.$refs.audio.pause();
        },
        volume() {
            this.muted = false;
        }
    },
    methods:{
        play: function(){
            this.audio.play();
            this.isPlaying = true;
        },
        pause: function(){
            this.audio.pause();
            this.isPlaying = false;
        },
        skipPrev: function(){},
        skipNext: function(){},
        setVolume(value) {
            this.volume = value;
            this.$refs.audio.volume = value / 100;
        }
    },
    computed:{
        volchange: function(){
            if (!this.vol) return;
            volume = parseFloat(volume) || 0.0;
            volume = (volume < 0) ? 0 : volume;
            volume = (volume > 1) ? 1 : volume;
            this.vol.gain.value = volume;
            this.audio.volume = this.vol;
        }
    },
    theme: {
        themes: {
          light: {
            background: "none"
          }
        }
    }
})