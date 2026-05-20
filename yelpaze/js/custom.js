var fontTypes = ["ethnocentric", "aviano","sonsie", "sigmar"];
var orderDetail1 = {"type": "isikli", "text":'', "textColor": "white", "fontFamily": "ethnocentric", "symbol": "vehicle_mercedes", "plateColor": "red", "textAlign": "center"};
var quantity = 0;
var withShipment = 0;
var kargo = 81;
var platePrice = 0;
var Ccity = 0;
var Cstate = 0;
var price1;
var price2;
var price3;
var textLengt = 15;
var enterCnt = 0;
var enterCnt2 = 0;
var enterCnt3 = 0;
var enterCnt4 = 0;
var priceVariations = 4;
var fontTextLine = ["plateT1","plateT2","plateT3","plateT4"];

$(document).on("click", ".selectSymbol", function () {
    var symPos = $(this).data('id');
    console.log(symPos);
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
    // $('.plateT1').html($('#pillowText1').val().toLocaleUpperCase('tr-TR'));
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

function closeModal(plateSymbol) {
    var imgPosition = $('#whichSym').val();
    if (imgPosition == 'left1') {
        orderDetail1.symbol = plateSymbol;
        // document.getElementById('myImg-left1-1').src = "../inc_all/figures/"+plateSymbol+".svg";
        document.getElementById('myImg-left1-2').src = "../inc_all/figures/"+plateSymbol+".svg";
    } else if(imgPosition == 'left2') {
        orderDetail2.symbol = plateSymbol;
        document.getElementById('myImg-left2').src = "../inc_all/figures/"+plateSymbol+".svg";
    }else if(imgPosition == 'left3') {
        orderDetail3.symbol = plateSymbol;
        document.getElementById('myImg-left3').src = "../inc_all/figures/"+plateSymbol+".svg";
    }else if(imgPosition == 'left4') {
        orderDetail4.symbol = plateSymbol;
        document.getElementById('myImg-left4').src = "../inc_all/figures/"+plateSymbol+".svg";
    }else if(imgPosition == 'left5') {
        orderDetail5.symbol = plateSymbol;
        document.getElementById('myImg-left5').src = "../inc_all/figures/"+plateSymbol+".svg";
    }else if(imgPosition == 'left6') {
        orderDetail6.symbol = plateSymbol;
        document.getElementById('myImg-left6').src = "../inc_all/figures/"+plateSymbol+".svg";
    }else if(imgPosition == 'left7') {
        orderDetail7.symbol = plateSymbol;
        document.getElementById('myImg-left7').src = "../inc_all/figures/"+plateSymbol+".svg";
    }else if(imgPosition == 'left8') {
        orderDetail8.symbol = plateSymbol;
        document.getElementById('myImg-left8').src = "../inc_all/figures/"+plateSymbol+".svg";
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
    console.log("burada");
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
                {$("#state").prop('selectedIndex',i);}i++;
            });
        }
    });
    $('#state').focus();
}
// /********şehir ilçe
function cityState(city,state) {
    setSelectValue('city',city);
    Cstate = state;
    document.getElementById("city").onchange();
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
});
var pillowText1 = $('#pillowText1');
var beltText1 = $('#beltText1')

beltText1.keydown(function (e) {
    beltText1.val(beltText1.val().replace(/  +/g, ' '));
    $('.lgif1').addClass('displayNone');
});

pillowText1.keyup(function () {
    pillowText1.val(pillowText1.val().replace(/  +/g, ' '));
    orderDetail1.text = pillowText1.val();

    $('#pillowText1').html(pillowText1.val().toLocaleUpperCase('tr-TR'));
    $('#beltText1').val(pillowText1.val().toLocaleUpperCase('tr-TR'));
    $('.plateT1').html(pillowText1.val().toLocaleUpperCase('tr-TR'));
    var rows = $(this).val();
});

beltText1.keyup(function () {
    beltText1.val(beltText1.val().replace(/  +/g, ' '));
    orderDetail1.text = beltText1.val();
    pillowText1.val(beltText1.val().toLocaleUpperCase('tr-TR'));
    $('.plateT1').html(beltText1.val().toLocaleUpperCase('tr-TR'));

    var rows = $(this).val();
});
$("#symbolModal").on("shown.bs.modal", function () {
    document.getElementById('figureGroup').innerHTML ="";
    document.getElementById('tabContent').innerHTML ="";
    $('figureGroup').html();
    $.post("getFigureGroups.php", {}, function (returnValue) {
        console.log(returnValue);
        var jsonReturnValue = JSON.parse(returnValue);
        $.each(jsonReturnValue, function (index, value) {
            console.log(value);
            var groupName = value.split('_');
            $('#figureGroup').append('<li><a data-toggle="pill" href="#'+groupName[0]+'" class="headerButtonBG lazy"><img src="../../inc_all/figures/figuresGroup/'+value+'" class="imageWH"></a></li>');
            getFigures(groupName[0]);
        });
    });
});

