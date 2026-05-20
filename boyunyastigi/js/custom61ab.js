var fontTypes = ["ethnocentric", "aviano","sonsie", "sigmar"];
var orderDetail1 = {"type": "isikli", "text":'', "textColor": "white", "fontFamily": "ethnocentric", "symbol": "king_1", "plateColor": "bordo", "textAlign": "center"};
var orderDetail2 = {"type": "isikli", "text":'', "textColor": "white", "fontFamily": "ethnocentric", "symbol": "king_1", "plateColor": "bordo", "textAlign": "center"};
var orderDetail3 = {"type": "isikli", "text":'', "textColor": "white", "fontFamily": "ethnocentric", "symbol": "king_1", "plateColor": "bordo", "textAlign": "center"};
var orderDetail4 = {"type": "isikli", "text":'', "textColor": "white", "fontFamily": "ethnocentric", "symbol": "king_1", "plateColor": "bordo", "textAlign": "center"};
var orderDetail5 = {"type": "isikli", "text":'', "textColor": "white", "fontFamily": "ethnocentric", "symbol": "king_1", "plateColor": "bordo", "textAlign": "center"};
var orderDetail6 = {"type": "isikli", "text":'', "textColor": "white", "fontFamily": "ethnocentric", "symbol": "king_1", "plateColor": "bordo", "textAlign": "center"};
var orderDetail7 = {"type": "isikli", "text":'', "textColor": "white", "fontFamily": "ethnocentric", "symbol": "king_1", "plateColor": "bordo", "textAlign": "center"};
var orderDetail8 = {"type": "isikli", "text":'', "textColor": "white", "fontFamily": "ethnocentric", "symbol": "king_1", "plateColor": "bordo", "textAlign": "center"};
var quantity = 0;
var withShipment = 0;
var kargo = 81;
var platePrice = 0;
var Ccity = 0;
var Cstate = 0;
var price1;
var price2;
var price3;
var textLengt = 20;
var enterCnt = 0;
var enterCnt2 = 0;
var enterCnt3 = 0;
var enterCnt4 = 0;
var enterCnt5 = 0;
var enterCnt6 = 0;
var fontTextLine = ["plateT1","plateT2","plateT3","plateT4"];
var priceVariations = 4;

$(document).on("click", ".selectSymbol", function () {
  var symPos = $(this).data('id');
  
  $("#whichSym").val( symPos );
});

$(document).on("click", ".select_font", function () {
  var symPos1 = $(this).data('id');
  var tValue = "";
  $.each(fontTextLine, function(index, value) {
    if(value !== symPos1) {$(".modalText").removeClass(value);}
    else {tValue = value;}
  });

  $(".modalText").addClass(tValue);
  $('.plateT1').html($('#pillowText1').val().toLocaleUpperCase('tr-TR'));
  $('.plateT2').html($('#pillowText2').val().toLocaleUpperCase('tr-TR'));
  $('.plateT3').html($('#pillowText3').val().toLocaleUpperCase('tr-TR'));
  $('.plateT4').html($('#pillowText4').val().toLocaleUpperCase('tr-TR'));

  $("#whichSym").val( symPos1 );


});

$(document).on("click", ".selectkonum", function () {
  var symPos3 = $(this).data('id');
  $("#konum").val( symPos3 );
});
$(document).on("click", ".selectrenk", function () {
  var symPos4 = $(this).data('id');
  $("#renksecim").val( symPos4 );
});
//************************figürler ******************************
function closeModal(plateSymbol) {
  var imgPosition = $('#whichSym').val();
  if (imgPosition == 'left1') {
    orderDetail1.symbol = plateSymbol;
    document.getElementById('myImg-left1').src = "../inc_all/figures/"+plateSymbol+".svg";
    // document.getElementById('myImg-left-kemer1').src = "../inc_all/figures/"+plateSymbol+".svg";
  } else if(imgPosition == 'right1') {
    orderDetail1.plateColor = plateSymbol;
    document.getElementById('pillow1').src = "../inc_all/images/neckPillow/"+plateSymbol+".png";
    // document.getElementById('belt1').src = "../inc_all/images/neckPillow/"+plateSymbol+"_belt.png";
  } else if(imgPosition == 'left2') {
    orderDetail2.symbol = plateSymbol;
    document.getElementById('myImg-left2').src = "../inc_all/figures/"+plateSymbol+".svg";
    // document.getElementById('myImg-left-kemer2').src = "../inc_all/figures/"+plateSymbol+".svg";
  }else if(imgPosition == 'right2') {
    orderDetail2.plateColor = plateSymbol;
    document.getElementById('pillow2').src = "../inc_all/images/neckPillow/"+plateSymbol+".png";
    document.getElementById('belt2').src = "../inc_all/images/neckPillow/"+plateSymbol+"_belt.png";
  }else if(imgPosition == 'left3') {
    orderDetail3.symbol = plateSymbol;
    document.getElementById('myImg-left3').src = "../inc_all/figures/"+plateSymbol+".svg";
    // document.getElementById('myImg-left-kemer3').src = "../inc_all/figures/"+plateSymbol+".svg";
  }else if(imgPosition == 'right3') {
    orderDetail3.plateColor = plateSymbol;
    document.getElementById('pillow3').src = "../inc_all/images/neckPillow/"+plateSymbol+".png";
    document.getElementById('belt3').src = "../inc_all/images/neckPillow/"+plateSymbol+"_belt.png";
  }else if(imgPosition == 'left4') {
    orderDetail4.symbol = plateSymbol;
    document.getElementById('myImg-left4').src = "../inc_all/figures/"+plateSymbol+".svg";
    // document.getElementById('myImg-left-kemer4').src = "../inc_all/figures/"+plateSymbol+".svg";
  }else if(imgPosition == 'right4') {
    orderDetail4.plateColor = plateSymbol;
    document.getElementById('pillow4').src = "../inc_all/images/neckPillow/"+plateSymbol+".png";
    document.getElementById('belt4').src = "../inc_all/images/neckPillow/"+plateSymbol+"_belt.png";
  }else if(imgPosition == 'left5') {
    orderDetail5.symbol = plateSymbol;
    document.getElementById('myImg-left5').src = "../inc_all/figures/"+plateSymbol+".svg";
    // document.getElementById('myImg-left-kemer5').src = "../inc_all/figures/"+plateSymbol+".svg";
  }else if(imgPosition == 'right5') {
    orderDetail5.plateColor = plateSymbol;
    document.getElementById('pillow5').src = "../inc_all/images/neckPillow/"+plateSymbol+".png";
    document.getElementById('belt5').src = "../inc_all/images/neckPillow/"+plateSymbol+"_belt.png";
  }else if(imgPosition == 'left6') {
    orderDetail6.symbol = plateSymbol;
    document.getElementById('myImg-left6').src = "../inc_all/figures/"+plateSymbol+".svg";
    // document.getElementById('myImg-left-kemer6').src = "../inc_all/figures/"+plateSymbol+".svg";
  }else if(imgPosition == 'right6') {
    orderDetail6.plateColor = plateSymbol;
    document.getElementById('pillow6').src = "../inc_all/images/neckPillow/"+plateSymbol+".png";
    document.getElementById('belt6').src = "../inc_all/images/neckPillow/"+plateSymbol+"_belt.png";
  }else if(imgPosition == 'left7') {
    orderDetail7.symbol = plateSymbol;
    document.getElementById('myImg-left7').src = "../inc_all/figures/"+plateSymbol+".svg";
    // document.getElementById('myImg-left-kemer7').src = "../inc_all/figures/"+plateSymbol+".svg";
  }else if(imgPosition == 'right7') {
    orderDetail7.plateColor = plateSymbol;
    document.getElementById('pillow7').src = "../inc_all/images/neckPillow/"+plateSymbol+".png";
    document.getElementById('belt7').src = "../inc_all/images/neckPillow/"+plateSymbol+"_belt.png";
  }else if(imgPosition == 'left8') {
    orderDetail8.symbol = plateSymbol;
    document.getElementById('myImg-left8').src = "../inc_all/figures/"+plateSymbol+".svg";
    // document.getElementById('myImg-left-kemer8').src = "../inc_all/figures/"+plateSymbol+".svg";
  }else if(imgPosition == 'right8') {
    orderDetail8.plateColor = plateSymbol;
    document.getElementById('pillow8').src = "../inc_all/images/neckPillow/"+plateSymbol+".png";
    document.getElementById('belt8').src = "../inc_all/images/neckPillow/"+plateSymbol+"_belt.png";
  }
  $('#symbolModal').modal('hide');
  $('#colorModal').modal('hide');
}

