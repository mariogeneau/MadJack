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
  $("#c25").click(clickChipManagement);
  $("#c50").click(clickChipManagement);
  $("#c75").click(clickChipManagement);
  $("#c100").click(clickChipManagement);
};
// ===========================================
const clickChipManagement = (evt) => {
  if ($(".deal_button").css("display") === "none") {
    return;
  }
  hideMessage();
  const i = evt.target.id;
  const v = i.substring(1, i.length);
  const n = Number(v);
  if (!bet.makeBet(n, "player_money", "bet")) {
    $("#infos").text("NOT ENOUGH MONEY");
    showMessage();
  }
};
// ===========================================
const dealButton = () => {
  if (bet.bet === 0) {
    $("#infos").text("PLEASE MAKE A BET");
    $("#messages").animate({top: "10px"});
  } else {
    hideMessage();
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
