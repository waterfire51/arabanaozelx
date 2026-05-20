var fontTypes = ["ethnocentric", "aviano","sonsie", "sigmar"];
var orderDetail1 = {"type": "isikli", "text":'', "textColor": "white", "fontFamily": "ethnocentric", "symbol": "king_1", "plateColor": "yellow", "textAlign": "center"};
var orderDetail2 = {"type": "isikli", "text":'', "textColor": "white", "fontFamily": "ethnocentric", "symbol": "king_1", "plateColor": "yellow", "textAlign": "center"};
var orderDetail3 = {"type": "isikli", "text":'', "textColor": "white", "fontFamily": "ethnocentric", "symbol": "king_1", "plateColor": "yellow", "textAlign": "center"};
var orderDetail4 = {"type": "isikli", "text":'', "textColor": "white", "fontFamily": "ethnocentric", "symbol": "king_1", "plateColor": "yellow", "textAlign": "center"};
var orderDetail5 = {"type": "isikli", "text":'', "textColor": "white", "fontFamily": "ethnocentric", "symbol": "king_1", "plateColor": "yellow", "textAlign": "center"};
var orderDetail6 = {"type": "isikli", "text":'', "textColor": "white", "fontFamily": "ethnocentric", "symbol": "king_1", "plateColor": "yellow", "textAlign": "center"};
var orderDetail7 = {"type": "isikli", "text":'bi', "textColor": "white", "fontFamily": "ethnocentric", "symbol": "king_1", "plateColor": "yellow", "textAlign": "center"};
var orderDetail8 = {"type": "isikli", "text":'', "textColor": "white", "fontFamily": "ethnocentric", "symbol": "king_1", "plateColor": "yellow", "textAlign": "center"};
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
var fontTextLine = ["plateT1","plateT2","plateT3"];
$(document).on("click", ".selectSymbol", function () {
  var symPos = $(this).data('id');
  
  $("#whichSym").val( symPos );
});
$(document).on("click", ".select_font", function () {
  var symPos1 = $(this).data('id');
  var tValue = "";
  
/*
  $.each(fontTypes, function (index, value) {
    $('#'+symPos1).removeClass(value);
  });
*/
  $.each(fontTextLine, function(index, value) {
    if(value !== symPos1) {
      $(".modalText").removeClass(value);
    } else {
      tValue = value;
    }
  });

  $(".modalText").addClass(tValue);
/*
  $('#leftSillText1').val($('#beltText').val().toLocaleUpperCase('tr-TR'));
  $('.plateT2').html($('#beltText2').val().toLocaleUpperCase('tr-TR'));
  $('.plateT3').html($('#beltText3').val().toLocaleUpperCase('tr-TR'));
*/

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
  console.log(imgPosition);
  if (imgPosition == 'left1') {
    orderDetail1.symbol = plateSymbol;
    document.getElementById('myImg-left-kemer1').src = "../inc_all/figures/"+plateSymbol+".svg";
  } else if(imgPosition == 'left2') {
    orderDetail2.symbol = plateSymbol;
    document.getElementById('myImg-left-kemer2').src = "../inc_all/figures/"+plateSymbol+".svg";
  }else if(imgPosition == 'left3') {
    orderDetail3.symbol = plateSymbol;
    document.getElementById('myImg-left-kemer3').src = "../inc_all/figures/"+plateSymbol+".svg";
  }else if(imgPosition == 'left4') {
    orderDetail4.symbol = plateSymbol;
    document.getElementById('myImg-left-kemer4').src = "../inc_all/figures/"+plateSymbol+".svg";
  }else if(imgPosition == 'left5') {
    orderDetail5.symbol = plateSymbol;
    document.getElementById('myImg-left-kemer5').src = "../inc_all/figures/"+plateSymbol+".svg";
  }else if(imgPosition == 'left6') {
    orderDetail6.symbol = plateSymbol;
    document.getElementById('myImg-left-kemer6').src = "../inc_all/figures/"+plateSymbol+".svg";
  }else if(imgPosition == 'left7') {
    orderDetail7.symbol = plateSymbol;
    document.getElementById('myImg-left-kemer7').src = "../inc_all/figures/"+plateSymbol+".svg";
  }else if(imgPosition == 'left8') {
    orderDetail8.symbol = plateSymbol;
    document.getElementById('myImg-left-kemer8').src = "../inc_all/figures/"+plateSymbol+".svg";
  }
  else if(imgPosition == 'right1') {
    orderDetail1.plateColor = plateSymbol;
    document.getElementById('belt1').src = "../inc_all/images/kayisanahtarlik/"+plateSymbol+".png";
  }
  else if(imgPosition == 'right') {
    orderDetail1.plateColor = plateSymbol;
    document.getElementById('belt1').src = "../inc_all/images/kayisanahtarlik/"+plateSymbol+".png";
  }
  else if(imgPosition == 'right2') {
    orderDetail2.plateColor = plateSymbol;
    document.getElementById('belt2').src = "../inc_all/images/kayisanahtarlik/"+plateSymbol+".png";
  }
  else if(imgPosition == 'right3') {
    orderDetail3.plateColor = plateSymbol;
    document.getElementById('belt3').src = "../inc_all/images/kayisanahtarlik/"+plateSymbol+".png";
  }
  else if(imgPosition == 'right4') {
    orderDetail4.plateColor = plateSymbol;
    document.getElementById('belt4').src = "../inc_all/images/kayisanahtarlik/"+plateSymbol+".png";
  }
  else if(imgPosition == 'right5') {
    orderDetail5.plateColor = plateSymbol;
    document.getElementById('belt5').src = "../inc_all/images/kayisanahtarlik/"+plateSymbol+".png";
  }
  else if(imgPosition == 'right6') {
    orderDetail6.plateColor = plateSymbol;
    document.getElementById('belt6').src = "../inc_all/images/kayisanahtarlik/"+plateSymbol+".png";
  }
  else if(imgPosition == 'right7') {
    orderDetail7.plateColor = plateSymbol;
    document.getElementById('belt7').src = "../inc_all/images/kayisanahtarlik/"+plateSymbol+".png";
  }
  else if(imgPosition == 'right8') {
    orderDetail8.plateColor = plateSymbol;
    document.getElementById('belt8').src = "../inc_all/images/kayisanahtarlik/"+plateSymbol+".png";
  }
  $('#symbolModal').modal('hide');
  $('#colorModal').modal('hide');
}
function closeCModal(plateSymbol) {
  var imgPosition = $('#whichSym').val();
  $('#colorModal').modal('hide');
}

function showHide(type) {
  var idNumber = $('#idnumber');
  if (type=="ATD") {idNumber.hide();} else {idNumber.show();}
}
var StateLengt = 0;
function  getStateLen() {return StateLengt;}

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
    if(Cstate != 0){var i = 0;
      $.each(dataJSON, function (index, value) {
        if(value.id == Cstate) {$("#state").prop('selectedIndex',i);}i++;
      });
    }
  });
  $('#state').focus();
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
  $('#textColor1').change(function () {
    var renk_id = $('#renksecim').val();
    orderDetail1.textColor = $(this).children('option:selected').val();
    //alert("ilk İFDE");
    
    var element = $('#leftSillText1');
    var element2 = $('#rightSillText1');
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
    
    var element = $('#leftSillText2');
    var element2 = $('#rightSillText2');
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
    
    var element = $('#leftSillText3');
    var element2 = $('#rightSillText3');
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
    
    
    var element = $('#leftSillText4');
    var element2 = $('#rightSillText4');
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
    
    
    var element = $('#leftSillText5');
    var element2 = $('#rightSillText5');
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
    
    
    var element = $('#leftSillText6');
    var element2 = $('#rightSillText6');
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
    
    
    var element = $('#leftSillText7');
    var element2 = $('#rightSillText7');
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
    
    
    var element = $('#leftSillText8');
    var element2 = $('#rightSillText8');
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
    
    var element = $('#leftSillText1');
    var element2 = $('#rightSillText1');
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
    
    var element = $('#leftSillText2');
    var element2 = $('#rightSillText2');
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
    
    var element = $('#leftSillText3');
    var element2 = $('#rightSillText3');
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
    
    var element = $('#leftSillText4');
    var element2 = $('#rightSillText4');
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
    
    var element = $('#leftSillText5');
    var element2 = $('#rightSillText5');
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
    
    var element = $('#leftSillText6');
    var element2 = $('#rightSillText6');
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
    
    var element = $('#leftSillText7');
    var element2 = $('#rightSillText7');
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
    
    var element = $('#leftSillText8');
    var element2 = $('#rightSillText8');
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

  var leftSillText1 = $('#leftSillText1');
  var rightSillText1 = $('#rightSillText1');

  leftSillText1.keyup(function () {
    leftSillText1.val(leftSillText1.val().replace(/  +/g, ' '));
    orderDetail1.text = leftSillText1.val();
    rightSillText1.val(leftSillText1.val().toLocaleUpperCase('tr-TR'));
      $('.rgif1').addClass('displayNone');

  });

  rightSillText1.keyup(function () {
    rightSillText1.val(rightSillText1.val().replace(/  +/g, ' '));
    orderDetail1.text = rightSillText1.val();
    leftSillText1.val(rightSillText1.val().toLocaleUpperCase('tr-TR'));
      $('.rgif1').addClass('displayNone');

  });

  var leftSillText2 = $('#leftSillText2');
  var rightSillText2 = $('#rightSillText2');

  leftSillText2.keyup(function () {
    leftSillText2.val(leftSillText2.val().replace(/  +/g, ' '));
    orderDetail2.text = leftSillText2.val();
    rightSillText2.val(leftSillText2.val().toLocaleUpperCase('tr-TR'));
      $('.lgif2').addClass('displayNone');
      $('.rgif2').addClass('displayNone');
  });

  rightSillText2.keyup(function () {
    rightSillText2.val(rightSillText2.val().replace(/  +/g, ' '));
    orderDetail2.text = rightSillText2.val();
    leftSillText2.val(rightSillText2.val().toLocaleUpperCase('tr-TR'));
      $('.lgif2').addClass('displayNone');
      $('.rgif2').addClass('displayNone');
  });

  var leftSillText3 = $('#leftSillText3');
  var rightSillText3 = $('#rightSillText3');

  leftSillText3.keyup(function () {
    leftSillText3.val(leftSillText3.val().replace(/  +/g, ' '));
    orderDetail3.text = leftSillText3.val();
    rightSillText3.val(leftSillText3.val().toLocaleUpperCase('tr-TR'));
      $('.lgif3').addClass('displayNone');
      $('.rgif3').addClass('displayNone');
  });

  rightSillText3.keyup(function () {
    rightSillText3.val(rightSillText3.val().replace(/  +/g, ' '));
    orderDetail3.text = rightSillText3.val();
    leftSillText3.val(rightSillText3.val().toLocaleUpperCase('tr-TR'));
      $('.lgif3').addClass('displayNone');
      $('.rgif3').addClass('displayNone');
  });

  var leftSillText4 = $('#leftSillText4');
  var rightSillText4 = $('#rightSillText4');

  leftSillText4.keyup(function () {
    leftSillText4.val(leftSillText4.val().replace(/  +/g, ' '));
    orderDetail4.text = leftSillText4.val();
    rightSillText4.val(leftSillText4.val().toLocaleUpperCase('tr-TR'));
      $('.lgif4').addClass('displayNone');
      $('.rgif4').addClass('displayNone');
  });

  rightSillText4.keyup(function () {
    rightSillText4.val(rightSillText4.val().replace(/  +/g, ' '));
    orderDetail4.text = rightSillText4.val();
    leftSillText4.val(rightSillText4.val().toLocaleUpperCase('tr-TR'));
      $('.lgif4').addClass('displayNone');
      $('.rgif4').addClass('displayNone');
  });
  var leftSillText5 = $('#leftSillText5');
  var rightSillText5 = $('#rightSillText5');

  leftSillText5.keyup(function () {
    leftSillText5.val(leftSillText5.val().replace(/  +/g, ' '));
    orderDetail5.text = leftSillText5.val();
    rightSillText5.val(leftSillText5.val().toLocaleUpperCase('tr-TR'));
      $('.lgif5').addClass('displayNone');
      $('.rgif5').addClass('displayNone');
  });

  rightSillText5.keyup(function () {
    rightSillText5.val(rightSillText5.val().replace(/  +/g, ' '));
    orderDetail5.text = rightSillText5.val();
    leftSillText5.val(rightSillText5.val().toLocaleUpperCase('tr-TR'));
      $('.lgif5').addClass('displayNone');
      $('.rgif5').addClass('displayNone');
  });
  var leftSillText6 = $('#leftSillText6');
  var rightSillText6 = $('#rightSillText6');

  leftSillText6.keyup(function () {
    leftSillText6.val(leftSillText6.val().replace(/  +/g, ' '));
    orderDetail6.text = leftSillText6.val();
    rightSillText6.val(leftSillText6.val().toLocaleUpperCase('tr-TR'));
      $('.lgif6').addClass('displayNone');
      $('.rgif6').addClass('displayNone');
  });

  rightSillText6.keyup(function () {
    rightSillText6.val(rightSillText6.val().replace(/  +/g, ' '));
    orderDetail6.text = rightSillText6.val();
    leftSillText6.val(rightSillText6.val().toLocaleUpperCase('tr-TR'));
      $('.lgif6').addClass('displayNone');
      $('.rgif6').addClass('displayNone');
  });
  var leftSillText7 = $('#leftSillText7');
  var rightSillText7 = $('#rightSillText7');

  leftSillText7.keyup(function () {
    leftSillText7.val(leftSillText7.val().replace(/  +/g, ' '));
    orderDetail7.text = leftSillText7.val();
    rightSillText7.val(leftSillText7.val().toLocaleUpperCase('tr-TR'));
      $('.lgif7').addClass('displayNone');
      $('.rgif7').addClass('displayNone');
  });

  rightSillText7.keyup(function () {
    rightSillText7.val(rightSillText7.val().replace(/  +/g, ' '));
    orderDetail7.text = rightSillText7.val();
    leftSillText7.val(rightSillText7.val().toLocaleUpperCase('tr-TR'));
      $('.lgif7').addClass('displayNone');
      $('.rgif7').addClass('displayNone');
  });
  var leftSillText8 = $('#leftSillText8');
  var rightSillText8 = $('#rightSillText8');

  leftSillText8.keyup(function () {
    leftSillText8.val(leftSillText8.val().replace(/  +/g, ' '));
    orderDetail8.text = leftSillText8.val();
    rightSillText8.val(leftSillText8.val().toLocaleUpperCase('tr-TR'));
      $('.lgif8').addClass('displayNone');
      $('.rgif8').addClass('displayNone');
  });

  rightSillText8.keyup(function () {
    rightSillText8.val(rightSillText8.val().replace(/  +/g, ' '));
    orderDetail8.text = rightSillText8.val();
    leftSillText8.val(rightSillText8.val().toLocaleUpperCase('tr-TR'));
      $('.lgif8').addClass('displayNone');
      $('.rgif8').addClass('displayNone');
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
    var beltFont = $('#beltText');
    var pillowFont = $('#pillowText');
    var a = $('.pillowBelt1');

    $.each(fontTypes, function (index, value) {
      beltFont.removeClass('ff'+value);
      pillowFont.removeClass('ff'+value);

      a.removeClass('ff'+value);
    });
    beltFont.addClass('ff'+orderDetail1.fontFamily);
    pillowFont.addClass('ff'+orderDetail1.fontFamily);
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
    
    
    $('#fontModal').modal('hide');
  } else if(imgPosition == 'plateT5') {
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
    
    
    $('#fontModal').modal('hide');
  } else if(imgPosition == 'plateT6') {
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
    
    
    $('#fontModal').modal('hide');
  } else if(imgPosition == 'plateT7') {
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
  } else if(imgPosition == 'plateT8') {
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
  
  $('.odeme-fiyat-turu').html(platePrice+' TL.');
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
    shipmentPriceElement.html(shipmentPrice+' TL.');
  }
  if (selectedNum[1]==1) {
  	  document.getElementById("plaka1").style.display='block';
  	  document.getElementById("plaka2").style.display='none';
  	  document.getElementById("plaka3").style.display='none';
  	  document.getElementById("plaka4").style.display='none';
  }
  else if (selectedNum[1]==2) {
  	  document.getElementById("plaka1").style.display='block';
  	  document.getElementById("plaka2").style.display='block';
  	  document.getElementById("plaka3").style.display='none';
  	  document.getElementById("plaka4").style.display='none';
  }
  else if (selectedNum[1]==3) {
  	  document.getElementById("plaka1").style.display='block';
  	  document.getElementById("plaka2").style.display='block';
  	  document.getElementById("plaka3").style.display='block';
  	  document.getElementById("plaka4").style.display='none';
  }
  else if (selectedNum[1]==4) {
  	  document.getElementById("plaka1").style.display='block';
  	  document.getElementById("plaka2").style.display='block';
  	  document.getElementById("plaka3").style.display='block';
  	  document.getElementById("plaka4").style.display='block';
  }
  for (var i=1;i<5;i++) {
    var unlightPlate  = $('#isiksiz-'+i);
    var illuminatedPlate = $('#isikli-'+i);
    illuminatedPlate.removeClass('selecttype');
    unlightPlate.removeClass('selecttype');
    illuminatedPlate.removeClass('unselecttype');
    unlightPlate.removeClass('unselecttype');
    illuminatedPlate.addClass('unselecttype');
    unlightPlate.addClass('unselecttype');
  }
  
  $('#'+selectedType).removeClass('unselecttype');
  $('#'+selectedType).addClass('selecttype');
  var cita = $('.citaRengi');
  orderDetail1.type = selectedNum[0];
  var plateT = $('.bos-plaka-uzerine-gelecek-yazi');
  if(orderDetail1.type == 'isikli') {
    $('#isiklifiyat').removeClass('displayNone');
    $('#isiksizfiyat').addClass('displayNone');
    plateT.removeClass('fc-white');
    plateT.removeClass('fc-yellow');
    plateT.removeClass('fc-red');
    plateT.removeClass('fc-green');
    plateT.removeClass('fc-blue');
    plateT.removeClass('fc-black');
    cita.removeClass('displayNone');
    cita.addClass('displayNone');
    plateT.addClass('fc-'+orderDetail1.textColor);
  } else {
    $('#isiklifiyat').addClass('displayNone');
    $('#isiksizfiyat').removeClass('displayNone');
    plateT.removeClass('fc-white');
    plateT.removeClass('fc-yellow');
    plateT.removeClass('fc-red');
    plateT.removeClass('fc-green');
    plateT.removeClass('fc-blue');
    plateT.removeClass('fc-black');
    cita.removeClass('displayNone');
    plateT.addClass('fc-'+orderDetail1.textColor);
  }
  
}
//*******************PLAKALIK YAZISI BOŞ MU *************************


function postDesign() {
  
  if (quantity<1){
    alert("Ürün Adet Bilgisi Seçiniz.");
  }
  else if (quantity===1){
    if (orderDetail1.text === '' || orderDetail1.text === 'YAZI GİR' ){
      $('#message1').html('<span class="alert-danger">Lütfen yazmak istediğiniz yazıyı ürünün üstündeki yazı alanına tıklayarak yazınız.</span>');
      alert("Lütfen yazmak istediğiniz yazıyı ürünün üstündeki yazı alanına tıklayarak yazınız.")
    } else {
      $('#shipmentModal').modal('show');
    }
  } else if (quantity===2) {
    if (orderDetail1.text === '' || orderDetail1.text === 'YAZI GİR'
      || orderDetail2.text === '' || orderDetail2.text === 'YAZI GİR' ) {
        $('#message1').html('<span class="alert-danger">Lütfen yazmak istediğiniz yazıyı ürünün üstündeki yazı alanına tıklayarak yazınız.</span>');
        alert("Lütfen yazmak istediğiniz yazıyı ürünün üstündeki yazı alanına tıklayarak yazınız.")
    } else {
      $('#shipmentModal').modal('show');
    }
  } else if (quantity===4) {
    if (orderDetail1.text === '' || orderDetail1.text === 'YAZI GİR'
      || orderDetail2.text === '' || orderDetail2.text === 'YAZI GİR'
      || orderDetail3.text === '' || orderDetail3.text === 'YAZI GİR'
      || orderDetail4.text === '' || orderDetail4.text === 'YAZI GİR') {
        $('#message1').html('<span class="alert-danger">Lütfen yazmak istediğiniz yazıyı ürünün üstündeki yazı alanına tıklayarak yazınız.</span>');
        alert("Lütfen yazmak istediğiniz yazıyı ürünün üstündeki yazı alanına tıklayarak yazınız.")
    } else {
      $('#shipmentModal').modal('show');
    }
  }else if (quantity===8) {
    if (orderDetail1.text === ''|| orderDetail1.text === 'YAZI GİR'
      || orderDetail2.text === '' || orderDetail2.text === 'YAZI GİR'
      || orderDetail4.text === '' || orderDetail4.text === 'YAZI GİR'
      || orderDetail3.text === '' || orderDetail3.text === 'YAZI GİR'
      || orderDetail5.text === '' || orderDetail5.text === 'YAZI GİR'
      || orderDetail6.text === '' || orderDetail6.text === 'YAZI GİR'
      || orderDetail7.text === '' || orderDetail7.text === 'YAZI GİR'
      || orderDetail8.text === '' || orderDetail8.text === 'YAZI GİR') {
        $('#message1').html('<span class="alert-danger">Lütfen yazmak istediğiniz yazıyı ürünün üstündeki yazı alanına tıklayarak yazınız.</span>');
        alert("Lütfen yazmak istediğiniz yazıyı ürünün üstündeki yazı alanına tıklayarak yazınız.")
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
    
    if((price+shipment)>=price1) {
      kargo=shipment+platePrice;
    } else {
      kargo=price1 + price2 + price3;
    }
  }
  $('.odeme-fiyat-turu').html(platePrice+' TL.');
  var shipmentPrice = withShipment-platePrice;
  var shipmentPriceElement = $('.shipmentPrice');
  if (shipmentPrice === 0) {
    shipmentPriceElement.addClass('fc-red');
    shipmentPriceElement.html('Ücretsiz Kargo');
  } else {
    shipmentPriceElement.removeClass('fc-red');
    shipmentPriceElement.html(shipmentPrice+' TL.');
  }
}
function phonenumber() {
  var phoneno = /^\d{10}$/;
  var number = $('#phone_number').val();
  if( number[0] == 0){
    alert("Telefon numarasını başında 0 olmadan girin lütfen");
    return false;
  }else{
    if(number.match(phoneno) ) {return true;}
    else {alert("Telefon numarasını  boşluksuz girin lütfen");return false;}
  }
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
    'cargo_city'   :$('#city').val(),
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
      },
    );
  }
  if(phonenumber() && bosluk_kontrol()){
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
/*
        if (jsonReturnValue.code==="E04") {
          $('#alertMessageEx').html('<a href="siparis-duzelt-onay.php?id='+jsonReturnValue.order_uid+'">Siparişinizi düzeltmek için tıklayınız.</a>');
        }
*/
        $('#alertModal').modal('show');
      }
    });
  }
}

