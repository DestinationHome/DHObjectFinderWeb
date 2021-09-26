var docdoc =[];
Vue.component('paginate', VuejsPaginate)
const Spinner = window.VueSimpleSpinner;
function getDb(){
    return $.getJSON("data/database1.json").promise();
}
getDb().done((data) => {
    //console.log(data);
    docdoc = data;
    var result = new Vue({
        el: '#app',
        data:{
            types:[
                {"type":"Animation"},
                {"type":"Companion"},
                {"type":"Female Feet"},
                {"type":"Female Glasses"},
                {"type":"Female Hair"},
                {"type":"Female Hands"},
                {"type":"Female Hat"},
                {"type":"Female Headphones"},
                {"type":"Female JewelBothEars"},
                {"type":"Female JewelLeftEar"},
                {"type":"Female JewelRightEar"},
                {"type":"Female Leg"},
                {"type":"Female Leg Feet"},
                {"type":"Female Outfit"},
                {"type":"Female Tors"},
                {"type":"Furniture"},
                {"type":"Locomotion"},
                {"type":"Male FacialHair"},
                {"type":"Male Feet"},
                {"type":"Male Glasses"},
                {"type":"Male Hair"},
                {"type":"Male Hands"},
                {"type":"Male Hat"},
                {"type":"Male Headphones"},
                {"type":"Male JewelBothEars"},
                {"type":"Male JewelLeftEar"},
                {"type":"Male JewelRightEar"},
                {"type":"Male Leg"},
                {"type":"Male Leg Feet"},
                {"type":"Male Outfit"},
                {"type":"Male Tors"},
                {"type":"Male Torso"},
                {"type":"Minigame"},
                {"type":"Other"}
            ],
            keyword:'',
            selected:'',
            results:docdoc,
            parPage: 30,
            currentPage: 1,
            isLoading: true
        },
        methods:{
            clickCallback: function (pageNum) {
                this.currentPage = Number(pageNum);
            },
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
                let current = this.currentPage * this.parPage;
                let start = current - this.parPage;
                return this.results.slice(start, current);
            },
            getPageCount: function() {
                return Math.ceil(this.results.length / this.parPage);
            }
        },
        components: {
            Spinner
        },
        mounted:function(){
            this.isLoading = false;
        }
    })
    var datacount = new Vue({
        el: '#datacount',
        data:{
            datacount: data
        }
    })

}).fail(() => {
    console.log( "something went wrong" );
});