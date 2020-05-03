const fs = require('fs');

class Player { 
    constructor() {
        const data = fs.readFileSync('./model/data.json');
        this.players = JSON.parse(data)
    }

    // Promise 예제
    getPlayerList() {
        if (this.players) {
            return this.players;
        }
        else {
            return [];
        } 
    }

    addPlayer(player, team, age, nickname) {
        return new Promise((resolve, reject) => {
            let last = this.players[this.players.length - 1];
            let id = last.id + 1;

            let newPlayer = {id, player, team, age, nickname};
            this.players.push(newPlayer);

            resolve(newPlayer);
        });
    }
    updatePlayer(playerId, team, age, nickname) {
        return new Promise((resolve, reject) => {
            let id = Number(playerId);
            let newPlayer = {id, team, age, nickname};
            for (var player1 of this.players ) {
                if ( player1.id == id ) {
                    this.players.splice(id, 1, newFood); // 
                    resolve(newPlayer);
                    console.log(newPlayer);
                    return;
                }
            }
        });
    }
    // Promise - Reject
    getPlayerDetail(playerId) {
        return new Promise((resolve, reject) => {
            for (var player of this.players ) {
                if ( player.id == playerId ) {
                    resolve(player);
                    return;
                }
            }
            reject({msg:'Can not find Player', code:404});
        });
    }
    deletePlayer(id) {
        return new Promise((resolve, reject) => {
            for (var player of this.players ) {
                if ( player.id == id ) {
                    this.players.splice(id, 1);
                    resolve(player);
                    return;
                }
            }
            reject({msg:'Can not find that player', code:404});
        });
    }
}

module.exports = new Player();