function uclu(){
  //alert("3 LU TAKIM SİPARİŞ İÇİN ");
  document.getElementById("isikli-3").style.backgroundColor = "#d1d1d1";
  document.getElementById("isikli-2").style.backgroundColor = "#f4c714";
  document.getElementById("isikli-1").style.backgroundColor = "#f4c714";
  document.getElementById("plaka2").style.display='block';
  document.getElementById("plaka3").style.display='block';
}
function secimitemizle(){
  $("#fontFamily").val("plateT2");
  //alert($("#fontFamily").val());
}
function ikili(){
  //alert("ÇİFT TKAKIM SİPARİŞ İÇİN");
  document.getElementById("isikli-2").style.backgroundColor = "#d1d1d1";
  document.getElementById("isikli-3").style.backgroundColor = "#f4c714";
  document.getElementById("isikli-1").style.backgroundColor = "#f4c714";
  document.getElementById("plaka1").style.display='block';
  document.getElementById("plaka2").style.display='block';
  document.getElementById("plaka3").style.display='none';

}
function tekli(){
  document.getElementById("isikli-1").style.backgroundColor = "#d1d1d1";
  document.getElementById("isikli-2").style.backgroundColor = "#f4c714";
  document.getElementById("isikli-3").style.backgroundColor = "#f4c714";
  //alert("TEK TAKIM SİPARİŞ ETMEK İÇİN ONAYLAYINIZ");
  document.getElementById("plaka1").style.display='block';
  document.getElementById("plaka2").style.display='none';
  document.getElementById("plaka3").style.display='none';

}