function showHide(type) {
  var idNumber = $('#idnumber');
  if (type=="ATD") {idNumber.hide();} else {idNumber.show();}
}
var StateLengt = 0;
function  getStateLen() {
  return StateLengt;
}
function fillStates(id) {
  $.post("getStates.php", { id: id.value }, function (data) {
    var selectState = $('#state');
    dataJSON = JSON.parse(data);
    
    StateLengt = Object.keys(JSON.parse(data)).length;

    selectState
      .find('option')
      .remove()
      .end();
    $('#state').append('<option value="0"></option>')
    $.each(dataJSON, function (index, value) {
      $('#state').append($('<option/>', {
     value: value.id,
        text : value.state_name
      }));
    });
    if(Cstate != 0){
      var i = 0;
      $.each(dataJSON, function (index, value) {
        if(value.id == Cstate) {$("#state").prop('selectedIndex',i);}
        i++;
      });
    }
  });$('#state').focus();
}
// /********şehir ilçe
function cityState(city,state) {
  setSelectValue('city',city);
  Cstate = state;
  document.getElementById("city").onchange()
}

$(document).ready(function () {
  quantity=0;
  document.getElementById("plaka1").style.display='block';
  document.getElementById("plaka2").style.display='none';
  document.getElementById("plaka3").style.display='none';
  document.getElementById("plaka4").style.display='none';

  var maxLength = 2;
  $('textarea').on('input focus keydown keyup', function() {
    var text = $(this).val();
    var lines = text.split(/(\r\n|\n|\r)/gm);
    
    if (lines.length>maxLength) {
      
      $(this).val(lines.join(''));
    }
  });

//************************    METİN  RENGİİİİİ **************************************
  $('#textColor').change(function () {
    var renk_id = $('#renksecim').val();
    orderDetail1.textColor = $(this).children('option:selected').val();
    //alert("ilk İFDE");
    
    var element = $('#pillowText1');
    var element2 = $('#beltText1');
    var ptype = orderDetail1.type;
    clearFontColor(element,ptype);
    clearFontColor(element2,ptype);
    element.addClass('fc-'+orderDetail1.textColor);
    element2.addClass('fc-'+orderDetail1.textColor);
    
  });
  $('#textColor2').change(function () {
    var renk_id = $('#renksecim2').val();
    orderDetail2.textColor = $(this).children('option:selected').val();
    //alert("ilk İFDE");
    
    var element = $('#pillowText2');
    var element2 = $('#beltText2');
    var ptype = orderDetail2.type;
    clearFontColor(element,ptype);
    clearFontColor(element2,ptype);
    element.addClass('fc-'+orderDetail2.textColor);
    element2.addClass('fc-'+orderDetail2.textColor);
    
  });
  $('#textColor3').change(function () {
    var renk_id = $('#renksecim3').val();
    orderDetail3.textColor = $(this).children('option:selected').val();
    //alert("ilk İFDE");
    
    var element = $('#pillowText3');
    var element2 = $('#beltText3');
    var ptype = orderDetail3.type;
    clearFontColor(element,ptype);
    clearFontColor(element2,ptype);
    element.addClass('fc-'+orderDetail3.textColor);
    element2.addClass('fc-'+orderDetail3.textColor);
    
  });
  $('#textColor4').change(function () {
    var renk_id = $('#renksecim4').val();
    orderDetail4.textColor = $(this).children('option:selected').val();
    //alert("ilk İFDE");
    
    
    var element = $('#pillowText4');
    var element2 = $('#beltText4');
    var ptype = orderDetail4.type;
    clearFontColor(element,ptype);
    clearFontColor(element2,ptype);
    element.addClass('fc-'+orderDetail4.textColor);
    element2.addClass('fc-'+orderDetail4.textColor);
    
    
  });
  $('#textColor5').change(function () {
    var renk_id = $('#renksecim5').val();
    orderDetail5.textColor = $(this).children('option:selected').val();
    //alert("ilk İFDE");
    
    
    var element = $('#pillowText5');
    var element2 = $('#beltText5');
    var ptype = orderDetail5.type;
    clearFontColor(element,ptype);
    clearFontColor(element2,ptype);
    element.addClass('fc-'+orderDetail5.textColor);
    element2.addClass('fc-'+orderDetail5.textColor);
    
    
  });
  $('#textColor6').change(function () {
    var renk_id = $('#renksecim6').val();
    orderDetail6.textColor = $(this).children('option:selected').val();
    //alert("ilk İFDE");
    
    
    var element = $('#pillowText6');
    var element2 = $('#beltText6');
    var ptype = orderDetail6.type;
    clearFontColor(element,ptype);
    clearFontColor(element2,ptype);
    element.addClass('fc-'+orderDetail6.textColor);
    element2.addClass('fc-'+orderDetail6.textColor);
    
    
  });
  $('#textColor7').change(function () {
    var renk_id = $('#renksecim7').val();
    orderDetail7.textColor = $(this).children('option:selected').val();
    //alert("ilk İFDE");
    
    
    var element = $('#pillowText7');
    var element2 = $('#beltText7');
    var ptype = orderDetail7.type;
    clearFontColor(element,ptype);
    clearFontColor(element2,ptype);
    element.addClass('fc-'+orderDetail7.textColor);
    element2.addClass('fc-'+orderDetail7.textColor);
    
    
  });
  $('#textColor8').change(function () {
    var renk_id = $('#renksecim8').val();
    orderDetail8.textColor = $(this).children('option:selected').val();
    //alert("ilk İFDE");
    
    
    var element = $('#pillowText8');
    var element2 = $('#beltText8');
    var ptype = orderDetail8.type;
    clearFontColor(element,ptype);
    clearFontColor(element2,ptype);
    element.addClass('fc-'+orderDetail8.textColor);
    element2.addClass('fc-'+orderDetail8.textColor);
    
    
  });


//*************** renk için   burası mobil için yapılacak******************
  $('#textColorM1').change(function () {
    var renk_id = $('#renksecim').val();
    orderDetail1.textColor = $(this).children('option:selected').val();
    //alert("ilk İFDE");
    
    var element = $('#pillowText1');
    var element2 = $('#beltText1');
    var ptype = orderDetail1.type;
    clearFontColor(element,ptype);
    clearFontColor(element2,ptype);
    element.addClass('fc-'+orderDetail1.textColor);
    element2.addClass('fc-'+orderDetail1.textColor);
  });
  $('#textColorM2').change(function () {
    var renk_id = $('#renksecim2').val();
    orderDetail2.textColor = $(this).children('option:selected').val();
    //alert("ilk İFDE");
    
    var element = $('#pillowText2');
    var element2 = $('#beltText2');
    var ptype = orderDetail2.type;
    clearFontColor(element,ptype);
    clearFontColor(element2,ptype);
    element.addClass('fc-'+orderDetail2.textColor);
    element2.addClass('fc-'+orderDetail2.textColor);
  });
  $('#textColorM3').change(function () {
    var renk_id = $('#renksecim3').val();
    orderDetail3.textColor = $(this).children('option:selected').val();
    //alert("ilk İFDE");
    
    var element = $('#pillowText3');
    var element2 = $('#beltText3');
    var ptype = orderDetail3.type;
    clearFontColor(element,ptype);
    clearFontColor(element2,ptype);
    element.addClass('fc-'+orderDetail3.textColor);
    element2.addClass('fc-'+orderDetail3.textColor);
  });
  $('#textColorM4').change(function () {
    var renk_id = $('#renksecim4').val();
    orderDetail4.textColor = $(this).children('option:selected').val();
    //alert("ilk İFDE");
    
    var element = $('#pillowText4');
    var element2 = $('#beltText4');
    var ptype = orderDetail4.type;
    clearFontColor(element,ptype);
    clearFontColor(element2,ptype);
    element.addClass('fc-'+orderDetail4.textColor);
    element2.addClass('fc-'+orderDetail4.textColor);
  });
  $('#textColorM5').change(function () {
    var renk_id = $('#renksecim5').val();
    orderDetail5.textColor = $(this).children('option:selected').val();
    //alert("ilk İFDE");
    
    var element = $('#pillowText5');
    var element2 = $('#beltText5');
    var ptype = orderDetail5.type;
    clearFontColor(element,ptype);
    clearFontColor(element2,ptype);
    element.addClass('fc-'+orderDetail5.textColor);
    element2.addClass('fc-'+orderDetail5.textColor);
  });
  $('#textColorM6').change(function () {
    var renk_id = $('#renksecim6').val();
    orderDetail6.textColor = $(this).children('option:selected').val();
    //alert("ilk İFDE");
    
    var element = $('#pillowText6');
    var element2 = $('#beltText6');
    var ptype = orderDetail6.type;
    clearFontColor(element,ptype);
    clearFontColor(element2,ptype);
    element.addClass('fc-'+orderDetail6.textColor);
    element2.addClass('fc-'+orderDetail6.textColor);
  });
  $('#textColorM7').change(function () {
    var renk_id = $('#renksecim7').val();
    orderDetail7.textColor = $(this).children('option:selected').val();
    //alert("ilk İFDE");
    
    var element = $('#pillowText7');
    var element2 = $('#beltText7');
    var ptype = orderDetail7.type;
    clearFontColor(element,ptype);
    clearFontColor(element2,ptype);
    element.addClass('fc-'+orderDetail7.textColor);
    element2.addClass('fc-'+orderDetail7.textColor);
  });
  $('#textColorM8').change(function () {
    var renk_id = $('#renksecim8').val();
    orderDetail8.textColor = $(this).children('option:selected').val();
    //alert("ilk İFDE");
    
    var element = $('#pillowText8');
    var element2 = $('#beltText8');
    var ptype = orderDetail8.type;
    clearFontColor(element,ptype);
    clearFontColor(element2,ptype);
    element.addClass('fc-'+orderDetail8.textColor);
    element2.addClass('fc-'+orderDetail8.textColor);
  });


  $(window).scroll(function(){
    $('.lazy').each(function(){
      if( $(this).offset().top < ($(window).scrollTop() + $(window).height() + 100) )
      {
        $(this).attr('src', $(this).attr('data-src'));
      }
    });
  });

  var pillowText1 = $('#pillowText1');
  var beltText1 = $('#beltText1')

  pillowText1.keydown(function (e) {

    $('#lgif1').addClass('displayNone');
    $('#rgif1').addClass('displayNone');
    // if(e.keyCode === 13) {enterCnt = 1;}
  });

  beltText1.keydown(function (e) {
    beltText1.val(beltText1.val().replace(/  +/g, ' '));
    // if(e.keyCode === 13) {enterCnt = 1;}
  });

  pillowText1.keyup(function () {
    pillowText1.val(pillowText1.val().replace(/  +/g, ' '));
    orderDetail1.text = pillowText1.val();

    $('#pillowText1').html(pillowText1.val().toLocaleUpperCase('tr-TR'));
    $('#beltText1').val(pillowText1.val().toLocaleUpperCase('tr-TR'));
    $('.plateT1').html(pillowText1.val().toLocaleUpperCase('tr-TR'));

    var rows = $(this).val();
    // if(rows.length < 2 && enterCnt === 1){enterCnt = 0;}
    // if(rows.length === textLengt && enterCnt === 0) {pillowText1.val(rows + "\n");}
  });

  beltText1.keyup(function () {
    beltText1.val(beltText1.val().replace(/  +/g, ' '));
    orderDetail1.text = beltText1.val();
    pillowText1.val(beltText1.val().toLocaleUpperCase('tr-TR'));
    $('.plateT1').html(beltText1.val().toLocaleUpperCase('tr-TR'));

    var rows = $(this).val();
    
    // if(rows.length < 2 && enterCnt === 1){enterCnt = 0;}
    // if(rows.length === textLengt && enterCnt === 0) {beltText1.val(rows + "\n");}
  });

  var pillowText2 = $('#pillowText2');
  var beltText2 = $('#beltText2')

  pillowText2.keydown(function (e) {
    pillowText2.val(pillowText2.val().replace(/  +/g, ' '));
    $('#lgif2').addClass('displayNone');
    $('#rgif2').addClass('displayNone');
    // if(e.keyCode === 13) {enterCnt2 = 1;}
  });

  beltText2.keydown(function (e) {
    beltText2.val(beltText2.val().replace(/  +/g, ' '));
    // if(e.keyCode === 13) {enterCnt2 = 1;}
  });

  pillowText2.keyup(function () {
    pillowText2.val(pillowText2.val().replace(/  +/g, ' '));
    orderDetail2.text = pillowText2.val();

    $('#pillowText2').html(pillowText2.val().toLocaleUpperCase('tr-TR'));
    $('#beltText2').val(pillowText2.val().toLocaleUpperCase('tr-TR'));
    $('.plateT2').html(pillowText2.val().toLocaleUpperCase('tr-TR'));
    var rows = $(this).val();
    // if(rows.length < 2 && enterCnt2 === 1){enterCnt2 = 0;}
    // if(rows.length === textLengt && enterCnt2 === 0) {pillowText2.val(rows + "\n");}
  });

  beltText2.keyup(function () {
    beltText2.val(beltText2.val().replace(/  +/g, ' '));
    orderDetail2.text = beltText2.val();
    pillowText2.val(beltText2.val().toLocaleUpperCase('tr-TR'));
    $('.plateT2').html(beltText2.val().toLocaleUpperCase('tr-TR'));
    // selectType();
    var rows = $(this).val();
    // if(rows.length < 2 && enterCnt2 === 1){enterCnt2 = 0;}
    // if(rows.length === textLengt && enterCnt2 === 0) {beltText2.val(rows + "\n");}
  });

  var pillowText3 = $('#pillowText3');
  var beltText3 = $('#beltText3');

  pillowText3.keydown(function (e) {
    pillowText3.val(pillowText3.val().replace(/  +/g, ' '));
    $('#lgif3').addClass('displayNone');
    $('#rgif3').addClass('displayNone');
    // if(e.keyCode === 13) {enterCnt3 = 1;}
  });

  beltText3.keydown(function (e) {
    beltText3.val(beltText3.val().replace(/  +/g, ' '));
    // if(e.keyCode === 13) {enterCnt3 = 1;}
  });

  pillowText3.keyup(function () {
    pillowText3.val(pillowText3.val().replace(/  +/g, ' '));
    orderDetail3.text = pillowText3.val();

    $('#pillowText3').html(pillowText3.val().toLocaleUpperCase('tr-TR'));
    $('#beltText3').val(pillowText3.val().toLocaleUpperCase('tr-TR'));
    $('.plateT3').html(pillowText3.val().toLocaleUpperCase('tr-TR'));
    // selectType();
    var rows = $(this).val();
    // if(rows.length < 2 && enterCnt3 === 1){enterCnt3 = 0;}
    // if(rows.length === textLengt && enterCnt3 === 0) {pillowText3.val(rows + "\n");}
  });

  beltText3.keyup(function () {
    beltText3.val(beltText3.val().replace(/  +/g, ' '));
    orderDetail3.text = beltText3.val();
    pillowText3.val(beltText3.val().toLocaleUpperCase('tr-TR'));
    $('.plateT3').html(beltText3.val().toLocaleUpperCase('tr-TR'));
    // selectType();
    var rows = $(this).val();
    // if(rows.length < 2 && enterCnt3 === 1){enterCnt3 = 0;}
    // if(rows.length === textLengt && enterCnt3 === 0) {beltText3.val(rows + "\n");}
  });

  var pillowText4 = $('#pillowText4');
  var beltText4 = $('#beltText4');

  pillowText4.keydown(function (e) {
    pillowText4.val(pillowText4.val().replace(/  +/g, ' '));
    $('#lgif4').addClass('displayNone');
    $('#rgif4').addClass('displayNone');
    // if(e.keyCode === 13) {enterCnt4 = 1;}
  });

  beltText4.keydown(function (e) {
    beltText4.val(beltText4.val().replace(/  +/g, ' '));
    // if(e.keyCode === 13) {enterCnt4 = 1;}
  });

  pillowText4.keyup(function () {
    pillowText4.val(pillowText4.val().replace(/  +/g, ' '));
    orderDetail4.text = pillowText4.val();

    $('#pillowText4').html(pillowText4.val().toLocaleUpperCase('tr-TR'));
    $('#beltText4').val(pillowText4.val().toLocaleUpperCase('tr-TR'));
    $('.plateT4').html(pillowText4.val().toLocaleUpperCase('tr-TR'));
    // selectType();
    var rows = $(this).val();
    // if(rows.length < 2 && enterCnt4 === 1){enterCnt4 = 0;}
    // if(rows.length === textLengt && enterCnt4 === 0) {pillowText4.val(rows + "\n");}
  });

  beltText4.keyup(function () {
    beltText4.val(beltText4.val().replace(/  +/g, ' '));
    orderDetail4.text = beltText4.val();
    pillowText4.val(beltText4.val().toLocaleUpperCase('tr-TR'));
    $('.plateT4').html(beltText4.val().toLocaleUpperCase('tr-TR'));
    // selectType();
    var rows = $(this).val();
    // if(rows.length < 2 && enterCnt4 === 1){enterCnt4 = 0;}
    // if(rows.length === textLengt && enterCnt4 === 0) {beltText4.val(rows + "\n");}
  });
  var pillowText5 = $('#pillowText5');
  var beltText5 = $('#beltText5');

  pillowText5.keydown(function (e) {
    pillowText5.val(pillowText5.val().replace(/  +/g, ' '));
    $('#lgif5').addClass('displayNone');
    $('#rgif5').addClass('displayNone');
    // if(e.keyCode === 13) {enterCnt5 = 1;}
  });

  beltText5.keydown(function (e) {
    beltText5.val(beltText5.val().replace(/  +/g, ' '));
    // if(e.keyCode === 13) {enterCnt5 = 1;}
  });

  pillowText5.keyup(function () {
    pillowText5.val(pillowText5.val().replace(/  +/g, ' '));
    orderDetail5.text = pillowText5.val();

    $('#pillowText5').html(pillowText5.val().toLocaleUpperCase('tr-TR'));
    $('#beltText5').val(pillowText5.val().toLocaleUpperCase('tr-TR'));
    $('.plateT5').html(pillowText5.val().toLocaleUpperCase('tr-TR'));
    var rows = $(this).val();
    // if(rows.length < 2 && enterCnt5 === 1){enterCnt5 = 0;}
    // if(rows.length === textLengt && enterCnt5 === 0) {pillowText5.val(rows + "\n");}
  });

  beltText5.keyup(function () {
    beltText5.val(beltText5.val().replace(/  +/g, ' '));
    orderDetail5.text = beltText5.val();
    pillowText5.val(beltText5.val().toLocaleUpperCase('tr-TR'));
    $('.plateT5').html(beltText4.val().toLocaleUpperCase('tr-TR'));
    var rows = $(this).val();
    // if(rows.length < 2 && enterCnt5 === 1){enterCnt5 = 0;}
    // if(rows.length === textLengt && enterCnt5 === 0) {beltText5.val(rows + "\n");}
  });
  var pillowText6 = $('#pillowText6');
  var beltText6 = $('#beltText6');

  pillowText6.keydown(function (e) {
    pillowText6.val(pillowText6.val().replace(/  +/g, ' '));
    $('#lgif6').addClass('displayNone');
    $('#rgif6').addClass('displayNone');
    // if(e.keyCode === 13) {enterCnt6 = 1;}
  });

  beltText6.keydown(function (e) {
    beltText6.val(beltText6.val().replace(/  +/g, ' '));
    // if(e.keyCode === 13) {enterCnt6 = 1;}
  });

  pillowText6.keyup(function () {
    pillowText6.val(pillowText6.val().replace(/  +/g, ' '));
    orderDetail6.text = pillowText6.val();

    $('#pillowText6').html(pillowText6.val().toLocaleUpperCase('tr-TR'));
    $('#beltText6').val(pillowText6.val().toLocaleUpperCase('tr-TR'));
    $('.plateT6').html(pillowText6.val().toLocaleUpperCase('tr-TR'));
    // selectType();
    var rows = $(this).val();
    // if(rows.length < 2 && enterCnt6 === 1){enterCnt6 = 0;}
    // if(rows.length === textLengt && enterCnt6 === 0) {pillowText6.val(rows + "\n");}
  });

  beltText6.keyup(function () {
    beltText6.val(beltText6.val().replace(/  +/g, ' '));
    orderDetail6.text = beltText6.val();
    pillowText6.val(beltText6.val().toLocaleUpperCase('tr-TR'));
    $('.plateT6').html(beltText6.val().toLocaleUpperCase('tr-TR'));
    // selectType();
    var rows = $(this).val();
    // if(rows.length < 2 && enterCnt6 === 1){enterCnt6 = 0;}
    // if(rows.length === textLengt && enterCnt6 === 0) {beltText6.val(rows + "\n");}
  });
  var pillowText7 = $('#pillowText7');
  var beltText7 = $('#beltText7');

  pillowText7.keydown(function (e) {
    pillowText7.val(pillowText7.val().replace(/  +/g, ' '));
    $('#lgif7').addClass('displayNone');
    $('#rgif7').addClass('displayNone');
    // if(e.keyCode === 13) {enterCnt7 = 1;}
  });

  beltText7.keydown(function (e) {
    beltText7.val(beltText7.val().replace(/  +/g, ' '));
    // if(e.keyCode === 13) {enterCnt7 = 1;}
  });

  pillowText7.keyup(function () {
    pillowText7.val(pillowText7.val().replace(/  +/g, ' '));
    orderDetail7.text = pillowText7.val();

    $('#pillowText7').html(pillowText7.val().toLocaleUpperCase('tr-TR'));
    $('#beltText7').val(pillowText7.val().toLocaleUpperCase('tr-TR'));
    $('.plateT7').html(pillowText7.val().toLocaleUpperCase('tr-TR'));
    var rows = $(this).val();
    // if(rows.length < 2 && enterCnt7 === 1){enterCnt7 = 0;}
    // if(rows.length === textLengt && enterCnt7 === 0) {pillowText7.val(rows + "\n");}
  });

  beltText7.keyup(function () {
    beltText7.val(beltText7.val().replace(/  +/g, ' '));
    orderDetail7.text = beltText7.val();
    pillowText7.val(beltText7.val().toLocaleUpperCase('tr-TR'));
    $('.plateT7').html(beltText7.val().toLocaleUpperCase('tr-TR'));
    var rows = $(this).val();
    // if(rows.length < 2 && enterCnt7 === 1){enterCnt7 = 0;}
    // if(rows.length === textLengt && enterCnt7 === 0) {beltText7.val(rows + "\n");}
  });
  var pillowText8 = $('#pillowText8');
  var beltText8 = $('#beltText8');

  pillowText8.keydown(function (e) {
    pillowText8.val(pillowText8.val().replace(/  +/g, ' '));
    $('#lgif8').addClass('displayNone');
    $('#rgif8').addClass('displayNone');
    // if(e.keyCode === 13) {enterCnt8 = 1;}
  });

  beltText8.keydown(function (e) {
    beltText8.val(beltText8.val().replace(/  +/g, ' '));
    // if(e.keyCode === 13) {enterCnt8 = 1;}
  });

  pillowText8.keyup(function () {
    pillowText8.val(pillowText8.val().replace(/  +/g, ' '));
    orderDetail8.text = pillowText8.val();

    $('#pillowText8').html(pillowText8.val().toLocaleUpperCase('tr-TR'));
    $('#beltText8').val(pillowText8.val().toLocaleUpperCase('tr-TR'));
    $('.plateT8').html(pillowText8.val().toLocaleUpperCase('tr-TR'));
    var rows = $(this).val();
    // if(rows.length < 2 && enterCnt8 === 1){enterCnt8 = 0;}
    // if(rows.length === textLengt && enterCnt8 === 0) {pillowText8.val(rows + "\n");}
  });

  beltText8.keyup(function () {
    beltText8.val(beltText8.val().replace(/  +/g, ' '));
    orderDetail8.text = beltText8.val();
    pillowText8.val(beltText8.val().toLocaleUpperCase('tr-TR'));
    $('.plateT8').html(beltText8.val().toLocaleUpperCase('tr-TR'));
    var rows = $(this).val();
    // if(rows.length < 2 && enterCnt8 === 1){enterCnt8 = 0;}
    // if(rows.length === textLengt && enterCnt8 === 0) {beltText8.val(rows + "\n");}
  });

  // document.getElementById('myImg-left1').src = "../inc_all/figures/"+orderDetail1.symbol+".svg";
  // document.getElementById('myImg-left-kemer1').src = "../inc_all/figures/"+orderDetail1.symbol+".svg";

  function clearFontClass(whoName, whoClass='') {
    var element = '';
    if (whoName!=='') {
      element =  $('input[name='+whoName+']');
    } else {
      element = $('.'+whoClass);
    }
    $.each(fontTypes, function (index, value) {
      element.removeClass('ff'+value);
      // 
    });
  }

  function clearBackgroundColor(element) {
    element.removeClass('bc-grey');
    element.removeClass('bc-black');
    element.removeClass('bc-yellow');
    element.removeClass('bc-red');
    element.removeClass('bc-green');
    element.removeClass('bc-blue');
  }
  function clearFontColor(element,ptype) {
    element.removeClass('fc-white');
    element.removeClass('fc-yellow');
    element.removeClass('fc-red');
    element.removeClass('fc-green');
    element.removeClass('fc-blue');
    element.removeClass('fc-black');
  }

  $("input[name=plateColor]").click( function () {
    orderDetail1.plateColor = $("input[name=plateColor]:checked").val();
    var element = $('.bos-cita-rengi');
    clearBackgroundColor(element);
    element.addClass('bc-'+orderDetail1.plateColor);
    
  });

  function removeTextAlignmentClass(element) {
    element.removeClass('align-center');
    element.removeClass('align-right');
    element.removeClass('align-left');
  }

//*************************************metin ortada mı solda mı sağ damı **********************
//****************************taxtalign ilki iiöin **************************
  $("input[name=textAlign]").click( function () {
    var imgPosition3 = $('#konum').val();
    if(imgPosition3=="birinci"){ // BİRİNCİ KONUM İÇİNNNN

      orderDetail1.textAlign = $("input[name=textAlign]:checked").val();
      var leftElement = $('.plaka-sol-emoji1');
      var rightElement = $('.plaka-sag-emoji1');
      var centerElement = $('.yazi5');
      //alert("burasoı 1. orta sag sol tıkla  -------------" +  orderDetail.textAlign);
      if (orderDetail1.textAlign === 'left') {
        //document.getElementById("sol-sec").checked = 'true';
        //alert("burasoı 1. sol  " +  centerElement);
        leftElement.addClass('displayNone');
        rightElement.removeClass('displayNone');
        removeTextAlignmentClass(centerElement);
      }
      if (orderDetail1.textAlign === 'right') {
        //alert("burasoı 1. sağ  " +  centerElement);
        //document.getElementById("sag-sec").checked = 'true';
        rightElement.addClass('displayNone');
        leftElement.removeClass('displayNone');
        removeTextAlignmentClass(centerElement);
      }
      if (orderDetail1.textAlign === 'center') {
        //alert("burasoı 1. orta  " +  centerElement);
        // document.getElementById("orta-sec").checked = 'true';
        rightElement.removeClass('displayNone');
        leftElement.removeClass('displayNone');
        removeTextAlignmentClass(centerElement);
      }
      centerElement.addClass('align-'+orderDetail1.textAlign);
      
    }
  });
  $("input[name=textAlign2]").click( function () {
    var imgPosition3 = $('#konum').val();
    if(imgPosition3=="ikinci"){ // İKİNCİ KONUMM İÇİNN
      orderDetail2.textAlign = $("input[name=textAlign2]:checked").val();
      var leftElement = $('.plaka-sol-emoji2');
      var rightElement = $('.plaka-sag-emoji2');
      var centerElement = $('.yazi2');
      //alert("burasoı 2. orta sag sol tıkla ------------- " +  orderDetail2.textAlign);
      if (orderDetail2.textAlign === 'left') {
        //alert("burasoı 2. sol  " +  centerElement);
        //document.getElementById("sol-sec2").checked = 'true';
        leftElement.addClass('displayNone');
        rightElement.removeClass('displayNone');
        removeTextAlignmentClass(centerElement);
      }
      if (orderDetail2.textAlign === 'right') {
        //alert("burasoı 2. sag  " +  centerElement);
        //document.getElementById("sag-sec2").checked = 'true';
        rightElement.addClass('displayNone');
        leftElement.removeClass('displayNone');
        removeTextAlignmentClass(centerElement);
      }
      if (orderDetail2.textAlign === 'center') {
        //alert("burasoı 2. orta  " +  centerElement);
        //document.getElementById("orta-sec2").checked = 'true';
        rightElement.removeClass('displayNone');
        leftElement.removeClass('displayNone');
        removeTextAlignmentClass(centerElement);
      }
      centerElement.addClass('align-'+orderDetail2.textAlign);
      
    }
  });
  $("input[name=textAlign3]").click( function () {
    var imgPosition3 = $('#konum').val();
    if(imgPosition3=="ucuncu"){ // ÜÇÜNCÜ KONUM İÇİNNN
      orderDetail3.textAlign = $("input[name=textAlign3]:checked").val();
      var leftElement = $('.plaka-sol-emoji-3');
      var rightElement = $('.plaka-sag-emoji-3');
      var centerElement = $('.yazi3');

      //alert("burasoı 3. orta sag sol tıkla ---------------- " +  orderDetail3.textAlign);
      if (orderDetail3.textAlign === 'left') {
        //document.getElementById("sol-sec3").checked = 'true';
        leftElement.addClass('displayNone');
        rightElement.removeClass('displayNone');
        removeTextAlignmentClass(centerElement);
      }
      if (orderDetail3.textAlign === 'right') {
        //alert("burasoı 3. sag  " +  centerElement);
        //document.getElementById("sag-sec3").checked = 'true';
        rightElement.addClass('displayNone');
        leftElement.removeClass('displayNone');
        removeTextAlignmentClass(centerElement);
      }
      if (orderDetail3.textAlign === 'center') {
        //document.getElementById("orta-sec3").checked = 'true';
        //alert("burasoı 3. orta  " +  centerElement);
        rightElement.removeClass('displayNone');
        leftElement.removeClass('displayNone');
        removeTextAlignmentClass(centerElement);
      }
      centerElement.addClass('align-'+orderDetail3.textAlign);
      
    }

  });

  // $('#fontFamily').change(function () {
  //   orderDetail.fontFamily = $(this).children('option:selected').val();
  //   clearFontClass('isim','');
  //   clearFontClass('','bos-plaka-uzerine-gelecek-yazi');
  //   $('input[name=isim]').addClass('ff'+orderDetail.fontFamily);
  //   $('.bos-plaka-uzerine-gelecek-yazi').addClass('ff'+orderDetail.fontFamily);
  //   
  // });
  
});
$("#symbolModal").on("shown.bs.modal", function () {
  document.getElementById('figureGroup').innerHTML ="";
  document.getElementById('tabContent').innerHTML ="";
  $('figureGroup').html();
  $.post("getFigureGroups.php", {}, function (returnValue) {
    
    var jsonReturnValue = JSON.parse(returnValue);
    $.each(jsonReturnValue, function (index, value) {
      
      var groupName = value.split('_');
      $('#figureGroup').append('<li onClick="getFigures(\''+groupName[0]+'\')"><a data-toggle="pill" href="#'+groupName[0]+'" class="headerButtonBG lazy"><img src="../../inc_all/figures/figuresGroup/'+value+'" class="imageWH"></a></li>');
      
    });
  });
});

