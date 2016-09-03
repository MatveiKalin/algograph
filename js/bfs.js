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
		
		// Массивы, которые представляют собой результурующие массивы
		var masVertex = new Array(); // Массив для содержания названия вершин
		var masWay = new Array(); // Массив для содержания количесва ребер до вершин, которые расположены в массиве "masVertex"
		var masParent = new Array(); // Массив для содержания родителя вершин, которые расположены в массиве "masVertex"
		
		// Динамический массив, который представляет очередь
		var queue = new Array();
		
		// Переменная, которая является началом обхода,
		// ее вводит пользователь 
		var s = 0;
		
		// Переменная содержащая количество ребер до другой вершины
		var way = 0;
		
		// Переменная - флаг, которая показывает, это первая итерация цикла или нет
		// true - означает первая итерация
		// false - означает НЕ первая итерация
		var first = true;
		
	// КОНЕЦ СОЗДАНИЯ ПЕРЕМЕННЫХ
	
	
	// ОПРЕДЕЛЕНИЕ ФУНКЦИЙ
		
		
		
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
		queue.length = 0;
		masVertex.length = 0;
		masWay.length = 0;
		masParent.length = 0;
		
		// ЗАПОЛНЕНИЕ МАТРИЦЫ СМЕЖНОСТИ
	
			for (var i = 0; i < countVertex; i++) {	
				for (var j = 0; j < countVertex; j++) {
					matrixContiguity[i][j] = document.getElementById('cellMatrix_'+i+','+j).value;
				}
			}
	
		// КОНЕЦ ЗАПОЛНЕНИЯ МАТРИЦЫ СМЕЖНОСТИ
			
		
		// ОБХОД В ШИРИНУ
		
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
				
				// Говорим программе, что еще будет первая итерация 
				first = true;
				
				statusContinue = false;
				
				// Изначальное количество вершин равно нулю из текущей
				way = 0;
				
				masVertex[masVertex.length] = s;
				masWay[masWay.length] = way;
				masParent[masParent.length] = -1;
				
				queue[queue.length] = s;
				
				do {
				
					// Если это первая итерация
					if (first) {
						way++;
					}
					// Если это НЕ первая итерация
					else {
						// Присваиваем переменной начальный элемент очереди
						s = queue[0]; 
					}
					
					for (var j = 0; j < countVertex; j++) {
					
						// Если текущая вершина может попасть в другие, то записать в очередь
						if (matrixContiguity[s-1][j] == 1) {
							
							for (var k = 0; k < masParent.length; k++) {
							
								// Если в таблице кратчайших путей уже есть вершина из матрицы смежности
								if ((j+1) == masVertex[k]) {
									statusContinue = true;
								}
							}
							
							if (statusContinue) {
								statusContinue = false;
								continue;
							}
							
							// Записываем путь в таблицу кратчайщих путей
								
								masVertex[masVertex.length] = j+1;
								masParent[masParent.length] = s;
								
								if (first) {
									masWay[masWay.length] = way;
								}
								
							// Конец записи в таблицу кратчайщих путей
							
							
							// Записываем доступные вершины из текущей в очередь
							queue[queue.length] = j+1;

						}
					}
					
					// Удаляем первый элемент в очереди и сдвигаем остальные влево, а также уменьшаем очередь на один элемент
					
						for (var i = 0; i < queue.length-1; i++) {
							queue[i] = queue[i+1]; 
						}
						
						queue.length = queue.length-1;
						
					// Конец удаления первого элемента в очереди и сдвигания остальных влево, а также уменьшения очереди на один элемент
				
					// Скажем программе, что следущая итерация будет не первая
					first = false;
				
				} while (queue.length != 0);
				
			
			
			// КОНЕЦ ОБХОДА В ШИРИНУ
			
			
			// НАХОЖДЕНИЕ КРАТЧАЙШИХ ПУТЕЙ

				for (var i = 0; i < masVertex.length; i++) {
					
					// Если у вершины не записано пути из введенной пользователем
					if (masWay[i] == 0) {
						parrent = masParent[i];
						
						for (var j = 0; j < masWay.length; j++) { 
							if (masVertex[j] == parrent) {
								masWay[i] = masWay[j]+1;
							}
						}
					}
				}

			// КОНЕЦ НАХОЖДЕНИЯ КРАТЧАЙШИХ ПУТЕЙ
			
			/*
			// ВЫВОД ТАБЛИЦЫ КРАТЧАЙШИХ ПУТЕЙ
		 
				for (var i = 0; i < masVertex.length; i++) {
					//alert(masVertex[i] +' '+ masWay[i] +' '+ masParent[i]);
					alert(masVertex[i]);
				}

			// КОНЕЦ ВЫВОДА ТАБЛИЦЫ КРАТЧАЙШИХ ПУТЕЙ
			*/
			
			// ВЫВОД ТАБЛИЦЫ ПОСЕЩАЕМОСТИ

				// Если вершины - числа
				if (typeVertex == 1) {
					$("#resultMatrixContiguity").append('<p> Из вершины ' + Number(document.getElementById("s").value) + ' мы можем посетить вершины в следующем порядке при обходе в ширину:</p>');
				}
				else
				// Если вершины - буквы
				if (typeVertex == 2) {
					$("#resultMatrixContiguity").append('<p> Из вершины ' + document.getElementById("s").value + ' мы можем посетить вершины в следующем порядке при обходе в ширину:</p>');
				}
			
				for (var i = 1; i < masVertex.length; i++) {
		
						// Если вершины - числа
						if (typeVertex == 1) {
							$("#resultMatrixContiguity").append('<p> Вершина ' + (masVertex[i]) + '</p>');
						}
						else
						// Если вершины - буквы
						if (typeVertex == 2) {
							$("#resultMatrixContiguity").append('<p> Вершина ' + masForLetterVertex[masVertex[i]-1] + '</p>');
						}
						
				}
				
			// КОНЕЦ ВЫВОДА ПОСЕЩАЕМОСТИ
			
			$("#step4").fadeIn("fast");
		}
	});
	
});