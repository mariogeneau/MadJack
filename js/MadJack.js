function MadJack(player_box_id, dealer_box_id) {
  // ===========================================
  this.player_box_id = player_box_id;
  this.dealer_box_id = dealer_box_id;
  this.deck = ["1c.png", "1d.png", "1h.png", "1s.png", "2c.png", "2d.png", "2h.png", "2s.png", "3c.png", "3d.png", "3h.png", "3s.png", "4c.png", "4d.png", "4h.png", "4s.png", "5c.png", "5d.png", "5h.png", "5s.png", "6c.png", "6d.png", "6h.png", "6s.png", "7c.png", "7d.png", "7h.png", "7s.png", "8c.png", "8d.png", "8h.png", "8s.png", "9c.png", "9d.png", "9h.png", "9s.png", "10c.png", "10d.png", "10h.png", "10s.png", "11c.png", "11d.png", "11h.png", "11s.png", "12c.png", "12d.png", "12h.png", "12s.png", "13c.png", "13d.png", "13h.png", "13s.png"];
  this.player_hand = [];
  this.dealer_hand = [];
  this.copy_deck = this.deck;
  // ===========================================
  this.startNewHand = () => {
    // Player Card 1
    let random_index = Math.floor(Math.random() * this.copy_deck.length);
    const player_card_1 = this.copy_deck[random_index];
    this.copy_deck.splice(random_index, 1);
    this.displayCard(this.player_box_id, player_card_1, "1", "20px");
    let strip_ext = Number(player_card_1.substring(0, player_card_1.length - 5));
    this.player_hand.push(strip_ext);
    // Dealer Card 1
    random_index = Math.floor(Math.random() * this.copy_deck.length);
    const dealer_card_1 = this.copy_deck[random_index];
    this.copy_deck.splice(random_index, 1);
    this.displayCard(this.dealer_box_id, dealer_card_1, "2", "20px");
    strip_ext = Number(dealer_card_1.substring(0, dealer_card_1.length - 5));
    this.dealer_hand.push(strip_ext);
    // Player Card 2
    random_index = Math.floor(Math.random() * this.copy_deck.length);
    const player_card_2 = this.copy_deck[random_index];
    this.copy_deck.splice(random_index, 1);
    this.displayCard(this.player_box_id, player_card_2, "3", "-10px");
    strip_ext = Number(player_card_2.substring(0, player_card_2.length - 5));
    this.player_hand.push(strip_ext);
    // Dealer Card 2
    random_index = Math.floor(Math.random() * this.copy_deck.length);
    const dealer_card_2 = this.copy_deck[random_index];
    this.copy_deck.splice(random_index, 1);
    this.displayCard(this.dealer_box_id, "back.png", "4", "-10px");
    strip_ext = Number(dealer_card_2.substring(0, dealer_card_2.length - 5));
    this.dealer_hand.push(strip_ext);
    console.log(this.player_hand);
    console.log(this.dealer_hand);
  }
  // ===========================================
  this.displayCard = (box_id, card_value, card_id_number, left_pos) => {
    const box_obj = document.getElementById(box_id);
    const card_obj = document.createElement("IMG");
    card_obj.setAttribute("src", "images/cards/" + card_value);
    card_obj.setAttribute("id", "card_" + card_id_number);
    card_obj.setAttribute("class", "cards");
    box_obj.appendChild(card_obj);
    $("#card_" + card_id_number).css("z-index", card_id_number);
    $("#card_" + card_id_number).css("left", left_pos);
  };
  // ===========================================
}