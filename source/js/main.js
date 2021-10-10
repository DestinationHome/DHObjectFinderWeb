var docdoc =[];
function getDb(){
    return $.getJSON("data/database1.json").promise();
}
getDb().done((data) => {
    //console.log(data);
    docdoc = data;
    var result = new Vue({
        el: '#app',
        vuetify: new Vuetify(),
        data:{
            types:[
                "Animation",
                "Companion",
                "Female Feet",
                "Female Glasses",
                "Female Hair",
                "Female Hands",
                "Female Hat",
                "Female JewelBothEars",
                "Female JewelLeftEar",
                "Female JewelRightEar",
                "Female Leg",
                "Female Outfit",
                "Female Tors",
                "Furniture",
                "Locomotion",
                "Male FacialHair",
                "Male Feet",
                "Male Glasses",
                "Male Hair",
                "Male Hands",
                "Male Hat",
                "Male JewelBothEars",
                "Male JewelLeftEar",
                "Male JewelRightEar",
                "Male Leg",
                "Male Outfit",
                "Male Tors",
                "Minigame",
                "Other"
            ],
            headers:[
                {text:"IMG",value:"img"},
                {text:"HASH",value:"hash"},
                {text:"UUID",value:"uuid"},
                {text:"Type",value:"type"},
                {text:"Name",value:"name"},
                {text:"Description",value:"description"},
                {text:"URI",value:"uri"},
                {text:"Year",value:"year"},
            ],
            keyword:'',
            selected:'',
            results:docdoc,
            perPage: 30,
            currentPage: 1,
            pageCount:0,
            isLoading: true,
            datacount: data
        },
        methods:{
            search: function(){
                var filtered = [];
                for(var i in data) {
                    var row = data[i];
                    this.isLoading = true;
                    if((
                        row.hash.indexOf(this.keyword) !== -1 ||
                        row.uuid.indexOf(this.keyword) !== -1 ||
                        row.type.indexOf(this.keyword) !== -1 ||
                        row.description.indexOf(this.keyword) !== -1 ||
                        row.uri.indexOf(this.keyword) !== -1 ||
                        row.year.indexOf(this.keyword) !== -1 ) &&
                        row.type.indexOf(this.selected) !== -1
                    ){
                        filtered.push(row);
                    }
                }
                this.results = filtered;
                this.currentPage = 1;
                this.isLoading = false;
            },
            noImage(element){
                element.target.src = './img/noimage.png'
            }
        },
        computed: {
            getItems: function() {
                let current = this.currentPage * this.perPage;
                let start = current - this.perPage;
                return this.results.slice(start, current);
            },
            getPageCount: function() {
                return Math.ceil(this.results.length / this.perPage);
            },
            getImagePath:function(){
                let uuid = this.results.uuid;
                const imgpash = "./thumb/large/";
                const file = ".png";
                let path = imgpash + uuid + file;
                return path;
            }
        }
    })

}).fail(() => {
    console.log( "something went wrong" );
});