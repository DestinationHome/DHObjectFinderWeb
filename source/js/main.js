const Spinner = window.VueSimpleSpinner;
var result = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    components: {
        Spinner
    },
    data:{
        gridData:[],
        loading: true,
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
        total:0,
        results:[],
        perPage: 30,
        currentPage: 1,
        pageCount:0,
    },
    beforeCreate: function () {
        this.loading = true;
        axios.get('data/database1.json')
            .then(function (response) {
                result.results = response.data;
                gridData = response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    updated:function(){
        const load = () => {
            this.loading = false;
        }
        load();
    },
    methods:{
        search: function(){
            var filtered = [];
            var dataset = gridData;
            for(var i in dataset) {
                var row = dataset[i];
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
        },
        countData: function(){
            this.total = this.results.length();
            return this.total;
        }
    }
})