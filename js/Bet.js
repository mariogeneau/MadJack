function Bet() {
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
}