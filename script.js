
class Player{
  constructor(symbol, name){
    this.symbol = symbol;
    this.name = name;
  }
  getSymbol(){
    return this.symbol;
  }
  getName(){
    return this.name;
  }
}

class Game{
  constructor(symbol, p1name="Player1", p2name="Player2" ){
    let symbols = ["X", "O"]
    let p2symbol = symbol == symbols[0] ? symbols[1] : symbols[0] ;
    this.field = new Array(9);
    this.players = [new Player(symbol, p1name), new Player(p2symbol,p2name)];
    this.currentPlayer = this.players[Math.floor(Math.random()*2)]

    console.log(this.players[0])
    console.log(this.players[1])

  }

  resetFields(){
    this.field.forEach(x => null);
  }

  getField(){
    return this.field;
  }

  GetCurrentSymbol(){
    return this.currentPlayer.getSymbol();
  }

  next(){
    this.currentPlayer = this.players[0] == this.currentPlayer ? this.players[1] : this.players[0];
  }

  isWon(){
    if(
      this.field[0] && this.field[0] === this.field[1] && this.field[1] === this.field[2] ||
      this.field[3] && this.field[3] === this.field[4] && this.field[4] === this.field[5] ||
      this.field[6] && this.field[6] === this.field[7] && this.field[7] === this.field[8] ||
      this.field[0] && this.field[0] === this.field[3] && this.field[3] === this.field[6] ||
      this.field[1] && this.field[1] === this.field[4] && this.field[4] === this.field[7] ||
      this.field[2] && this.field[2] === this.field[5] && this.field[5] === this.field[8] ||
      this.field[0] && this.field[0] === this.field[4] && this.field[4] === this.field[8] ||
      this.field[2] && this.field[2] === this.field[4] && this.field[4] === this.field[6] 
    ){
      return true;
    }else{
      return false;
    }
  }
  play(indx){
    this.field[indx] = this.GetCurrentSymbol();

    if(this.isWon()){
      alert(`Ahooy ${this.GetCurrentSymbol()} won!`)
    }else{
      this.next();
    }
  }

}





// UI LOGIC
let game;

function createGame(symb){
  document.getElementById("params").style.display="none";
  game = new Game(symb);
}

function checkCase(ca){
  if(ca.textContent == "" && !game.isWon()){
    ca.textContent = game.GetCurrentSymbol();
    game.play(ca.id);
  }
}

function reset(){
  cases = document.getElementsByClassName("case")
  for(let caz of cases){ caz.textContent = "" }
  
  // Show new game dialog
  document.getElementById("params").style.display="block";
}

// createGame("X")
// console.table(game.getField())