function getFigures(figureGroup) {
  var splittedFigureGroup = figureGroup.split('_');
  
  $.post("getFigures.php", {figureGroup: splittedFigureGroup[0]}, function (returnValue) {
    
    var jsonReturnValue = JSON.parse(returnValue);
    var tabContent = $('#tabContent');
    tabContent.html('');
    tabContent.append('<div id="'+splittedFigureGroup[0]+'" class="tab-pane fade active in">');
    $.each(jsonReturnValue, function (index, value) {
      var splittedFigure = value.split('.');
      $('#'+splittedFigureGroup[0]).append('<button class="btn marginFix lazy" id="selectB" onClick="closeModal(\''+splittedFigure[0]+'\' )"><img alt="" src="../../inc_all/figures/'+value+'" class="imageWH"></button>')
    });
  });
}

var zoomreset = function() {
  var viewport = document.querySelector("meta[name='viewport']");
  viewport.content = "width=device-width, maximum-scale=1";
  setTimeout(function() {
    viewport.content = "width=device-width, maximum-scale=1";
  }, 350);
}
//**********************************sag sol orta METİN RENK BİDE***************************
function editOrderChangeItem(platetype,textcolor,platecolor,textalign,plateLeft,plateRight){
  switch(platecolor)
  {
    case 'blue':
      document.getElementById("renk1").checked = 'true';
      break;
    case 'yellow':
      document.getElementById("renk2").checked = 'true';
      break;
    case 'grey':
      document.getElementById("renk3").checked = 'true';
      break;
    case 'red':
      document.getElementById("renk4").checked = 'true';
      break;
    case 'green':
      document.getElementById("renk6").checked = 'true';
      break;
    default:
      document.getElementById("renk5").checked = 'true';
      break;

  }
}

