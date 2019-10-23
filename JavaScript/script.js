//#region Variaveis
var btn = $("#btn");
btn.click(validate);
var inputs = $('input');
var tipo = $("#trafoSelect");
var RT = $("#RT");
var image = $("#trafoImage");
btn.prop("hidden", false);
PlotGrafic("");

//#endregion
//#region RTActivator And Image changer
$("#RTCheck").click(function (){
  $("#RTCheck:checked").val() == "RTSelected" ? RT.prop("disabled", false) : RT.prop("disabled", true), RT.val("");
});
tipo.change(ImageChenger);

function ImageChenger(){
  var src = "";
  switch(tipo.val()){
    case "DD":
      src = "images/DD.jpg";
      break;
    case "DE":
      src = "images/DE.jpg";
      break;
    case "ED":
      src = "images/ED.jpg";
      break;
    case "EE":
      src = "images/EE.jpg";
      break;  
  }
  image.attr("src", src);
}

//#endregion
//#region validation

function validate() {
  "use strict";
  var msg = "Preencha a tensão de entrada/saída e RT ou as tensões de entrada e saída";
  inputs[1].value != "" && inputs[2].value != "" ? Calcula_RT_Entrada() : 
  inputs[1].value != "" && inputs[3].value != "" ? Calcula_RT_Entrada() :
  inputs[2].value != "" && inputs[3].value != "" ? Calcula_RT_Entrada() :
  inputs[2].value != "" && inputs[3].value != "" ? Calcula_RT_Entrada() : window.alert(msg);
}

//#endregion
//#region btnCal
function AfterCacl() {
  inputs.prop("disabled", true);
  $("#btnReset").prop("disabled", false);
  tipo.prop("disabled", true);
  btn.prob("disabled", true);
}

function Calcula_RT_Entrada() {
  var TrafoConfig = tipo.val();
  var MsgTrafo = ("Voce Selecionou a configuracao de transformador: " + TrafoConfig);
  switch(TrafoConfig) {
    case "DD": CalculoDD();
      AfterCacl();
      break;
    case 'DE': CalculoDE();
      AfterCacl();
      break;
    case 'EE': CalculoEE();
      AfterCacl();
      break;
    case 'ED': CalculoED();
      AfterCacl();
      break;
    case "none": window.alert("Selecione o tipo de tranformador"); 
      break;
  }
}

$("#btnReset").click(function(){
  tipo.val(0);
  inputs[1].value = "";
  inputs[2].value = "";
  inputs[3].value = "";
  inputs[6].value = "";
  inputs[7].value = "";
  inputs[8].value = "";
  inputs[9].value = "";
  inputs[10].value = "";
  document.getElementById("RTCheck").checked = false;
  inputs.prop("disabled", false);
  RT.prop("disabled", true);
  tipo.prop("disabled", false);
  document.getElementById("btn").disabled = false;
  PlotGrafic("");
  image.attr("src", "");

})

//#endregion
//#region Calculos
function CalculoDD() {
  if($("#RTCheck:checked").val() == "RTSelected" && inputs[2].value != ""){
    inputs[6].value = (inputs[2].value);
    inputs[7].value = (inputs[2].value);
    inputs[8].value =  (inputs[2].value/RT.val());
    inputs[9].value =  (inputs[2].value/RT.val());
  }else if($("#RTCheck:checked").val() == "RTSelected" && inputs[3].value != ""){
    inputs[8].value = (inputs[3].value);
    inputs[9].value = (inputs[3].value);
    inputs[6].value =  (inputs[3].value*RT.val());
    inputs[7].value =  (inputs[3].value*RT.val());
  }else {
    inputs[6].value = (inputs[2].value);
    inputs[7].value = (inputs[2].value);
    inputs[8].value = (inputs[3].value);
    inputs[9].value = (inputs[3].value);
    RT.val(inputs[6].value/inputs[8].value);
  }
  PlotGrafic(parseInt(inputs[9].value));
  inputs[10].value = (((Math.sqrt(2)*inputs[8].value)-1.4)*0.955);
}

function CalculoDE() {
  if($("#RTCheck:checked").val() == "RTSelected" && inputs[2].value != ""){
    inputs[6].value = (inputs[2].value);
    inputs[7].value = (inputs[2].value);
    inputs[9].value =  (inputs[2].value/RT.val());
    inputs[8].value =  inputs[9].value*Math.sqrt(3);
  }else if($("#RTCheck:checked").val() == "RTSelected" && inputs[3].value != ""){
    inputs[8].value = (inputs[3].value);
    inputs[9].value = (inputs[3].value/Math.sqrt(3));
    inputs[6].value =  (inputs[9].value*RT.val());
    inputs[7].value =  (inputs[9].value*RT.val());
  }else {
    inputs[6].value = (inputs[2].value);
    inputs[7].value = (inputs[2].value);
    inputs[8].value = (inputs[3].value);
    inputs[9].value = (inputs[3].value/Math.sqrt(3));
    RT.val(inputs[6].value/inputs[9].value);
  }
  PlotGrafic(parseInt(inputs[9].value));
  inputs[10].value = (((Math.sqrt(2)*inputs[8].value)-1.4)*0.955);
}

function CalculoEE() {
  if($("#RTCheck:checked").val() == "RTSelected" && inputs[2].value != ""){
    inputs[6].value = (inputs[2].value);
    inputs[7].value = (inputs[2].value)/Math.sqrt(3);
    inputs[9].value =  (inputs[7].value/RT.val());
    inputs[8].value =  inputs[9].value*Math.sqrt(3);
  }else if($("#RTCheck:checked").val() == "RTSelected" && inputs[3].value != ""){
    inputs[8].value = (inputs[3].value);
    inputs[9].value = (inputs[3].value/Math.sqrt(3));
    inputs[7].value =  (inputs[9].value*RT.val());
    inputs[6].value =  (inputs[7].value*Math.sqrt(3));
  }else {
    inputs[6].value = (inputs[2].value);
    inputs[7].value = (inputs[2].value)/Math.sqrt(3);
    inputs[8].value = (inputs[3].value);
    inputs[9].value = (inputs[3].value/Math.sqrt(3));
    RT.val(inputs[7].value/inputs[9].value);
  }
  PlotGrafic(parseInt(inputs[9].value));
  inputs[10].value = (((Math.sqrt(2)*inputs[8].value)-1.4)*0.955);
}
function CalculoED() {
  if($("#RTCheck:checked").val() == "RTSelected" && inputs[2].value != ""){
    inputs[6].value = (inputs[2].value);
    inputs[7].value = (inputs[2].value)/Math.sqrt(3);
    inputs[9].value =  (inputs[7].value/RT.val());
    inputs[8].value =  (inputs[7].value/RT.val());
  }else if($("#RTCheck:checked").val() == "RTSelected" && inputs[3].value != ""){
    inputs[8].value = (inputs[3].value);
    inputs[9].value = (inputs[3].value);
    inputs[7].value =  (inputs[9].value*RT.val());
    inputs[6].value =  (inputs[7].value*Math.sqrt(3));
  }else {
    inputs[6].value = (inputs[2].value);
    inputs[7].value = (inputs[2].value)/Math.sqrt(3);
    inputs[8].value = (inputs[3].value);
    inputs[9].value = (inputs[3].value);
    RT.val(inputs[7].value/inputs[9].value);
  }
  PlotGrafic(parseInt(inputs[9].value));
  inputs[10].value = (((Math.sqrt(2)*inputs[8].value)-1.4)*0.955);
}
//#endregion  