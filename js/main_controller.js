// ===========================================
let madJack;
let bet;
let timer;
// ===========================================
$(function() {
  madJack = new MadJack("player_cards", "dealer_cards");
  bet = new Bet();
  addEventListeners();
  timer = setInterval(showMessage, 2000);
});
// ===========================================
const addEventListeners = () => {
  $("#deal_button").click(dealButton);
  $("#close").click(hideMessage);
};
// ===========================================
const dealButton = () => {
  if (bet.bet === 0) {
    $("#infos").text("PLEASE MAKE A BET");
    $("#messages").animate({top: "10px"});
  } else {
    $(".deal_button").css("display", "none");
    $(".buttons_box").css("display", "block");
    madJack.startNewHand();
  }
};
// ===========================================
const showMessage = () => {
  $("#messages").animate({top: "10px"});
  clearInterval(timer);
};
// ===========================================
const hideMessage = () => {
  $("#messages").animate({top: "-70px"});
};
// ===========================================
