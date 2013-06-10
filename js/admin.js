$(document).ready(function(){
	  app.show_all_contact();
});

var app ={
	show_all_contact: function(params){
		$('div#wrapper').load('form.html', function(){
			$.getJSON('../../php/listContacts.php', params, function (data) {
	            if (data.success === true) {
	                $('#contactsGrid tr:not(:first)').remove();
	                $.each(data.contacts, function () {
	                    $('#show_contacts tr#header').after(
	                        $('<tr/>')
	                            .append($('<td class="first" />').html(this.name_user))
	                            .append($('<td/>').html(this.email_user))
	                            .append($('<td/>').html(this.appoiment_user))
	                            .append($('<td/>').html(this.company_user))
	                            .append($('<td/>').html(this.email_sugestion1))
	                            .append($('<td/>').html(this.email_sugestion2))
	                            .append($('<td class="last"/>').html(this.email_sugestion3))
	                    );
	                });
	                
	                // $('#contactsGrid tr[data-id]').each(function () {
	                //     var id = $(this).attr('data-id');
	                    
	                //     $(this).find('a').click(function () {
	                //         App.deleteContact(id);
	                //     });
	                // });
	            }           
	        }); 
		});// getJson
	}//
}