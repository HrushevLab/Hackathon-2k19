<?php 
	require_once("settings.php");
	if (isset($_POST['type']) == true){
		/*echo $_POST['login'];
		echo $_POST['password'];*/
		$user = R::findOne('users','login=? and password = ?', [$_POST['login'],$_POST['password']]);
		if (isset($user['login']) == true){
			echo "success";
		} else {
			echo "failed";
		}
	}
 ?>