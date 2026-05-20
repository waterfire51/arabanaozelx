var fontTypes = ["ethnocentric", "aviano","sonsie","revuen", "sigmar","ethnocentric","machine","newstencil","resobold"];
var orderDetail =  {"type": "isiksiz", "text":'', "textColor": "white", "fontFamily": "ethnocentric","leftStyle": "siyah", "rightStyle":"siyah", "plateColor": "black", "textAlign": "center"};
var orderDetail2 = {"type": "isiksiz", "text":'', "textColor": "white", "fontFamily": "ethnocentric","leftStyle": "siyah", "rightStyle":"siyah", "plateColor": "black", "textAlign": "center"};
var orderDetail3 = {"type": "isiksiz", "text":'', "textColor": "white", "fontFamily": "ethnocentric","leftStyle": "siyah", "rightStyle":"siyah", "plateColor": "black", "textAlign": "center"};
var orderDetail4 = {"type": "isiksiz", "text":'', "textColor": "white", "fontFamily": "ethnocentric","leftStyle": "siyah", "rightStyle":"siyah", "plateColor": "black", "textAlign": "center"};
var orderDetail5 = {"type": "isiksiz", "text":'', "textColor": "white", "fontFamily": "ethnocentric","leftStyle": "siyah", "rightStyle":"siyah", "plateColor": "black", "textAlign": "center"};
var orderDetail6 = {"type": "isiksiz", "text":'', "textColor": "white", "fontFamily": "ethnocentric","leftStyle": "siyah", "rightStyle":"siyah", "plateColor": "black", "textAlign": "center"};
var orderDetail7 = {"type": "isiksiz", "text":'', "textColor": "white", "fontFamily": "ethnocentric","leftStyle": "siyah", "rightStyle":"siyah", "plateColor": "black", "textAlign": "center"};
var orderDetail8 = {"type": "isiksiz", "text":'', "textColor": "white", "fontFamily": "ethnocentric","leftStyle": "siyah", "rightStyle":"siyah", "plateColor": "black", "textAlign": "center"};
var quantity = 0;
var platePrice = 0;
var withShipment = 26;
var Ccity = 0;
var Cstate = 0;
var variations = ["isikli", "isiksiz"];
var priceVariations = 4;
var shipmentPrice=0;

$(document).on("click", ".selectSymbol", function () {
  var symPos = $(this).data('id');
  $("#whichSym").val( symPos );
});
$(document).on("click", ".select_font", function () {
  var symPos1 = $(this).data('id');
  $("#denemee").val( symPos1 );
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
  if (imgPosition == 'left') {
    orderDetail.leftStyle = plateSymbol;
    document.getElementById('myImg-left').src = "https://otodark.com/inc_all/figures/"+plateSymbol+".svg";
  } else if(imgPosition == 'right') {
    orderDetail.rightStyle = plateSymbol;
    document.getElementById('myImg-right').src = "https://otodark.com/inc_all/figures/"+plateSymbol+".svg";
  } else if(imgPosition == 'left2') {
    orderDetail2.leftStyle = plateSymbol;
    document.getElementById('myImg-left2').src = "https://otodark.com/inc_all/figures/"+plateSymbol+".svg";
  }else if(imgPosition == 'right2') {
    orderDetail2.rightStyle = plateSymbol;
    document.getElementById('myImg-right2').src = "https://otodark.com/inc_all/figures/"+plateSymbol+".svg";
  }else if(imgPosition == 'left3') {
    orderDetail3.leftStyle = plateSymbol;
    document.getElementById('myImg-left3').src = "https://otodark.com/inc_all/figures/"+plateSymbol+".svg";
  }else if(imgPosition == 'right3') {
    orderDetail3.rightStyle = plateSymbol;
    document.getElementById('myImg-right3').src = "https://otodark.com/inc_all/figures/"+plateSymbol+".svg";
  }else if(imgPosition == 'left4') {
    orderDetail4.leftStyle = plateSymbol;
    document.getElementById('myImg-left4').src = "https://otodark.com/inc_all/figures/"+plateSymbol+".svg";
  }else if(imgPosition == 'right4') {
    orderDetail4.rightStyle = plateSymbol;
    document.getElementById('myImg-right4').src = "https://otodark.com/inc_all/figures/"+plateSymbol+".svg";
  }else if(imgPosition == 'left5') {
    orderDetail5.leftStyle = plateSymbol;
    document.getElementById('myImg-left5').src = "https://otodark.com/inc_all/figures/"+plateSymbol+".svg";
  }else if(imgPosition == 'right5') {
    orderDetail5.rightStyle = plateSymbol;
    document.getElementById('myImg-right5').src = "https://otodark.com/inc_all/figures/"+plateSymbol+".svg";
  }else if(imgPosition == 'left6') {
    orderDetail6.leftStyle = plateSymbol;
    document.getElementById('myImg-left6').src = "https://otodark.com/inc_all/figures/"+plateSymbol+".svg";
  }else if(imgPosition == 'right6') {
    orderDetail6.rightStyle = plateSymbol;
    document.getElementById('myImg-right6').src = "https://otodark.com/inc_all/figures/"+plateSymbol+".svg";
  }else if(imgPosition == 'left7') {
    orderDetail7.leftStyle = plateSymbol;
    document.getElementById('myImg-left7').src = "https://otodark.com/inc_all/figures/"+plateSymbol+".svg";
  }else if(imgPosition == 'right7') {
    orderDetail7.rightStyle = plateSymbol;
    document.getElementById('myImg-right7').src = "https://otodark.com/inc_all/figures/"+plateSymbol+".svg";
  }else if(imgPosition == 'left8') {
    orderDetail8.leftStyle = plateSymbol;
    document.getElementById('myImg-left8').src = "https://otodark.com/inc_all/figures/"+plateSymbol+".svg";
  }else if(imgPosition == 'right8') {
    orderDetail8.rightStyle = plateSymbol;
    document.getElementById('myImg-right8').src = "https://otodark.com/inc_all/figures/"+plateSymbol+".svg";
  }
  $('#symbolModal').modal('hide');
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

        if(value.id == Cstate)
        {
          
          
          $("#state").prop('selectedIndex',i);
        }
        i++;

      });

    }
  });
}
// /********şehir ilçe
function cityState(city,state) {
  setSelectValue('city',city);
  Cstate = state;
  document.getElementById("city").onchange();
}

