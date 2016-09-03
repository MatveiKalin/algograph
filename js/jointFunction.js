function replacement(symbol) {
	$(".cellMatrixContiguity").focus(function () {
		
		var idName = $(this).attr('id');
		var status = false;
		
		if ($(this).val() == symbol) {

			// ... стереть у этого текстового поля начальное значение
			$(this).attr("value", "");
			

			// Если пользователь ввел хоть один символ, оповещаем программу об этом, ...
			$(this).change(function () {

				// ... присваивая переменной значение true
				status = true;
			});
			
		}

	});

	// Если текстовое поле теряет фокус ввода, то ...
	$(".cellMatrixContiguity").focusout(function () {
		
		var idName = $(this).attr('id');
	
		// ... проверяем ввел ли пользователь хоть один символ, если нет, то...
		if (status == false) {

			// ... текстовому полю присваиваем начальное значение
			$(this).attr("value", symbol);
		}

	});
	
	//---------------------
	
	$(".textEdit").focus(function () {
		
		var idName = $(this).attr('id');
		var status = false;
		
		if ($(this).val() == symbol) {

			// ... стереть у этого текстового поля начальное значение
			$(this).attr("value", "");
			

			// Если пользователь ввел хоть один символ, оповещаем программу об этом, ...
			$(this).change(function () {

				// ... присваивая переменной значение true
				status = true;
			});
			
		}

	});

	// Если текстовое поле теряет фокус ввода, то ...
	$(".textEdit").focusout(function () {
		
		var idName = $(this).attr('id');
	
		// ... проверяем ввел ли пользователь хоть один символ, если нет, то...
		if (status == false) {

			// ... текстовому полю присваиваем начальное значение
			$(this).attr("value", 0);
		}

	});
	
	
}


function directedUnweight() {
	$(".cellMatrixContiguity").change(function(){
		var idName = $(this).attr('id');
		
		var n1 = "";
		var n2 = "";
		
		for (var i = 0; i < idName.length; i++) {
			if (idName[i] == "_") {
				for (var j = i+1; idName[j] != ","; j++) {
					n1 += idName[j];
				}
			}
			
			if (idName[i] == ",") {
				for (var j = i+1; j < idName.length; j++) {
					n2 += idName[j];
				}
			}
			
		}

		if ( ($(this).val() != "") && ($(this).val() != '0') ) {
			document.getElementById(idName).value = "1";
		}
	});
	
}


function undirectedUnweight() {
	$(".cellMatrixContiguity").change(function(){
	
		var idName = $(this).attr('id');
		
		var n1 = "";
		var n2 = "";
		
		for (var i = 0; i < idName.length; i++) {
			if (idName[i] == "_") {
				for (var j = i+1; idName[j] != ","; j++) {
					n1 += idName[j];
				}
			}
			
			if (idName[i] == ",") {
				for (var j = i+1; j < idName.length; j++) {
					n2 += idName[j];
				}
			}
			
		}
		
		

		// Для невзвешенного и для неориентированного графа
		if ( ($(this).val() != "") && ($(this).val() != '0') ) {
			document.getElementById(idName).value = "1";
		}
		
		//Для неориентированного графа
		document.getElementById("cellMatrix_"+n2+","+n1).value = document.getElementById(idName).value;
		
	});
}


function undirectedWeight() {
	$(".cellMatrixContiguity").change(function(){
		var idName = $(this).attr('id');
		
		var n1 = "";
		var n2 = "";
		
		for (var i = 0; i < idName.length; i++) {
			if (idName[i] == "_") {
				for (var j = i+1; idName[j] != ","; j++) {
					n1 += idName[j];
				}
			}
			
			if (idName[i] == ",") {
				for (var j = i+1; j < idName.length; j++) {
					n2 += idName[j];
				}
			}
			
		}

		/*// Для невзвешенного и для неориентированного графа
		if ($(this).val() != "") {
			document.getElementById(idName).value = "1";
		}*/
		
		//Для неориентированного графа
		document.getElementById("cellMatrix_"+n2+","+n1).value = document.getElementById(idName).value;
		
	});
}
