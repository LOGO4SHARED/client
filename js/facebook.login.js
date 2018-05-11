window.fbAsyncInit = function() {
    FB.init({
        appId: '202717120518400',
        cookie: true,
        xfbml: true,
        version: 'v3.0'
    });

FB.AppEvents.logPageView();

};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return ;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function checkLoginState() {
    FB.getLoginStatus(function (response) {
        if (response.status == 'connected') {
            axios.post('http://localhost:3000/users', {}, {
                headers: {
                    fbToken: response.authResponse.accessToken
                }
            }).then(result => {
                localStorage.setItem('token', result.data.token)
            }).catch(err => {
                alert('login gagal')
            })
            testAPI();
        } else {
            document.getElementById('status').innerHTML = 'Please log ' +
                'into this app.';
        }

    });
}