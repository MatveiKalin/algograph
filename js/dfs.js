// Описание: 
//
// Разработал: Матвей Калин, студент группы РИС - 14 - 1б
//
// Дата: 

$(document).ready(function() {
	
	// СОЗДАНИЕ ПЕРЕМЕННЫХ
	
		// Количество вершин в графе
		var countVertex = 0;
		
		var visit = 0;
		
		var s = 0;
		
		var index = 0;
		
		// Переменная отвечающая за тип вершин, если в переменной содержится "1", то вершины обозначены цифрами.
		// Если в переменной содержится "2", то вершины обозначены буквами.
		var typeVertex = 0;
		
		// Массив, который будет содержать вершины в виде букв
		var masForLetterVertex = new Array();
		
		// Динамический массив (таблица посещаемости)
		var visit = new Array();
		
		// Динамический массив, в котором будет содержаться 
		// порядок посещения вершин
		var orderVisit = new Array();

	// КОНЕЦ СОЗДАНИЯ ПЕРЕМЕННЫХ
	
	
	// ОПРЕДЕЛЕНИЕ ФУНКЦИЙ
		
		// Функция для обхода в глубину
		function dfs(v) {
		
			visit[v] = true;
			
			
			orderVisit[orderVisit.length] = v; 
			
			
			
			for (var i = 0; i < countVertex; i++) {
				if ( (matrixContiguity[v][i] == 1) && (!visit[i]) ) {
					dfs(i);
				}
			}
		
		} // Конец функции "dfs(v)"
		
	// КОНЕЦ ОПРЕДЕЛЕНИЯ ФУНКЦИИ

	// Удаление нулей
	replacement("0");
	
	// Если пользователь нажмет на кнопку "Подтвердить" при вводе количества вершин в графе
	$("#btn_confirm_step_one").click(function() {

		$("tr").remove();
		
		$("#step2").fadeOut("fast");
		$("#step3").fadeOut("fast");
		$("#step4").fadeOut("fast");
		$("#step2").css("display", "none");
		$("#step3").css("display", "none");
		$("#step4").css("display", "none");
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
		$("#step3").css("display", "none");
		$("#step4").css("display", "none");
		$("#resultMatrixContiguity").children().remove();
		$("#matrixContiguity").children().remove();
		masForLetterVertex.length = 0;
		
		// ВЫБОР ВЕРШИН (БУКВЫ ИЛИ ЧИСЛА)
			// Если вершины - это числа
			if (document.getElementById("number").checked) {
				typeVertex = 1;
			}
			else
			// Если вершины - это буквы
			if (document.getElementById("letter").checked) {
				typeVertex = 2;
			}
			
		// КОНЕЦ ВЫБОРА ВЕРШИН (БУКВЫ ИЛИ ЧИСЛА)
		
		
		// ЕСЛИ ВЫБРАНЫ БУКВЫ, ТО НЕОБХОДИМО ЗАПИСАТЬ ЛАТИНСКИЕ БУКВЫ В МАССИВ
		
			var charNumber = 65;
		
			for (var i = 0; i < countVertex; i++) {
				masForLetterVertex[masForLetterVertex.length] = String.fromCharCode(charNumber);
				charNumber++;
			}
			
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
		
							//$("tr#"+i).append('<td><input type="text" id="cellMatrix_'+(i-1)+','+(j-1)+'" value="0" class="cellMatrixContiguity cellClass" /></td>');
							if (i == j) {
								$("tr#"+i).append('<td><input type="text" id="cellMatrix_'+(i-1)+','+(j-1)+'" value="0" class="cellMatrixContiguity cellClass cellDiagonal" /></td>');
							}
							else {
								$("tr#"+i).append('<td><input type="text" id="cellMatrix_'+(i-1)+','+(j-1)+'" value="0" class="cellMatrixContiguity cellClass" /></td>');
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
							
							//$("tr#"+i).append('<td><input type="text" id="cellMatrix_'+(i-1)+','+(j-1)+'" value="0" class="cellMatrixContiguity cellClass" /></td>');
							if (i == j) {
								$("tr#"+i).append('<td><input type="text" id="cellMatrix_'+(i-1)+','+(j-1)+'" value="0" class="cellMatrixContiguity cellClass cellDiagonal" /></td>');
							}
							else {
								$("tr#"+i).append('<td><input type="text" id="cellMatrix_'+(i-1)+','+(j-1)+'" value="0" class="cellMatrixContiguity cellClass" /></td>');
							}
						}
						
					}
					
					$("#matrixContiguity").append("</tr>");
					
				}
			}
			
		// КОНЕЦ СОЗДАНИЯ ТЕКСТОВЫХ ПОЛЕЙ ДЛЯ ЗАПОЛНЕНИЯ МАТРИЦЫ СМЕЖНОСТИ
		
		$("#step3").fadeIn("fast");
		
		// Удаление нулей
		replacement("0");
		
		// Замещение любых символов для ориентированного невзвешенного графа
		directedUnweight();

	});	
	
	
	// Если пользователь нажмет на кнопку "Получить результат"
	$("#btn_confirm_matrix").click(function() {
		
		$("#resultMatrixContiguity").children().remove();
		orderVisit.length = 0;
		visit.length = 0;
		
		// ЗАПОЛНЕНИЕ МАТРИЦЫ СМЕЖНОСТИ
	
			for (var i = 0; i < countVertex; i++) {	
				for (var j = 0; j < countVertex; j++) {
					matrixContiguity[i][j] = document.getElementById('cellMatrix_'+i+','+j).value;
				}
			}
	
		// КОНЕЦ ЗАПОЛНЕНИЯ МАТРИЦЫ СМЕЖНОСТИ
			
		
		// ОБХОД В ГЛУБИНУ
		
			// Принимаем начальную вершину
			// Если вершины - числа
			if (typeVertex == 1) {
				s = Number(document.getElementById("s").value); 
			}
			else 
			// Если вершины - буквы
			if (typeVertex == 2) {
			
				s = String(document.getElementById("s").value);
				s = s.toUpperCase();

				for (var i = 0; i < masForLetterVertex.length; i++) {
					if (s == masForLetterVertex[i]) {
						s = i+1;
					}
				}
				
			}
			

			// Если в текстовое поле введено число либо ноль, либо меньше,
			// то оповестить пользователя об этом
			if (s <= 0) {
				$("#s").addClass("warningTextField");
			}
			else {
				$("#s").removeClass("warningTextField");
				
				orderVisit.length = 0;
				visit.length = countVertex;
			
				// Устанавливаем значение по умолчанию в таблице посещений
				for (var i = 0; i < countVertex; i++) {
					visit[i] = false;
				}
				
				// Запуск рекурсивной функции
				dfs(s-1);
				
			
			
			// КОНЕЦ ОБХОДА В ГЛУБИНУ
			
			
			// ВЫВОД ТАБЛИЦЫ ПОСЕЩАЕМОСТИ

				// Если вершины - числа
				if (typeVertex == 1) {
					$("#resultMatrixContiguity").append('<p> Из вершины ' + (orderVisit[0]+1) + ' мы можем посетить вершины в следующем порядке при обходе в глубину:</p>');
				}
				else
				// Если вершины - буквы
				if (typeVertex == 2) {
					$("#resultMatrixContiguity").append('<p> Из вершины ' + masForLetterVertex[orderVisit[0]] + ' мы можем посетить вершины в следующем порядке при обходе в глубину:</p>');
				}
			
				for (var i = 1; i < orderVisit.length; i++) {
		
						// Если вершины - числа
						if (typeVertex == 1) {
							$("#resultMatrixContiguity").append('<p> Вершина ' + (orderVisit[i]+1) + '</p>');
						}
						else
						// Если вершины - буквы
						if (typeVertex == 2) {
							$("#resultMatrixContiguity").append('<p> Вершина ' + masForLetterVertex[orderVisit[i]] + '</p>');
						}
						
				}
				
			// КОНЕЦ ВЫВОДА ПОСЕЩАЕМОСТИ
			
			$("#step4").fadeIn("fast");
		}
	});
	
});