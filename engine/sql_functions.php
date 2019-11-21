<?php

	function GetCollumn($sql)
	{
		$db = mysqli_connect('localhost','root','','ntest');
		$query = mysqli_query($db, $sql);
		$column = array();
		while ($rows = mysqli_fetch_row($query)) {
			$column[] = $rows[0]; 
		}
		return $column;
	}

	require_once 'settings.php';
	if ($_POST['type'] == 'sendAsk') {
		$bean = R::dispense("asks");
		$bean['ask'] = $_POST['ask'];
		$bean['answer_variant'] = $_POST['answer_variant'];
		$bean['right_answer'] = $_POST['right_answer'];
		$bean['photo'] = $_POST['photo'];
		$bean['qualification'] = $_POST['qualification'];
		$bean['points'] = $_POST['points'];
		$bean['type'] = $_POST['typeQuestion'];

		R::store($bean);
	}
	elseif ($_POST['type'] == 'getQualification') {
		$qualification = GetCollumn("SELECT name FROM qualification");
		$id = GetCollumn("SELECT id FROM qualification");
		for ($i=0; $i < count($qualification) ; $i++) { 
			echo "<option sqlid=".$id[$i]." class='qualification'>".$qualification[$i]."</option><br>";
		}
	}
	elseif ($_POST['type'] == 'getType') {
		$type = GetCollumn("SELECT name FROM types_of_asks");
		$id = GetCollumn("SELECT id FROM types_of_asks");
		for ($i=0; $i < count($type) ; $i++) { 
			echo "<option sqlid=".$id[$i]." class='type_of_asking'>".$type[$i]."</option><br>";
		}
	}
	elseif ($_POST['type'] == 'getQuestion') {
		$question = GetCollumn("SELECT ask FROM asks");
		$id = GetCollumn("SELECT id FROM asks");
		for ($i=0; $i < count($question) ; $i++) { 
			echo "<option id=que+'".$id[$i]."'>".$question[$i]."</option><br>";
		}
	}
	else {
		echo "Error";
	}

?>