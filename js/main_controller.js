// ===========================================
let madJack;
let bet;
let timer;
let hands;
// ===========================================
$(function() {
  madJack = new MadJack("player_cards", "dealer_cards");
  bet = new Bet();
  hands = new Hands();
  addEventListeners();
});
// ===========================================
const addEventListeners = () => {
  $("#deal_button").click(dealButton);
  $("#close").click(hideMessage);
  $("#c25").click(clickChipManagement);
  $("#c50").click(clickChipManagement);
  $("#c75").click(clickChipManagement);
  $("#c100").click(clickChipManagement);
  $("#hit").click(hit);
  $("#stand").click(stand);
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
const hit = () => {
  madJack.hit();
  // if (hands.checkBust(madJack.player_hand)) {
  //   $("#messages").animate({top: "10px"});
  //   $("#infos").text("BUSTED : " + hands.busted_hand);
  //   $(".buttons_box").css("display", "none");
  // }
  // $("#player_hand_value").text(`PLAYER HAND : ${madJack.player_hand.reduce((a, b) => a + b)}`);
};
// ===========================================
const stand = () => {
  $("#card_4").attr("src", `images/cards/${madJack.hidden_card}`);
  madJack.dealerHit();
};
// ===========================================
