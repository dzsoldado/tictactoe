
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
  constructor(symbol, p1name="Player 1", p2name="Player 2" ){
    let symbols = ["X", "O"]
    let p2symbol = symbol == symbols[0] ? symbols[1] : symbols[0] ;
    this.field = new Array(9).fill(null);
    this.players = [new Player(symbol, p1name), new Player(p2symbol,p2name)];
    this.currentPlayer = this.players[Math.floor(Math.random()*2)]


  }

  resetFields(){
    this.field.forEach(x => null);
  }

  getField(){
    return this.field;
  }

  getPlayers(){
    return this.players;
  }

  getCurrentSymbol(){
    return this.currentPlayer.getSymbol();
  }

  getCurrentPlayer(){
    return this.currentPlayer;
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

  isDraw(){
    if(!this.field.some(x => x == null)) return true;
  }

  play(indx){
    if(!this.field[indx] && !this.isWon() && !this.isDraw()){
      this.field[indx] = this.getCurrentSymbol();
      if(!this.isWon() && !this.isDraw()){
        this.next(); 
      }
    }
  }

}


// UI LOGIC
let game;

function createGame(symb){
  hideParams();
  game = new Game(symb);

  // Initialize players' names
  let players = game.getPlayers();
  document.getElementById('p1').textContent = `${players[0].getName() + " (" + players[0].getSymbol() + ")" }`
  document.getElementById('p2').textContent = `${players[1].getName() + " (" + players[1].getSymbol() + ")" }`
  
  if(game.getCurrentPlayer() == players[0]){
    togglePlayer(0);
  }else{
    togglePlayer(1);
  }
  
}

function checkCase(ca){
  if(!game){
    alert("Choose a symbol first");
  }else{
    if(ca.textContent == "" && !game.isWon() && !game.isDraw()){
      ca.textContent = game.getCurrentSymbol();
      game.play(ca.id);
      if(game.isWon()){
        showMessage(`Ahooy, ${game.getCurrentPlayer().getName()} won!`);
      }else{
        if(game.isDraw()){
          showMessage(`It's a draw!`);
        }else{
          togglePlayer();
        }
      }
    }
  }
}

function reset(){
  cases = document.getElementsByClassName("case")
  for(let caz of cases){ caz.textContent = "" }
  game = null;
  resetPlayers();
  showParams();
}

function resetPlayers(){
  document.getElementById('p1').classList.remove('hidden');
  document.getElementById('p1').classList.add('hidden');

  document.getElementById('p2').classList.remove('hidden');
  document.getElementById('p2').classList.add('hidden');

}

function togglePlayer(x){
  if(x===0){
    document.getElementById('p1').classList.toggle('hidden');
  }else{
    if(x===1){
      document.getElementById('p2').classList.toggle('hidden');
    }else{
      document.getElementById('p1').classList.toggle('hidden');
      document.getElementById('p2').classList.toggle('hidden');
    }
  }
}

function showParams(){
  document.getElementById("params").classList.remove("remove");
  document.getElementById("reset").classList.add("remove");
}

function hideParams(){
  document.getElementById("params").classList.add("remove");
  document.getElementById("reset").classList.remove("remove");
}

function showMessage(msg){
  let holder = document.getElementById('message');
  let content = document.getElementById('message-content');
  if (holder.classList.contains("hidden")){ 
    holder.classList.remove("hidden");
  }
  content.textContent = msg;

}
function hideMessage(){
  document.getElementById('message').classList.add('hidden')
  reset();
}