//********************YAZI FONTU **************************
function fontDegis(gelenFont)
{
  var imgPosition = $('#whichSym').val();

  if (imgPosition == 'plateT1') {
    orderDetail1.fontFamily = gelenFont;
    var beltFont1 = $('#beltText1');
    var pillowFont1 = $('#pillowText1');
    var a = $('.pillowBelt1');

    $.each(fontTypes, function (index, value) {
      beltFont1.removeClass('ff'+value);
      pillowFont1.removeClass('ff'+value);

      a.removeClass('ff'+value);
    });
    beltFont1.addClass('ff'+orderDetail1.fontFamily);
    pillowFont1.addClass('ff'+orderDetail1.fontFamily);
    a.addClass('ff'+orderDetail1.fontFamily);
    
    $(".modalText").addClass('plateT3');
    $(".modalText").addClass('plateT2');
    $('#fontModal').modal('hide');

  } else if(imgPosition == 'plateT2') {
    orderDetail2.fontFamily = gelenFont;
    var beltFont2 = $('#beltText2');
    var pillowFont2 = $('#pillowText2');
    var a = $('.pillowBelt2');
    $.each(fontTypes, function (index, value) {
      beltFont2.removeClass('ff'+value);
      pillowFont2.removeClass('ff'+value);
      a.removeClass('ff'+value);
    });
    pillowFont2.addClass('ff'+orderDetail2.fontFamily);
    beltFont2.addClass('ff'+orderDetail2.fontFamily);
    a.addClass('ff'+orderDetail2.fontFamily);
    
/*
    $(".modalText").addClass('plateT');
    $(".modalText").addClass('plateT3');
*/
    $('#fontModal').modal('hide');

  } else if(imgPosition == 'plateT3') {
    orderDetail3.fontFamily = gelenFont;
    var beltFont3 = $('#beltText3');
    var pillowFont3 = $('#pillowText3');
    var a = $('.pillowBelt3');
    $.each(fontTypes, function (index, value) {
      beltFont3.removeClass('ff'+value);
      pillowFont3.removeClass('ff'+value);
      a.removeClass('ff'+value);
    });
    pillowFont3.addClass('ff'+orderDetail3.fontFamily);
    beltFont3.addClass('ff'+orderDetail3.fontFamily);
    a.addClass('ff'+orderDetail3.fontFamily);
    
/*
    $(".modalText").addClass('plateT');
    $(".modalText").addClass('plateT2');
*/

    $('#fontModal').modal('hide');
  } else if(imgPosition == 'plateT4') {
    orderDetail4.fontFamily = gelenFont;
    var beltFont4 = $('#beltText4');
    var pillowFont4 = $('#pillowText4');
    var a = $('.pillowBelt4');
    $.each(fontTypes, function (index, value) {
      beltFont4.removeClass('ff'+value);
      pillowFont4.removeClass('ff'+value);
      a.removeClass('ff'+value);
    });
    pillowFont4.addClass('ff'+orderDetail4.fontFamily);
    beltFont4.addClass('ff'+orderDetail4.fontFamily);
    a.addClass('ff'+orderDetail4.fontFamily);
    
    
/*
    $(".modalText").addClass('plateT');
    $(".modalText").addClass('plateT2');
*/
    $('#fontModal').modal('hide');
  }else if(imgPosition == 'plateT5') {
    orderDetail5.fontFamily = gelenFont;
    var beltFont5 = $('#beltText5');
    var pillowFont5 = $('#pillowText5');
    var a = $('.pillowBelt5');
    $.each(fontTypes, function (index, value) {
      beltFont5.removeClass('ff'+value);
      pillowFont5.removeClass('ff'+value);
      a.removeClass('ff'+value);
    });
    pillowFont5.addClass('ff'+orderDetail5.fontFamily);
    beltFont5.addClass('ff'+orderDetail5.fontFamily);
    a.addClass('ff'+orderDetail5.fontFamily);
    
    
/*
    $(".modalText").addClass('plateT');
    $(".modalText").addClass('plateT2');
*/
    $('#fontModal').modal('hide');
  }else if(imgPosition == 'plateT6') {
    orderDetail6.fontFamily = gelenFont;
    var beltFont6 = $('#beltText6');
    var pillowFont6 = $('#pillowText6');
    var a = $('.pillowBelt6');
    $.each(fontTypes, function (index, value) {
      beltFont6.removeClass('ff'+value);
      pillowFont6.removeClass('ff'+value);
      a.removeClass('ff'+value);
    });
    pillowFont6.addClass('ff'+orderDetail6.fontFamily);
    beltFont6.addClass('ff'+orderDetail6.fontFamily);
    a.addClass('ff'+orderDetail6.fontFamily);
    
    
/*
    $(".modalText").addClass('plateT');
    $(".modalText").addClass('plateT2');
*/
    $('#fontModal').modal('hide');
  }
  else if(imgPosition == 'plateT7') {
    orderDetail7.fontFamily = gelenFont;
    var beltFont7 = $('#beltText7');
    var pillowFont7 = $('#pillowText7');
    var a = $('.pillowBelt7');
    $.each(fontTypes, function (index, value) {
      beltFont7.removeClass('ff'+value);
      pillowFont7.removeClass('ff'+value);
      a.removeClass('ff'+value);
    });
    pillowFont7.addClass('ff'+orderDetail7.fontFamily);
    beltFont7.addClass('ff'+orderDetail7.fontFamily);
    a.addClass('ff'+orderDetail7.fontFamily);
    $('#fontModal').modal('hide');
  }
  else if(imgPosition == 'plateT8') {
    orderDetail8.fontFamily = gelenFont;
    var beltFont8 = $('#beltText8');
    var pillowFont8 = $('#pillowText8');
    var a = $('.pillowBelt8');
    $.each(fontTypes, function (index, value) {
      beltFont8.removeClass('ff'+value);
      pillowFont8.removeClass('ff'+value);
      a.removeClass('ff'+value);
    });
    pillowFont8.addClass('ff'+orderDetail8.fontFamily);
    beltFont8.addClass('ff'+orderDetail8.fontFamily);
    a.addClass('ff'+orderDetail8.fontFamily);
    $('#fontModal').modal('hide');
  }
}
//******************************************İSİKLİ İSİKSİZ SEÇİM ********************************