function getFigures(figureGroup) {
    var splittedFigureGroup = figureGroup.split('_');
    console.log(splittedFigureGroup);
    $.post("getFigures.php", {figureGroup: splittedFigureGroup[0]}, function (returnValue) {
        console.log(returnValue);
        var jsonReturnValue = JSON.parse(returnValue);
        var tabContent = $('#tabContent');
        tabContent.html();
        tabContent.append('<div id="'+splittedFigureGroup[0]+'" class="tab-pane fade">');
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

function fontDegis(gelenFont) {
    console.log(gelenFont);
    var imgPosition = $('#whichSym').val();
    console.log(imgPosition);
    if (imgPosition == 'plateT1') {
        orderDetail1.fontFamily = gelenFont;
        var beltFont1 = $('#beltText1');
        var pillowFont1 = $('#pillowText1');
        var a = $('.pillowBelt1');

        $.each(fontTypes, function (index, value) {
            console.log(value);
            console.log(index);
            beltFont1.removeClass('ff' + value);
            pillowFont1.removeClass('ff' + value);

            a.removeClass('ff' + value);
        });
        beltFont1.addClass('ff' + orderDetail1.fontFamily);
        pillowFont1.addClass('ff' + orderDetail1.fontFamily);
        a.addClass('ff' + orderDetail1.fontFamily);
        console.log(orderDetail1);
        $(".modalText").addClass('plateT3');
        $(".modalText").addClass('plateT2');
        $('#fontModal').modal('hide');

    }
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
        shipmentPriceElement.removeClass('fc-red');
        shipmentPriceElement.html('+'+shipmentPrice+' TL.Kargo');
    }

    for (var i=1;i<6;i++) {
        $('#isikli-'+i).removeClass('selecttype');
        $('#isikli-'+i).removeClass('unselecttype');
        $('#isikli-'+i).addClass('unselecttype');
    }

    $('#'+selectedType).removeClass('unselecttype');
    $('#'+selectedType).addClass('selecttype');

    // for (var ind=1; ind<priceVariations+1; ind++) {
    //   var plateContainer = $('#plaka'+ind);
    //   if (ind<=selectedNum[1]) {
    //     plateContainer.removeClass('d-none');
    //     plateContainer.addClass('d-block');
    //   } else {
    //     plateContainer.removeClass('d-block');
    //     plateContainer.addClass('d-none');
    //   }
    // }

    var cita = $('.citaRengi');
    orderDetail1.type = selectedType;

    console.log(orderDetail1);
}
//*******************PLAKALIK YAZISI BOŞ MU *************************


function postDesign() {
    var divOrderSee = $('.orderS');
    divOrderSee.html('');
    var pText1 = $('#beltText1').val();
    console.log($('#beltText1').val());
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
    divOrderSee.append('<div class="col-md-6 col-xs-12 col-sm-12 minHeight-respons orderSee1"></div>');
    $('div.orderSee1').append('<img id="pill1" src="https://otodark.com/inc_all/images/barbecueFan/emptyFan.png">');
    $('div.orderSee1').append('<div class="col-md-3 plaka-svg1">');
    $('div.plaka-svg1').append('<img id="myImg1" class="img-fluid img-height-see" src="../inc_all/figures/'+window["orderDetail1"]["symbol"]+'.svg">');
    if (pillowLines[1]==undefined) { pillowLines[1] = ''; }
    for (var x=1;x<3;x++){
        $('div.orderSee1').append('<span id="pillT1'+x+'" class="pillT1'+x+' plateText-div pTextH yazi5 text-uppercase ff'+window["orderDetail1"]["fontFamily"]+' fc-'+window["orderDetail1"]["textColor"]+' align-center">'+pillowLines[x-1]+'</span><br>');
    }
    // var clearDiv = t % 2;
    // console.log(clearDiv);
    // if (clearDiv == 0 ){divOrderSee.append('<div class="clearfix"></div>')}
    console.log(quantity);
    if (quantity<1){
        alert("Ürün Adet Bilgisi Seçiniz.");
    }else if (quantity > 1){
        if (orderDetail1.text === undefined || orderDetail1.text == 'YAZI GİR' || orderDetail1.text == ''){
            alert("Yazılacak yazıyı boş geçemezsiniz.");
        }else{$('#shipmentModal').modal('show');
        }
    }
    else {
        $('#shipmentModal').modal('show');
    }
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
    document.getElementById(imgID[0]).src='../inc_all/images/barbecueFan/'+imgID[1]+'.jpg';
}


function bosluk_kontrol() {
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
        if (r == true) {return true;} else {return false;}
    }
}

function postOrder2me(utmsource,utmmedium,utmcampagin,ipaddress) {
    if (utmsource == "undefined" || utmsource ==''){
        utmsource = "organik";
    }
    var typeFile=orderDetail1.type.split("-");
    var order = {
    'order_type'   : "new",
        'plate_type'  : typeFile[0],
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

function clearFontColor(element,ptype) {
    element.removeClass('fc-white');
    element.removeClass('fc-yellow');
    element.removeClass('fc-red');
    element.removeClass('fc-green');
    element.removeClass('fc-blue');
    element.removeClass('fc-black');
}
$('#textColor1').change(function () {
    var renk_id = $('#renksecim').val();
    orderDetail1.textColor = $(this).children('option:selected').val();
    //alert("ilk İFDE");
    console.log(orderDetail1.textColor);
    // var element = $('#pillowText1');
    var element2 = $('#beltText1');
    var ptype = orderDetail1.type;
    // clearFontColor(element,ptype);
    clearFontColor(element2,ptype);
    // element.addClass('fc-'+orderDetail1.textColor);
    element2.addClass('fc-'+orderDetail1.textColor);
    console.log(orderDetail1);


});
$('#textColorM1').change(function () {
    var renk_id = $('#renksecim').val();
    orderDetail1.textColor = $(this).children('option:selected').val();
    //alert("ilk İFDE");
    console.log(orderDetail1.textColor);
    // var element = $('#pillowText1');
    var element2 = $('#beltText1');
    var ptype = orderDetail1.type;
    // clearFontColor(element,ptype);
    clearFontColor(element2,ptype);
    // element.addClass('fc-'+orderDetail1.textColor);
    element2.addClass('fc-'+orderDetail1.textColor);
});

function secimitemizle(){
    $("#fontFamily").val("plateT2");
    //alert($("#fontFamily").val());
}
