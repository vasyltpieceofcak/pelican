let coord = scrollY;

function openPopup(){
    localStorage.setItem('isSubscribe', true);
    if (document.getElementById('subscribe_popup')) {
        document.getElementById('subscribe_popup').style.display = 'block';
    }
}

window.onload = function (){
    window.addEventListener('scroll', function(e){
        if (!localStorage.getItem('isSubscribe')) {
            if (coord > scrollY) {
                openPopup();
            } else {
                coord = scrollY;
            }
            if (scrollY + innerHeight > document.body.scrollHeight) {
                openPopup();
            }
        }
    });
   
}
jQuery(function($) {
$(document).ready(function($){
$( "#subscribe_tup" ).submit(function( event ) {

    event.preventDefault();
    let lang = $(this).serializeArray()[0].value;
    let email =  $(this).serializeArray()[1].value;
    let ip = $(this).serializeArray()[2].value;
    const headers = {'X-WP-Nonce': ts_front.nonce };

    jQuery.ajax({
        url: ts_front.ajaxurl, 
        method: 'post',
        data: {
            action: 'ts_new_subscriber',
            email: email,
            lang: lang,
            ip: ip
        },
        headers: headers,
        success: function (response) {
            if(response.status == 'success')
            {
            let con = jQuery('#ts-message');
            con.append(response.message );
            con.addClass('ts-message-success');
            con.removeClass('hidden-ts-message');
            setTimeout(function() { 
                closePopup();
            }, 2000);
            }
            else{
                let con = jQuery('#ts-message');
                con.append(response.message );
                con.addClass('ts-message-error');
                con.removeClass('hidden-ts-message');
                setTimeout(function() { 
                    closePopup();
                }, 2000);
            }
        },
        fail: function (err) {
            let con = jQuery('#ts-message');
            con.append(err.message );
            con.addClass('ts-message-error');
            con.removeClass('hidden-ts-message');
            setTimeout(function() { 
                closePopup();
            }, 2000);
        }
    });
});
function closePopup(){
    document.getElementById('subscribe_popup').style.display = 'none';
}
$('#close_popup_tup').on('click', function(){
    closePopup();
})});
});