function selectType(selectedType) {
  var selectedNum = selectedType.split('-');
  $('.odeme-fiyat-turu').html(platePrice);
  $('#productPrice').html(platePrice);
  $('#totalPrice').html(withShipment);
  var shipmentPrice = withShipment-platePrice;
  $('#shipmentPrice').html(shipmentPrice);
  var shipmentPriceElement = $('.shipmentPrice');
  if (shipmentPrice === 0) {
    shipmentPriceElement.addClass('fc-red');
    shipmentPriceElement.html('Ücretsiz Kargo');
  } else {
    
    shipmentPriceElement.removeClass('fc-red');
    shipmentPriceElement.html('+'+shipmentPrice+' TL.Kargo');
  }

  for (var i=1;i<5;i++) {
      $('#isikli-'+i).removeClass('selecttype');
      $('#isikli-'+i).removeClass('unselecttype');
      $('#isikli-'+i).addClass('unselecttype');
  }
  $('#'+selectedType).addClass('selecttype');
  $('#'+selectedType).removeClass('unselecttype');

  for (var ind=1; ind<priceVariations+1; ind++) {
    var plateContainer = $('#plaka'+ind);
    if (ind<=selectedNum[1]) {
      plateContainer.removeClass('d-none');
      plateContainer.addClass('d-block');
    } else {
      plateContainer.removeClass('d-block');
      plateContainer.addClass('d-none');
    }
  }

  var cita = $('.citaRengi');
  orderDetail1.type = selectedNum[0];
  var plateT1 = $('.bos-plaka-uzerine-gelecek-yazi');
  if(orderDetail1.type == 'isikli')
  {
    $('#isiklifiyat').removeClass('displayNone');
    $('#isiksizfiyat').addClass('displayNone');
    plateT1.removeClass('fc-white');
    plateT1.removeClass('fc-yellow');
    plateT1.removeClass('fc-red');
    plateT1.removeClass('fc-green');
    plateT1.removeClass('fc-blue');
    plateT1.removeClass('fc-black');
    cita.removeClass('displayNone');
    cita.addClass('displayNone');
    plateT1.addClass('fc-'+orderDetail1.textColor);
  }
  else
  {
    $('#isiklifiyat').addClass('displayNone');
    $('#isiksizfiyat').removeClass('displayNone');
    plateT1.removeClass('fc-white');
    plateT1.removeClass('fc-yellow');
    plateT1.removeClass('fc-red');
    plateT1.removeClass('fc-green');
    plateT1.removeClass('fc-blue');
    plateT1.removeClass('fc-black');
    cita.removeClass('displayNone');
    plateT1.addClass('fc-'+orderDetail1.textColor);
  }
  
}
//*******************PLAKALIK YAZISI BOŞ MU *************************


