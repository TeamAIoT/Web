const login=function(){
    const userId=$('input[name=userId]').val();
    const password=$('input[name=password]').val();
    $.ajax({
        type:'POST',
        url:'/api/user/login',
        data:{
            userId:userId,
            password:password
        },
        dataType:'json'
    })
    .done(function(){
        location.href='/main';
    })
    .fail(function(err){
        console.error(err);
        alert('로그인 실패!');
        return false;
    });
}

const signup=function(){
    const userId=$('input[name=userId]').val();
    const password=$('input[name=password]').val();
    const password2=$('input[name=password2]').val();
    if(password!==password2){
        alert('패스워드가 일치하지 않습니다.');
        return false;
    }
    const name=$('input[name=name]').val();
    const email=$('input[name=email]').val();
    $.ajax({
        type:'POST',
        url:'/api/user/signup',
        data:{
            userId:userId,
            password:password,
            name:name,
            email:email,
        },
        dataType:'json'
    })
    .done(function(){
        alert('회원가입 성공!');
        location.href='/login';
    })
    .fail(function(err){
        console.error(err);
        alert('회원가입 실패!');
        return false;
    });
}

const logout=function(){
    $.ajax({
        type:'POST',
        url:'/api/user/logout'
    })
    .done(function(){
        location.href='/login';
    })
    .fail(function(){
        return false;
    });
}

const createPost=function(){
    const formData=new FormData(document.getElementById("createForm"));
    $.ajax({
        type:'POST',
        url:'/api/post/create',
        data:formData,
        enctype:'multipart/form-data',
        contentType:false,
        processData:false,
    })
    .done(function(result){
        alert('저장 완료');
        history.back();
    })
    .fail(function(result){
        alert('저장 실패');
        return false;
    });
}

const submitComment=function(){
    const content=$("textarea[name=content]").val();
    const board_id=location.pathname.split('/')[2];
    const post_id=location.pathname.split('/')[4];
    $.ajax({
        url:'/api/post/comment',
        type:'POST',
        data:{
            content:content,
            board_id:board_id,
            post_id:post_id,
        }
    })
    .done(function(result){
        location.reload();
    })
    .fail(function(result){
        alert('댓글을 저장하는 데 실패했습니다.');
        return false;
    });
}