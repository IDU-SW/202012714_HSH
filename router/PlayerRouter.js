const express = require('express');
const router = express.Router();
const players = require('../model/PlayerModel');

router.get('/players', showPlayerList);
router.get('/players/:playerId', showPlayerDetail);

router.post('/players', addPlayer);
router.get('/player/add', addPlayerForm);

router.delete('/players/:playerId', deletePlayer);
router.post('/players/delete', deletePlayer);

router.put('/players', updatePlayer);
router.get('/player/detail/:playerId', updatePlayerform);
router.post('/players/edit', updatePlayer);
module.exports = router;


 async function showPlayerList(req, res) { 
     const playerList = await players.getPlayerList();
     res.render('player', {players:playerList, count:playerList.length})
 
 }


// Async-await를 이용하기
async function showPlayerDetail(req, res) {
    try {
        // 영화 상세 정보 Id
        const player_id = req.params.player_id;
        console.log('player_id : ', player_id);
        const info = await players.getPlayerDetail(player_id);
      
        res.render('playerDel',{detail:info});
    }
    catch ( error ) {
        console.log('Can not find, 404');
        res.status(error.code).send({msg:error.msg});
    } 
}


// 새 선수 추가
// POST 요청 분석 -> 바디 파서
async function addPlayer(req, res) {
    const player = req.body.player;
  

    if (!player) {
        res.status(400).send({error:'player 누락'});
        return;
    }

    const team = req.body.team;
    const age = req.body.age;
    const nickname = req.body.nickname;

    try {
        const result = await players.addPlayer(player, team, age, nickname);
        if(result != -1)
        res.render('addComplete', {data:result});
        else
        res.render('error');
    }
    catch ( error ) {
        res.status(500).send(error.msg);
    }
}
function addPlayerForm(req, res) {
    res.render('playerAdd');
}
async function updatePlayerform(req, res) {
    try {
       
        const player_id = req.params.player_id;
        console.log('player_id : ', player_id);
        const info = await players.getPlayerDetail(player_id);

        res.render('playerUpdate', {detail:info});
    }
    catch ( error ) {
        console.log('Can not find, 404');
        res.status(error.code).send({msg:error.msg});
    }
}
async function updatePlayer(req, res) {

    const player_id = req.body.player_id; // id 가져오기
    const player = req.body.player;

    if (!player) {
        res.status(400).send({error:'선수 정보 누락'});
        return;
    }
    const team = req.body.team;
    const age = req.body.age;
    const nickname = req.body.nickname;

    try {
        const result = await players.updateplayer(player_id, player, team, age, nickname);
        console.log(result);
        res.render('updateComplete',{data:result});
    }
    catch ( error ) {
        res.status(500).send(error.msg);
    }
}

async function deletePlayer(req, res) {
    try {
        const player_id = req.body.player_id; 
        const result = await players.deletePlayer(player_id);
        if(result != -1)
        res.render('delComplete');
        else
        res.render('error');
    }
    catch ( error ) {
        res.status(400).send({error:'선수 제명실패'});
    }
}
