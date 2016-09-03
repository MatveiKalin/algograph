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
		
	// ------------------------
	
		var weight;
	
		var inVertex = 0;
		
		// Массив для сохранения маршрута, только в обратном виде, потому что нахождение маршрута идет с конца.
		var reverseWay = new Array();
		
		// Массив для хранения вершин которые "впадают" в проверяемую 
		var forVertex = new Array();
		
	// КОНЕЦ СОЗДАНИЯ ПЕРЕМЕННЫХ

	
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
			
			
		// НАХОЖДЕНИЕ КРАТЧАЙШИХ РАССТОЯНИЙ ОТ ЗАДАННОЙ ВЕРШИНЫ
		
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
			
				// Массив расстояний
					// Задаем размерность массива "d" (расстояния)
					d = new Array(countVertex);
					
					// Изначально массив "d" содержит в себе значения Infinity
					for (var i = 0; i < countVertex; i++) {
						d[i] = Infinity;
					}
				// Конец массива расстояний
				
				
				// Массив предков
					// Задаем размерность массива "p" (предков)
					p = new Array(countVertex);
				// Конец массива предков
				
				
				// Массив посещаемости
					// Задаем размерность массива посещаемости
					used = new Array(countVertex);
					
					// Изначально массив посеаемости содержит в себе значения "false"
					for (var i = 0; i < countVertex; i++) {
						used[i] = false;
					}
				// Конец массива посещаемости
			
			
				d[s-1] = 0;
				
				for (var i = 0; i < countVertex; i++) {
				
					v = -1;
					
					for (var j = 0; j < countVertex; j++) {
						if ( (!used[j]) && ( (v == -1) || (d[j] < d[v]) ) ) {
							v = j;
						}
					}
					
					
					if (d[v] == Infinity) {
						break;
					}
					
					used[v] = true;
				
					for (var j = 0; j < countVertex; j++) {
						len = Number(matrixContiguity[v][j]);
						
						if ( (Number(d[v]) + Number(len)) < Number(d[j])) {
							d[j] = Number(d[v]) + Number(len);
							p[j] = Number(v);
						}
						
					}
				
				}
			
			// КОНЕЦ НАХОЖДЕНИЯ КРАТЧАЙШИХ РАССТОЯНИЙ ОТ ЗАДАННОЙ ВЕРШИНЫ 
			
			
			// ВЫВОД КРАТЧАЙШИХ ПУТЕЙ ОТ ЗАДАННОЙ
			
				/*for (var i = 0; i < countVertex; i++) {
					//$("#resultMatrixContiguity").append('<p> Вершина ' + (i+1) + ' путь до нее = ' + d[i] + '</p>');
					
					if (d[i] == Infinity) {
							$("#resultMatrixContiguity").append('<p> Вершина ' + (i+1) + ' путь до нее = <span class="infinity">∞</span> </p>');
					}
					else {
						$("#resultMatrixContiguity").append('<p> Вершина ' + (i+1) + ' путь до нее = ' + d[i] + '</p>');
					}

				}*/
				// Если вершины - числа
				if (typeVertex == 1) {
					for (var i = 0; i < countVertex; i++) {
						if (d[i] == Infinity) {
								$("#resultMatrixContiguity").append('<p> Вершина ' + (i+1) + ' путь до нее = <span class="infinity">∞</span> </p>');
						}
						else {
							$("#resultMatrixContiguity").append('<p> Вершина ' + (i+1) + ' путь до нее = ' + d[i] + '</p>');
						}

					}
				}
				else
				// Если вершины - буквы
				if (typeVertex == 2) {
					for (var i = 0; i < countVertex; i++) {
						if (d[i] == Infinity) {
							$("#resultMatrixContiguity").append('<p> Вершина ' + masForLetterVertex[i] + ' путь до нее = <span class="infinity">∞</span> </p>');
						}
						else {
							$("#resultMatrixContiguity").append('<p> Вершина ' + masForLetterVertex[i] + ' путь до нее = ' + d[i] + '</p>');
						}

					}
				}
			
			// КОНЕЦ ВЫВОДА КРАТЧАЙШИХ ПУТЕЙ ОТ ЗАДАННОЙ
			
			
	// -----------------------------------------
			
			/*
			// НАХОЖДЕНИЕ МАРШРУТА ОТ НАЧАЛЬНОЙ ТОЧКИ ДО ДРУГОЙ 
			
				// !!!!!!!!!!! Нужно обнулить массив reverseWay, forVertex
				// Попытаться запретить вводить отрицательные значения в конечное поле
				
				// оРГАНИЗОВАТЬ ВЫВОЗ МАРШРУТА КАК С ЦИФРАМИ ТАК И С бУКВАМИ
				reverseWay.length = 0;
				forVertex.length = 0;
			
				endVertex = Number(document.getElementById("endVertex").value); 
				
				if (d[endVertex-1] != Infinity) {
				
					// Добавляем конечную вершину сразу же в массив маршрута
					reverseWay[reverseWay.length] = endVertex;
					
					while (endVertex != s) {
						
						for (var i = 0; i < countVertex; i++) {
							if (matrixContiguity[i][endVertex-1] != Infinity) {
								forVertex[forVertex.length] = i;
							}
						}
						
						// Записываем вес проверяемой вершины
						weight = d[endVertex-1];
						
						// Нахождение разности между весом проверяемой вершины и всеми
						for (var i = 0; i < forVertex.length; i++) {
							if ( (weight - matrixContiguity[forVertex[i]][endVertex-1]) == d[forVertex[i]] ) {
								inVertex = Number(forVertex[i])+1;
								reverseWay[reverseWay.length] = inVertex;
								break;
							}
						}
						
						endVertex = inVertex;
						
					}
					
					// Вывод маршрутов 
					
						for (var i = reverseWay.length-1; i > -1; i--) {
							alert(reverseWay[i]);
						}
					
					// Конец вывода маршрута
					
				}
				else {
					alert("Маршрута нет между вершиной " + s + " и аершиной " + endVertex);
				}
				
			// КОНЕЦ НАХОЖДЕНИЕ МАРШРУТА ОТ НАЧАЛЬНОЙ ТОЧКИ ДО ДРУГОЙ 
			*/
			
			
			// НАХОЖДЕНИЕ МАРШРУТА ОТ НАЧАЛЬНОЙ ТОЧКИ ДО ДРУГОЙ 
			
				// Попытаться запретить вводить отрицательные значения в конечное поле

				reverseWay.length = 0;
				forVertex.length = 0;
				way = "";
			
				endVertex = Number(document.getElementById("endVertex").value); 
				
				
				// Принимаем конечную вершину
				// Если вершины - числа
				if (typeVertex == 1) {
					endVertex = Number(document.getElementById("endVertex").value); 
					
					if (endVertex < 0) {
						endVertex *= (-1);
						document.getElementById("endVertex").value = endVertex;
					}
					
				}
				else 
				// Если вершины - буквы
				if (typeVertex == 2) {
				
					endVertex = String(document.getElementById("endVertex").value);
					endVertex = endVertex.toUpperCase();

					for (var i = 0; i < masForLetterVertex.length; i++) {
						if (endVertex == masForLetterVertex[i]) {
							endVertex = i+1;
						}
					}
					
				}
				
				if ( (d[endVertex-1] != Infinity) && (Number(endVertex) <= Number(countVertex))) {
				
					// Добавляем конечную вершину сразу же в массив маршрута
					reverseWay[reverseWay.length] = endVertex;
					
					while (endVertex != s) {
						
						for (var i = 0; i < countVertex; i++) {
							if (matrixContiguity[i][endVertex-1] != Infinity) {
								forVertex[forVertex.length] = i;
							}
						}
						
						// Записываем вес проверяемой вершины
						weight = d[endVertex-1];
						
						// Нахождение разности между весом проверяемой вершины и всеми
						for (var i = 0; i < forVertex.length; i++) {
							if ( (weight - matrixContiguity[forVertex[i]][endVertex-1]) == d[forVertex[i]] ) {
								inVertex = Number(forVertex[i])+1;
								reverseWay[reverseWay.length] = inVertex;
								break;
							}
						}
						
						endVertex = inVertex;
						
					}
					
					// Вывод маршрутов 

						if (typeVertex == 1) {
							for (var i = reverseWay.length-1; i > -1; i--) {
								if (i == 0) {
									way += reverseWay[i];
								}
								else {
									way += reverseWay[i] + " -> ";
								}	
							}
						}
						else
						// Если вершины - буквы
						if (typeVertex == 2) {
							for (var i = reverseWay.length-1; i > -1; i--) {
								if (i == 0) {
									way += masForLetterVertex[reverseWay[i]-1];
								}
								else {
									way += masForLetterVertex[reverseWay[i]-1] + " -> ";
								}	
							}
						}
						
						
						$("#resultMatrixContiguity").append('<p>&nbsp;</p>');
						
						// Если вершины - числа
						if (typeVertex == 1) {
							$("#resultMatrixContiguity").append('<p> Кратчайший маршрут от вершины '  + s + ' до вершины ' + reverseWay[0] + ':</p>');
						}
						else
						// Если вершины - буквы
						if (typeVertex == 2) {
							$("#resultMatrixContiguity").append('<p> Кратчайший маршрут от вершины '  + masForLetterVertex[s-1] + ' до вершины ' + masForLetterVertex[reverseWay[0]-1] + ':</p>');
						}
						
						$("#resultMatrixContiguity").append('<p>' + way + '</p>');
					
					// Конец вывода маршрута
					
				}
				else {
					//alert("Маршрута нет между вершиной " + s + " и аершиной " + endVertex);
					$("#resultMatrixContiguity").append('<p>&nbsp;</p>');
					$("#resultMatrixContiguity").append('<p>Маршрута нет</p>');
				}
				
			// КОНЕЦ НАХОЖДЕНИЕ МАРШРУТА ОТ НАЧАЛЬНОЙ ТОЧКИ ДО ДРУГОЙ 
			
			
			
			$("#step5").fadeIn("fast");
		}
	});
	
});