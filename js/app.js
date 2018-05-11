new Vue ({
    el:'#app',
    data:{
        files: [],
        login : false,
        register:false,
        name: localStorage.getItem('name'),
        username: '',
        password:'',
        local: localStorage.getItem('token') || '',
        allLogo: null,
    },
    methods:{
        isLike(img){
            if(img.liked==false){
                img.liked= true
                return img
            }
            if (img.liked == true) {
                img.liked = false
                return img
            }
        },
        signIn(){
            axios.post('http://localhost:3000/signin', {
                email: this.username,
                password: this.password
            })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('name', response.data.name)
                }
                this.login = true
                window.location.reload()
            })
            .catch(err => {
                console.log(err)
            })
        },
        signUp(){
            this.register = true
        },
        regist(){
            this.register=false
            axios.post('http://localhost:3000/signup',{
                name:this.name,
                email:this.username,
                password:this.password
            })
            .then(response=>{
                if(response.data.token){
                    localStorage.setItem('token',response.data.token)
                    localStorage.setItem('name', response.data.name)
                }
                this.login=true
                window.location.reload()
            })
            .catch(err=>{
                console.log(err)
            })
        },
        submitFile(files) {
            for(let i=0;i<files.length;i++){
                let formData = new FormData();
                formData.append('image', files[i]);
                axios.post('http://localhost:3000/image/upload',
                    formData, {
                        'Content-Type': 'multipart/form-data',
                    }
                ).then(function () {
                    console.log('SUCCESS!!');
                })
                .catch(function (err) {
                    console.log(err)
                    console.log('FAILURE!!');
                });
            }
        },
        handleFileUpload() {
            this.files = this.$refs.files.files
        },
        keluar(){
            this.local = ''
            this.name = ''
            localStorage.removeItem('token')
            localStorage.removeItem('name')
            window.location.reload()
        },
        getImages(){
            axios.get('http://localhost:3000/image/all')
            .then(response=>{
                this.allLogo = response.data.listImages
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },
    mounted(){
        if(this.local!=''){
            this.allLogo
        }
    }
})