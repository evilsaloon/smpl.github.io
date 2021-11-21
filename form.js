var dropdown = $("#dropdownMenuButton1");
$(".dropdown-item#1").on("click", () => {
  dropdown.text("Основной");
});
$(".dropdown-item#2").on("click", () => {
  dropdown.text("Твинк");
});
var formcheck = $("#flexCheckDefault");
// checkboxModule()
// formcheck.on("click", () => {
//   checkboxModule()
// });
// function checkboxModule(){
//   if (formcheck.is(':checked')) {formcheck.attr('data-state', true)}
//   else {formcheck.attr('data-state', false)}
// }