$(document).ready(function () {
  quantity = 0;
  // getPrice(19, 1, 13);
  $(window).scroll(function(){
    $('.lazy').each(function(){
      if( $(this).offset().top < ($(window).scrollTop() + $(window).height() + 100) )
      {
        $(this).attr('src', $(this).attr('data-src'));
      }
    });
  });

  var plateText = $("input[name=isim]");
  if(plateText != "" || plateText != undefined) {
    orderDetail.text = plateText.val();
    orderDetail.plateColor = $("input[name=plateColor]:checked").val();
    
  }
  var plateText2 = $("input[name=isim2]");
  if(plateText2 != "" || plateText2 != undefined) {
    orderDetail2.text = plateText2.val();
    orderDetail2.plateColor = $("input[name=plateColor]:checked").val();
    
  }
  var plateText3 = $("input[name=isim3]");
  if(plateText3 != "" || plateText3 != undefined) {
    orderDetail3.text = plateText3.val();
    orderDetail3.plateColor = $("input[name=plateColor]:checked").val();
    
  }
  var plateText4 = $("input[name=isim4]");
  if(plateText4 != "" || plateText4 != undefined) {
    orderDetail4.text = plateText4.val();
    orderDetail4.plateColor = $("input[name=plateColor]:checked").val();
    
  }
  var plateText5 = $("input[name=isim5]");
  if(plateText5 != "" || plateText5 != undefined) {
    orderDetail5.text = plateText5.val();
    orderDetail5.plateColor = $("input[name=plateColor]:checked").val();
    
  }
  var plateText6 = $("input[name=isim6]");
  if(plateText6 != "" || plateText6 != undefined) {
    orderDetail6.text = plateText6.val();
    orderDetail6.plateColor = $("input[name=plateColor]:checked").val();
    
  }
  var plateText7 = $("input[name=isim7]");
  if(plateText7 != "" || plateText7 != undefined) {
    orderDetail7.text = plateText7.val();
    orderDetail7.plateColor = $("input[name=plateColor]:checked").val();
    
  }
  var plateText8 = $("input[name=isim8]");
  if(plateText8 != "" || plateText8 != undefined) {
    orderDetail8.text = plateText8.val();
    orderDetail8.plateColor = $("input[name=plateColor]:checked").val();
    
  }

  document.getElementById('myImg-left').src = "https://otodark.com/inc_all/figures/"+orderDetail.leftStyle+".svg";
  document.getElementById('myImg-right').src = "https://otodark.com/inc_all/figures/"+orderDetail.rightStyle+".svg";

  function spaceControl(str) {
    if(str[(str.length)-1]==' ')
    return /\s{10,}/.test(str);
  else false
  }
  plateText.keyup(function () {
    // plateText.val(plateText.val().replace(/  +/g, ' '));
    orderDetail.text = plateText.val();
    clearFontClass('isim','');
    $('#plateT').addClass('ff'+orderDetail.fontFamily);
    $('#plateT').html(plateText.val().toLocaleUpperCase('tr-TR'));
    $('.modalText').html(plateText.val().toLocaleUpperCase('tr-TR'));
    if(spaceControl(plateText.val()))
    {
      Swal.fire({
  position: "top-end",
  icon: "info",
  title: "Yazınız sağa veya sola hizalanacaktır",
  showConfirmButton: false,
  timer: 2500
});
    }
  });

  plateText2.keyup(function () {
    // plateText2.val(plateText2.val().replace(/  +/g, ' '));
    orderDetail2.text = plateText2.val();
    clearFontClass('isim2','');
    $('#plateT2').addClass('ff'+orderDetail2.fontFamily);
    $('#plateT2').html(plateText2.val().toLocaleUpperCase('tr-TR'));
    $('.modalText').html(plateText2.val().toLocaleUpperCase('tr-TR'));
    if(spaceControl(plateText2.val()))
    {
      Swal.fire({
  position: "top-end",
  icon: "info",
  title: "Yazınız sağa veya sola hizalanacaktır",
  showConfirmButton: false,
  timer: 2500
});
    }
  });

  plateText3.keyup(function () {
    // plateText3.val(plateText3.val().replace(/  +/g, ' '));
    orderDetail3.text = plateText3.val();
    clearFontClass('isim3','');
    $('#plateT3').addClass('ff'+orderDetail3.fontFamily);
    $('#plateT3').html(plateText3.val().toLocaleUpperCase('tr-TR'));
    $('.modalText').html(plateText3.val().toLocaleUpperCase('tr-TR'));
    if(spaceControl(plateText3.val()))
    {
      Swal.fire({
  position: "top-end",
  icon: "info",
  title: "Yazınız sağa veya sola hizalanacaktır",
  showConfirmButton: false,
  timer: 2500
});
    }
  });
  plateText4.keyup(function () {
    // plateText4.val(plateText4.val().replace(/  +/g, ' '));
    orderDetail4.text = plateText4.val();
    clearFontClass('isim4','');
    $('#plateT4').addClass('ff'+orderDetail4.fontFamily);
    $('#plateT4').html(plateText4.val().toLocaleUpperCase('tr-TR'));
    $('.modalText').html(plateText4.val().toLocaleUpperCase('tr-TR'));
    if(spaceControl(plateText4.val()))
    {
      Swal.fire({
  position: "top-end",
  icon: "info",
  title: "Yazınız sağa veya sola hizalanacaktır",
  showConfirmButton: false,
  timer: 2500
});
    }
  });
  plateText5.keyup(function () {
    // plateText5.val(plateText5.val().replace(/  +/g, ' '));
    orderDetail5.text = plateText5.val();
    clearFontClass('isim5','');
    $('#plateT5').addClass('ff'+orderDetail5.fontFamily);
    $('#plateT5').html(plateText5.val().toLocaleUpperCase('tr-TR'));
    $('.modalText').html(plateText5.val().toLocaleUpperCase('tr-TR'));
    if(spaceControl(plateText5.val()))
    {
      Swal.fire({
  position: "top-end",
  icon: "info",
  title: "Yazınız sağa veya sola hizalanacaktır",
  showConfirmButton: false,
  timer: 2500
});
    }
  });
  plateText6.keyup(function () {
    // plateText6.val(plateText6.val().replace(/  +/g, ' '));
    orderDetail6.text = plateText6.val();
    clearFontClass('isim6','');
    $('#plateT6').addClass('ff'+orderDetail6.fontFamily);
    $('#plateT6').html(plateText6.val().toLocaleUpperCase('tr-TR'));
    $('.modalText').html(plateText6.val().toLocaleUpperCase('tr-TR'));
    if(spaceControl(plateText6.val()))
    {
      Swal.fire({
  position: "top-end",
  icon: "info",
  title: "Yazınız sağa veya sola hizalanacaktır",
  showConfirmButton: false,
  timer: 2500
});
    }
  });
  plateText7.keyup(function () {
    // plateText7.val(plateText7.val().replace(/  +/g, ' '));
    orderDetail7.text = plateText7.val();
    clearFontClass('isim7','');
    $('#plateT7').addClass('ff'+orderDetail7.fontFamily);
    $('#plateT7').html(plateText7.val().toLocaleUpperCase('tr-TR'));
    $('.modalText').html(plateText7.val().toLocaleUpperCase('tr-TR'));
    if(spaceControl(plateText7.val()))
    {
      Swal.fire({
  position: "top-end",
  icon: "info",
  title: "Yazınız sağa veya sola hizalanacaktır",
  showConfirmButton: false,
  timer: 2500
});
    }
  });
  plateText8.keyup(function () {
    // plateText8.val(plateText8.val().replace(/  +/g, ' '));
    orderDetail8.text = plateText8.val();
    clearFontClass('isim8','');
    $('#plateT8').addClass('ff'+orderDetail8.fontFamily);
    $('#plateT8').html(plateText8.val().toLocaleUpperCase('tr-TR'));
    $('.modalText').html(plateText8.val().toLocaleUpperCase('tr-TR'));
    if(spaceControl(plateText8.val()))
    {
      Swal.fire({
  position: "top-end",
  icon: "info",
  title: "Yazınız sağa veya sola hizalanacaktır",
  showConfirmButton: false,
  timer: 2500
});
    }
  });

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
  plateText.blur( function () {
    orderDetail.text = plateText.val();
    /*
        $.each(fontTypes, function (index, value) {
          $('option .ff'+value).html(orderDetail.plateText);
        });
    */
  });

  $("input[name=plateColor]").click( function () {
    orderDetail.plateColor = $("input[name=plateColor]:checked").val();
    var element = $('.bos-cita-rengi');
    clearBackgroundColor(element);
    element.addClass('bc-'+orderDetail.plateColor);
    
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

      orderDetail.textAlign = $("input[name=textAlign]:checked").val();
      var leftElement = $('.plaka-sol-emoji1');
      var rightElement = $('.plaka-sag-emoji1');
      var centerElement = $('.yazi5');
      //alert("burasoı 1. orta sag sol tıkla  -------------" +  orderDetail.textAlign);
      if (orderDetail.textAlign === 'left') {
        //document.getElementById("sol-sec").checked = 'true';
        //alert("burasoı 1. sol  " +  centerElement);
        leftElement.addClass('displayNone');
        rightElement.removeClass('displayNone');
        removeTextAlignmentClass(centerElement);
      }
      if (orderDetail.textAlign === 'right') {
        //alert("burasoı 1. sağ  " +  centerElement);
        //document.getElementById("sag-sec").checked = 'true';
        rightElement.addClass('displayNone');
        leftElement.removeClass('displayNone');
        removeTextAlignmentClass(centerElement);
      }
      if (orderDetail.textAlign === 'center') {
        //alert("burasoı 1. orta  " +  centerElement);
        // document.getElementById("orta-sec").checked = 'true';
        rightElement.removeClass('displayNone');
        leftElement.removeClass('displayNone');
        removeTextAlignmentClass(centerElement);
      }
      centerElement.addClass('align-'+orderDetail.textAlign);
      
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

  $("input[name=textAlign4]").click( function () {
    var imgPosition4 = $('#konum').val();
    if(imgPosition4=="dorduncu"){ // ÜÇÜNCÜ KONUM İÇİNNN
      orderDetail4.textAlign = $("input[name=textAlign4]:checked").val();
      var leftElement = $('.plaka-sol-emoji-4');
      var rightElement = $('.plaka-sag-emoji-4');
      var centerElement = $('.yazi4');

      //alert("burasoı 3. orta sag sol tıkla ---------------- " +  orderDetail3.textAlign);
      if (orderDetail4.textAlign === 'left') {
        //document.getElementById("sol-sec3").checked = 'true';
        leftElement.addClass('displayNone');
        rightElement.removeClass('displayNone');
        removeTextAlignmentClass(centerElement);
      }
      if (orderDetail4.textAlign === 'right') {
        //alert("burasoı 3. sag  " +  centerElement);
        //document.getElementById("sag-sec3").checked = 'true';
        rightElement.addClass('displayNone');
        leftElement.removeClass('displayNone');
        removeTextAlignmentClass(centerElement);
      }
      if (orderDetail4.textAlign === 'center') {
        //document.getElementById("orta-sec3").checked = 'true';
        //alert("burasoı 3. orta  " +  centerElement);
        rightElement.removeClass('displayNone');
        leftElement.removeClass('displayNone');
        removeTextAlignmentClass(centerElement);
      }
      centerElement.addClass('align-'+orderDetail4.textAlign);
      
    }

  });

  $("input[name=textAlign5]").click( function () {
    var imgPosition5 = $('#konum').val();
    if(imgPosition5=="dorduncu"){ // ÜÇÜNCÜ KONUM İÇİNNN
      orderDetail5.textAlign = $("input[name=textAlign5]:checked").val();
      var leftElement   = $('.plaka-sol-emoji-5');
      var rightElement  = $('.plaka-sag-emoji-5');
      var centerElement = $('.yazi5');

      if (orderDetail5.textAlign === 'left') {
        leftElement.addClass('displayNone');
        rightElement.removeClass('displayNone');
        removeTextAlignmentClass(centerElement);
      }
      if (orderDetail5.textAlign === 'right') {
        rightElement.addClass('displayNone');
        leftElement.removeClass('displayNone');
        removeTextAlignmentClass(centerElement);
      }
      if (orderDetail5.textAlign === 'center') {
        rightElement.removeClass('displayNone');
        leftElement.removeClass('displayNone');
        removeTextAlignmentClass(centerElement);
      }
      centerElement.addClass('align-'+orderDetail5.textAlign);
      
    }

  });

  $("input[name=textAlign6]").click( function () {
    var imgPosition6 = $('#konum').val();
    if(imgPosition6=="dorduncu"){ // ÜÇÜNCÜ KONUM İÇİNNN
      orderDetail6.textAlign = $("input[name=textAlign6]:checked").val();
      var leftElement   = $('.plaka-sol-emoji-6');
      var rightElement  = $('.plaka-sag-emoji-6');
      var centerElement = $('.yazi6');

      if (orderDetail6.textAlign === 'left') {
        leftElement.addClass('displayNone');
        rightElement.removeClass('displayNone');
        removeTextAlignmentClass(centerElement);
      }
      if (orderDetail6.textAlign === 'right') {
        rightElement.addClass('displayNone');
        leftElement.removeClass('displayNone');
        removeTextAlignmentClass(centerElement);
      }
      if (orderDetail6.textAlign === 'center') {
        rightElement.removeClass('displayNone');
        leftElement.removeClass('displayNone');
        removeTextAlignmentClass(centerElement);
      }
      centerElement.addClass('align-'+orderDetail6.textAlign);
      
    }

  });

  $("input[name=textAlign7]").click( function () {
    var imgPosition7 = $('#konum').val();
    if(imgPosition7=="dorduncu"){ // ÜÇÜNCÜ KONUM İÇİNNN
      orderDetail7.textAlign = $("input[name=textAlign7]:checked").val();
      var leftElement   = $('.plaka-sol-emoji-7');
      var rightElement  = $('.plaka-sag-emoji-7');
      var centerElement = $('.yazi7');

      if (orderDetail7.textAlign === 'left') {
        leftElement.addClass('displayNone');
        rightElement.removeClass('displayNone');
        removeTextAlignmentClass(centerElement);
      }
      if (orderDetail7.textAlign === 'right') {
        rightElement.addClass('displayNone');
        leftElement.removeClass('displayNone');
        removeTextAlignmentClass(centerElement);
      }
      if (orderDetail7.textAlign === 'center') {
        rightElement.removeClass('displayNone');
        leftElement.removeClass('displayNone');
        removeTextAlignmentClass(centerElement);
      }
      centerElement.addClass('align-'+orderDetail7.textAlign);
      
    }

  });

  $("input[name=textAlign8]").click( function () {
    var imgPosition8 = $('#konum').val();
    if(imgPosition8=="dorduncu"){ // ÜÇÜNCÜ KONUM İÇİNNN
      orderDetail8.textAlign = $("input[name=textAlign8]:checked").val();
      var leftElement   = $('.plaka-sol-emoji-8');
      var rightElement  = $('.plaka-sag-emoji-8');
      var centerElement = $('.yazi8');

      if (orderDetail8.textAlign === 'left') {
        leftElement.addClass('displayNone');
        rightElement.removeClass('displayNone');
        removeTextAlignmentClass(centerElement);
      }
      if (orderDetail8.textAlign === 'right') {
        rightElement.addClass('displayNone');
        leftElement.removeClass('displayNone');
        removeTextAlignmentClass(centerElement);
      }
      if (orderDetail8.textAlign === 'center') {
        rightElement.removeClass('displayNone');
        leftElement.removeClass('displayNone');
        removeTextAlignmentClass(centerElement);
      }
      centerElement.addClass('align-'+orderDetail8.textAlign);
      
    }

  });
//************************    METİN  RENGİİİİİ **************************************
  $('#textColor').change(function () {
    var renk_id = $('#renksecim').val();
    orderDetail.textColor = $(this).children('option:selected').val();
    //alert("ilk İFDE");
    
    var element = $('.yazi5');
    var ptype = orderDetail.type;
    clearFontColor(element,ptype);
    element.addClass('fc-'+orderDetail.textColor);

  });
  $('#textColor2').change(function () {
    var renk_id = $('#renksecim').val();
    orderDetail2.textColor = $(this).children('option:selected').val();
    //alert("İKİNCİ İFDE");
    
    var element = $('.yazi2');
    var ptype = orderDetail2.type;
    clearFontColor(element,ptype);
    element.addClass('fc-'+orderDetail2.textColor);
  });
  $('#textColor3').change(function () {
    var renk_id = $('#renksecim').val();
    orderDetail3.textColor= $(this).children('option:selected').val();
    //alert("UCUNCU İFDEE");
    
    var element = $('.yazi3');
    //alert("buradaa");
    var ptype = orderDetail3.type;
    clearFontColor(element,ptype);
    element.addClass('fc-'+orderDetail3.textColor);
  });
  $('#textColor4').change(function () {
    var renk_id = $('#renksecim').val();
    orderDetail4.textColor= $(this).children('option:selected').val();
    //alert("UCUNCU İFDEE");
    
    var element = $('.yazi4');
    //alert("buradaa");
    var ptype = orderDetail4.type;
    clearFontColor(element,ptype);
    element.addClass('fc-'+orderDetail4.textColor);
  });
  $('#textColor5').change(function () {
    var renk_id = $('#renksecim').val();
    orderDetail5.textColor= $(this).children('option:selected').val();
    //alert("UCUNCU İFDEE");
    
    var element = $('.yazi5');
    //alert("buradaa");
    var ptype = orderDetail5.type;
    clearFontColor(element,ptype);
    element.addClass('fc-'+orderDetail5.textColor);
  });
  $('#textColor6').change(function () {
    var renk_id = $('#renksecim').val();
    orderDetail6.textColor= $(this).children('option:selected').val();
    //alert("UCUNCU İFDEE");
    
    var element = $('.yazi6');
    //alert("buradaa");
    var ptype = orderDetail6.type;
    clearFontColor(element,ptype);
    element.addClass('fc-'+orderDetail6.textColor);
  });
  $('#textColor7').change(function () {
    var renk_id = $('#renksecim').val();
    orderDetail7.textColor= $(this).children('option:selected').val();
    //alert("UCUNCU İFDEE");
    
    var element = $('.yazi7');
    //alert("buradaa");
    var ptype = orderDetail7.type;
    clearFontColor(element,ptype);
    element.addClass('fc-'+orderDetail7.textColor);
  });
  $('#textColor8').change(function () {
    var renk_id = $('#renksecim').val();
    orderDetail8.textColor= $(this).children('option:selected').val();
    //alert("UCUNCU İFDEE");
    
    var element = $('.yazi8');
    //alert("buradaa");
    var ptype = orderDetail8.type;
    clearFontColor(element,ptype);
    element.addClass('fc-'+orderDetail8.textColor);
  });

//*************** renk için   burası mobil için yapılacak******************
  $('#textColorM1').change(function () {
    orderDetail.textColor = $(this).children('option:selected').val();
    var element = $('.yazi5');
    var ptype = orderDetail.type;
    clearFontColor(element,ptype);
    element.addClass('fc-'+orderDetail.textColor);
    setTimeout(zoomreset, 50);
    
  });
  $('#textColorM2').change(function () {
    orderDetail2.textColor = $(this).children('option:selected').val();
    var element = $('.yazi2');
    var ptype = orderDetail2.type;
    clearFontColor(element,ptype);
    element.addClass('fc-'+orderDetail2.textColor);
    setTimeout(zoomreset, 50);
    
    
  });
  $('#textColorM3').change(function () {
    orderDetail3.textColor = $(this).children('option:selected').val();
    var element = $('.yazi3');
    var ptype = orderDetail3.type;
    clearFontColor(element,ptype);
    element.addClass('fc-'+orderDetail3.textColor);
    setTimeout(zoomreset, 50);
    
  });
  $('#textColorM4').change(function () {
    orderDetail4.textColor = $(this).children('option:selected').val();
    var element = $('.yazi4');
    var ptype = orderDetail4.type;
    clearFontColor(element,ptype);
    element.addClass('fc-'+orderDetail4.textColor);
    setTimeout(zoomreset, 50);
    
  });
  $('#textColorM5').change(function () {
    orderDetail5.textColor = $(this).children('option:selected').val();
    var element = $('.yazi5');
    var ptype = orderDetail5.type;
    clearFontColor(element,ptype);
    element.addClass('fc-'+orderDetail5.textColor);
    setTimeout(zoomreset, 50);
    
  });
  $('#textColorM6').change(function () {
    orderDetail6.textColor = $(this).children('option:selected').val();
    var element = $('.yazi6');
    var ptype = orderDetail6.type;
    clearFontColor(element,ptype);
    element.addClass('fc-'+orderDetail6.textColor);
    setTimeout(zoomreset, 50);
    
  });
  $('#textColorM7').change(function () {
    orderDetail7.textColor = $(this).children('option:selected').val();
    var element = $('.yazi7');
    var ptype = orderDetail7.type;
    clearFontColor(element,ptype);
    element.addClass('fc-'+orderDetail7.textColor);
    setTimeout(zoomreset, 50);
    
  });
  $('#textColorM8').change(function () {
    orderDetail8.textColor = $(this).children('option:selected').val();
    var element = $('.yazi8');
    var ptype = orderDetail8.type;
    clearFontColor(element,ptype);
    element.addClass('fc-'+orderDetail8.textColor);
    setTimeout(zoomreset, 50);
    
  });


  
});
$("#symbolModal").on("shown.bs.modal", function () {
  document.getElementById('figureGroup').innerHTML ="";
  document.getElementById('tabContent').innerHTML ="";
  $('figureGroup').html();
  $.post("getFigureGroups.php", {}, function (returnValue) {
    
    var jsonReturnValue = JSON.parse(returnValue);
    $.each(jsonReturnValue, function (index, value) {
      
      var groupName = value.split('_');
      $('#figureGroup').append('<li onClick="getFigures(\''+groupName[0]+'\')"><a data-toggle="pill" href="#'+groupName[0]+'" class="headerButtonBG lazy"><img src="https://otodark.com/inc_all/figures/figuresGroup/'+value+'?v3" class="imageWH"></a></li>');
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
      $('#'+splittedFigureGroup[0]).append('<button class="btn marginFix lazy" id="selectB" onClick="closeModal(\''+splittedFigure[0]+'\' )"><img alt="" src="https://otodark.com/inc_all/figures/'+value+'" class="imageWH"></button>')
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

  /*

   orderDetail.plateColor = platecolor;
   orderDetail.textColor = textcolor;
   orderDetail.type = platetype;
   orderDetail.leftStyle = plateLeft;
   orderDetail.rightStyle = plateRight;
   document.getElementById('myImg-left').src = "https://otodark.com/inc_all/figures/"+orderDetail.leftStyle+".svg";
   document.getElementById('myImg-right').src = "https://otodark.com/inc_all/figures/"+orderDetail.rightStyle+".svg";
   var leftElement = $('.plaka-sol-emoji');
   var rightElement = $('.plaka-sag-emoji');
   var centerElement = $('.bos-plaka-uzerine-gelecek-yazi');
   switch (textalign) {
     case 'right':
     alert("burasoı 1. edit ");
       document.getElementById("sag-sec").checked = 'true';
       orderDetail.textAlign = 'right';
       rightElement.addClass('displayNone');
       leftElement.removeClass('displayNone');
       break;
     case 'left':
     alert("burasoı 2. edit ");
       document.getElementById("sol-sec").checked = 'true';
       orderDetail.textAlign = 'left';
       rightElement.addClass('displayNone');
       leftElement.removeClass('displayNone');
       break;
     default:
     alert("burasoı 3. edit ");
       document.getElementById("orta-sec").checked = 'true';
       orderDetail.textAlign = 'center';
       leftElement.removeClass('displayNone');
       rightElement.removeClass('displayNone');
       break;
   }*/
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
  var imgPosition = $('#denemee').val();

  if (imgPosition == 'plateT') {
    orderDetail.fontFamily = gelenFont;
    var inputT = $('input[name=isim]');
    var a = $('.bos-plaka-uzerine-gelecek-yazi');
    $.each(fontTypes, function (index, value) {
      inputT.removeClass('ff'+value);
      a.removeClass('ff'+value);
    });
    inputT.addClass('ff'+orderDetail.fontFamily);
    a.addClass('ff'+orderDetail.fontFamily);
    
    $('#fontModal').modal('hide');

  } else if(imgPosition == 'plateT2') {
    orderDetail2.fontFamily = gelenFont;
    var inputT = $('input[name=isim2]');
    var a = $('.bos-plaka-uzerine-gelecek-yazi');
    $.each(fontTypes, function (index, value) {
      inputT.removeClass('ff'+value);
      a.removeClass('ff'+value);
    });
    inputT.addClass('ff'+orderDetail2.fontFamily);
    a.addClass('ff'+orderDetail2.fontFamily);
    
    $('#fontModal').modal('hide');

  } else if(imgPosition == 'plateT3') {
    orderDetail3.fontFamily = gelenFont;
    var inputT = $('input[name=isim3]');
    var a = $('.bos-plaka-uzerine-gelecek-yazi');
    $.each(fontTypes, function (index, value) {
      inputT.removeClass('ff'+value);
      a.removeClass('ff'+value);
    });
    inputT.addClass('ff'+orderDetail3.fontFamily);
    a.addClass('ff'+orderDetail3.fontFamily);
    
    $('#fontModal').modal('hide');

  }else if(imgPosition == 'plateT4') {
    orderDetail4.fontFamily = gelenFont;
    var inputT = $('input[name=isim4]');
    var a = $('.bos-plaka-uzerine-gelecek-yazi');
    $.each(fontTypes, function (index, value) {
      inputT.removeClass('ff'+value);
      a.removeClass('ff'+value);
    });
    inputT.addClass('ff'+orderDetail4.fontFamily);
    a.addClass('ff'+orderDetail4.fontFamily);
    
    $('#fontModal').modal('hide');

  }else if(imgPosition == 'plateT5') {
    orderDetail5.fontFamily = gelenFont;
    var inputT = $('input[name=isim5]');
    var a = $('.bos-plaka-uzerine-gelecek-yazi');
    $.each(fontTypes, function (index, value) {
      inputT.removeClass('ff'+value);
      a.removeClass('ff'+value);
    });
    inputT.addClass('ff'+orderDetail5.fontFamily);
    a.addClass('ff'+orderDetail5.fontFamily);
    
    $('#fontModal').modal('hide');

  }else if(imgPosition == 'plateT6') {
    orderDetail6.fontFamily = gelenFont;
    var inputT = $('input[name=isim6]');
    var a = $('.bos-plaka-uzerine-gelecek-yazi');
    $.each(fontTypes, function (index, value) {
      inputT.removeClass('ff'+value);
      a.removeClass('ff'+value);
    });
    inputT.addClass('ff'+orderDetail6.fontFamily);
    a.addClass('ff'+orderDetail6.fontFamily);
    
    $('#fontModal').modal('hide');

  }else if(imgPosition == 'plateT7') {
    orderDetail7.fontFamily = gelenFont;
    var inputT = $('input[name=isim7]');
    var a = $('.bos-plaka-uzerine-gelecek-yazi');
    $.each(fontTypes, function (index, value) {
      inputT.removeClass('ff'+value);
      a.removeClass('ff'+value);
    });
    inputT.addClass('ff'+orderDetail7.fontFamily);
    a.addClass('ff'+orderDetail7.fontFamily);
    
    $('#fontModal').modal('hide');

  }else if(imgPosition == 'plateT8') {
    orderDetail8.fontFamily = gelenFont;
    var inputT = $('input[name=isim8]');
    var a = $('.bos-plaka-uzerine-gelecek-yazi');
    $.each(fontTypes, function (index, value) {
      inputT.removeClass('ff'+value);
      a.removeClass('ff'+value);
    });
    inputT.addClass('ff'+orderDetail8.fontFamily);
    a.addClass('ff'+orderDetail8.fontFamily);
    
    $('#fontModal').modal('hide');
  }
}

//******************************************İSİKLİ İSİKSİZ SEÇİM ********************************
function clearAllBoxClass() {
  $.each(variations, function (index, value) {
    for (var i=1; i<priceVariations+1; i++) {
      var elementBox = $('#'+value+'-'+i);
      elementBox.removeClass('selecttype');
      elementBox.addClass('unselecttype');
    }
  });
}
function selectType(selectedType) {
  
  var selectedNum = selectedType.split('-');
  var selectedBox = $('#'+selectedType);
  $('.odeme-fiyat-turu').html(platePrice);
  $('.odeme-fiyat-turu').html(platePrice);
  $('#productPrice').html(platePrice);
  $('#totalPrice').html(withShipment);
  $('#shipmentPrice').html(shipmentPrice);
  // var shipmentPrice = withShipment-platePrice;
  var shipmentPriceElement = $('.shipmentPrice');
  if (shipmentPrice === 0) {
    shipmentPriceElement.addClass('fc-red');
    shipmentPriceElement.html('Ücretsiz Kargo');
  } else {
    
    shipmentPriceElement.removeClass('fc-red');
    shipmentPriceElement.html('+'+shipmentPrice+' TL.Kargo');
  }

  clearAllBoxClass();
  selectedBox.removeClass('unselecttype');
  selectedBox.addClass('selecttype');

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
  orderDetail.type = selectedNum[0];
  var plateT = $('.bos-plaka-uzerine-gelecek-yazi');
  if(orderDetail.type === 'isikli') {
    $('#isiklifiyat').removeClass('displayNone');
    $('#isiksizfiyat').addClass('displayNone');
    plateT.removeClass('fc-white');
    plateT.removeClass('fc-yellow');
    plateT.removeClass('fc-red');
    plateT.removeClass('fc-green');
    plateT.removeClass('fc-blue');
    plateT.removeClass('fc-black');
    plateT.addClass('fc-'+orderDetail.textColor);
  } else {
    $('#isiklifiyat').addClass('displayNone');
    $('#isiksizfiyat').removeClass('displayNone');
    plateT.removeClass('fc-white');
    plateT.removeClass('fc-yellow');
    plateT.removeClass('fc-red');
    plateT.removeClass('fc-green');
    plateT.removeClass('fc-blue');
    plateT.removeClass('fc-black');
    plateT.addClass('fc-'+orderDetail.textColor);
  }
  
}
//*******************PLAKALIK YAZISI BOŞ MU *************************
function postDesign() {
  
  var order = {
    'order_type'   : "new",
    'plate_type'  : orderDetail.type,
    'order_type'  : "new",
    // 'ip_address'   : ipaddress,
    'first_name'   : $('#first_name').val(),
    'last_name'    : $('#last_name').val(),
    'id_number'    : "",
    'phone_number' : $('#phone_number').val(),
    'mail_address' : "",
    'cargo_address': $('#address').val(),
    'cargo_city'   : $('#city').val(),
    'cargo_state'  : $('#state').val(),
    'price'        : withShipment,
    'quantity'     : quantity,
    'shipment_type': 'Gönderici Ödemeli-TT',
    'payment_type' : 'ATD',
    // 'utm_source'   : utmsource,
    // 'utm_medium'   : utmmedium,
    // 'utm_campaign' : utmcampagin,
    'order_detail' :
        [
          {
            'plate_text' : orderDetail.text.toLocaleUpperCase('tr-TR'),
            'style': JSON.stringify({
              'left'   : orderDetail.leftStyle,
              'right'  : orderDetail.rightStyle
            }),
            'style_color': '',
            'text_align' : orderDetail.textAlign,
            'text_color' : orderDetail.textColor,
            'plate_color': orderDetail.plateColor,
            'font_family': orderDetail.fontFamily
          }
        ]
  };
if (quantity<1){
  alert("Ürün Adet Bilgisi Seçiniz.");
}
else if (quantity===1){
  if (orderDetail.text === '' || orderDetail.text === 'PLAKALIK YAZISI GİR' ){
    $('#message1').html('<span class="alert-danger">Lütfen yazmak istediğiniz yazıyı ürünün üstündeki yazı alanına tıklayarak yazınız.</span>');
    alert("Lütfen yazmak istediğiniz yazıyı ürünün üstündeki yazı alanına tıklayarak yazınız.")
  } else {
    $('#shipmentModal').modal('show');
  }
} else if (quantity===2) {
  if (orderDetail.text === '' || orderDetail.text === 'PLAKALIK YAZISI GİR'
      || orderDetail2.text === '' || orderDetail2.text === 'PLAKALIK YAZISI GİR' ) {
    $('#message1').html('<span class="alert-danger">Lütfen yazmak istediğiniz yazıyı ürünün üstündeki yazı alanına tıklayarak yazınız.</span>');
    alert("Lütfen yazmak istediğiniz yazıyı ürünün üstündeki yazı alanına tıklayarak yazınız.")
  } else {
    $('#shipmentModal').modal('show');
  }
} else if (quantity===4) {
  if (   orderDetail.text  === '' || orderDetail.text  === 'PLAKALIK YAZISI GİR'
      || orderDetail2.text === '' || orderDetail2.text === 'PLAKALIK YAZISI GİR'
      || orderDetail3.text === '' || orderDetail3.text === 'PLAKALIK YAZISI GİR'
      || orderDetail4.text === '' || orderDetail4.text === 'PLAKALIK YAZISI GİR') {
    $('#message1').html('<span class="alert-danger">Lütfen yazmak istediğiniz yazıyı ürünün üstündeki yazı alanına tıklayarak yazınız.</span>');
    alert("Lütfen yazmak istediğiniz yazıyı ürünün üstündeki yazı alanına tıklayarak yazınız.")
  } else {
    $('#shipmentModal').modal('show');
  }
}else if (quantity===8) {
  if (   orderDetail.text  === '' || orderDetail.text  === 'PLAKALIK YAZISI GİR'
      || orderDetail2.text === '' || orderDetail2.text === 'PLAKALIK YAZISI GİR'
      || orderDetail3.text === '' || orderDetail3.text === 'PLAKALIK YAZISI GİR'
      || orderDetail4.text === '' || orderDetail4.text === 'PLAKALIK YAZISI GİR'
      || orderDetail5.text === '' || orderDetail5.text === 'PLAKALIK YAZISI GİR'
      || orderDetail6.text === '' || orderDetail6.text === 'PLAKALIK YAZISI GİR'
      || orderDetail7.text === '' || orderDetail7.text === 'PLAKALIK YAZISI GİR'
      || orderDetail7.text === '' || orderDetail7.text === 'PLAKALIK YAZISI GİR'
      || orderDetail8.text === '' || orderDetail8.text === 'PLAKALIK YAZISI GİR') {
    $('#message1').html('<span class="alert-danger">Lütfen yazmak istediğiniz yazıyı ürünün üstündeki yazı alanına tıklayarak yazınız.</span>');
    alert("Lütfen yazmak istediğiniz yazıyı ürünün üstündeki yazı alanına tıklayarak yazınız.")
  } else {
    $('#shipmentModal').modal('show');
  }
}
  
}
function getPrice(price, q,shipment,campaign) {
  
  quantity = q;
  platePrice = price-campaign; // paras
  withShipment = (price+shipment)-campaign;
  shipmentPrice = shipment;
  
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
    'order_type'  : "new",
    'plate_type'  : orderDetail.type,
    'ip_address'   : ipaddress,
    'first_name'   : $('#first_name').val(),
    'last_name'    : $('#last_name').val(),
    'id_number'    : "",
    'phone_number' : $('#phone_number').val(),
    'mail_address' : "",
    'cargo_address': $('#address').val(),
    'cargo_city'   : $('#city').val(),
    'cargo_state'  : $('#state').val(),
    'price'        : withShipment,
    'quantity'     : quantity,
    'shipment_type': 'Gönderici Ödemeli-TT',
    'payment_type' : 'ATD',
    'utm_source'   : utmsource,
    'utm_medium'   : utmmedium,
    'utm_campaign' : utmcampagin,
    'order_detail' :
        [
          {
            'plate_text' : orderDetail.text.toLocaleUpperCase('tr-TR'),
            'style': JSON.stringify({
              'left'   : orderDetail.leftStyle,
              'right'  : orderDetail.rightStyle
            }),
            'style_color': '',
            'text_align' : orderDetail.textAlign,
            'text_color' : orderDetail.textColor,
            'plate_color': 'black',
            'font_family': orderDetail.fontFamily
          }
        ]
  };
  if (quantity > 1) {
    order.order_detail.push(
        {
          'plate_text' : orderDetail2.text.toLocaleUpperCase('tr-TR'),
          'style': JSON.stringify({
            'left'   : orderDetail2.leftStyle,
            'right'  : orderDetail2.rightStyle
          }),
          'style_color': '',
          'text_align' : orderDetail2.textAlign,
          'text_color' : orderDetail2.textColor,
          'plate_color': 'black',
          'font_family': orderDetail2.fontFamily
        }
    )
  } if(quantity > 2){
    order.order_detail.push(
        {
          'plate_text' : orderDetail3.text.toLocaleUpperCase('tr-TR'),
          'style': JSON.stringify({
            'left'   : orderDetail3.leftStyle,
            'right'  : orderDetail3.rightStyle
          }),
          'style_color': '',
          'text_align' : orderDetail3.textAlign,
          'text_color' : orderDetail3.textColor,
          'plate_color': 'black',
          'font_family': orderDetail3.fontFamily
        },
        {
          'plate_text' : orderDetail4.text.toLocaleUpperCase('tr-TR'),
          'style': JSON.stringify({
            'left'   : orderDetail4.leftStyle,
            'right'  : orderDetail4.rightStyle
          }),
          'style_color': '',
          'text_align' : orderDetail4.textAlign,
          'text_color' : orderDetail4.textColor,
          'plate_color': 'black',
          'font_family': orderDetail4.fontFamily
        }
    )
  }if(quantity > 4){
    order.order_detail.push(
        {
          'plate_text' : orderDetail5.text.toLocaleUpperCase('tr-TR'),
          'style': JSON.stringify({
            'left'   : orderDetail5.leftStyle,
            'right'  : orderDetail5.rightStyle
          }),
          'style_color': '',
          'text_align' : orderDetail5.textAlign,
          'text_color' : orderDetail5.textColor,
          'plate_color': 'black',
          'font_family': orderDetail5.fontFamily
        },
        {
          'plate_text' : orderDetail6.text.toLocaleUpperCase('tr-TR'),
          'style': JSON.stringify({
            'left'   : orderDetail6.leftStyle,
            'right'  : orderDetail6.rightStyle
          }),
          'style_color': '',
          'text_align' : orderDetail6.textAlign,
          'text_color' : orderDetail6.textColor,
          'plate_color': 'black',
          'font_family': orderDetail6.fontFamily
        },
        {
          'plate_text' : orderDetail7.text.toLocaleUpperCase('tr-TR'),
          'style': JSON.stringify({
            'left'   : orderDetail7.leftStyle,
            'right'  : orderDetail7.rightStyle
          }),
          'style_color': '',
          'text_align' : orderDetail7.textAlign,
          'text_color' : orderDetail7.textColor,
          'plate_color': 'black',
          'font_family': orderDetail7.fontFamily
        },
        {
          'plate_text' : orderDetail8.text.toLocaleUpperCase('tr-TR'),
          'style': JSON.stringify({
            'left'   : orderDetail8.leftStyle,
            'right'  : orderDetail8.rightStyle
          }),
          'style_color': '',
          'text_align' : orderDetail8.textAlign,
          'text_color' : orderDetail8.textColor,
          'plate_color': 'black',
          'font_family': orderDetail8.fontFamily
        }
    )
  }
  
  if(phonenumber() && bosluk_kontrol())
  {

    $.post("postNewOrder.php", {order: order,url:window.location.search }, function (returnValue) {
      
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

function yazikaybol8() {
  document.getElementById("myIm15").style.display='none';
  document.getElementById("myIm14").style.display='none';
  if(document.getElementById("plateT8").value=='PLAKALIK YAZISI GİR')
  document.getElementById("plateT8").value=""
}
function yazikaybol7() {
  document.getElementById("myIm13").style.display='none';
  document.getElementById("myIm12").style.display='none';
  if(document.getElementById("plateT7").value=='PLAKALIK YAZISI GİR')
  document.getElementById("plateT7").value=""
}
function yazikaybol6() {
  document.getElementById("myIm11").style.display='none';
  document.getElementById("myIm10").style.display='none';
  if(document.getElementById("plateT6").value=='PLAKALIK YAZISI GİR')
  document.getElementById("plateT6").value=""
}
function yazikaybol5() {
  document.getElementById("myIm9").style.display='none';
  document.getElementById("myIm8").style.display='none';
  if(document.getElementById("plateT5").value=='PLAKALIK YAZISI GİR')
  document.getElementById("plateT5").value=""
}
function yazikaybol4() {
  document.getElementById("myIm7").style.display='none';
  document.getElementById("myIm6").style.display='none';
  if(document.getElementById("plateT4").value=='PLAKALIK YAZISI GİR')
  document.getElementById("plateT4").value=""
}
function yazikaybol3() {
  document.getElementById("myIm4").style.display='none';
  document.getElementById("myIm5").style.display='none';
  if(document.getElementById("plateT3").value=='PLAKALIK YAZISI GİR')
  document.getElementById("plateT3").value=""
}
function yazikaybol2() {
  document.getElementById("myIm3").style.display='none';
  document.getElementById("myIm2").style.display='none';
  if(document.getElementById("plateT2").value=='PLAKALIK YAZISI GİR')
  document.getElementById("plateT2").value=""
}

function yazikaybol() {
  document.getElementById("myIm").style.display='none';
  document.getElementById("myIm1").style.display='none';
  if(document.getElementById("plateT").value=='PLAKALIK YAZISI GİR')
  document.getElementById("plateT").value=""
}
function secimitemizle(){
  $("#fontFamily").val("plateT2");
  //alert($("#fontFamily").val());
}
function okkaybol() {
  document.getElementById("myIm").style.display='none';
  document.getElementById("myIm1").style.display='none';
  $('input:text').attr('placeholder','');
}
function okkaybol2() {
  document.getElementById("myIm3").style.display='none';
  document.getElementById("myIm2").style.display='none';
  $('input:text').attr('placeholder','');
}
function okkaybol3() {
  document.getElementById("myIm4").style.display='none';
  document.getElementById("myIm5").style.display='none';
  $('input:text').attr('placeholder','');
}
function okkaybol4() {
  document.getElementById("myIm6").style.display='none';
  document.getElementById("myIm7").style.display='none';
  $('input:text').attr('placeholder','');
}
function okkaybol5() {
  document.getElementById("myIm8").style.display='none';
  document.getElementById("myIm9").style.display='none';
  $('input:text').attr('placeholder','');
}
function okkaybol6() {
  document.getElementById("myIm10").style.display='none';
  document.getElementById("myIm11").style.display='none';
  $('input:text').attr('placeholder','');
}
function okkaybol7() {
  document.getElementById("myIm12").style.display='none';
  document.getElementById("myIm13").style.display='none';
  $('input:text').attr('placeholder','');
}
function okkaybol8() {
  document.getElementById("myIm14").style.display='none';
  document.getElementById("myIm15").style.display='none';
  $('input:text').attr('placeholder','');
}
