var pool = require('./dbConnection');

const fs = require('fs');

class Player {
    constructor() {
        const data = fs.readFileSync('./model/data.json');
        this.players = JSON.parse(data)
    }

    getPlayerList = async() => {   
        const sql = 'SELECT * from players'
        let conn;
        try {
            conn = await pool.getConnection();
            const [rows, metadata] = await conn.query(sql);
            conn.release();
            return rows;
        } catch (error) {
            console.error(error);
        } finally {
            if ( conn ) conn.release();
        }
    }
    addPlayer = async(player, team, age, nickname) => {

        console.log(player);
        console.log(team);
        console.log(age);
        console.log(nickname);

        const data = [player, team, age, nickname];
        const sql = 'insert into players(player, team, age, nickname) values(?, ?, ?, ?)';
        let conn;
        try {
            conn = await pool.getConnection();
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

    getPlayerDetail = async(playerId) => {
        const sql = 'SELECT * from players where id = ?';
        let conn;
        try {
            conn = await pool.getConnection();
            const [rows, metadata] = await conn.query(sql, playerId);
            conn.release();
            console.log(rows);
            return rows[0];
        } catch (errorgi) {
            console.error('실패 : ', error);
        } finally {
            if ( conn ) conn.release();
        }
    }

    updatePlayer = async(playerId, player, team, age, nickname) => {
        const data = [player, team, age, nickname, playerId];
        const sql = 'update players set player = ?, team = ?, age = ?, nickname = ? where id = ?';
        let conn;
        try {
            conn = await pool.getConnection();
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
}

module.exports = new Player();
