window.onload=function(){
    $(document).ready(function(){
        if(location.pathname!=='/login' && location.pathname!=='/signup'){
            $("#nav").load('/html/nav.html');
        }
        else{
            $("#nav").load('/html/nav-before.html');
        }
        $("#footer").load('/html/footer.html');
        if(location.pathname!=='/login' && location.pathname!=='/signup'){
            $.ajax({
                type:'GET',
                url:'/api/user/info'
            })
            .done(function(result){
                let userInfo=result.data;
                console.log(userInfo);
            })
            .fail(function(result){
                location.href='/login';
            });
        }
    });
}