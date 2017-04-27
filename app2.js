var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.locals.pretty = true; // jade코드를 예쁘게 만드는 코드.
app.set('view engine', 'jade');
app.set('views','./views'); // 이 값을 주지 않아도 ./views에서 찾음.
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false}));
//폼을 만든다.
app.get('/form',function(req,res){
	res.render('form');
});
// get방식으로 text값을 얻는다. " <- 서버 "
app.get('/form_receiver',function(req, res){
	// res.send('Hello, GET'); // GET방식이 잘 동작하는지 test
	var title = req.query.title;
	var description = req.query.description;
	res.send(title+','+description);
});
//post방식으로 text값을 얻는다. " -> 서버 "
app.post('/form_receiver',function(req, res){ // post를 이용하려면 bodyParser가 필요.
	// res.send('Hello, POST'); // POST방식이 잘 동작하는지 test
	var title = req.body.title;
	var description = req.body.description;
	res.send(title+','+description);
});
//topics안에 있는 값을 link를 걸어서 방식에 맞춰서 출력.
app.get('/topic/:id',function(req, res){ // query string방식을 사용하려면 :id를 삭제.
	var topics = [
		'Javascript is...',
		'Nodejs is...',
		'Express is...'
	];
	var output = `
		<!-- query string 방식-->
		<!--a href="/topic?id=0">JavaScript</a><br>
		<a href="/topic?id=1">Nodejs</a><br>
		<a href="/topic?id=2">Express</a><br><br-->
		
		<a href="/topic/0">JavaScript</a><br>
		<a href="/topic/1">Nodejs</a><br>
		<a href="/topic/2">Express</a><br><br>

		<!--${topics[req.query.id]}--> <!-- Query string 방식-->
		${topics[req.params.id]}<!-- Semantic URL 방식 -->
		`
	res.send(output); // req에 query가 있고 사용자의 id(query string)를 속성(property)으로 갖는다.
});
app.get('/topic/:id/:mode',function(req, res){
	res.send(req.params.id+', '+req.params.mode)
});
app.get('/template',function(req,res){
	res.render('temp', {time:Date(), _title:'Jade'});//send()와 같지만, template에서는 render()를 사용. 'temp',{} 이렇게 객체의 자리는 약속.
});
app.get('/',function(req, res){
	res.send('Hello home page');
});
app.get('/dynamic', function(req, res){
	var lis = '';
	for(var i=0; i<5; i++){
		lis = lis + '<li>coding</li>';
	}
	var time = Date();
	var output = `
	<html>
		<head>
			<title></title>
		</head>
		<body>
			<h1>Hello, Dynamic!!!</h1>
			<ul>
				${lis}
			</ul>
			${time}
		</body>
	</html>`;
	res.send(output);
});
app.get('/route',function(req, res){
	res.send('Hello Router, <img src="/me.jpg">')
});
app.get('/login',function(req,res){
	res.send('<h1>Login please</h1>');
});
app.get('/introduction', function(req, res){
	res.send('<h2 style="color:blue">Hi! My name is Harris Lim.</h2></br>who are you?')
});
app.listen(3000, function(){
	console.log('Conneted 3000 port!');
});
