function MadJack(player_box_id, dealer_box_id) {
  // ===========================================
  this.player_box_id = player_box_id;
  this.dealer_box_id = dealer_box_id;
  this.deck = ["ec.png", "ed.png", "eh.png", "es.png", "2c.png", "2d.png", "2h.png", "2s.png", "3c.png", "3d.png", "3h.png", "3s.png", "4c.png", "4d.png", "4h.png", "4s.png", "5c.png", "5d.png", "5h.png", "5s.png", "6c.png", "6d.png", "6h.png", "6s.png", "7c.png", "7d.png", "7h.png", "7s.png", "8c.png", "8d.png", "8h.png", "8s.png", "9c.png", "9d.png", "9h.png", "9s.png", "10c.png", "10d.png", "10h.png", "10s.png", "t11c.png", "t11d.png", "t11h.png", "t11s.png", "t12c.png", "t12d.png", "t12h.png", "t12s.png", "t13c.png", "t13d.png", "t13h.png", "t13s.png"];
  this.player_hand = [];
  this.dealer_hand = [];
  this.hidden_card;
  this.copy_deck = this.deck;
  this.player;
  this.dealer;
  // ===========================================
  this.startNewHand = () => {
    // Player Card 1
    let random_index = Math.floor(Math.random() * this.copy_deck.length);
    const player_card_1 = this.copy_deck[random_index];
    this.copy_deck.splice(random_index, 1);
    this.displayCard(this.player_box_id, player_card_1, "1");
    this.player_hand.push(player_card_1);

    // Dealer Card 1
    random_index = Math.floor(Math.random() * this.copy_deck.length);
    const dealer_card_1 = this.copy_deck[random_index];
    this.copy_deck.splice(random_index, 1);
    this.displayCard(this.dealer_box_id, dealer_card_1, "2");
    this.dealer_hand.push(dealer_card_1);

    // Player Card 2
    random_index = Math.floor(Math.random() * this.copy_deck.length);
    const player_card_2 = this.copy_deck[random_index];
    this.copy_deck.splice(random_index, 1);
    this.displayCard(this.player_box_id, player_card_2, "3");
    this.player_hand.push(player_card_2);

    // Dealer Card 2
    random_index = Math.floor(Math.random() * this.copy_deck.length);
    const dealer_card_2 = this.copy_deck[random_index];
    this.hidden_card = dealer_card_2;
    this.copy_deck.splice(random_index, 1);
    this.displayCard(this.dealer_box_id, "back.png", "4");
    this.dealer_hand.push(dealer_card_2);
    
    this.analyse_player(this.player_hand);
    this.analyse_dealer(this.dealer_hand);
    
    $("#player_hand_value").text(`PLAYER : ${this.player}`);
  }
  // ===========================================
  this.analyse_player = (the_hand) => {
    const arr = this.stripHand(the_hand);
    const hand = this.returnHand(arr);
    const real_hand = arr.reduce((a, b) => a + b);
    if (this.checkForBust(real_hand)) {
      $("#infos").text("PLAYER LOSES");
      $("#messages").animate({top: "10px"});
      $(".buttons_box").css("display", "none");
      $("#card_4").attr("src", `images/cards/${this.hidden_card}`);
    }
    this.player = real_hand;
  };
  // ===========================================
  this.analyse_dealer = (the_hand) => {
    const arr = this.stripHand(the_hand);
    const hand = this.returnHand(arr);
    const real_hand = arr.reduce((a, b) => a + b);
    if (this.checkForBust(real_hand)) {
      $(".buttons_box").css("display", "none");
    }
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
  this.checkForBust = (value) => {
    if (value > 21) {
      return true;
    }
    return false;
  };
  // ===========================================
  this.displayCard = (box_id, card_value, card_id_number) => {
    const box_obj = document.getElementById(box_id);
    const card_obj = document.createElement("IMG");
    card_obj.setAttribute("src", "images/cards/" + card_value);
    card_obj.setAttribute("id", "card_" + card_id_number);
    card_obj.setAttribute("class", "cards");
    box_obj.appendChild(card_obj);
    $("#card_" + card_id_number).css("z-index", card_id_number);
    $("#card_" + card_id_number).css("left", "47px");
  };
  // ===========================================
  this.hit = () => {
    let random_index = Math.floor(Math.random() * this.copy_deck.length);
    const new_card = this.copy_deck[random_index];
    this.copy_deck.splice(random_index, 1);
    const num = this.dealer_hand.concat(this.player_hand).length;
    this.displayCard(this.player_box_id, new_card, (num + 1).toString());
    this.player_hand.push(new_card);
    this.analyse_player(this.player_hand);
    $("#player_hand_value").text(`PLAYER : ${this.player}`);
  };
  // ===========================================
  this.dealerHit = () => {
    const arr = this.stripHand(this.dealer_hand);
    const hand = this.returnHand(arr);
    const real_hand = arr.reduce((a, b) => a + b);
    $("#player_hand_value").text(`PLAYER : ${this.player} - DEALER : ${real_hand}`);
    if (real_hand < 17) {
      let random_index = Math.floor(Math.random() * this.copy_deck.length);
      const new_card = this.copy_deck[random_index];
      this.copy_deck.splice(random_index, 1);
      const num = this.dealer_hand.concat(this.player_hand).length;
      this.displayCard(this.dealer_box_id, new_card, (num + 1).toString());
      this.dealer_hand.push(new_card);
      this.analyse_dealer(this.dealer_hand);
      this.dealerHit();
    }
  };
  // ===========================================
}



















