var fontTypes = ["ethnocentric", "aviano","sonsie", "sigmar"];
var orderDetail1 = {"type": "isikli", "text":'', "textColor": "white", "fontFamily": "ethnocentric", "symbol": "king_1", "plateColor": "black", "textAlign": "center"};
var orderDetail2 = {"type": "isikli", "text":'', "textColor": "white", "fontFamily": "ethnocentric", "symbol": "king_1", "plateColor": "black", "textAlign": "center"};
var orderDetail3 = {"type": "isikli", "text":'', "textColor": "white", "fontFamily": "ethnocentric", "symbol": "king_1", "plateColor": "black", "textAlign": "center"};
var orderDetail4 = {"type": "isikli", "text":'', "textColor": "white", "fontFamily": "ethnocentric", "symbol": "king_1", "plateColor": "black", "textAlign": "center"};
var orderDetail5 = {"type": "isikli", "text":'', "textColor": "white", "fontFamily": "ethnocentric", "symbol": "king_1", "plateColor": "black", "textAlign": "center"};
var orderDetail6 = {"type": "isikli", "text":'', "textColor": "white", "fontFamily": "ethnocentric", "symbol": "king_1", "plateColor": "black", "textAlign": "center"};
var orderDetail7 = {"type": "isikli", "text":'', "textColor": "white", "fontFamily": "ethnocentric", "symbol": "king_1", "plateColor": "black", "textAlign": "center"};
var orderDetail8 = {"type": "isikli", "text":'', "textColor": "white", "fontFamily": "ethnocentric", "symbol": "king_1", "plateColor": "black", "textAlign": "center"};
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

function closeModal(plateSymbol) {
  var imgPosition = $('#whichSym').val();
 if(imgPosition == 'right1') {
    orderDetail1.plateColor = plateSymbol;
    document.getElementById('pillow1').src = "../inc_all/images/sunVisor/"+plateSymbol+".png";
  }else if(imgPosition == 'right2') {
    orderDetail2.plateColor = plateSymbol;
    document.getElementById('pillow2').src = "../inc_all/images/sunVisor/"+plateSymbol+".png";
  }else if(imgPosition == 'right3') {
    orderDetail3.plateColor = plateSymbol;
    document.getElementById('pillow3').src = "../inc_all/images/sunVisor/"+plateSymbol+".png";
  }else if(imgPosition == 'right4') {
    orderDetail4.plateColor = plateSymbol;
    document.getElementById('pillow4').src = "../inc_all/images/sunVisor/"+plateSymbol+".png";
  }else if(imgPosition == 'right5') {
    orderDetail5.plateColor = plateSymbol;
    document.getElementById('pillow5').src = "../inc_all/images/sunVisor/"+plateSymbol+".png";
  }else if(imgPosition == 'right6') {
    orderDetail6.plateColor = plateSymbol;
    document.getElementById('pillow6').src = "../inc_all/images/sunVisor/"+plateSymbol+".png";
  }else if(imgPosition == 'right7') {
    orderDetail7.plateColor = plateSymbol;
    document.getElementById('pillow7').src = "../inc_all/images/sunVisor/"+plateSymbol+".png";
  }else if(imgPosition == 'right8') {
    orderDetail8.plateColor = plateSymbol;
    document.getElementById('pillow8').src = "../inc_all/images/sunVisor/"+plateSymbol+".png";
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
        {$("#state").prop('selectedIndex',i);
        }i++;});
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

  $(window).scroll(function(){
    $('.lazy').each(function(){
      if( $(this).offset().top < ($(window).scrollTop() + $(window).height() + 100) )
      {
        $(this).attr('src', $(this).attr('data-src'));
      }
    });
  });
  console.log(orderDetail1);
});

var zoomreset = function() {
  var viewport = document.querySelector("meta[name='viewport']");
  viewport.content = "width=device-width, maximum-scale=1";
  setTimeout(function() {
    viewport.content = "width=device-width, maximum-scale=1";
  }, 350);
}

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

  for (var i=1;i<5;i++) {
      $('#isikli-'+i).removeClass('selecttype');
      $('#isikli-'+i).removeClass('unselecttype');
      $('#isikli-'+i).addClass('unselecttype');
      $('.plaka'+i).addClass('d-none');
      $('.plaka'+i).removeClass('d-block');
    }
  $('#'+selectedType).removeClass('unselecttype');
  $('#'+selectedType).addClass('selecttype');
  for (var i = 1; i<=selectedNum[1];i++){
    $('.plaka'+i).removeClass('d-none');
    $('.plaka'+i).addClass('d-block');
  }
  var cita = $('.citaRengi');
  orderDetail1.type = selectedType;
  var plateT1 = $('.bos-plaka-uzerine-gelecek-yazi');
  console.log(orderDetail1);
}
//*******************PLAKALIK YAZISI BOŞ MU *************************


function postDesign() {
  console.log(quantity);
  if (quantity<1){
alert("Ürün Adet Bilgisi Seçiniz.");
  }
  else
  {
    $('#shipmentModal').modal('show');
  }
}

function getPrice(price, q,shipment,campaign) {
  quantity = q;  // hangi buton
  platePrice = price-campaign; // paras
  withShipment = (price+shipment)-campaign;
  //shipment kargo ücreti
  if(typeof(shipment) === 'undefined' || shipment === null) {
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

function imgRefresh(imageName)
{
  var imgID= imageName.split("-");
  document.getElementById(imgID[0]).src='../inc_all/images/sunVisor/'+imgID[1]+'.jpg';
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
    return false;}
  else if ($('#city').val()=='0') {
    alert("ŞEHİR KISMI BOŞ BIRAKILAMAZ \nLÜTFEN ŞEHİR GİRİNİZ  ");return false;
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
  var splittedOrderD = orderDetail1.type.split('-');
  var order = {
    'order_type'   : "new",
    'plate_type'   : splittedOrderD[0],
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
  if (quantity > 1){
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
    );
  }
  if(quantity > 2){
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
    )
  }
  if(quantity > 4){
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
    )
  }
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
function secimitemizle(){
  $("#fontFamily").val("plateT2");
  //alert($("#fontFamily").val());
}
