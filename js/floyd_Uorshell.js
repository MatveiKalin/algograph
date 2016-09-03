// Описание: 
//
// Разработал: Матвей Калин, студент группы РИС - 14 - 1б
//
// Дата:

//&infin;

$(document).ready(function() {
	
	// СОЗДАНИЕ ПЕРЕМЕННЫХ
	
		// Количество вершин в графе
		var countVertex = 0;

		// Вершина
		var v = 0;

		// Вершина, от которой требуется найти все остальные вершины
		var s = 0;

		var len = 0;
		
		// Массив, в котором хранятся расстояния
		var d;
		
		// Массив предков
		var p;
		
		// Массив меток
		var used;
		
		// Переменная отвечающая за тип вершин, если в переменной содержится "1", то вершины обозначены цифрами.
		// Если в переменной содержится "2", то вершины обозначены буквами.
		var typeVertex = 0;
		
		// Массив, который будет содержать вершины в виде букв
		var masForLetterVertex = new Array();
		
	// КОНЕЦ СОЗДАНИЯ ПЕРЕМЕННЫХ
	
	
	// Функция, которая выбирает наименьшее из двух чисел
	function min(number1, number2) {
	
		if (number1 > number2) {
			minNumber = number2;
		}
		else {
			minNumber = number1;
		}
	
		return minNumber;
		
	} // Конец функции "min()"
	
	
	// Удаление нулей
	replacement("0");
	
	// Если пользователь нажмет на кнопку "Подтвердить" при вводе количества вершин в графе
	$("#btn_confirm_step_one").click(function() {
		
		$("tr").remove();
		
		$("#step2").fadeOut("fast");
		$("#step3").fadeOut("fast");
		$("#step4").fadeOut("fast");
		$("#step5").fadeOut("fast");
		$("#step2").css("display", "none");
		$("#step3").css("display", "none");
		$("#step4").css("display", "none");
		$("#step5").css("display", "none");
		$("#resultMatrixContiguity").children().remove();
		$("#matrixContiguity").children().remove();
		masForLetterVertex.length = 0;
		
		countVertex = document.getElementById("countVertex").value;
		
		// Если в текстовое поле введено число либо ноль, либо меньше,
		// то оповестить пользователя об этом
		if (countVertex <= 0) {
			$("#countVertex").addClass("warningTextField");
		}
		else {
			$("#countVertex").removeClass("warningTextField");
		
			// СОЗДАНИЕ МАССИВА ДЛЯ МАТРИЦЫ СМЕЖНОСТИ
				
				// Создание строк
				matrixContiguity = new Array(countVertex);
				
				// Создание столбцов
				for (var i = 0; i < countVertex; i++) {
					matrixContiguity[i] = new Array(countVertex);		
				}
			
			// КОНЕЦ СОЗДАНИЯ МАССИВА ДЛЯ МАТРИЦЫ СМЕЖНОСТИ

			$("#step2").fadeIn("fast");
		}
	});		

	
	// Если пользователь нажмет на кнопку "Подтвердить" при выборе типа вершин
	$("#btn_confirm_step_two").click(function() {
		
		$("tr").remove();
		
		$("#step3").fadeOut("fast");
		$("#step4").fadeOut("fast");
		$("#step5").fadeOut("fast");
		$("#step3").css("display", "none");
		$("#step4").css("display", "none");
		$("#step5").css("display", "none");
		$("#resultMatrixContiguity").children().remove();
		$("#matrixContiguity").children().remove();
		masForLetterVertex.length = 0;
		
		// ВЫБОР ВЕРШИН (БУКВЫ ИЛИ ЧИСЛА)
			// Если вершины - это числа
			if (document.getElementById("number").checked) {
				//alert("number");
				typeVertex = 1;
			}
			else
			// Если вершины - это буквы
			if (document.getElementById("letter").checked) {
				//alert("letter");
				typeVertex = 2;
			}
			
		// КОНЕЦ ВЫБОРА ВЕРШИН (БУКВЫ ИЛИ ЧИСЛА)
		
		
		// ЕСЛИ ВЫБРАНЫ БУКВЫ, ТО НЕОБХОДИМО ЗАПИСАТЬ ЛАТИНСКИЕ БУКВЫ В МАССИВ
		
			var charNumber = 65;
		
			for (var i = 0; i < countVertex; i++) {
				masForLetterVertex[masForLetterVertex.length] = String.fromCharCode(charNumber);
				charNumber++;
			}
			
			//for (var i = 0; i < masForLetterVertex.length; i++) {
			//	alert(masForLetterVertex[i]);
			//}
			
		// КОНЕЦ ЗАПИСИ ЛАТИНСКИХ БУКВ В МАССИВ
		
			
		// СОЗДАНИЕ ТЕКСТОВЫХ ПОЛЕЙ ДЛЯ ЗАПОЛНЕНИЯ МАТРИЦЫ СМЕЖНОСТИ

			// Если вершины - числа
			if (typeVertex == 1) {
				
				for (var i = 0; i <= countVertex; i++) {
					
					$("#matrixContiguity").append('<tr id="'+ i +'"></tr>');
				
					for (var j = 0; j <= countVertex; j++) {

						if (i == 0) {
						
							if (j == 0) {
								$("tr#"+i).append('<td class="cellMatrixContiguity"></td>');
							}
							else {
								$("tr#"+i).append('<td class="cellMatrixContiguity">' + j + '</td>');
							}
						}
						else
						if (j == 0) {
						
							if (i == 0) {
								continue;
							}
							else {
								$("tr#"+i).append('<td class="cellMatrixContiguity">' + i + '</td>');
							}
						} 
						else {
							//$("tr#"+i).append('<td><input type="text" id="cellMatrix_'+(i-1)+','+(j-1)+'" value="&infin;" class="cellMatrixContiguity" /></td>');
							if (i == j) {
								$("tr#"+i).append('<td><input type="text" disabled="disabled" id="cellMatrix_'+(i-1)+','+(j-1)+'" value="0" class="cellMatrixContiguity cellDiagonal" /></td>');
							}
							else
							if (i == j) {
								$("tr#"+i).append('<td><input type="text" id="cellMatrix_'+(i-1)+','+(j-1)+'" value="&infin;" class="cellMatrixContiguity cellDiagonal" /></td>');
							}
							else {
								$("tr#"+i).append('<td><input type="text" id="cellMatrix_'+(i-1)+','+(j-1)+'" value="&infin;" class="cellMatrixContiguity" /></td>');
							}
						}
						
					}
					
					$("#matrixContiguity").append("</tr>");
					
				}
				
			}
			else
			// Если вершины - буквы
			if (typeVertex == 2) {
			
				for (var i = 0; i <= countVertex; i++) {
					
					$("#matrixContiguity").append('<tr id="'+ i +'"></tr>');
				
					for (var j = 0; j <= countVertex; j++) {

						if (i == 0) {
						
							if (j == 0) {
								$("tr#"+i).append('<td class="cellMatrixContiguity"></td>');
							}
							else {
								$("tr#"+i).append('<td class="cellMatrixContiguity">' + masForLetterVertex[j-1] + '</td>');
							}
						}
						else
						if (j == 0) {
						
							if (i == 0) {
								continue;
							}
							else {
								$("tr#"+i).append('<td class="cellMatrixContiguity">' + masForLetterVertex[i-1] + '</td>');
							}
						} 
						else {
							//$("tr#"+i).append('<td><input type="text" id="cellMatrix_'+(i-1)+','+(j-1)+'" value="&infin;" class="cellMatrixContiguity" /></td>');
							if (i == j) {
								$("tr#"+i).append('<td><input type="text" disabled="disabled" id="cellMatrix_'+(i-1)+','+(j-1)+'" value="0" class="cellMatrixContiguity cellDiagonal" /></td>');
							}
							else
							if (i == j) {
								$("tr#"+i).append('<td><input type="text" id="cellMatrix_'+(i-1)+','+(j-1)+'" value="&infin;" class="cellMatrixContiguity cellDiagonal" /></td>');
							}
							else {
								$("tr#"+i).append('<td><input type="text" id="cellMatrix_'+(i-1)+','+(j-1)+'" value="&infin;" class="cellMatrixContiguity" /></td>');
							}
						
						}
						
					}
					
					$("#matrixContiguity").append("</tr>");
					
				}
			}
			
		// КОНЕЦ СОЗДАНИЯ ТЕКСТОВЫХ ПОЛЕЙ ДЛЯ ЗАПОЛНЕНИЯ МАТРИЦЫ СМЕЖНОСТИ
		
		$("#step3").fadeIn("fast");
		//$("#step4").fadeIn("fast");
		
	});	
	
	
	
	// Если пользователь нажмет на кнопку "Подтвердить" при выборе типа графа
	$("#btn_confirm_step_three").click(function() {

		$("#step4").fadeOut("fast");
		$("#step5").fadeOut("fast");
		$("#step4").css("display", "none");
		$("#step5").css("display", "none");
		
		$("#resultMatrixContiguity").children().remove();
		
		// Удаление нулей
		replacement("∞");

		// Если граф неориентированный
		if (document.getElementById("undirected").checked) {
			undirectedWeight();
		}
		
		$("#step4").fadeIn("fast");
	
	});
	
	
	
	
	// Если пользователь нажмет на кнопку "Получить результат"
	$("#btn_confirm_matrix").click(function() {
		
		$("#resultMatrixContiguity").children().remove();
		
		
		// ПОСЛЕ ЗАПОЛНЕНИЯ МАТРИЦЫ СМЕЖНОСТИ ПРОВЕРЯЕМ ЕСТЬ ЛИ В ЯЧЕЙКАХ ОТРИЦАТЕЛЬНЫЕ ЧИСЛА
		
			for (var i = 0; i < countVertex; i++) {	
				for (var j = 0; j < countVertex; j++) {
					
					// Если отрицательные числа есть изменить их на положительные
					if (document.getElementById('cellMatrix_'+i+','+j).value  < 0) {
						document.getElementById('cellMatrix_'+i+','+j).value *= -1;
					}
					
				}
			}
		
		// КОНЕЦ ПРОВЕРКИ ЕСТЬ ЛИ В ЯЧЕЙКАХ ОТРИЦАТЕЛЬНЫЕ ЧИСЛА
		
		
		// ЗАПОЛНЕНИЕ МАТРИЦЫ СМЕЖНОСТИ И ВСПОМОГАТЕЛЬНЫХ МАССИВОВ
	
			for (var i = 0; i < countVertex; i++) {	
				for (var j = 0; j < countVertex; j++) {
				
					//matrixContiguity[i][j] = Number(document.getElementById("cellMatrix"+i+""+j).value);
					if (document.getElementById('cellMatrix_'+i+','+j).value == "∞") {
						matrixContiguity[i][j] = Infinity;
					}
					else {
						matrixContiguity[i][j] = Number(document.getElementById('cellMatrix_'+i+','+j).value);
					}
					
				}
			}

		// КОНЕЦ ЗАПОЛНЕНИЯ МАТРИЦЫ СМЕЖНОСТИ И ВСПОМОГАТЕЛЬНЫХ МАССИВОВ
			
			
		// НАХОЖДЕНИЕ КРАТЧАЙШИХ РАССТОЯНИЙ МЕЖДУ ВСЕМИ ПАРАМИ ВЕРШИН
		
			for (var k = 0; k < countVertex; k++) {
				for (var i = 0; i < countVertex; i++) {
					for (var j = 0; j < countVertex; j++) {
						matrixContiguity[i][j] = min(matrixContiguity[i][j], matrixContiguity[i][k] + matrixContiguity[k][j]);
					}
				}
			}
		
		// КОНЕЦ НАХОЖДЕНИЯ КРАТЧАЙШИХ РАССТОЯНИЙ МЕЖДУ ВСЕМИ ПАРАМИ ВЕРШИН
		
		
		// ВЫВОД РЕЗУЛЬТАТА

			// Если вершины - числа
			if (typeVertex == 1) {
				
				for (var i = 0; i <= countVertex; i++) {
					
					$("#resultMatrixContiguity").append('<tr id="resultMatrixContiguity'+ i +'">');
				
					for (var j = 0; j <= countVertex; j++) {

						if (i == 0) {
						
							if (j == 0) {
								$("tr#resultMatrixContiguity"+i).append('<td class="cellMatrixContiguity"></td>');
							}
							else {
								$("tr#resultMatrixContiguity"+i).append('<td class="cellMatrixContiguity">' + j + '</td>');
							}
						}
						else
						if (j == 0) {
						
							if (i == 0) {
								continue;
							}
							else {
								$("tr#resultMatrixContiguity"+i).append('<td class="cellMatrixContiguity">' + i + '</td>');
							}
						} 
						else {
							
							if (i == j) {
								if (matrixContiguity[i-1][j-1] == "Infinity") {
									$("tr#resultMatrixContiguity"+i).append('<td><input type="text" value="∞" class="cellMatrixContiguity" /></td>');
								}
								else {
									$("tr#resultMatrixContiguity"+i).append('<td><input type="text" value="' + matrixContiguity[i-1][j-1] +'" class="cellMatrixContiguity cellDiagonal" /></td>');
								}
							}
							else {
								if (matrixContiguity[i-1][j-1] == "Infinity") {
									$("tr#resultMatrixContiguity"+i).append('<td><input type="text" value="∞" class="cellMatrixContiguity" /></td>');
								}
								else {
									$("tr#resultMatrixContiguity"+i).append('<td><input type="text" value="' + matrixContiguity[i-1][j-1] +'" class="cellMatrixContiguity" /></td>');
								}
							}
						
						}
						
					}
					
				}
				
			}
			else
			// Если вершины - буквы
			if (typeVertex == 2) {
			
				for (var i = 0; i <= countVertex; i++) {
					
					$("#resultMatrixContiguity").append('<tr id="resultMatrixContiguity'+ i +'">');
				
					for (var j = 0; j <= countVertex; j++) {

						if (i == 0) {
						
							if (j == 0) {
								$("tr#resultMatrixContiguity"+i).append('<td class="cellMatrixContiguity"></td>');
							}
							else {
								$("tr#resultMatrixContiguity"+i).append('<td class="cellMatrixContiguity">' + masForLetterVertex[j-1] + '</td>');
							}
						}
						else
						if (j == 0) {
						
							if (i == 0) {
								continue;
							}
							else {
								$("tr#resultMatrixContiguity"+i).append('<td class="cellMatrixContiguity">' + masForLetterVertex[i-1] + '</td>');
							}
						} 
						else {
							//$("tr#resultMatrixContiguity"+i).append('<td><input type="text" value="' + matrixContiguity[i-1][j-1] +'" class="cellMatrixContiguity" /></td>');
						
							if (i == j) {
								if (matrixContiguity[i-1][j-1] == "Infinity") {
									$("tr#resultMatrixContiguity"+i).append('<td><input type="text" value="∞" class="cellMatrixContiguity" /></td>');
								}
								else {
									$("tr#resultMatrixContiguity"+i).append('<td><input type="text" value="' + matrixContiguity[i-1][j-1] +'" class="cellMatrixContiguity cellDiagonal" /></td>');
								}
							}
							else {
								if (matrixContiguity[i-1][j-1] == "Infinity") {
									$("tr#resultMatrixContiguity"+i).append('<td><input type="text" value="∞" class="cellMatrixContiguity" /></td>');
								}
								else {
									$("tr#resultMatrixContiguity"+i).append('<td><input type="text" value="' + matrixContiguity[i-1][j-1] +'" class="cellMatrixContiguity" /></td>');
								}
							}
						
						}
						
					}
					
				}
			}
		
		// КОНЕЦ ВЫВОДА РЕЗУЛЬТАТА
		
		$("#step5").fadeIn("fast");
		
	});
	
});