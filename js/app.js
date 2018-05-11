new Vue ({
    el:'#app',
    data:{
        files: [],
        login : false,
        register:false,
        name:'',
        username: '',
        password:'',
        allLogo: [
            { image: 'https://placehold.it/150x80?text=1',liked:false},
            { image: 'https://placehold.it/150x80?text=2', liked: false},
            { image: 'https://placehold.it/150x80?text=3', liked: false},
            { image: 'https://placehold.it/150x80?text=4', liked: false},
            { image: 'https://placehold.it/150x80?text=5', liked: false},
            { image: 'https://placehold.it/150x80?text=6', liked: false},
            { image: 'https://placehold.it/150x80?text=7', liked: false},
            { image: 'https://placehold.it/150x80?text=8', liked: false},
        ]
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
            axios.post('http://localhost:3000/users', {
                email: this.username,
                password: this.password
            })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token)
                }
                this.login = true
                console.log(response)
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
            axios.post('http://localhost:3000/users',{
                name:this.name,
                email:this.username,
                password:this.password
            })
            .then(response=>{
                if(response.data.token){
                    localStorage.setItem('token',response.data.token)
                }
                this.login=true
            })
            .catch(err=>{
                console.log(err)
            })
        },
        submitFile(files) {
            for(let i=0;i<files.length;i++){
                let formData = new FormData();
                formData.append('image', files[i]);
                axios.post('http://localhost:3000/upload',
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
        }
    }
})