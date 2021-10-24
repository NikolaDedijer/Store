<?php

$ime = $_POST['ime'];
$tel = $_POST['tel'];
$adresa = $_POST['adresa'];

if(!empty($ime) || !empty($tel) || !empty($adresa)){
    $to = 'reciving.email@host.com';
    $headers = 'From:' . $email;

    $ime = $_POST['msg'] . "\nFrom: " . $email;
$headers = 'From: My contact form';

mb_language("uni");
mb_internal_encoding("UTF-8");
mb_send_mail($to,$ime,$tel,$headers); 

$respondMsg = 'message body.';
 $respondSubject = 'message subject';
 $respondHeaders = 'From: noreply@mail.com';
          mb_send_mail($email,$respondSubject,$respondMsg,$respondHeaders);
}else {
  echo '403';
 }


?>