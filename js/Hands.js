function Hands() {
  // ===========================================
  this.busted_hand;
  // ===========================================
  this.checkBust = (arr_hand) => {
    const sum = arr_hand.reduce((total, num) => total + num);
    if (sum > 21) {
      madJack.player_hand = this.convertElevenToOne(arr_hand);
      const new_sum = madJack.player_hand.reduce((total, num) => total + num);
      if (new_sum > 21) {
        this.busted_hand = new_sum;
        return true;
      }
    }
    return false;
  };
  // ===========================================
  this.convertElevenToOne = (arr_hand) => {
    for (let i in arr_hand) {
      if (arr_hand[i] === 11) {
        arr_hand.splice(i, 1, 1);
      }
    }
    return arr_hand;
  };
  // ===========================================
}