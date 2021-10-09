new Vue({
    el: '#musicapp',
    data:{
      songlist:[
          {id:"0",title:"Check it Out",filename:"./music/Check_It_Out.mp3",desc:"BGM of the public space \"The Playground\""},
          {id:"1",title:"Battle of BRS",filename:"./music/Battle_of_BRS.mp3",desc:"Amazing BRS song"},
          {id:"2",title:"LocoRoco Island Ambience",filename:"./music/LocoRoco Island Ambience.mp3",desc:"Amazing BRS song"},
          {id:"3",title:"LocoRoco Title Theme",filename:"./music/LocoRoco Title Theme.mp3",desc:"LocoRoco Title Theme"}
      ],
      audio: new Audio(),
      currentSong: 1,
      currentTime: 0,
      duration: 0,
      perTime: 0,
      isPlaying: false,
      seekerFocused: false,
      src: "./music/LocoRoco Island Ambience.mp3",
      songTitle:"Check it Out",
      desc:"BGM of the public space \"The Playground\"",
      vol: 50
    },
    vuetify: new Vuetify(),
    mounted: function () {
        this.audio.src = this.src;
        this.audio.load();
        this.audio.volume = this.vol/100;
        this.audio.addEventListener('canplay', () => {
            this.duration = this.audio.duration;
        });
        this.audio.addEventListener('timeupdate', () => {
            this.currentTime = this.audio.currentTime;
        });
    },
    watch:{
        vol(value) {
			this.audio.volume = this.vol / 100;
		},
        nowtime(value){
            this.audio.currentTime = value;
        },
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
        setNewSong: function(value){
            var newsong = this.songlist[value];
            this.audio.src = this.songlist[value].filename;
            this.audio.load();
            this.songTitle = newsong.title;
            this.desc = newsong.desc;
        }
    },
    computed:{
        volumeIcon() {
            if (this.muted) {
              return this.muteVolumeIcon;
            } else if (this.volume === 0) {
              return this.lowVolumeIcon;
            } else if (this.volume >= 50) {
              return this.highVolumeIcon;
            } else {
              return this.mediumVolumeIcon;
            }
        },
        currentMinsec: function(){
            var num = this.currentTime;
            var min = Math.floor(num % (24 * 60 * 60) % (60 * 60) / 60);
            var retmin = ( '00' + min ).slice( -2 );
            var sec = Math.round(num % (24 * 60 * 60) % (60 * 60) % 60);
            var retsec = ( '00' + sec ).slice( -2 );
            var curtime = retmin + ":" + retsec;
            return curtime;
        },
        durationMinsec: function(){
            var num = this.duration;
            var min = Math.floor(num % (24 * 60 * 60) % (60 * 60) / 60);
            var retmin = ( '00' + min ).slice( -2 );
            var sec = Math.round(num % (24 * 60 * 60) % (60 * 60) % 60);
            var retsec = ( '00' + sec ).slice( -2 );
            var curtime = retmin + ":" + retsec;
            return curtime;
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