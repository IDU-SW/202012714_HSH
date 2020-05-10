const fs = require('fs');
var dbc1 = require('./dbConnection');

class Player {
    constructor(){
        const data = fs.readFileSync('./model/data.json');
        this.players = JSON.parse(data)
    }



    // Promise 예제
    getPlayerList = async() => {
   
        const sql = 'SELECT * from players';
        let conn;
        try {
            conn = await dbc1.getConnection();
            const [rows, metadata] = await conn.query(sql);
            conn.release();
            return rows;
        } catch (error) {
            console.log(1);
        } finally {
            if ( conn ) conn.release();
        }
    }
    // Promise - Reject
    getPlayerDetail = async(player_id) => {
    
        const sql = 'SELECT * from players where player_id = ?';
        let conn;
        try {
            conn = await dbc1.getConnection();
            const [rows, metadata] = await conn.query(sql, player_id);
            conn.release();
            console.log(rows);
            return rows[0];
        } catch (error) {
            console.error(error);
        } finally {
            if ( conn ) conn.release();
        }
    }

    addPlayer = async(player, team, age, nickname) => {
 
        const data = [player, team, age, nickname];
        const sql = 'insert into players(player, team, age, nickname) values(?, ?, ?, ?)';
        let conn;
        try {
            conn = await dbc1.getConnection();
            const [rows, metadata] = await conn.query(sql, data);
            conn.release();
            console.log('rows',rows);
            return rows[0];
        } catch (error) {
            console.error(error);
            return -1;
        } finally {
            if ( conn ) conn.release();
        }
    }
    updateplayer = async(player_id, player, team, age, nickname) => {

        const data = [player, team, age, nickname, player_id];
        const sql = 'update players set player = ?, team = ?, age = ?, nickname = ? where player_id = ?';
        let conn;
        try {
            conn = await dbc1.getConnection();
            const [rows, metadata] = await conn.query(sql, data);
            conn.release();
            console.log('rows',rows);
            return rows[0];
        } catch (error) {
            console.error(error);
            return -1;
        } finally {
            if ( conn ) conn.release();
        }
    }
    
    deletePlayer = async(player_id) => {
 
    const sql = 'delete from players where player_id = ?';
    let conn;
    try {
        conn = await dbc1.getConnection();
        const [rows, metadata] = await conn.query(sql, player_id);
        conn.release();
        console.log('rows',rows);
        return null;
    } catch (error) {
        console.error(error);
        return -1;
    } finally {
        if ( conn ) conn.release();
    }
}
}

module.exports = new Player();