function postDesign() {
  
  var divOrderSee = $('.orderS');
  divOrderSee.html('');
  for (var t=1;t<=quantity;t++){
    var pText1 = $('#pillowText'+t).val();
    var pillowLines = [];
    pillowLines = pText1.split('\n');
    var explodedText = pText1.split(' ');
    var spaceCount = Math.ceil((explodedText.length-1));
    if (pillowLines.length === 1 && ((pillowLines[0].length)>=11)){
      pillowLines= [];
      pillowLines[0] ='';
      pillowLines[1] ='';
      spaceCount = Math.ceil((explodedText.length-1)/2);
      for (var i=0;i<explodedText.length;i++){
        if (i<spaceCount){
          pillowLines[0] += explodedText[i]+" ";
        } else {
          pillowLines[1] += explodedText[i]+" ";
        }
      }
      pillowLines[0] = pillowLines[0].trimRight();
      pillowLines[1] = pillowLines[1].trimRight();
    }
    divOrderSee.append('<div class="col-md-6 col-xs-12 col-sm-12 minHeight-respons orderSee'+t+'"></div>');
    $('div.orderSee'+t+'').append('<img id="pill'+t+'" src="../inc_all/images/neckPillow/'+window["orderDetail"+t]["plateColor"]+'.png">');
    $('div.orderSee'+t+'').append('<div class="col-md-3 plaka-svg'+t+'">');
    $('div.plaka-svg'+t+'').append('<img id="myImg'+t+'" class="img-fluid img-height" src="../inc_all/figures/'+window["orderDetail"+t]["symbol"]+'.svg">');
    if (pillowLines[1]==undefined) { pillowLines[1] = ''; }
    for (var x=1;x<3;x++){
      $('div.orderSee'+t+'').append('<span id="pillT'+t+''+x+'" class="pillT'+t+''+x+' plateText-div pTextH yazi5 text-uppercase ff'+window["orderDetail"+t]["fontFamily"]+' fc-'+window["orderDetail"+t]["textColor"]+' align-center">'+pillowLines[x-1]+'</span><br>');
    }
    var clearDiv = t % 2;
    console.log(clearDiv);
    if (clearDiv == 0 ){divOrderSee.append('<div class="clearfix"></div>')}
  }
  if (quantity<1){
alert("Ürün Adet Bilgisi Seçiniz.");
  }
  if (quantity===1){
    if (orderDetail1.text === '' || orderDetail1.text === undefined || orderDetail1.text === 'PLAKALIK YAZISI GİR' ){
      $('#message').html('<span class="alert-danger">Yazılacak yazıyı boş geçemezsiniz.</span>');
      $('#message1').html('<span class="alert-danger">Yazılacak yazıyı boş geçemezsiniz.</span>');
    } else {
      $('#shipmentModal').modal('show');
    }
  } else if (quantity===2) {
    if (orderDetail1.text === '' || orderDetail1.text === undefined || orderDetail1.text === 'PLAKALIK YAZISI GİR'
      || orderDetail2.text === '' || orderDetail2.text === undefined || orderDetail2.text === 'PLAKALIK YAZISI GİR' ) {
      $('#message').html('<span class="alert-danger">Yazılacak yazıyı boş geçemezsiniz.</span>');
      $('#message1').html('<span class="alert-danger">Yazılacak yazıyı boş geçemezsiniz.</span>');
    } else {
      $('#shipmentModal').modal('show');
    }
  } else if (quantity===4) {
    if (orderDetail1.text === '' || orderDetail1.text === undefined || orderDetail1.text === 'PLAKALIK YAZISI GİR'
      || orderDetail2.text === '' || orderDetail2.text === undefined || orderDetail2.text === 'PLAKALIK YAZISI GİR'
      || orderDetail4.text === '' || orderDetail4.text === undefined || orderDetail4.text === 'PLAKALIK YAZISI GİR'
      || orderDetail3.text === '' || orderDetail3.text === undefined || orderDetail3.text === 'PLAKALIK YAZISI GİR') {
      $('#message').html('<span class="alert-danger">Yazılacak yazıyı boş geçemezsiniz.</span>');
      $('#message1').html('<span class="alert-danger">Yazılacak yazıyı boş geçemezsiniz.</span>');
    } else {
      $('#shipmentModal').modal('show');
    }
  } else if (quantity===8) {
    if ( orderDetail1.text === '' || orderDetail1.text === undefined || orderDetail1.text === 'PLAKALIK YAZISI GİR'
      || orderDetail2.text === '' || orderDetail2.text === undefined || orderDetail2.text === 'PLAKALIK YAZISI GİR'
      || orderDetail3.text === '' || orderDetail3.text === undefined || orderDetail3.text === 'PLAKALIK YAZISI GİR'
      || orderDetail4.text === '' || orderDetail4.text === undefined || orderDetail4.text === 'PLAKALIK YAZISI GİR'
      || orderDetail5.text === '' || orderDetail5.text === undefined || orderDetail5.text === 'PLAKALIK YAZISI GİR'
      || orderDetail6.text === '' || orderDetail6.text === undefined || orderDetail6.text === 'PLAKALIK YAZISI GİR'
      || orderDetail7.text === '' || orderDetail7.text === undefined || orderDetail7.text === 'PLAKALIK YAZISI GİR'
      || orderDetail8.text === '' || orderDetail8.text === undefined || orderDetail8.text === 'PLAKALIK YAZISI GİR') {
      $('#message').html('<span class="alert-danger">Yazılacak yazıyı boş geçemezsiniz.</span>');
      $('#message1').html('<span class="alert-danger">Yazılacak yazıyı boş geçemezsiniz.</span>');
    } else {
      $('#shipmentModal').modal('show');
    }
  }
}
function loadPrice(Gprice1,Gprice2,Gprice3) {
  price1 = Gprice1;
  price2 = Gprice2;
  price3 = Gprice3;
  

}
function getPrice(price, q,shipment,campaign) {
  quantity = q;  // hangi buton
  platePrice = price-campaign; // paras
  withShipment = (price+shipment)-campaign;
  //shipment kargo ücreti
  if(typeof(shipment) === 'undefined' || shipment === null) {
    
    kargo=price;
  }else{
    
    if((price+shipment)>=price1)
    {
      kargo=shipment+platePrice;
    }else
    {
      kargo=price1 + price2 + price3;
    }

  }
  

}
function phonenumber()
{
  var phoneno = /^\d{10}$/;
  var number = $('#phone_number').val();

  if(number.match(phoneno)) {return true;}
  else {alert("Telefon numarasını başında 0 olmadan ve boşluksuz girin lütfen");return false;}
}



