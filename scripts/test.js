var ask = null,answer_variant = null,right_answer = null,photo = null,qualification = null,points = null,type;
function getOption(type, select) {
	$.ajax({
	url:"engine/sql_functions.php",
	type:"POST",
	data:"type="+type,
	success: function (response) {
		select.innerHTML = response;	
		console.log(response);			
	}})
}

function show(type) {
		count = document.getElementById('count').value;
		switch(type)
		{
			case 2:
				for (var i = 1; i <= count; i++) {
					ask.innerHTML += i + "-е определение <input type='text' class='definition'> " + i + "-й ответ <input type='text' class = 'answer'></p>";
				}
				ask.innerHTML += "Правильный ответ: <input type='text' id = 'right_answer'> ";
			break;
			case 3:
				for (var i = 1; i <= count; i++) {
					ask.innerHTML += i + "-й ответ <input name='dzen' class='asks' type='radio' value='nedzen'><input type='text' class='textOfAnswer'></p>";
				}	
			break;
			case 4:
				for (var i = 1; i <= count; i++) {
					ask.innerHTML = ask.innerHTML + i + "-е действие <input type='text' class = 'actions'><p>";
				}	

			break;	
		}
	}

function getQuest(typeOfAnswer,id_ty,id_qu) {
	qualification = document.getElementById('select_qu').value;
	ask = document.getElementById('question').value;
	console.log('type ='+typeOfAnswer);
	switch(typeOfAnswer)
	{
		case 1:
			right_answer = document.getElementById('count').value;
		break;
		case 2:
			definations=document.getElementsByClassName('definition');
			answers = document.getElementsByClassName('answer');
			ask += ';' + definations[0].value;
			answer_variant = answers[0].value ;
			for (var i = 1; i < definations.length; i++) {
				ask +=";"+ definations[i].value;
				answer_variant += ";"+answers[i].value;
			}
			right_answer = document.getElementById('right_answer').value;
		break;
		case 3:
			right_answer = numberOfRightAnswer();
			quests = document.getElementsByClassName('textOfAnswer');
			answer_variant = quests[0].value ;
			for (var i = 1; i < count; i++) {
					
				answer_variant +=";"+quests[i].value;
			}
		break;
		case 4:
			actions = document.getElementsByClassName('actions');
			answer_variant = actions[0].value;
			for (var i = 1; i < actions.length; i++) {
				answer_variant += ";" + actions[i].value;
			}
			right_answer = document.getElementById('answers_sequnce').value;
		break;
	}
	type = typeOfAnswer;
	console.log('ask = ' + ask);
	console.log('answer_variant = ' + answer_variant);
	console.log('right_answer = ' + right_answer);
	console.log('photo = ' + photo);
	console.log('qualification = ' + qualification);
	console.log('points = ' + points);
	console.log('type = '+ type);
	send_sqlQuery();
}

function numberOfRightAnswer() {
	var radio_buttons = document.getElementsByClassName('asks');
	for (var i = 0; i < count; i++) {
		if (radio_buttons[i].checked) {
			return i;
		}
	}
}

function send_sqlQuery() {
	console.log(type);
	$.ajax({
		url:"engine/sql_functions.php",
		type:"POST",
		data:"type=sendAsk&ask="+ask+"&answer_variant="+answer_variant+"&right_answer="+
			right_answer+"&photo="+photo+"&qualification="+qualification+"&points="+points+"&typeQuestion=" + type,
		success: function (response) {
			console.log(response);
		}
	})
}

function getID(type) {
	var getvalue = $(".type_of_asking").attr('sqlid');
 	console.log("vALUE: "+getvalue);
}