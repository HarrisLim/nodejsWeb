var OrientDB = require('orientjs');

var server = OrientDB({
	host: 'localhost', 	// 이 컴퓨터를 서버로 이용 할 것이니까, locathost
	port: 2424,			// 기본적으로 OrientDB는 2424라는 포트를 사용할 것이다.
	usernmae: 'root',
	password: 'dksuek'
});
var db = server.use('studynodejs'); // db로 studynode를 제어할 수 있다.
/*
db.record.get('#22:0').then(function(record){ // 이 값('#22:0')은 OrientDB의 행을 select해보면 @rid를 확인해보면 저러한 형식이 있다.
	console.log('Loaded record:', record);
});
*/

// CREATE
/*
var sql = 'SELECT FROM topic';
db.query(sql).then(function(results){
	console.log(results);
});
*/
/*
var sql = 'SELECT FROM topic WHERE @rid=:rid';
var param = {
	params:{ // params는 약속이다.
		rid:'#22:0'
	}
}
db.query(sql, param).then(function(results){
	console.log(results);
});
*/

//INSERT
/*
var sql = "INSERT INTO topic (title, description) VALUES(:title, :desc)";
db.query(sql, {
	params:{
		title:'Express',
		desc:'Express is framework for web' // VALUES의 :desc와 같아야 하니까 decs.
	}
}).then(function(results){
		console.log(results);
});
*/

//UPDATE
/*
var sql = "UPDATE topic SET title=:title WHERE @rid=:rid"; // 결과값으로 [ '1' ]이 나오는데, 이 숫자 1은 수정된 행의 갯수를 보여준다.
db.query(sql, {params:{title:'Expressjs', rid:'#21:1'}}).then(function(results){
	console.log(results);
});
*/

//DELETE
var sql = "DELETE FROM topic WHERE @rid=:rid";// 결과값으로 [ '1' ]이 나오는데, 이 숫자 1은 삭제된 행의 갯수를 보여준다.
db.query(sql, {params:{rid:'#21:1'}}).then(function(results){
	console.log(results);
})