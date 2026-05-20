var fontTypes = ["ethnocentric", "aviano","sonsie", "sigmar"];
var orderDetail1 = {"type": "isikli", "text":'', "textColor": "white", "fontFamily": "ethnocentric", "symbol": "king_1", "plateColor": "red", "textAlign": "center"};
var orderDetail2 = {"type": "isikli", "text":'', "textColor": "white", "fontFamily": "ethnocentric", "symbol": "king_1", "plateColor": "red", "textAlign": "center"};
var orderDetail3 = {"type": "isikli", "text":'', "textColor": "white", "fontFamily": "ethnocentric", "symbol": "king_1", "plateColor": "red", "textAlign": "center"};
var orderDetail4 = {"type": "isikli", "text":'', "textColor": "white", "fontFamily": "ethnocentric", "symbol": "king_1", "plateColor": "red", "textAlign": "center"};
var orderDetail5 = {"type": "isikli", "text":'', "textColor": "white", "fontFamily": "ethnocentric", "symbol": "king_1", "plateColor": "red", "textAlign": "center"};
var orderDetail6 = {"type": "isikli", "text":'', "textColor": "white", "fontFamily": "ethnocentric", "symbol": "king_1", "plateColor": "red", "textAlign": "center"};
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
var fontTextLine = ["plateT1","plateT2","plateT3","plateT4","plateT5"];

$(document).on("click", ".selectSymbol", function () {
  var symPos = $(this).data('id');
  console.log(symPos);
  $("#whichSym").val( symPos );
});

