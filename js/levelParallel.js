// Описание: Данный файл содержит код вычисления ярусно-параллельной формы ориентированного графа,
// у которого нет циклов 
//
// Разработал: Матвей Калин, студент группы РИС - 14 - 1б
//
// Дата: 29.09.2015

$(document).ready(function() {

	// СОЗДАНИЕ ПЕРЕМЕННЫХ
	
		// Количество вершин в графе
		var countVertex = 0;
		
		// Переменная, которая будет показывать есть ли в столбце единицы (если "true", то есть)
		var empty;
		
		// Переменная для яруса.
		var level = 0;
		
		// Переменная, содержащая вершины одного уровня
		var levelVertex = "";
		
		var countDisabled = 0;
		
		// Массив для содержания в нем пустых столбцов
		var emtyColumn = new Array();
		
		// Переменная отвечающая за тип вершин, если в переменной содержится "1", то вершины обозначены цифрами.
		// Если в переменной содержится "2", то вершины обозначены буквами.
		var typeVertex = 0;
		
		// Массив, который будет содержать вершины в виде букв
		var masForLetterVertex = new Array();
		
		// Переменная для хранения статуса, есть ли в граяфе циклы или нет.
		// Если есть циклы, то переменная содержит значение "false",
		// Если нет циклов, то переменная содержит значение "true".
		var status = false;

	// КОНЕЦ СОЗДАНИЯ ПЕРЕМЕННЫХ

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
		$("#info").css("display", "none");
		$("#vertexConnectivity").children().remove();
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
			
			
			// СОЗДАНИЕ МАССИВА ДЛЯ ДОПОЛНИТЕЛЬНОЙ МАТРИЦЫ СМЕЖНОСТИ
				
				// Создание строк
				matrixContiguity2 = new Array(countVertex);
				
				// Создание столбцов
				for (var i = 0; i < countVertex; i++) {
					matrixContiguity2[i] = new Array(countVertex);		
				}
			
			// КОНЕЦ СОЗДАНИЯ МАССИВА ДЛЯ ДОПОЛНИТЕЛЬНОЙ МАТРИЦЫ СМЕЖНОСТИ
		
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
		$("#info").css("display", "none");
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

		level = 0;
		status = true;
		$("#result").children().remove();
		$("#vertexConnectivity").children().remove();
		$("#step4").css("display", "block");
		$("#info").css("display", "none");
		
		// ЗАПОЛНЕНИЕ МАТРИЦЫ СМЕЖНОСТИ И ВСПОМОГАТЕЛЬНЫХ МАССИВОВ
	
			for (var i = 0; i < countVertex; i++) {
				
				for (var j = 0; j < countVertex; j++) {
					matrixContiguity[i][j] = document.getElementById('cellMatrix_'+i+','+j).value;
					matrixContiguity2[i][j] = document.getElementById('cellMatrix_'+i+','+j).value;
				}

			}
	
		// КОНЕЦ ЗАПОЛНЕНИЯ МАТРИЦЫ СМЕЖНОСТИ И ВСПОМОГАТЕЛЬНЫХ МАССИВОВ
	
		
		// НАХОЖДЕНИЕ ЯРУСОВ

			var circle = 0;
		
			while (true) {
				
				countColumn = 0;
				
				// Очищаем массив
				emtyColumn.length = 0;
				
				// Цикл, который проходит по СТОЛБЦАМ матрицы смежности
				for (var j = 0; j < countVertex; j++) {
				
					// Обнуляем переменную для следующего столбца
					empty = false;
			   		countDisabled = 0;
			   		
			   		// Цикл, который проходит по СТРОКАМ матрицы смежности
					for (var i = 0; i < countVertex; i++) {
						
						// Если в столбце есть хоть одна 1, то в переменную "empty" записываем "true"
			            if (matrixContiguity[i][j] == 1) {
			              empty = true;
			            }
			            // Иначе, считаем сколько в столбце -1    
			            else
			            if (matrixContiguity[i][j] == -1) {
			              countDisabled++;  
			            }
			            
			            // Если весь столбец заполнен -1, то не выполнять код, по зачеркиванию
			            if (countDisabled == countVertex) {
			              empty = true;  
			            }
						
					} // Конец цикла, который проходит по строкам матрицы смежности
					
					
					// Когда конец столбца закончился, нужно проверить, что находится в 
					// переменной "empty", если "false", это значит, что столбец пуст
					// его необходимо записать в массив, который будет содержать все 
					// пустые столбыцы одного уровня
					if (!empty) {
					  
						// Мы сначала записываем пустые столбцы в массив
						countColumn++;
					    emtyColumn[countColumn-1] = j;
					}
					
					// Увеличиваем ярус, если это последний столбец
			        if (j == countVertex-1) {
			        	level++;
			        }
					
				} // Конец цикла, который проходит по столбцам матрицы смежности
				
			
				// Зачеркиваем пустые столбцы и одноименные строки одного яруса	
				for (var j = 0; j < countColumn; j++) {

					// Зачеркиваем столбец
					for (var i = 0; i < countVertex; i++) {
					    matrixContiguity[i][emtyColumn[j]] = -1;               
					}
					
					// Зачеркиваем строку
					for (var i = 0; i < countVertex; i++) {
					    matrixContiguity[emtyColumn[j]][i] = -1;               
					}
					
					
					
					if (typeVertex == 1) {
						levelVertex += (Number(emtyColumn[j]) + 1) + " ";
					}
					else 
					if (typeVertex == 2) {
						levelVertex += masForLetterVertex[emtyColumn[j]] + " ";
					}
					
					 
				}
				
				// ВЫВОД ЯРУСОВ

					$("#result").append('<tr><td>Ярус ' + level + ': ' + levelVertex + '</td></tr>');
					levelVertex = "";
					
				// КОНЕЦ ВЫВОДА ЯРУСОВ
				
				
				// Проверка: заполнена ли матрица смежности -1

					countDisabled = 0;
					
					// Проверять во всех ли ячейках находится -1
					for (var i = 0; i < countVertex; i++) {
						for (var j = 0; j < countVertex; j++) {
	
							if (matrixContiguity[i][j] == -1) {
				                countDisabled++;
							}
							
						}
					}
					
					// Если вся матрица заполнена -1, занчит мы ее прошли 
			        // полностью, выходим из бесконечного цикла
			       if ( (countVertex * countVertex) == countDisabled ) {
			            break;
			 	   }
		          
		        // Конец проверки: заполнена ли матрица смежности -1
				
				circle++;
				
				if (circle == 10000) {
					$("#result").children().remove();
					$("#vertexConnectivity").children().remove();
					
					// Говорим программе, что циклы есть
					status = false;
					
					$("#step4").css("display", "none");
					
					$("#info").css("display", "block");
					
					//alert("Граф имееет циклы, данный алгоритм не предназначен для таких графов.");
					break;
				}
			
			} // Конец бесконечного цикла
		
		// КОНЕЦ НАХОЖДЕНИЯ ЯРУСОВ
		
		
		// ВЫВОД СВЯЗНОСТИ ВЕРШИН
			
			for (var i = 0; i < countVertex; i++) {
				
				// Если циклов нет, то выводим связность вершин
				if (status) {
				
					$("#vertexConnectivity").append('<p id="vertexConnectivity' + i + '"></p>');
				
					// Если вершины - числа
					if (typeVertex == 1) {
		
						$("#vertexConnectivity" + i).append('<span>Из вершины ' + (i+1) + ' можем по одному ребру попасть в вершины: </span>');
						
						for (var j = 0; j < countVertex; j++) {
							if (matrixContiguity2[i][j] == 1) {
								$("#vertexConnectivity" + i).append( (j+1) + " ");
							}
						}
					}
					else
					// Если вершины - буквы
					if (typeVertex == 2) {
						
						$("#vertexConnectivity" + i).append('<span>Из вершины ' + masForLetterVertex[i] + ' можем по одному ребру попасть в вершины: </span>');
						
						for (var j = 0; j < countVertex; j++) {
							if (matrixContiguity2[i][j] == 1) {
								$("#vertexConnectivity" + i).append( masForLetterVertex[j] + " ");
							}
						}
					}
				}
			}

		// КОНЕЦ ВЫВОДА СВЯЗНОСТИ ВЕРШИН
		
		if (status) {
			$("#step4").fadeIn("fast");
		}
	});
	
});