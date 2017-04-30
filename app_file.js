var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs'); // 이것은 파일시스템. 파일을 건드리려면 추가해야함.(node.js가 기본적으로 제공하는 모듈)
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.locals.pretty = true;
app.set('views', './views_file');
app.set('view engine', 'jade'); // express에게 jade를 사용한다고 알려준다.
app.get('/topic/new', function(req, res){
	fs.readdir('data',function(err,files){
		if(err){	
			console.log(err);
			res.status(500).send('Internal Server Error');
		}
		res.render('new',{topics:files}); // jade파일을 가져오려면 render로 가져온다.
	});
});
app.get(['/topic', '/topic/:id'],function(req,res){ //[]로 묶으면 라우트를 여러개 정의 가능.
	fs.readdir('data',function(err,files){
		if(err){
			console.log(err);
			res.status(500).send('Internal Server Error');
		}
		var id = req.params.id;
		if(id){
		// id 값이 있을 때 !
		fs.readFile('data/'+id, 'utf8', function(err, data){//파일을 읽어올 때는 fs.readFile. - nodejs.org에서 reference 참고.
			if(err){ //에러가 나왔는지 확인.
				console.log(err);
				res.status(500).send('Internal Server Error');
			}
			res.render('view', {topics:files, title:id, description:data}); // 에러가 없다면 읽어올 수 있음. 콜백함수 안에서 실행. title으로 파일 명을 쓰기로 했으니까, req.params.id에서 파일 명을 id로 알 수 있기 때문에 title:id.
		})
	} else{
		// id 값이 없을 때 !
		res.render('view', {topics:files, title:'Welcome', description:'Hello, Javascript for server.'});
	  }
	})
});
/* 중복을 제거하기 위해 중복제거를 하고 주석처리.
app.get('/topic/:id', function(req, res){//id는 바뀔 수 있는 문자니까 :id로 해준다.
	var id = req.params.id; // 위에 :id로 주었기 때문에 params.id인 것.
	fs.readdir('data',function(err,files){ //readdir을 이용해서 파일의 목록을 가져온다.
		if(err){
			console.log(err);
			res.status(500).send('Internal Server Error');
		}
		fs.readFile('data/'+id, 'utf8', function(err, data){//파일을 읽어올 때는 fs.readFile. - nodejs.org에서 reference 참고.
			if(err){ //에러가 나왔는지 확인.
				console.log(err);
				res.status(500).send('Internal Server Error');
			}
			res.render('view', {topics:files, title:id, description:data}); // 에러가 없다면 읽어올 수 있음. 콜백함수 안에서 실행. title으로 파일 명을 쓰기로 했으니까, req.params.id에서 파일 명을 id로 알 수 있기 때문에 title:id.
		})
	})
})
*/
app.post('/topic', function(req, res){
	var title = req.body.title;
	var description = req.body.description;
	fs.writeFile('data/'+title, description, function(err){
		if(err){
			res.status(500).send('Internal Server Error'); // 500은 서버 상에서 오류가 있다는 것을 기계에게 알려주는 것. 그러므로 오류가 있다면 true.
		}
		res.redirect('/topic/'+title); // 응답 객체. redirect를 하고 괄호 안에 사용자를 보내고 싶은 경로를 작성.
	});
})
app.listen(3000, function(){
	console.log('Connected, 3000 port!!');
})