$(document).on("click", ".select_font", function () {
  var symPos1 = $(this).data('id');
  var tValue = "";
  $.each(fontTextLine, function(index, value) {
    if(value !== symPos1)
    {
      $(".modalText").removeClass(value);

    }
    else
    {
      tValue = value;
    }


  });

  $(".modalText").addClass(tValue);
  $('.plateT1').html($('#pillowText1').val().toLocaleUpperCase('tr-TR'));
  $('.plateT2').html($('#pillowText2').val().toLocaleUpperCase('tr-TR'));
  $('.plateT3').html($('#pillowText3').val().toLocaleUpperCase('tr-TR'));
  $('.plateT4').html($('#pillowText4').val().toLocaleUpperCase('tr-TR'));
  $('.plateT5').html($('#pillowText5').val().toLocaleUpperCase('tr-TR'));

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
    document.getElementById('myImg-left1').src = "images/figures/"+plateSymbol+".svg";
  } else if(imgPosition == 'right1') {
    orderDetail1.plateColor = plateSymbol;
    document.getElementById('pillow1').src = "images/pillow/"+plateSymbol+"_pillow.png";
  } else if(imgPosition == 'left2') {
    orderDetail2.symbol = plateSymbol;
    document.getElementById('myImg-left2').src = "images/figures/"+plateSymbol+".svg";
  }else if(imgPosition == 'right2') {
    orderDetail2.plateColor = plateSymbol;
    document.getElementById('pillow2').src = "images/pillow/"+plateSymbol+"_pillow.png";
  }else if(imgPosition == 'left3') {
    orderDetail3.symbol = plateSymbol;
    document.getElementById('myImg-left3').src = "images/figures/"+plateSymbol+".svg";
  }else if(imgPosition == 'right3') {
    orderDetail3.plateColor = plateSymbol;
    document.getElementById('pillow3').src = "images/pillow/"+plateSymbol+"_pillow.png";
  }else if(imgPosition == 'left4') {
    orderDetail4.symbol = plateSymbol;
    document.getElementById('myImg-left4').src = "images/figures/"+plateSymbol+".svg";
  }else if(imgPosition == 'right4') {
    orderDetail4.plateColor = plateSymbol;
    document.getElementById('pillow4').src = "images/pillow/"+plateSymbol+"_pillow.png";
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
    console.log(dataJSON);
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

        if(value.id == Cstate)
        {
          console.log(value.id);
          console.log(i);
          $("#state").prop('selectedIndex',i);
        }
        i++;

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

  var maxLength = 2;
  $('textarea').on('input focus keydown keyup', function() {
    var text = $(this).val();
    var lines = text.split(/(\r\n|\n|\r)/gm);
    console.log(lines.length);
    if (lines.length>maxLength) {
      console.log('hoop');
      $(this).val(lines.join(''));
    }
  });

//************************    METİN  RENGİİİİİ **************************************
  $('#textColor').change(function () {
    var renk_id = $('#renksecim').val();
    orderDetail1.textColor = $(this).children('option:selected').val();
    //alert("ilk İFDE");
    console.log(orderDetail1.textColor);
    var element = $('#pillowText1');
    var element2 = $('#beltText1');
    var ptype = orderDetail1.type;
    clearFontColor(element,ptype);
    clearFontColor(element2,ptype);
    element.addClass('color-'+orderDetail1.textColor);
    element2.addClass('color-'+orderDetail1.textColor);
    console.log(orderDetail1);
  });
  $('#textColor2').change(function () {
    var renk_id = $('#renksecim2').val();
    orderDetail2.textColor = $(this).children('option:selected').val();
    //alert("ilk İFDE");
    console.log(orderDetail2.textColor);
    var element = $('#pillowText2');
    var element2 = $('#beltText2');
    var ptype = orderDetail2.type;
    clearFontColor(element,ptype);
    clearFontColor(element2,ptype);
    element.addClass('color-'+orderDetail2.textColor);
    element2.addClass('color-'+orderDetail2.textColor);
    console.log(orderDetail2);
  });
  $('#textColor3').change(function () {
    var renk_id = $('#renksecim3').val();
    orderDetail3.textColor = $(this).children('option:selected').val();
    //alert("ilk İFDE");
    console.log(orderDetail3.textColor);
    var element = $('#pillowText3');
    var element2 = $('#beltText3');
    var ptype = orderDetail3.type;
    clearFontColor(element,ptype);
    clearFontColor(element2,ptype);
    element.addClass('color-'+orderDetail3.textColor);
    element2.addClass('color-'+orderDetail3.textColor);
    console.log(orderDetail3);
  });
  $('#textColor4').change(function () {
    var renk_id = $('#renksecim4').val();
    orderDetail4.textColor = $(this).children('option:selected').val();
    //alert("ilk İFDE");
    console.log('textColor4');
    console.log(orderDetail4.textColor);
    var element = $('#pillowText4');
    var element2 = $('#beltText4');
    var ptype = orderDetail4.type;
    clearFontColor(element,ptype);
    clearFontColor(element2,ptype);
    element.addClass('color-'+orderDetail4.textColor);
    element2.addClass('color-'+orderDetail4.textColor);
    console.log('textColor4');
    console.log(orderDetail4);
  });


//*************** renk için   burası mobil için yapılacak******************
  $('#textColorM1').change(function () {
    var renk_id = $('#renksecim').val();
    orderDetail1.textColor = $(this).children('option:selected').val();
    //alert("ilk İFDE");
    console.log(orderDetail1.textColor);
    var element = $('#pillowText1');
    var element2 = $('#beltText1');
    var ptype = orderDetail1.type;
    clearFontColor(element,ptype);
    clearFontColor(element2,ptype);
    element.addClass('color-'+orderDetail1.textColor);
    element2.addClass('color-'+orderDetail1.textColor);
  });
  $('#textColorM2').change(function () {
    var renk_id = $('#renksecim2').val();
    orderDetail2.textColor = $(this).children('option:selected').val();
    //alert("ilk İFDE");
    console.log(orderDetail2.textColor);
    var element = $('#pillowText2');
    var element2 = $('#beltText2');
    var ptype = orderDetail2.type;
    clearFontColor(element,ptype);
    clearFontColor(element2,ptype);
    element.addClass('color-'+orderDetail2.textColor);
    element2.addClass('color-'+orderDetail2.textColor);
  });
  $('#textColorM3').change(function () {
    var renk_id = $('#renksecim3').val();
    orderDetail3.textColor = $(this).children('option:selected').val();
    //alert("ilk İFDE");
    console.log(orderDetail3.textColor);
    var element = $('#pillowText3');
    var element2 = $('#beltText3');
    var ptype = orderDetail3.type;
    clearFontColor(element,ptype);
    clearFontColor(element2,ptype);
    element.addClass('color-'+orderDetail3.textColor);
    element2.addClass('color-'+orderDetail3.textColor);
  });
  $('#textColorM4').change(function () {
    var renk_id = $('#renksecim4').val();
    orderDetail4.textColor = $(this).children('option:selected').val();
    //alert("ilk İFDE");
    console.log(orderDetail4.textColor);
    var element = $('#pillowText4');
    var element2 = $('#beltText4');
    var ptype = orderDetail4.type;
    clearFontColor(element,ptype);
    clearFontColor(element2,ptype);
    element.addClass('color-'+orderDetail4.textColor);
    element2.addClass('color-'+orderDetail4.textColor);
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

    $('.leftgif').addClass('displayNone');
    $('.rightgif').addClass('displayNone');
    if(e.keyCode === 13)
    {
      enterCnt = 1;
    }
  });

  beltText1.keydown(function (e) {
    beltText1.val(beltText1.val().replace(/  +/g, ' '));
    if(e.keyCode === 13) {
      enterCnt = 1;
    }
  });

  pillowText1.keyup(function () {
    pillowText1.val(pillowText1.val().replace(/  +/g, ' '));
    orderDetail1.text = pillowText1.val();

    $('#pillowText1').html(pillowText1.val().toLocaleUpperCase('tr-TR'));
    $('#beltText1').val(pillowText1.val().toLocaleUpperCase('tr-TR'));
    $('.plateT1').html(pillowText1.val().toLocaleUpperCase('tr-TR'));

    var rows = $(this).val();
    if(rows.length < 2 && enterCnt === 1){enterCnt = 0;}
    if(rows.length === textLengt && enterCnt === 0) {
      pillowText1.val(rows + "\n");
    }

    // selectType();
  });

  beltText1.keyup(function () {
    beltText1.val(beltText1.val().replace(/  +/g, ' '));
    orderDetail1.text = beltText1.val();
    pillowText1.val(beltText1.val().toLocaleUpperCase('tr-TR'));
    $('.plateT1').html(beltText1.val().toLocaleUpperCase('tr-TR'));

    var rows = $(this).val();
    console.log(rows.length);
    if(rows.length < 2 && enterCnt === 1){enterCnt = 0;}
    if(rows.length === textLengt && enterCnt === 0) {
      beltText1.val(rows + "\n");
    }
    // selectType();
  });

  var pillowText2 = $('#pillowText2');
  var beltText2 = $('#beltText2')

  pillowText2.keydown(function (e) {
    pillowText2.val(pillowText2.val().replace(/  +/g, ' '));
    $('.leftgif2').addClass('displayNone');
    $('.rightgif2').addClass('displayNone');
    if(e.keyCode === 13) {
      enterCnt2 = 1;
    }
  });

  beltText2.keydown(function (e) {
    beltText2.val(beltText2.val().replace(/  +/g, ' '));
    if(e.keyCode === 13) {
      enterCnt2 = 1;
    }
  });

  pillowText2.keyup(function () {
    pillowText2.val(pillowText2.val().replace(/  +/g, ' '));
    orderDetail2.text = pillowText2.val();

    $('#pillowText2').html(pillowText2.val().toLocaleUpperCase('tr-TR'));
    $('#beltText2').val(pillowText2.val().toLocaleUpperCase('tr-TR'));
    $('.plateT2').html(pillowText2.val().toLocaleUpperCase('tr-TR'));
    // selectType();
    var rows = $(this).val();
    if(rows.length < 2 && enterCnt2 === 1){enterCnt2 = 0;}
    if(rows.length === textLengt && enterCnt2 === 0) {
      pillowText2.val(rows + "\n");
    }
  });

  beltText2.keyup(function () {
    beltText2.val(beltText2.val().replace(/  +/g, ' '));
    orderDetail2.text = beltText2.val();
    pillowText2.val(beltText2.val().toLocaleUpperCase('tr-TR'));
    $('.plateT2').html(beltText2.val().toLocaleUpperCase('tr-TR'));
    // selectType();
    var rows = $(this).val();
    if(rows.length < 2 && enterCnt2 === 1){enterCnt2 = 0;}
    if(rows.length === textLengt && enterCnt2 === 0) {
      beltText2.val(rows + "\n");
    }
  });

  var pillowText3 = $('#pillowText3');
  var beltText3 = $('#beltText3');

  pillowText3.keydown(function (e) {
    pillowText3.val(pillowText3.val().replace(/  +/g, ' '));
    $('.leftgif3').addClass('displayNone');
    $('.rightgif3').addClass('displayNone');
    if(e.keyCode === 13) {
      enterCnt3 = 1;
    }
  });

  beltText3.keydown(function (e) {
    beltText3.val(beltText3.val().replace(/  +/g, ' '));
    if(e.keyCode === 13) {
      enterCnt3 = 1;
    }
  });

  pillowText3.keyup(function () {
    pillowText3.val(pillowText3.val().replace(/  +/g, ' '));
    orderDetail3.text = pillowText3.val();

    $('#pillowText3').html(pillowText3.val().toLocaleUpperCase('tr-TR'));
    $('#beltText3').val(pillowText3.val().toLocaleUpperCase('tr-TR'));
    $('.plateT3').html(pillowText3.val().toLocaleUpperCase('tr-TR'));
    // selectType();
    var rows = $(this).val();
    if(rows.length < 2 && enterCnt3 === 1){enterCnt3 = 0;}
    if(rows.length === textLengt && enterCnt3 === 0) {
      pillowText3.val(rows + "\n");
    }
  });

  beltText3.keyup(function () {
    beltText3.val(beltText3.val().replace(/  +/g, ' '));
    orderDetail3.text = beltText3.val();
    pillowText3.val(beltText3.val().toLocaleUpperCase('tr-TR'));
    $('.plateT3').html(beltText3.val().toLocaleUpperCase('tr-TR'));
    // selectType();
    var rows = $(this).val();
    if(rows.length < 2 && enterCnt3 === 1){enterCnt3 = 0;}
    if(rows.length === textLengt && enterCnt3 === 0) {
      beltText3.val(rows + "\n");
    }
  });

  var pillowText4 = $('#pillowText4');
  var beltText4 = $('#beltText4');

  pillowText4.keydown(function (e) {
    pillowText4.val(pillowText4.val().replace(/  +/g, ' '));
    $('.leftgif4').addClass('displayNone');
    $('.rightgif4').addClass('displayNone');
    if(e.keyCode === 13) {
      enterCnt4 = 1;
    }
  });

  beltText4.keydown(function (e) {
    beltText4.val(beltText4.val().replace(/  +/g, ' '));
    if(e.keyCode === 13) {
      enterCnt4 = 1;
    }
  });

  pillowText4.keyup(function () {
    pillowText4.val(pillowText4.val().replace(/  +/g, ' '));
    orderDetail4.text = pillowText4.val();

    $('#pillowText4').html(pillowText4.val().toLocaleUpperCase('tr-TR'));
    $('#beltText4').val(pillowText4.val().toLocaleUpperCase('tr-TR'));
    $('.plateT4').html(pillowText4.val().toLocaleUpperCase('tr-TR'));
    // selectType();
    var rows = $(this).val();
    if(rows.length < 2 && enterCnt4 === 1){enterCnt4 = 0;}
    if(rows.length === textLengt && enterCnt4 === 0) {
      pillowText4.val(rows + "\n");
    }
  });

  beltText4.keyup(function () {
    beltText4.val(beltText4.val().replace(/  +/g, ' '));
    orderDetail4.text = beltText4.val();
    pillowText4.val(beltText4.val().toLocaleUpperCase('tr-TR'));
    $('.plateT4').html(beltText4.val().toLocaleUpperCase('tr-TR'));
    // selectType();
    var rows = $(this).val();
    if(rows.length < 2 && enterCnt4 === 1){enterCnt4 = 0;}
    if(rows.length === textLengt && enterCnt4 === 0) {
      beltText4.val(rows + "\n");
    }
  });

  document.getElementById('myImg-left1').src = "images/figures/"+orderDetail1.symbol+".svg";
  function clearFontClass(whoName, whoClass='') {
    var element = '';
    if (whoName!=='') {
      element =  $('input[name='+whoName+']');
    } else {
      element = $('.'+whoClass);
    }
    $.each(fontTypes, function (index, value) {
      element.removeClass('ff'+value);
      // console.log(e);
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
    element.removeClass('color-white');
    element.removeClass('color-yellow');
    element.removeClass('color-red');
    element.removeClass('color-green');
    element.removeClass('color-blue');
    element.removeClass('color-black');
  }

  $("input[name=plateColor]").click( function () {
    orderDetail1.plateColor = $("input[name=plateColor]:checked").val();
    var element = $('.bos-cita-rengi');
    clearBackgroundColor(element);
    element.addClass('bc-'+orderDetail1.plateColor);
    console.log(orderDetail1);
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
      console.log(orderDetail1);
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
      console.log(orderDetail2);
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
      console.log(orderDetail3);
    }

  });

  // $('#fontFamily').change(function () {
  //   orderDetail.fontFamily = $(this).children('option:selected').val();
  //   clearFontClass('isim','');
  //   clearFontClass('','bos-plaka-uzerine-gelecek-yazi');
  //   $('input[name=isim]').addClass('ff'+orderDetail.fontFamily);
  //   $('.bos-plaka-uzerine-gelecek-yazi').addClass('ff'+orderDetail.fontFamily);
  //   console.log(orderDetail);
  // });
  console.log(orderDetail1);
});

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
    console.log(orderDetail1);
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
    console.log(orderDetail2);
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
    console.log(orderDetail3);
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
    console.log('orderDetail4');
    console.log(orderDetail4);
/*
    $(".modalText").addClass('plateT');
    $(".modalText").addClass('plateT2');
*/
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
    console.log('şipmınt: '+shipmentPrice);
    shipmentPriceElement.removeClass('fc-red');
    shipmentPriceElement.html('+'+shipmentPrice+' TL.Kargo');
  }
  for (var i=1;i<8;i++) {
    $('#isikli-'+i).removeClass('selecttype');
    $('#isikli-'+i).removeClass('unselecttype');
    $('#isikli-'+i).addClass('unselecttype');
  }
  console.log(selectedType);
  $('#'+selectedType).removeClass('unselecttype');
  $('#'+selectedType).addClass('selecttype');

  var cita = $('.citaRengi');
  orderDetail1.type = selectedType;
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
    plateT1.addClass('color-'+orderDetail1.textColor);
  }
  else
  {
    $('#isiklifiyat').addClass('displayNone');
    $('#isiksizfiyat').removeClass('displayNone');
    plateT1.removeClass('color-white');
    plateT1.removeClass('color-yellow');
    plateT1.removeClass('color-red');
    plateT1.removeClass('color-green');
    plateT1.removeClass('color-blue');
    plateT1.removeClass('color-black');
    cita.removeClass('displayNone');
    plateT1.addClass('fc-'+orderDetail1.textColor);
  }
  console.log(orderDetail1);
}
//*******************PLAKALIK YAZISI BOŞ MU *************************


