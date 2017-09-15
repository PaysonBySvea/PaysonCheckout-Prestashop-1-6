$(document).ready(function(){
    var amount = 0;

    if(document.getElementById('opc_payment_methods')) 
    {                     
        $("#HOOK_PAYMENT").each(function() {
            $("#HOOK_PAYMENT").hide();   
        });

        $("#opc_new_account").each(function() {
            $("#opc_new_account").hide();   
        });

        $(".confirm_button_div").each(function() {
            $(".confirm_button_div").hide();   
        });
        
        $("#HOOK_PAYMENT_PARSED").each(function() {
            $("#HOOK_PAYMENT_PARSED").hide();   
        });
        
        $("#offer_password").each(function() {
            $("#offer_password").hide();   
        });
        
        $("#opc_payment_methods").append("<div id=iframepayson></div>"); //produktnivå 

        amount = $("#total_price").text();

        setInterval(function() {
            if(amount !== $("#total_price").text()) {
                /****
                alert('CHANGED!');
                ****/

               sendLockDown();
               displaySnippet();

            } 
            amount = $("#total_price").text();
        }, 100);


        displaySnippet();
    }  

    function displaySnippet() {
        $.ajax({
           url: window.location.origin  + '/modules/paysonCheckout2/redirect.php?type=checkPayson',
           success:function (data) {
            $("#iframepayson").html(data);
            if(document.getElementById('paysonIframe')) {
                sendRelease();
            }
           }
        });
    }

    document.addEventListener("PaysonEmbeddedAddressChanged",function(evt) {
        var address = evt.detail;
        updatCartAddress(address);
    });

    function updatCartAddress(address) {
        $.ajax({
           url: window.location.origin  + "/modules/paysonCheckout2/redirect.php?address_data="+JSON.stringify(address),
           success:function (data) {
                //$("#iframepayson").html(data);
           }
        });
    }

    function sendLockDown() {
        var iframe = document.getElementById('paysonIframe');
        iframe.contentWindow.postMessage('lock', '*');
    }

    function sendRelease() {
        var iframe = document.getElementById('paysonIframe');
        iframe.contentWindow.postMessage('release', '*');
    }
});
        

