<?php
include "config.php";

$where_condition = ' AND (';
if (sizeof($_GET) > 0) {
    $full_name = $_GET['full_name'];
    $email = $_GET['email'];
    if ($full_name) {
        $where_condition.= " full_name LIKE '%{$full_name}%' ";
    }

    if ($email) {
        $where_condition.= ( $where_condition === ' AND (' ? '' : ' OR ' ) . " email LIKE '%{$email}%' ";
    }
}
$where_condition.= ( $where_condition === ' AND (' ? '1)' : ')' ); 

$contacts = array();
$result = mysql_query("SELECT id, name_user, email_user, appoiment_user, company_user, email_sugestion1, email_sugestion2, email_sugestion3 FROM contacts WHERE 1 {$where_condition} ORDER BY id DESC");
while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
    $contacts[]= array(
        "name_user" => $row['name_user'],
        "email_user" => $row['email_user'],
        "appoiment_user" => $row['appoiment_user'],
        "company_user" => $row['company_user'],
        "email_sugestion1" => $row['email_sugestion1'],
        "email_sugestion2" => $row['email_sugestion2'],
        "email_sugestion3" => $row['email_sugestion3']
        // 'id' => $row['id'], 
        // 'full_name' => $row['full_name'], 
        // 'email' => $row['email'], 
        // 'phone' => $row['phone'], 
        // 'address' => $row['address']
    );
}

if (count($contacts) > 0) {
    echo json_encode(array('success' => true, 'contacts' => $contacts));
} else {
    echo json_encode(array('success' => false));
}