function postDesign() {
  console.log(quantity);
  if (quantity<1){
    $('#message').html(' <h2 class="alert-danger">Ürün Adet Bilgisi Seçiniz.</h2>');
    $('#message1').html('<h2 class="alert-danger">Ürün Adet Bilgisi Seçiniz.</h2>');
  }
  else
  {
    $('#shipmentModal').modal('show');
  }
}
function loadPrice(Gprice1,Gprice2,Gprice3) {
  price1 = Gprice1;
  price2 = Gprice2;
  price3 = Gprice3;
  console.log(price1+","+price2+","+price3);

}
function getPrice(price, q,shipment,campaign) {
  quantity = q;  // hangi buton
  platePrice = price-campaign; // paras
  withShipment = (price+shipment)-campaign;
  //shipment kargo ücreti
  if(typeof(shipment) === 'undefined' || shipment === null) {
    console.log("buradsfsfd");
    kargo=price;
  }else{
    console.log(price + "," + shipment + "," + price1);
    if((price+shipment)>=price1)
    {
      kargo=shipment+platePrice;
    }else
    {
      kargo=price1 + price2 + price3;
    }

  }
  console.log("price"+price+"getprice kargo"+kargo+"shipment"+shipment);

}
function phonenumber()
{
  var phoneno = /^\d{10}$/;
  var number = $('#phone_number').val();

  if(number.match(phoneno))
  {
    return true;
  }
  else
  {
    alert("Telefon numarasını başında 0 olmadan ve boşluksuz girin lütfen");
    return false;
  }
}

