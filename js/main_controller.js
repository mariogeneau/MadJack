// ===========================================
// 001, 002, 003, 004, 005, 006, 007, 008, 009, 010, 011, 012, 013, 014, 015, 016, 026, 029
// ===========================================
let madJack; // 001
let bet; // 002
// ===========================================
$(function() {
  madJack = new MadJack("player_cards", "dealer_cards"); // 001
  bet = new Bet(); // 002
  addEventListeners(); // 003
});
// ===========================================
const addEventListeners = () => {  // 003
  $("#deal_button").click(dealButton); // 004
  $("#close").click(hideMessage); // 005
  $("#c25").click(clickChipManagement); // 006
  $("#c50").click(clickChipManagement); // 006
  $("#c75").click(clickChipManagement); // 006
  $("#c100").click(clickChipManagement); // 006
  $("#hit").click(hit); // 007
  $("#stand").click(stand); // 008
  $("#double").click(tryDouble); // 029
};
// ===========================================
const tryDouble = () => { // 029
  if (bet.tryDouble("player_money", "bet")) {
    $("#player_money").text(`PLAYER MONEY : $${bet.stack}`); // ***
    $("#bet").text(`BET : $${bet.bet}`); // ***
    madJack.hit(); // 013
    if (madJack.player <= 21) {
      stand();
    }
  } else {
    displayMessage("NOT ENOUGH MONEY");
  }
};
// ===========================================
const dealButton = () => { // 004
  if (bet.bet === 0) {
    displayMessage("PLEASE MAKE A BET"); // ***
  } else {
    startNewGame(); // 010
  }
};
// ===========================================
const startNewGame = () => { // 010
  hideMessage(); // 005
  hideDealShowButtons(); // 011
  madJack.startNewHand(); // 012
  if (madJack.checkBlackJack(madJack.player_hand)) {
    playerBlackJack();
  }
};
// ===========================================
const playerBlackJack = () => {
  displayMessage("MadJack!");
  bet.addToStack(3);
  showDealHideButtons();
  manageMoney();
  $("#card_4").attr("src", `images/cards/${madJack.hidden_card}`); // ***
};
// ===========================================
const hideDealShowButtons = () => { // 011
  $(".deal_button").css("display", "none"); // ***
  $(".buttons_box").css("display", "block"); // ***
};
// ===========================================
const showDealHideButtons = () => {
  $(".deal_button").css("display", "block"); // ***
  $(".buttons_box").css("display", "none"); // ***
};
// ===========================================
const displayMessage = (message) => { // 009
  $("#infos").html(message); // ***
  $("#messages").animate({top: "10px"}); // ***
};
// ===========================================
const hideMessage = () => { // 005
  $("#messages").animate({top: "-70px"}); // ***
};
// ===========================================
const clickChipManagement = (evt) => { // 006
  if ($(".deal_button").css("display") === "none") {
    return;
  }
  madJack.removeCards(); // 026
  $("#player_hand_value").text(""); // ***
  hideMessage(); // 005
  const i = evt.target.id; // ***
  const v = i.substring(1, i.length); // ***
  const n = Number(v); // ***
  if (!bet.makeBet(n, "player_money", "bet")) {
    displayMessage("NOT ENOUGH MONEY");
  }
};
// ===========================================
const hit = () => { // 007
  madJack.hit(); // 013
};
// ===========================================
const stand = () => { // 008
  $("#card_4").attr("src", `images/cards/${madJack.hidden_card}`); // ***
  madJack.dealerHit(); // 015
  const result = bet.analyseHand(madJack.player, madJack.dealer); // 016
  displayMessage(result); // 009
  manageMoney(); // 014
  doesPlayerStillHaveMoney();
};
// ===========================================
const doesPlayerStillHaveMoney = () => {
  if (bet.stack === 0) {
    displayMessage("GAME OVER<br><a href='index.html'>NEW GAME</a>");
    $("#bet").text("BET : $0");
    $(".deal_button").css("display", "none");
  }
};
// ===========================================
const manageMoney = () => { // 014
  $("#player_money").text(`PLAYER MONEY : $${bet.stack}`); // ***
  bet.bet = 0; // ***
  $("#bet").text(`BET : $${bet.bet}`); // ***
};
// ===========================================
















