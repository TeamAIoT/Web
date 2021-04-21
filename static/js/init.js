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
        if(location.pathname.includes('/board') && !location.pathname.includes('/post') && !location.pathname.includes('/create') && !location.pathname.includes('/edit')){
            let query={};
            location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { query[key] = value; });
            const postPerPage=10;
            const board_id=location.pathname.split('/')[2];
            const page=query.hasOwnProperty('page')?query['page']:1;
            $.ajax({
                type:'GET',
                url:`/api/post/list?board_id=${board_id}`,
            })
            .done(function(result){
                let data=result.data;
                const maxPage=Math.floor(data.length/postPerPage)+1;
                for(let i=(page-1)*postPerPage;i<page*postPerPage && i<data.length;i++){
                    if(!data[i].author){
                        data[i].author={name:"알수없음"};
                    }
                    $('tbody').append(`<tr><td>${data.length-i}</td><td><a href="/board/${board_id}/post/${data[i]._id}">${data[i].title}</a></td><td>${data[i].author.name}</td><td>${data[i].createdAt.toString().split('T')[0]}</td></tr>`);
                }
                if(Number(page)===1){
                    $('.row').append(`<a href="/board/${board_id}?page=${Number(page)+1}">다음 페이지</a>`);
                }
                else if(Number(page)===maxPage){
                    $('.row').append(`<a href="/board/${board_id}?page=${Number(page)-1}">이전 페이지</a>`);
                }
                else{
                    $('.row').append(`<a href="/board/${board_id}?page=${Number(page)-1}">이전 페이지</a> | <a href="/board/${board_id}?page=${Number(page)+1}">다음 페이지</a>`);
                }
            })
            .fail(function(result){
                alert('게시물 리스트를 불러오는 데 실패했습니다.');
                return false;
            });
        }
        if(location.pathname.includes('/board') && location.pathname.includes('/post')){
            const board_id=location.pathname.split('/')[2];
            const post_id=location.pathname.split('/')[4];
            $.ajax({
                url:`/api/post/detail?board_id=${board_id}&post_id=${post_id}`,
                type:'GET',
            })
            .done(function(result){
                let data=result.data;
                if(!data.author){
                    data.author={name:"알수없음"};
                }
                $("#title").text(data.title);
                $("#author").text(data.author.name);
                $("#content").text(data.content);
                if(data.hasOwnProperty('file') && data.file){
                    $("#file").text(data.file.fileName.substring(14,data.file.fileName.length));
                    $("#file").attr("href",`/api/file/download/${data.file._id}`);
                }
                if(data.hasOwnProperty('comments')){
                    for(let i=0;i<data.comments.length;i++){
                        if(!data.comments[i].author){
                            data.comments[i].author={name:"알수없음"};
                        }
                        $("#comments").append(`<p>${data.comments[i].author.name}</p>`);
                        $("#comments").append(`<p class="right">${data.comments[i].createdAt.toString().split('T')[0]}</p>`);
                        $("#comments").append(`<span>${data.comments[i].content}</span>`);
                    }
                }
            })
            .fail(function(result){
                alert('게시물을 불러오는 데 실패했습니다.');
                history.back();
            });
        }
    });
}