function bosluk_kontrol()
{
    if ($('#first_name').val()=="" || $('#first_name').val().length<=2) {
    alert("AD KISMI BOŞ BIRAKILAMAZ \nLÜTFEN ADINIZI GİRİNİZ ");
    return false;
  }
  else if ($('#last_name').val()=="" || $('#last_name').val().length<2) {
    alert("SOYAD KISMI BOŞ BIRAKILAMAZ \nLÜTFEN SOYADINIZI GİRİNİZ ");
    return false;
  }
  else if ($('#address').val()=="") {
    alert("ADRES KISMI BOŞ BIRAKILAMAZ \nLÜTFEN ADRESİNİZİ GİRİNİZ \n ");
    return false;
  }
  else if($('#address').val().length<=12 ){
    alert("LÜTFEN ADRESİNİZİ AYRINTILI BİR ŞEKİLDE GİRİNİZ ");
    return false;
  }else if ($('#city').val()=='0') {
    alert("ŞEHİR KISMI BOŞ BIRAKILAMAZ \nLÜTFEN ŞEHİR GİRİNİZ  ");
    return false;
  }else if ($('#state').val()=='0') {
    alert("İLÇE KISMI BOŞ BIRAKILAMAZ \nLÜTFEN İLÇE SEÇİNİZ");
    return false;
  }
  else{
      var r = confirm("SİPARİŞİNİZİ ONAYLIYOR MUSUNUZ ? ");
      if (r == true) {return true;} else {return false;}
    }
}


