// ===========================================
let madJack;
// ===========================================
$(function() {
  madJack = new MadJack("player_cards", "dealer_cards");
  addEventListeners();
});
// ===========================================
const addEventListeners = () => {
  $("#deal_button").click(dealButton);
};
// ===========================================
const dealButton = () => {
  $(".deal_button").css("display", "none");
  $(".buttons_box").css("display", "block");
  madJack.startNewHand();
};
// ===========================================








