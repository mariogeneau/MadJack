function Bet() { // B
  // ===========================================
  this.bet = 0;
  this.stack = 500;
  // ===========================================
  this.makeBet = (amount, stack_id, bet_id) => {
    let copy_stack = this.stack;
    const operation = copy_stack -= amount;
    if (operation < 0) {
      return false;
    }
    this.stack -= amount;
    this.bet += amount;
    $(`#${stack_id}`).text(`PLAYER MONEY : $${this.stack}`);
    $(`#${bet_id}`).text(`BET : $${this.bet}`);
    return true;
  };
  // ===========================================
  this.addToStack = (amount) => {
    this.stack += (this.bet * amount);
  };
  // ===========================================
  this.analyseHand = (player_hand, dealer_hand) => {
    $(".deal_button").css("display", "block");
    $(".buttons_box").css("display", "none");
    if (player_hand === dealer_hand) {
      this.stack += this.bet;
      return "PUSH";
    } else if (player_hand < dealer_hand && dealer_hand < 22) {
      return "PLAYER LOSES";
    } else {
      this.addToStack(2);
      return "PLAYER WINS";
    }
  };
  // ===========================================
}










