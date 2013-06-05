<?php
include "config.php";

$name_user = $_GET['name_user'];
$email_user = $_GET['email_user'];
$appoiment_user = $_GET['appoiment_user'];
$company_user = $_GET['company_user'];
$email_sugestion1 = $_GET['email_sugestion1'];
$email_sugestion2 = $_GET['email_sugestion2'];
$email_sugestion3 = $_GET['email_sugestion3'];
$validate = true;
$validationError = array();

if ($name_user === '') {
    $validate = false;
    $validationError[] = array(
        'target' => 'full_name_error', 
        'error'  => 'Por favor verifique los campos',
        'valor' => $name_user
    );
}

if ($email_user === '' && !is_email($email_user)) {
    $validate = false;
    $validationError[] = array(
        'target' => 'email_error', 
        'error'  => 'Por favor verifique los campos',
        'valor' => $email_user
    );
}

if ($appoiment_user === '') {
    $validate = false;
    $validationError[] = array(
        'target' => 'appoiment_user', 
        'error'  => 'Por favor verifique los campos',
        'valor' => $appoiment_user
    );
}
if ($company_user === '') {
    $validate = false;
    $validationError[] = array(
        'target' => 'company_user', 
        'error'  => 'Por favor verifique los campos',
        'valor' => $company_user
    );
}


if ($validate === true && mysql_query(
    "INSERT INTO contacts (name_user, email_user, appoiment_user, company_user, email_sugestion1, email_sugestion2, email_sugestion3) VALUE('{$name_user}','{$email_user}','{$appoiment_user}','{$company_user}','{$email_sugestion1}','{$email_sugestion2}','{$email_sugestion3}')")) {exit(json_encode(array('success' => true, 'msg' => 'Saved!')));
} 

echo json_encode(array(
    'success' => false, 
    'msg'     => 'Error has occurred while entering the contacts into DB', 
    'validationError' => $validationError
));