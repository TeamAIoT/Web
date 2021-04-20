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
            $.ajax({
                type:'GET',
                url:'/api/board/list'
            })
            .done(function(result){
                let data=result.data;
                for(let i=data.length-1;i>=0;i--){
                    $("ul.right.hide-on-med-and-down").prepend(`<li><a href="/board/${data[i]._id}">${data[i].boardName}</a></li>`);
                    $("ul.sidenav").prepend(`<li><a href="/board/${data[i]._id}">${data[i].boardName}</a></li>`);
                }
            })
            .fail(function(result){
                alert('게시판 목록을 불러오는데 실패했습니다.');
                return false;
            });
        }
        if(location.pathname.includes('/board') && !location.pathname.includes('/post')){
            let query={};
            location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { query[key] = value; });
            const postPerPage=10;
            const board_id=location.pathname.split('/')[2];
            const page=query['page'] | 1;
            $.ajax({
                type:'GET',
                url:`/api/post/list?board_id=${board_id}`,
            })
            .done(function(result){
                const data=result.data;
                for(let i=(page-1)*postPerPage;i<page*postPerPage;i++){
                    console.log(data[i].createdAt);
                    if(i>=data.length){
                        break;
                    }
                    $('tbody').prepend(`<tr><td>${i+1}</td><td><a href="/board/${board_id}/post/${data[i]._id}">${data[i].title}</a></td><td>${data[i].author.name}</td><td>${data[i].createdAt.toString().split('T')[0]}</td></tr>`);
                }
            })
            .fail(function(result){
                alert('게시물 리스트를 불러오는 데 실패했습니다.');
                return false;
            })
        }
    });
}