function postOrder2me(utmsource,utmmedium,utmcampagin,ipaddress) {
  if (utmsource == "undefined" || utmsource ==''){
    utmsource = "organik";
  }
  var order = {
    'order_type'   : "new",
    'plate_type'  : orderDetail1.type,
    'ip_address'   : ipaddress,
    'first_name'   : $('#first_name').val(),
    'last_name'    : $('#last_name').val(),
    'id_number'    : "",
    'phone_number' : $('#phone_number').val(),
    'mail_address' : "",
    'cargo_address': $('#address').val(),
    'cargo_city'   : $('#city').val(),
    'cargo_state'  : $('#state').val(),
    'price'        : kargo,
    'quantity'     : quantity,
    'shipment_type': 'Gönderici Ödemeli-TT',
    'payment_type' : 'ATD',
    'utm_source'   : utmsource,
    'utm_medium'   : utmmedium,
    'utm_campaign' : utmcampagin,
    'order_detail' :
      [
        {
          'plate_text' : orderDetail1.text.toLocaleUpperCase('tr-TR'),
          'style'      : orderDetail1.symbol,
          'style_color': '',
          'text_align' : orderDetail1.textAlign,
          'text_color' : orderDetail1.textColor,
          'plate_color': orderDetail1.plateColor,
          'font_family': orderDetail1.fontFamily
        }
      ]
  };
  if (quantity > 1) {
    order.order_detail.push(
      {
        'plate_text' : orderDetail2.text.toLocaleUpperCase('tr-TR'),
        'style'      : orderDetail2.symbol,
        'style_color': '',
        'text_align' : orderDetail2.textAlign,
        'text_color' : orderDetail2.textColor,
        'plate_color': orderDetail2.plateColor,
        'font_family': orderDetail2.fontFamily
      }
    )
  } if(quantity > 2){
    order.order_detail.push(
      {
        'plate_text' : orderDetail3.text.toLocaleUpperCase('tr-TR'),
        'style'      : orderDetail3.symbol,
        'style_color': '',
        'text_align' : orderDetail3.textAlign,
        'text_color' : orderDetail3.textColor,
        'plate_color': orderDetail3.plateColor,
        'font_family': orderDetail3.fontFamily
      },
      {
        'plate_text' : orderDetail4.text.toLocaleUpperCase('tr-TR'),
        'style'      : orderDetail4.symbol,
        'style_color': '',
        'text_align' : orderDetail4.textAlign,
        'text_color' : orderDetail4.textColor,
        'plate_color': orderDetail4.plateColor,
        'font_family': orderDetail4.fontFamily
      }
    );
  } if(quantity > 4){
    order.order_detail.push(
      {
        'plate_text' : orderDetail5.text.toLocaleUpperCase('tr-TR'),
        'style'      : orderDetail5.symbol,
        'style_color': '',
        'text_align' : orderDetail5.textAlign,
        'text_color' : orderDetail5.textColor,
        'plate_color': orderDetail5.plateColor,
        'font_family': orderDetail5.fontFamily
      },
      {
        'plate_text' : orderDetail6.text.toLocaleUpperCase('tr-TR'),
        'style'      : orderDetail6.symbol,
        'style_color': '',
        'text_align' : orderDetail6.textAlign,
        'text_color' : orderDetail6.textColor,
        'plate_color': orderDetail6.plateColor,
        'font_family': orderDetail6.fontFamily
      },
      {
        'plate_text' : orderDetail7.text.toLocaleUpperCase('tr-TR'),
        'style'      : orderDetail7.symbol,
        'style_color': '',
        'text_align' : orderDetail7.textAlign,
        'text_color' : orderDetail7.textColor,
        'plate_color': orderDetail7.plateColor,
        'font_family': orderDetail7.fontFamily
      },
      {
        'plate_text' : orderDetail8.text.toLocaleUpperCase('tr-TR'),
        'style'      : orderDetail8.symbol,
        'style_color': '',
        'text_align' : orderDetail8.textAlign,
        'text_color' : orderDetail8.textColor,
        'plate_color': orderDetail8.plateColor,
        'font_family': orderDetail8.fontFamily
      }
    );
  }
  
  if(phonenumber() && bosluk_kontrol())
  {
    $.post("postNewOrder.php", {order: order}, function (returnValue) {
      
      var jsonReturnValue = JSON.parse(returnValue);
      if (jsonReturnValue.status) {
        $('#orderUID').html(jsonReturnValue.order_uid);
        $('#shipmentModal').modal('hide');
        // $('#thnxModal').modal('show');
        $(location).attr('href', 'tesekkurler.php?orderUID='+ jsonReturnValue.order_uid);
      } else {
        $('#shipmentModal').modal('hide');
        var alertMessage = "Sipariş Sırasında Hata Oluştu. <br>"+jsonReturnValue.message;
        $('#alertMessage').html(alertMessage);
        if (jsonReturnValue.code==="E04") {
          $('#alertMessageEx').html('<a href="siparis-duzelt-onay.php?id='+jsonReturnValue.order_uid+'">Siparişinizi düzeltmek için tıklayınız.</a>');
        }
        $('#alertModal').modal('show');
      }
    });
  }
}

function secimitemizle(){
  $("#fontFamily").val("plateT2");
  //alert($("#fontFamily").val());
}