function imgRefresh(imageName)
{
  var imgID= imageName.split("-");
  document.getElementById(imgID[0]).src='https://otodark.com/inc_all/images/glassWater/'+imgID[1]+'.jpeg';
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
  }else if (  $('#address').val().search("yurtiçi") != '-1'  || $('#address').val().search("yurtici") !=  '-1' || $('#address').val().search("şubeden") !=  '-1'
  ||  $('#address').val().search("yurtici") !=  '-1'  || $('#address').val().search("yurt içi") != '-1' || $('#address').val().search("yurt ici") !=  '-1' ||
    $('#address').val().search("YURTİÇİ") !=  '-1'    ||   $('#address').val().search("YURT İÇİ") !=  '-1' ||  $('#address').val().search("YURTICI") != '-1' ||
    $('#address').val().search("KARGO") !=  '-1'    ||   $('#address').val().search("kargo") !=  '-1' || $('#address').val().search("ptt") !=  '-1'    || 
    $('#address').val().search("PTT") !=  '-1' || $('#address').val().search("ARAS") !=  '-1'    ||   $('#address').val().search("aras") !=  '-1'||
    $('#address').val().search("Kargo") !=  '-1' || $('#address').val().search("Yurtiçi") !=  '-1'    ||   $('#address').val().search("Yurtici") !=  '-1'  ) {
    alert("LÜTFEN ADRESE KARGO ADI YAZMAYINIZ VE AÇIK ADRES ŞEKLİNDE GİRİNİZ \n Sorun Şundan Kaynaklı Olabilir \n Girdiğiniz Adreste Aşağıdaki Kelimeler olmaması Gerek :\n  PTT KARGO -ARAS AKARGO -ŞUBEDEN ALACAĞIM - YURTİÇİ KARGO ");
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
      if (r == true) {
        return true;
      } else {
        return false;
      }
  
    }

  
}


