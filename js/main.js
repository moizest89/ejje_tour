$(document).ready(function(){
	  app.new_contact_form();
	  $('#create_new_contact').click(function(){
	  		create_new_contact.view_form($('#create_new_contact'));
	  		console.log('entro')
	  })
});

var app = {
	render: function(){

	},
	new_contact_form: function(){
		$('div#wrapper').load('form_view.html',function(){
			 $('#create_new_contact').click(function(){
	  			create_new_contact.view_form($('#create_new_contact'));
	  		})
		});
	}
}
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
var create_new_contact = {
	original_inputs_submit:"",
	original_inputs:[],
	original_form:"",
	length_inputs:0,
	other_count:0,
	view_form:function(ele){
		$('div.field_error').removeClass('active')
		$('div.field_error').children('span').text("");
		var origin_form = $(ele).closest('form').attr('id')
		create_new_contact.original_form = $(ele).closest('form').attr('id')
		var input_submit = $(ele)
		create_new_contact.original_inputs_submit = $(ele);
		input_submit.attr('disabled','disabled');
		create_new_contact.original_inputs = $('form#'+origin_form).find('input[type="text"]');
		create_new_contact.length_inputs = create_new_contact.original_inputs.length
		create_new_contact.verify_inputs(create_new_contact.original_inputs);
	},
	verify_inputs: function(inputs){
		var array_inputs = inputs;
		//console.log(create_new_contact.length_inputs);
		create_new_contact.other_count = 0;
		for (var i = 0; i < array_inputs.length; i++) {
			if ($(array_inputs[i]).attr('id') == "email_user"){
				if ($(array_inputs[i]).val() == ""){
					$(array_inputs[i]).parent('div.field_error').addClass('active');
					$(array_inputs[i]).next('span.error').text('Por favor verifique los campos')
				}else if (!validateEmail($(array_inputs[i]).val())){
					$(array_inputs[i]).parent('div.field_error').addClass('active');
					$(array_inputs[i]).next('span.error').text('Por favor verifique los campos')
				}else{
					create_new_contact.other_count +=1;
				}
			}else{
				if ($(array_inputs[i]).val() == ""){
					$(array_inputs[i]).parent('div.field_error').addClass('active');
					$(array_inputs[i]).next('span.error').text('Por favor verifique los campos')
				}else{
					create_new_contact.other_count +=1;
				}
			}
		};
		create_new_contact.submit_form();
		//console.log(create_new_contact.other_count);
	},
	submit_form: function(){
		if (create_new_contact.other_count == 4){
			console.log('form_ok')
			create_new_contact.send_information();
		}else{
			console.log("form not")
			setTimeout(function() {
				create_new_contact.original_inputs_submit.removeAttr('disabled')
			}, 500);
			
		}
	},
	send_information: function(){
		var id_form = create_new_contact.original_form;
		var name_user = $('#name_user').val(),
			email_user = $("#email_user").val(),
			appoiment_user = $('#appoiment_user').val(),
			company_user = $("#company_user").val(),
			email_sugestion1 = $("#email_sugestion1").val(),
			email_sugestion2 = $("#email_sugestion2").val(),
			email_sugestion3 = $("#email_sugestion3").val();
		console.log(name_user+" "+email_user+" "+appoiment_user+" "+company_user)
		 $.getJSON('./php/add_new_contact.php', {
            "name_user" :name_user,
			"email_user" :email_user,
			"appoiment_user" :appoiment_user,
			"company_user" :company_user,
			"email_sugestion1" :email_sugestion1,
			"email_sugestion2" :email_sugestion2,
			"email_sugestion3" :email_sugestion3
        }, function (data) {
        	$('div.field_error').removeClass('active')
			$('div.field_error').children('span').text("");
            if (data.success === true) { 
                setTimeout(function() {
                	$('div#Form-container').fadeOut(function(){
                		$('div#confirmation_form').fadeIn();
                	})
                }, 600);
            } else {
                 $.each(data.validationError, function () {
                    $('span#' + this.target).text(this.error);
                    $('span#' + this.target).parent('div.field_error').addClass('active')
                    //console.log(this.valor);
                });
            }       
        });
	}//send_information: function()
}