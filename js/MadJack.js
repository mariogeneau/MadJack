// ===========================================
// 001, 002, 003, 004, 005, 006, 007, 008, 009, 010, 011, 012, 013, 014, 015, 016
// 001, 012, 013, 015, 017, 018, 019, 020, 021, 022, 023, 024, 025, 026, 027, 028
// ===========================================
function MadJack(player_box_id, dealer_box_id) { // 001
  // ===========================================
  this.player_box_id = player_box_id; // ***
  this.dealer_box_id = dealer_box_id; // ***
  this.player_hand = []; // ***
  this.dealer_hand = []; // ***
  this.hidden_card; // ***
  this.deck = ["ec.png", "ed.png", "eh.png", "es.png", "2c.png", "2d.png", "2h.png", "2s.png", "3c.png", "3d.png", "3h.png", "3s.png", "4c.png", "4d.png", "4h.png", "4s.png", "5c.png", "5d.png", "5h.png", "5s.png", "6c.png", "6d.png", "6h.png", "6s.png", "7c.png", "7d.png", "7h.png", "7s.png", "8c.png", "8d.png", "8h.png", "8s.png", "9c.png", "9d.png", "9h.png", "9s.png", "10c.png", "10d.png", "10h.png", "10s.png", "t11c.png", "t11d.png", "t11h.png", "t11s.png", "t12c.png", "t12d.png", "t12h.png", "t12s.png", "t13c.png", "t13d.png", "t13h.png", "t13s.png"]; 
  this.player; // ***
  this.dealer; // ***
  // ===========================================
  this.startNewHand = () => { // 012
    this.restForNewHand(); // 025
    this.dealStartingCards(); // 018
    this.analyseHands(); // 019
    $("#player_hand_value").text(`PLAYER : ${this.player}`); // ***
  }
  // ===========================================
  this.restForNewHand = () => { // 025
    this.removeCards(); // 026
    this.deck = ["ec.png", "ed.png", "eh.png", "es.png", "2c.png", "2d.png", "2h.png", "2s.png", "3c.png", "3d.png", "3h.png", "3s.png", "4c.png", "4d.png", "4h.png", "4s.png", "5c.png", "5d.png", "5h.png", "5s.png", "6c.png", "6d.png", "6h.png", "6s.png", "7c.png", "7d.png", "7h.png", "7s.png", "8c.png", "8d.png", "8h.png", "8s.png", "9c.png", "9d.png", "9h.png", "9s.png", "10c.png", "10d.png", "10h.png", "10s.png", "t11c.png", "t11d.png", "t11h.png", "t11s.png", "t12c.png", "t12d.png", "t12h.png", "t12s.png", "t13c.png", "t13d.png", "t13h.png", "t13s.png"]; 
    this.player_hand = []; // ***
    this.dealer_hand = []; // ***
  };
  // ===========================================
  this.removeCards = () => { // 026
    const num_of_cards_on_table = this.player_hand.concat(this.dealer_hand).length;
    if (num_of_cards_on_table === 0) {
      return;
    }
    for (let i = 1; i <= num_of_cards_on_table; i++) {
      $(`#card_${i}`).remove();
    }
  };
  // ===========================================
  this.analyseHands = () => { // 019
    this.analyse_player(this.player_hand); // 021
    this.analyse_dealer(this.dealer_hand); // 027
  };
  // ===========================================
  this.dealStartingCards = () => { // 018
    this.getCard(this.player_box_id, this.player_hand, "1", false); // 017
    this.getCard(this.dealer_box_id, this.dealer_hand, "2", false); // 017
    this.getCard(this.player_box_id, this.player_hand, "3", false); // 017
    this.getCard(this.dealer_box_id, this.dealer_hand, "4", true); // 017
  };
  // ===========================================
  this.getCard = (box_id, hand, zindex, hiddenCard) => {  // 017
    let random_index = Math.floor(Math.random() * this.deck.length);  // ***
    const card = this.deck[random_index]; // ***
    this.deck.splice(random_index, 1); // ***
    if (hiddenCard) {
      this.hidden_card = card; // ***
      this.displayCard(box_id, "back.png", zindex); // 020
    } else {
      this.displayCard(box_id, card, zindex); // 020
    }
    hand.push(card); // ***
  };
  // ===========================================
  this.displayCard = (box_id, card_value, card_id_number) => { // 020
    const box_obj = document.getElementById(box_id); // ***
    const card_obj = document.createElement("IMG"); // ***
    card_obj.setAttribute("src", "images/cards/" + card_value); // ***
    card_obj.setAttribute("id", "card_" + card_id_number); // ***
    card_obj.setAttribute("class", "cards"); // ***
    box_obj.appendChild(card_obj); // ***
    $("#card_" + card_id_number).css("z-index", card_id_number); // ***
    $("#card_" + card_id_number).css("left", "47px"); // ***
  };
  // ===========================================
  this.hit = () => { // 013
    let random_index = Math.floor(Math.random() * this.deck.length); // ***
    const new_card = this.deck[random_index]; // ***
    this.deck.splice(random_index, 1); // ***
    const num = this.dealer_hand.concat(this.player_hand).length; // ***
    this.displayCard(this.player_box_id, new_card, (num + 1).toString()); // 020
    this.player_hand.push(new_card); // ***
    this.analyse_player(this.player_hand); // 021
    $("#player_hand_value").text(`PLAYER : ${this.player}`); // ***
  };
  // ===========================================
  this.analyse_player = (the_hand) => { // 021
    const real_hand = this.getRealHand(the_hand);
    if (this.checkForBust(real_hand)) { // 022
      this.displayMessage("PLAYER LOSES"); // 024
      $("#card_4").attr("src", `images/cards/${this.hidden_card}`); // ***
      this.reset(); // 023
    }
    this.player = real_hand; // ***
  };
  // ===========================================
  this.getRealHand = (the_hand) => {
    const arr = this.stripHand(the_hand); // ***
    const hand = this.returnHand(arr); // ***
    return arr.reduce((a, b) => a + b); // ***
  };
  // ===========================================
  this.checkBlackJack = (playerOrDealer) => { // 028
    const num_of_cards = playerOrDealer.length;
    const hand = this.getRealHand(playerOrDealer);
    if (num_of_cards === 2 && hand === 21) {
      return true;
    } else {
      return false;
    }
  };
  // ===========================================
  this.displayMessage = (message) => { // 024
    $("#infos").text(message); // ***
    $("#messages").animate({top: "10px"}); // ***
  };
  // ===========================================
  this.checkForBust = (value) => { // 022
    if (value > 21) {
      return true; // ***
    }
    return false; // ***
  };
  // ===========================================
  this.reset = () => { // 023
    this.deck = ["ec.png", "ed.png", "eh.png", "es.png", "2c.png", "2d.png", "2h.png", "2s.png", "3c.png", "3d.png", "3h.png", "3s.png", "4c.png", "4d.png", "4h.png", "4s.png", "5c.png", "5d.png", "5h.png", "5s.png", "6c.png", "6d.png", "6h.png", "6s.png", "7c.png", "7d.png", "7h.png", "7s.png", "8c.png", "8d.png", "8h.png", "8s.png", "9c.png", "9d.png", "9h.png", "9s.png", "10c.png", "10d.png", "10h.png", "10s.png", "t11c.png", "t11d.png", "t11h.png", "t11s.png", "t12c.png", "t12d.png", "t12h.png", "t12s.png", "t13c.png", "t13d.png", "t13h.png", "t13s.png"]; 
    bet.bet = 0;
    $("#bet").text(`BET : $0`); // ***
    $(".deal_button").css("display", "block"); // ***
    $(".buttons_box").css("display", "none"); // ***
  };
  // ===========================================
  this.analyse_dealer = (the_hand) => { // 027
    const arr = this.stripHand(the_hand);
    const hand = this.returnHand(arr);
    const real_hand = arr.reduce((a, b) => a + b);
    this.dealer = real_hand;
  };
  // ===========================================
  this.returnHand = (stripped_arr) => {
    let value = stripped_arr.reduce((a, b) => a + b);
    if (value > 21) {
      if (stripped_arr.filter((a) => a === 11).length !== 0) {
        const new_arr = this.convertElevenToOne(stripped_arr);
        this.returnHand(new_arr);
      }
    }
    return value;
  };
  // ===========================================
  this.stripHand = (arr_original_hand) => {
    let arr_hand_to_analyse = [];
    for (let i in arr_original_hand) {
      let hint = arr_original_hand[i].substring(0, 1);
      if (hint === "t") {
        arr_hand_to_analyse.push(10);
      } else if (hint === "e") {
        arr_hand_to_analyse.push(11);
      } else {
        let value = Number(arr_original_hand[i].substring(0, arr_original_hand[i].length - 5));
        arr_hand_to_analyse.push(value);
      }
    }
    return arr_hand_to_analyse;
  };
  // ===========================================
  this.convertElevenToOne = (arr_for_conversion) => {
    for (let i in arr_for_conversion) {
      if (arr_for_conversion[i] === 11) {
        arr_for_conversion.splice(i, 1, 1);
        return arr_for_conversion;
      }
    }
  };
  // ===========================================
  this.dealerHit = () => { // 015
    const arr = this.stripHand(this.dealer_hand);
    const hand = this.returnHand(arr);
    const real_hand = arr.reduce((a, b) => a + b);
    $("#player_hand_value").text(`PLAYER : ${this.player} - DEALER : ${real_hand}`);
    if (real_hand < 17) {
      let random_index = Math.floor(Math.random() * this.deck.length);
      const new_card = this.deck[random_index];
      this.deck.splice(random_index, 1);
      const num = this.dealer_hand.concat(this.player_hand).length;
      this.displayCard(this.dealer_box_id, new_card, (num + 1).toString());
      this.dealer_hand.push(new_card);
      this.analyse_dealer(this.dealer_hand); // 027
      this.dealerHit();
    }
  };
  // ===========================================
}



















