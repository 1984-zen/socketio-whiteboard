class Room{
    constructor(roomId){
        this.roomId = roomId;
        this.history = [];
    }
    addDrawing(draw){
        this.history.push(draw);
    }
    clearHistory(){
        this.history = [];
    }
}

module.exports = Room;