// Описание: Данный файл содержит код вычисления методом Шимбелла 
// кратчайших растояний между вершинами за определенное количество дуг 
//
// Разработал: Матвей Калин, студент группы РИС - 14 - 1б
//
// Дата: 29.09.2015

$(document).ready(function() {
	
	// СОЗДАНИЕ ПЕРЕМЕННЫХ
	
		// Количество вершин в графе
		var countVertex = 0;
		
		// Переменная для хранения результата умножения строки на столбец методом Шимбелла
		var number = 0;

		// Переменная, содержащая степень матрицы
		var exponentMatrix = 0;
		
		// Переменная для проверки достигнут ли счетчик цикла степени матрицы
		var countExponent = 1;
		
		// Переменная для выбора в какой массив записывать информацию
		var status = false;

		// Переменная отвечающая за тип вершин, если в переменной содержится "1", то вершины обозначены цифрами.
		// Если в переменной содержится "2", то вершины обозначены буквами.
		var typeVertex = 0;
		
		// Массив, который будет содержать вершины в виде букв
		var masForLetterVertex = new Array();
	
	// КОНЕЦ СОЗДАНИЯ ПЕРЕМЕННЫХ
	
	
	// ОПРЕДЕЛЕНИЕ ФУНКЦИЙ
	
		// Функция, которая перемножает методом Шимбелла матрицы
		function multipMatrix(mas1, mas2) {
			
			for (var i = 0; i < countVertex; i++) {
				for (var j = 0; j < countVertex; j++) {
						
					number = 0;
					
					for (var l = 0; l < countVertex; l++) {
						
						if (l == 0) {
							number = mas1[l][j] * mas2[i][l];
						}
						else {
							number += mas1[l][j] * mas2[i][l];
						}	
						
					}

					resultMatrix[i][j] = number;

				}
			}
			
		} // Конец функции "multipMatrix()"
		
		
		// Функция, которая повторяется на каждом итерации цикла
		function repeatInteration(mas1, mas2) {
				
			// Вызов функции, которая перемножает матрицы
			multipMatrix(mas1, mas2);
			
			// Итоговую матрицу записываем в вспомогательный массив2
			for (var i = 0; i < countVertex; i++) {
				for (var j = 0; j < countVertex; j++) {
					mas2[i][j] = resultMatrix[i][j];	
				}
			}
			
			// Начальную матрицу смежности записываем в вспомогательный массив1 
			for (var i = 0; i < countVertex; i++) {
				for (var j = 0; j < countVertex; j++) {
					mas1[i][j] = matrixContiguity[i][j];	
				}
			}
			
		} // Конец функции "repeatInteration()"
	
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
			
			
			// СОЗДАНИЕ МАССИВА ДЛЯ РЕЗУЛЬТАТА
				
				// Создание строк
				resultMatrix = new Array(countVertex);
				
				// Создание столбцов
				for (var i = 0; i < countVertex; i++) {
					resultMatrix[i] = new Array(countVertex);		
				}
			
			// КОНЕЦ СОЗДАНИЯ МАССИВА ДЛЯ РЕЗУЛЬТАТА
			
			
			// СОЗДАНИЕ ВСПОМОГАТЕЛЬНЫХ МАССИВОВ
			
				// Вспомогатеьный массив 1
					// Создание строк
					masAuxiliary1 = new Array(countVertex);
					
					// Создание столбцов
					for (var i = 0; i < countVertex; i++) {
						masAuxiliary1[i] = new Array(countVertex);		
					}
				// Конец вспомогатеьного массива 1
				
				// Вспомогатеьный массив 2
					// Создание строк
					masAuxiliary2 = new Array(countVertex);
					
					// Создание столбцов
					for (var i = 0; i < countVertex; i++) {
						masAuxiliary2[i] = new Array(countVertex);		
					}
				// Конец вспомогатеьного массива 2
			
			// КОНЕЦ СОЗДАНИЯ ВСПОМОГАТЕЛЬНЫХ МАССИВОВ
			
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
							//$("tr#"+i).append('<td><input type="text" id="cellMatrix' + (i-1)+''+(j-1) + '" value="0" class="cellMatrixContiguity" /></td>');
							
							if (i == j) {
								$("tr#"+i).append('<td><input type="text" id="cellMatrix_'+(i-1)+','+(j-1)+'" value="0" class="cellMatrixContiguity cellClass cellDiagonal" /></td>');
							}
							else {
								$("tr#"+i).append('<td><input type="text" id="cellMatrix_'+(i-1)+','+(j-1)+'" value="0" class="cellMatrixContiguity cellClass" /></td>');
							}
		
						}
						
					}
					
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
		
		// ЗАПОЛНЕНИЕ МАТРИЦЫ СМЕЖНОСТИ И ВСПОМОГАТЕЛЬНЫХ МАССИВОВ
	
			for (var i = 0; i < countVertex; i++) {
				
				for (var j = 0; j < countVertex; j++) {
					matrixContiguity[i][j] = document.getElementById('cellMatrix_'+i+','+j).value;
					masAuxiliary1[i][j] = document.getElementById('cellMatrix_'+i+','+j).value;
					masAuxiliary2[i][j] = document.getElementById('cellMatrix_'+i+','+j).value;
				}

			}
	
		// КОНЕЦ ЗАПОЛНЕНИЯ МАТРИЦЫ СМЕЖНОСТИ И ВСПОМОГАТЕЛЬНЫХ МАССИВОВ
	
		
		// ВЫЧИСЛЕНИЕ КРАТАЧАЙШИХ ПУТЕЙ МЕТОДОМ ШИМБЕЛЛА
			
			// Принимаем степень матрицы
			exponentMatrix = document.getElementById("exponentMatrix").value; 
			
			// Если в текстовое поле введено число либо ноль, либо меньше,
			// то оповестить пользователя об этом
			if (exponentMatrix <= 0) {
				$("#exponentMatrix").addClass("warningTextField");
			}
			else {
				$("#exponentMatrix").removeClass("warningTextField");
			
				// Если степень матрицы не равна нулю
				if (exponentMatrix > 0) {
				
					countExponent = 1;

					status = false;
					
					// Пока счетчик не сравняется со степенью матрицы,
					// выпоняем тело цикла
					while ( countExponent != exponentMatrix ) {
						
						// Увеличиваем счетчик
						countExponent++;
						
						// Если это нечетное умножение по методу Шимбелла, то ...
						if (!status) {
							repeatInteration(masAuxiliary1, masAuxiliary2);
							status = true;
						}
				//------// Инчаче, если это четное умножение по методу Шимбелла, то ... //------//
						else 
						if (status) {
							repeatInteration(masAuxiliary2, masAuxiliary1);
							status = false;
						}
						
					}
				}
			}
		// КОНЕЦ ВЫЧИСЛЕНИЯ КРАТАЧАЙШИХ ПУТЕЙ МЕТОДОМ ШИМБЕЛЛА
		
		
		// ВЫВОД РЕЗУЛЬТАТА
		
			// Если степень матрицы не равна нулю
			if (exponentMatrix > 0) {
			
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
								//$("tr#resultMatrixContiguity"+i).append('<td><input type="text" value="' + resultMatrix[i-1][j-1] +'" class="cellMatrixContiguity" /></td>');
							
								if (i == j) {
									$("tr#resultMatrixContiguity"+i).append('<td><input type="text" value="' + resultMatrix[i-1][j-1] +'" class="cellMatrixContiguity cellDiagonal" /></td>');
								}
								else {
									$("tr#resultMatrixContiguity"+i).append('<td><input type="text" value="' + resultMatrix[i-1][j-1] +'" class="cellMatrixContiguity" /></td>');
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
								//$("tr#resultMatrixContiguity"+i).append('<td><input type="text" value="' + resultMatrix[i-1][j-1] +'" class="cellMatrixContiguity" /></td>');
							
								if (i == j) {
									$("tr#resultMatrixContiguity"+i).append('<td><input type="text" value="' + resultMatrix[i-1][j-1] +'" class="cellMatrixContiguity cellDiagonal" /></td>');
								}
								else {
									$("tr#resultMatrixContiguity"+i).append('<td><input type="text" value="' + resultMatrix[i-1][j-1] +'" class="cellMatrixContiguity" /></td>');
								}
							
							}
							
						}
						
					}
				}
			
			}
		
		// КОНЕЦ ВЫВОДА РЕЗУЛЬТАТА

		$("#step4").fadeIn("fast");
		
	});
	
});