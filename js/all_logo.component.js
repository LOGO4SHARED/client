let allTag = `<div class="col-sm-3 md-2" style="margin-bottom: 1%;">
                    <img :src="link.image" class="img-responsive" style="width:100%" alt="Image">
                       <a :href="'http://www.facebook.com/sharer.php?u='+link.image">
                            <img src="./assets/facebook.png" class='img-responsive'  style='width:35px;height:33px;float:left' >
                        </a>
                        <a :href="'https://twitter.com/share?url='+link.image+'&amp;hashtags=4LogoShared'">
                            <img src="./assets/twitter.png" class='img-responsive'  style='width:35px;height:35px;float:left'>
                        </a>
                    <button v-if='link.liked==false' type="button" @click='changeStatus' class="btn btn-default glyphicon glyphicon-heart-empty col-sm-2"></button>
                    <button v-if='link.liked==true' type="button" @click='changeStatus' class="btn btn-danger glyphicon glyphicon-heart-empty col-sm-2"></button>
                    <a :href="link.image"  class="btn btn-primary "  style='float: right;width:148px' download>Download</a>
                </div>`

Vue.component('all-logo',{
    props:['link','tag'],
    template:allTag,
    methods:{
        changeStatus: function(){
            this.$emit('status',this.link)
        }
    }
})