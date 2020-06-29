const express = require('express');
const session = require('express-session');
const router = express.Router();
const players = require('../model/PlayerModel');

router.use(session({
    resave:false,
    saveUninitialized:false,
    secret:'Secret Key'})
 );

 const manager = {
    id : 'manager',
    password : '202012714',
    name : 'manager',
 }
router.get('/players', async (req, res) => {
    const data = await players.getPlayerList();
    
    res.render('players', {players:data, count:data.length});
});

router.get('/players', showPlayerList);

router.get('/players/:playerId', showPlayerDetail);

router.post('/players', addPlayer);
router.get('/player/add',addPlayerForm);

router.get('/players/detail/:playerId', updatePlayerForm);
router.post('/players/edit', updatePlayer);

router.post('/MloginChk', loginChk); // 로그인
router.delete('/MlogoutChk', logoutChk); // 로그아웃

module.exports = router;
function loginChk(req, res) {
    const id = req.body.id;
    const password = req.body.password;
 
    if ( id === user.id && password === user.password ) {
       // 로그인 성공시 : 세션에 사용자 ID 저장
       req.session.userid = id;
       res.sendStatus(200);
    }
    else {
       res.sendStatus(401);
    }
 }
 
 function logoutChk(req, res) {
    req.session.destroy( err => {
       if ( err ) {
          res.sendStatus(500);
       }
       else {
          // 로그아웃 성공
          res.sendStatus(200);
       }
    });
 }
// 노래 리스트
async function showPlayerList(req, res) {
    try {
        const playerId = req.params.playerId;
        const info = await players.getPlayerDetail(playerId);

        res.render('playersDetail', {detail:info});
    }
    catch ( error ) {
        console.error('연결 실패', error);
        //console.log('Can not find, 404');
        res.status(error.code).send({msg:error.msg});
    }
}



// 노래 상세보기
async function showPlayerDetail(req, res) {
    try {
        const playerId = req.params.playerId;
        console.log('playerId : ', playerId);
        const info = await players.getPlayerDetail(playerId);
        //res.send(info);
        res.render('playersDetail', {detail:info});
    }
    catch ( error ) {
        console.log('Can not find, 404');
        res.status(error.code).send({msg:error.msg});
    }
}

// 새 노래 추가 폼
function addPlayerForm(req, res) {
    res.render('playersAdd');
}

// 새 노래 추가
async function addPlayer(req, res) {
    const player = req.body.player;

    if (!player) {
        res.status(400).send({error:'선수명 누락'});
        return;
    }

    const team = req.body.team;
    const age = req.body.age;
    const nickname = req.body.nickname;


    try {
        const result = await players.addPlayer(player, team, age, nickname);
        //res.send({msg:'success', data:result});
        res.render('addSuccess', {data:result});
    }
    catch ( error ) {
        res.status(500).send(error.msg);
    }
}

// 노래 수정 폼
async function updatePlayerForm(req, res) {
    try {
       
        const playerId = req.params.playerId;
        console.log('playerId : ', playerId);
        const info = await players.getPlayerDetail(playerId);

        res.render('playersUpdate', {detail:info});
    }
    catch ( error ) {
        console.log('Can not find, 404');
        res.status(error.code).send({msg:error.msg});
    }
}

// 수정
async function updatePlayer(req, res) {

    const id = req.body.id; // id 가져오기
    const player = req.body.player;

    if (!player) {
        res.status(400).send({error:'선수명 누락'});
        return;
    }
  
    const team = req.body.team;
    const age = req.body.age;
    const nickname = req.body.nickname;


    try {
        const result = await players.updatePlayer(id, player, team, age, nickname);
        console.log(result);
        res.render('updateSuccess',{data:result});
    }
    catch ( error ) {
        res.status(500).send(error.msg);
    }

}
async function login(req, res) {
    res.render('login_page');
}
// 로그인 정보
const user = {
    id : 'dy',
    password : '0225'
}

// 로그인 체크
async function loginChk(req, res) {
    const id = req.body.id;
    const pw = req.body.pw;
 
    if ( id === user.id && pw === user.password ) {
       // 로그인 성공시 : 세션에 사용자 ID 저장
       req.session.userid = id;
       res.sendStatus(200);
    }
    else {
       res.sendStatus(401);
    }
}

// 로그아웃 체크
async function logoutChk(req, res) {
    req.session.destroy( err => {
       if ( err ) {
          res.sendStatus(500);
       }
       else {
          // 로그아웃 성공
          res.sendStatus(200);
       }
    });
}