function postOrder2me(utmsource,utmmedium,utmcampagin,ipaddress) {
  if (utmsource == "undefined" || utmsource ==''){
    utmsource = "organik";
  }
  var splittedOrderD = orderDetail1.type.split('-');
  console.log(quantity);
  var order = {
    'order_type'   : "new",
    'plate_type'  : splittedOrderD[0],
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
          'plate_color': 'black',
          'font_family': orderDetail1.fontFamily
        }
      ]
  };
  if (quantity === 2) {
    order.order_detail.push(
      {
        'plate_text' : orderDetail2.text.toLocaleUpperCase('tr-TR'),
        'style'      : orderDetail2.symbol,
        'style_color': '',
        'text_align' : orderDetail2.textAlign,
        'text_color' : orderDetail2.textColor,
        'plate_color': 'black',
        'font_family': orderDetail2.fontFamily
      }
    )
  } else if(quantity ===3){
    order.order_detail.push(
      {
        'plate_text' : orderDetail3.text.toLocaleUpperCase('tr-TR'),
        'style'      : orderDetail3.symbol,
        'style_color': '',
        'text_align' : orderDetail3.textAlign,
        'text_color' : orderDetail3.textColor,
        'plate_color': 'black',
        'font_family': orderDetail3.fontFamily
      })}
  else if(quantity ===4){
    order.order_detail.push(
      {
        'plate_text' : orderDetail4.text.toLocaleUpperCase('tr-TR'),
        'style'      : orderDetail4.symbol,
        'style_color': '',
        'text_align' : orderDetail4.textAlign,
        'text_color' : orderDetail4.textColor,
        'plate_color': 'black',
        'font_family': orderDetail4.fontFamily
      })}
  else if(quantity ===5){
    order.order_detail.push(
      {
        'plate_text' : orderDetail5.text.toLocaleUpperCase('tr-TR'),
        'style'      : orderDetail5.symbol,
        'style_color': '',
        'text_align' : orderDetail5.textAlign,
        'text_color' : orderDetail5.textColor,
        'plate_color': 'black',
        'font_family': orderDetail5.fontFamily
      })}
  else if(quantity ===6){
    order.order_detail.push(
      {
        'plate_text' : orderDetail6.text.toLocaleUpperCase('tr-TR'),
        'style'      : orderDetail6.symbol,
        'style_color': '',
        'text_align' : orderDetail6.textAlign,
        'text_color' : orderDetail6.textColor,
        'plate_color': 'black',
        'font_family': orderDetail6.fontFamily
      })}

  console.log(order);
  if(phonenumber() && bosluk_kontrol())
  {
    $.post("postNewOrder.php", {order: order}, function (returnValue) {
      console.log(returnValue);
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
function altılı(){
  document.getElementById("isikli-6").style.backgroundColor = "#f4c714";
  document.getElementById("isikli-5").style.backgroundColor = "#d1d1d1";
  document.getElementById("isikli-4").style.backgroundColor = "#d1d1d1";
  document.getElementById("isikli-3").style.backgroundColor = "#d1d1d1";
  document.getElementById("isikli-2").style.backgroundColor = "#d1d1d1";
  document.getElementById("isikli-1").style.backgroundColor = "#d1d1d1";

}function besli(){
  document.getElementById("isikli-5").style.backgroundColor = "#f4c714";
  document.getElementById("isikli-4").style.backgroundColor = "#d1d1d1";
  document.getElementById("isikli-6").style.backgroundColor = "#d1d1d1";
  document.getElementById("isikli-3").style.backgroundColor = "#d1d1d1";
  document.getElementById("isikli-2").style.backgroundColor = "#d1d1d1";
  document.getElementById("isikli-1").style.backgroundColor = "#d1d1d1";

}function dortlu(){
  document.getElementById("isikli-6").style.backgroundColor = "#d1d1d1";
  document.getElementById("isikli-5").style.backgroundColor = "#d1d1d1";
  document.getElementById("isikli-4").style.backgroundColor = "#f4c714";
  document.getElementById("isikli-3").style.backgroundColor = "#d1d1d1";
  document.getElementById("isikli-2").style.backgroundColor = "#d1d1d1";
  document.getElementById("isikli-1").style.backgroundColor = "#d1d1d1";

}function uclu(){
  document.getElementById("isikli-6").style.backgroundColor = "#d1d1d1";
  document.getElementById("isikli-3").style.backgroundColor = "#f4c714";
  document.getElementById("isikli-1").style.backgroundColor = "#d1d1d1";
  document.getElementById("isikli-2").style.backgroundColor = "#d1d1d1";
  document.getElementById("isikli-4").style.backgroundColor = "#d1d1d1";
  document.getElementById("isikli-5").style.backgroundColor = "#d1d1d1";

}
function secimitemizle(){
  $("#fontFamily").val("plateT2");
  //alert($("#fontFamily").val());
}
function ikili(){
  document.getElementById("isikli-6").style.backgroundColor = "#d1d1d1";
  document.getElementById("isikli-2").style.backgroundColor = "#f4c714";
  document.getElementById("isikli-5").style.backgroundColor = "#d1d1d1";
  document.getElementById("isikli-4").style.backgroundColor = "#d1d1d1";
  document.getElementById("isikli-3").style.backgroundColor = "#d1d1d1";
  document.getElementById("isikli-1").style.backgroundColor = "#d1d1d1";
}
function tekli(){
  document.getElementById("isikli-6").style.backgroundColor = "#d1d1d1";
  document.getElementById("isikli-1").style.backgroundColor = "#f4c714";
  document.getElementById("isikli-2").style.backgroundColor = "#d1d1d1";
  document.getElementById("isikli-3").style.backgroundColor = "#d1d1d1";
  document.getElementById("isikli-4").style.backgroundColor = "#d1d1d1";
  document.getElementById("isikli-5").style.backgroundColor = "#d1d1d1";

}