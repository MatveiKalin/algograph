// Описание: 
//
// Разработал: Матвей Калин, студент группы РИС - 14 - 1б
//
// Дата:

$(document).ready(function() {
	
	// СОЗДАНИЕ ПЕРЕМЕННЫХ
	
		// Количество вершин в графе
		var countVertex = 0;
		
		// Переменная для хранения результата умножения строки на столбец методом Шимбелла
		var number = 0;
		
		// Переменная, содержащая минимальное значение из массива "masLine"
		var minValue = 0;
		
		// Переменная, содержащая степень матрицы
		var exponentMatrix = 0;
		
		// Переменная для проверки достигнут ли счетчик цикла степени матрицы
		var countExponent = 1;
		
		// Переменная для выбора в какой массив записывать информацию
		var status = false;
		
		// Одномерный массив, который будет содержать 
		// результаты сложения массивов
		var masLine = new Array();
		
		// Вспомогательная строковая переменная
		var str = "";
		
		// Количество совпадений при проверки содержания одного операнда в другом
		var countMatches = 0;
		
		// Переменная для хранения количества дизъюнктов
		var countDisjunct = 0;
		
		// Переменная для хранения количества операндов в дизъюнкте
		var countOperand = 0;
		
		// Вектор, который будет содержать 
		// кличество операндов в дизъюнкте
		var masCountLetter = new Array();
		
		// Векторы, в которых будедут содержаться 
		// операнды без знаков операции
		var masForOperand1 = new Array();
		var masForOperand2 = new Array();
		var masForOperand3 = new Array();
		var masForOperandResult = new Array();
		
		// Переменная - флаг, если выражение равно "false", то 
		// это означает, что на данный момент нечетная итерация, если значение равно
		// "true", то итерация четная
		var status = false;
	
		// Счетчики
		var count = 0;
		var l = 0;
		var k = 0;
		
		// Вспомогательные строковые переменные
		var word1 = "";
		var word2 = "";
		
		// -----------------------------------------
		
		// Переменная, в которой хранятся дизъюнктивные пары
		var disjunctiveCouple = "";
		
		// Переменная для хранения ячейки в массиве недостаюших вершин
		var strCellMissingVertex = "";
		
		// Переменные для хранения в них чисел внешней и внутренней устойчивости
		var minValue = 0;
		var maxValue = 0;
		
		var status = false;

		var countClikes = 0;
		
		// Вектор для хранения недостающих 
		// вершин у внутренней  устойчивости
		var masMissingVertex = new Array();
		
		// Вектор для хранения вершин у каждой 
		// элементарной конъюнкции
		var masMissingVertex2 = new Array();
		
		// Вектор, содержащий ядра графа
		var masCoreGraph = new Array();
		
		// Переменная отвечающая за тип вершин, если в переменной содержится "1", то вершины обозначены цифрами.
		// Если в переменной содержится "2", то вершины обозначены буквами.
		var typeVertex = 0;
		
		// Массив, который будет содержать вершины в виде букв
		var masForLetterVertex = new Array();
		
	// КОНЕЦ СОЗДАНИЯ ПЕРЕМЕННЫХ
	
	
	// ОПРЕДЕЛЕНИЕ ФУНКЦИЙ
	
		// Функция, которая сортирует в операнде буквы по алфавиту
		function sortStr(inputStr) {

			var mas = new Array();
			
			for (var i = 0; i < inputStr.length; i++) {
				mas[i] = inputStr[i];
			}
			
			mas.sort();
			
			inputStr = "";
			
			for (var i = 0; i < mas.length; i++) {
				inputStr += mas[i];
			}
			
			return inputStr;
		
		} // Конец функции "sortStr(inputStr)"
		
		
		function findMatches1(word1, word2, mas2) {
			
			countMatches = 0;
			
			for (var i = 0; i < word2.length; i++) {
				for (var j = 0; j < word1.length; j++) {
					if (word1.charAt(j) == word2.charAt(i)) {
						countMatches++;
					}
				}
			}
			
			// Если первый операнд полностью содержится во втором значит,
			// остается второй вариант
			if (countMatches == word1.length) {
				mas2[mas2.length] = word2;
			}
			else {
				mas2[mas2.length] = sortStr(word1+word2);
			}
			
		} // Конец функции "findMatches1(word1, word2, mas2)"
		
		
		function findMatches2(word1, word2, masForOperand3, index) {
		
			countMatches = 0;
			
			for (var m = 0; m < word1.length; m++) {
				for (var n = 0; n < word2.length; n++) {
					if (word1.charAt(m) == word2.charAt(n)) {
						countMatches++;
					}
				}
			}
			
			// Если первый операнд полностью содержится во втором значит,
			// остается первый вариант
			if ( (countMatches == word1.length) && (countMatches != 0) ) {
				masForOperand3[index] = "";
			}
		
		} // Конец функции "findMatches2(word1, word2, masForOperand3, index)"
		
		
		// Функция, которая перемножает операнды "каждый на каждый",
		// эта функция будет записывать ответ на нечетной итерации в "masForOperand2", а 
		// при четной итерации в "masForOperand1"
		function repeatIteration(mas1, mas2) {
		
			k = 0;
			l = 0;
			count = 0;
			str = "";
			countOperand = 0;
			countMatches = 0;
			mas2.length = 0;
			
			while ( k < masCountLetter[0] ) {
			
				if (k != 0) {
					l = masCountLetter[0] - k;
				}
				else {
					l = masCountLetter[0];
				}
				
				while ( (l+k) < (masCountLetter[1] + masCountLetter[0]) ) {
				
					word1 = sortStr(mas1[k]);
					word2 = sortStr(mas1[l+k]);
					
					if ( word1.length <= word2.length ) {
						
						// Проверка на совпаденя одного операнда в другом
						
							findMatches1(word1, word2, mas2);
						
						// Конец проверки одного операнда на содержания в нем в другом
						
					}
					else 
					if ( word1.length >= word2.length ) {
					
						// Проверка на совпаденя одного операнда в другом
						
							findMatches1(word2, word1, mas2);
					
						// Конец проверки одного операнда на содержания в нем в другом
					
					}
					
					// Увеличиваем количество дизъюнктов
					countOperand++;
				
					l++;
				
				}
				
				k++;
				
				// Конкатенируем оставшийся дизъюнкты
				if (k == masCountLetter[0]) {
					for (var i = ( Number(masCountLetter[0]) + Number(masCountLetter[1])); i < mas1.length; i++) {
						mas2[mas2.length] = mas1[i];
					}
				}
			
			}
			
			// Записываем новое количество операндов в дизъюнкте
		
				// Изменяем вектор, содержащий количесто операндов в дизьюнкте
				for (var i = 2; i < masCountLetter.length; i++) {
					masCountLetter[i-1] = masCountLetter[i];
				}
				
				// Уменьшаем вектор на единицу с конца
				masCountLetter.length = masCountLetter.length - 1;
				
				// Записываем новое количество дизьюнктов
				masCountLetter[0] = countOperand;
		
			// Конец записи новых количеств операндов в дизъюнкте		
		
		
		} // Конец функции "repeatIteration(mas1, mas2)"
		
		
		// Функция, которая переводит КНФ в ДНФ
		function cnfToDnf(inputString, type) {
		
			// Очищаем массивы для следующего использования
			masForOperand1.length = 0;
			masForOperand2.length = 0;
			masForOperand3.length = 0;
			masForOperandResult.length = 0;
			masCountLetter.length = 0;
			
			
			// НАХОЖДЕНИЕ КОЛИЧЕСТВА ДИЗЪЮНКТОВ
			
				for (var i = 0; i < inputString.length; i++) {
					if (
						(inputString.charAt(i) == '*') ||
						(inputString.charAt(i) == '^') ||
						(inputString.charAt(i) == '&') ||
						(inputString.charAt(i) == '.')
					   ) 
					{
						countDisjunct++;	
					}
				}
			
			// КОНЕЦ НАХОЖДЕНИЯ КОЛИЧЕСТВА ДИЗЪЮНКТОВ
			
			
			// НАХОЖДЕНИЕ КОЛИЧЕСТВА ОПЕРАНДОВ В ДИЗЪЮНКТАХ
			
				for (var i = 0; i < inputString.length; i++) {
					if (inputString.charAt(i) == ')') {
						masCountLetter[masCountLetter.length] = count;
						count = 0;
					}
					else {
						if (
							(inputString.charAt(i) == 'v') ||
							(inputString.charAt(i) == 'V') ||
							(inputString.charAt(i) == '^') ||
							(inputString.charAt(i) == '&') ||
							(inputString.charAt(i) == '.') ||
							(inputString.charAt(i) == ')') ||
							(inputString.charAt(i) == '(') ||
							(inputString.charAt(i) == '*') ||
							(inputString.charAt(i) == ' ') 
							) 
						{
							continue;
						}
						
						count++;
						
					}
				}
			
			// КОНЕЦ НАХОЖДЕНИЯ КОЛИЧЕСТВА ОПЕРАНДОВ В ДИЗЪЮНКТАХ
			
			
			// ПРЕОБРАЗОВАНИЕ "КНФ" В "ДНФ"
			
				// Записываем только операнды в "masForOperand1"
				
					count = 0;

					for (var i = 0; i < inputString.length; i++) {
						if (
							(inputString.charAt(i) == 'v') ||
							(inputString.charAt(i) == 'V') ||
							(inputString.charAt(i) == '^') ||
							(inputString.charAt(i) == '&') ||
							(inputString.charAt(i) == '.') ||
							(inputString.charAt(i) == ')') ||
							(inputString.charAt(i) == '(') ||
							(inputString.charAt(i) == '*') ||
							(inputString.charAt(i) == ' ') 
							) 
						{
							continue;
						}

						masForOperand1[masForOperand1.length] = inputString.charAt(i);
						
					}

				// Конец записи операндов в "masForOperand1"
			
			
				status = false;
			
				// Пока размер массива, где содержаться количество оперантов в каждом дизъюнкте
				// не будет равен нулю, выполянть тело цикла
				while ( masCountLetter.length != 1) {
				
					countOperand = 0;
				
					// Если status = false, то есть это нечетная итерация
					if (!status) {
						repeatIteration(masForOperand1, masForOperand2);
						status = true;	
					}
					else   
					// Иначе если status = true, то есть это четная итерация	
					if (status) {
						repeatIteration(masForOperand2, masForOperand1);
						status = false;	
					}
				
				}
				
				
				// Создаем новый массив, который будет содержать только дизъюнкции

					if (!status) {
						for (var i = 0; i < masForOperand1.length; i++) {
							masForOperand3[masForOperand3.length] = masForOperand1[i];
						}
					}
					else  
					if (status) {
						for (var i = 0; i < masForOperand2.length; i++) {
							masForOperand3[masForOperand3.length] = masForOperand2[i];
						}
					}

				// Конец создания массив, который будет содержать дизъюнкции
			
				
				// Сокращаем дизъюнкции
				
					for (var i = 0; i < masForOperand3.length; i++) {
					
						if (masForOperand3[i] == "") {
							continue;
						}
						
						for (var j = 0; j < masForOperand3.length; j++) {
							
							if (i == j) {
								continue;
							}
							
							word1 = masForOperand3[i];
							word2 = masForOperand3[j];
							
							if ( (word1.length <= word2.length) && (word1 != "") && (word2 != "") ) {
								
								// Проверка на совпаденя одного операнда в другом
									
									findMatches2(word1, word2, masForOperand3, j);
								
								// Конец проверки одного операнда на содержания в нем в другом
								
							}
							else
							if ( (word1.length >= word2.length) && (word1 != "") && (word2 != "") ) {
								
								// Проверка на совпаденя одного операнда в другом
									
									findMatches2(word2, word1, masForOperand3, i);
								
								// Конец проверки одного операнда на содержания в нем в другом
								
							}	
							
						}
					}

				// Клонец сокращений дизъюнкций
				
				
				// Записываем массив, содержащий ответ в другой вектор, чтобы избавиться от пустых ячеек в массиве

					for (var i = 0; i < masForOperand3.length; i++) {
						if (masForOperand3[i] == "") {
							continue;
						}
						else {
							masForOperandResult[masForOperandResult.length] = masForOperand3[i];
						}
					}
				
				// Конец записи массива, содержащий ответ в другой вектор, чтобы избавиться от пустых ячеек в массиве
				
				
				// Вывод вектора, который будет содержать только дизъюнкции
					
					if (type == 1) {
					
						$("#internalStability").append("<br />");
						
						for (var i = 0; i < masForOperandResult.length; i++) {
						
							for (var j = 0; j < masForOperandResult[i].length; j++) {
								
								if (j == masForOperandResult[i].length-1) {
									$("#internalStability").append(masForOperandResult[i].charAt(j));
								}
								else {
									$("#internalStability").append(masForOperandResult[i].charAt(j) + "*");
								}
								
							}
							
							if (i != masForOperandResult.length-1) {
								$("#internalStability").append(" v ");
							}
							
						}
						
						$("#internalStability").append("<br /><br />");
					}
					else 
					if (type == 2) {
						$("#outerStability").append("<br />");
						
						for (var i = 0; i < masForOperandResult.length; i++) {
						
							for (var j = 0; j < masForOperandResult[i].length; j++) {
								
								if (j == masForOperandResult[i].length-1) {
									$("#outerStability").append(masForOperandResult[i].charAt(j));
								}
								else {
									$("#outerStability").append(masForOperandResult[i].charAt(j) + "*");
								}
								
							}
							
							if (i != masForOperandResult.length-1) {
								$("#outerStability").append(" v ");
							}
							
						}
						
						
						$("#outerStability").append("<br /><br />");
					}
					//for (var i = 0; i < masForOperandResult.length; i++) {
					//	alert(masForOperandResult[i]);
					//}
				
				// Конец вывода вектора, который будет содержать только дизъюнкции     
				
			// КОНЕЦ ПРЕОБРАЗОВАНИЯ "КНФ" В "ДНФ"
			
		} // Конец функции "cnfToDnf(inputString)"
		
		// -----------------------------------------------
	
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
		
		// Замещение любых символов для неориентированного невзвешенного графа
		undirectedUnweight();
		
	});	
	
	
	
	// Если пользователь нажмет на кнопку "Получить результат"
	$("#btn_confirm_matrix").click(function() {
		
		//$("#resultMatrixContiguity").children().remove();
		
		$("#resultMatrixContiguity").remove();
		masMissingVertex.length = 0;

		$("#step4").append('<div id="resultMatrixContiguity"></div>');
		
		
		// ЗАПОЛНЕНИЕ МАТРИЦЫ СМЕЖНОСТИ И ВСПОМОГАТЕЛЬНЫХ МАССИВОВ
	
			for (var i = 0; i < countVertex; i++) {	
				for (var j = 0; j < countVertex; j++) {
					//matrixContiguity[i][j] = document.getElementById("cellMatrix"+i+""+j).value;
					
					matrixContiguity[i][j] = document.getElementById('cellMatrix_'+i+','+j).value;
				}
			}
	
		// КОНЕЦ ЗАПОЛНЕНИЯ МАТРИЦЫ СМЕЖНОСТИ И ВСПОМОГАТЕЛЬНЫХ МАССИВОВ
			
			
		// НАХОЖДЕНИЕ КЛИК У ГРАФА
		
			// Выше главной диагонали единицы меняем на нули, а нули на единицы для дополнительного графа
		
				for (var i = 0; i < countVertex; i++) {
					for (var j = (i+1); j < countVertex; j++) {
						if (matrixContiguity[i][j] == 0) {
							matrixContiguity[i][j] = 1;
						}
						else
						if (matrixContiguity[i][j] == 1) {
							matrixContiguity[i][j] = 0;
						}	
					}
				}
		
			// Конец изменения выше главной диагонали нули на единицы, единицы на нули
		
			
			// Ниже главной диагонали заполняем все ячейки матрицы смежности нулями
				
				for (var i = 0; i < countVertex; i++) {
					for (var j = 0; j < countVertex; j++) {
						if (i == j) {
							break;
						}
						matrixContiguity[i][j] = 0;
					}
				}
				
			// Конец изменения ниже главной диагонали: заполняем все ячейки матрицы смежности нулями
		
		
			// Вывод матрицы смежности для дополнительного графа
		
				$("#resultMatrixContiguity").append('<ol id="internalStability"></ol>');
				
				$("#internalStability").append("<li>Матрица смежности для дополнительного графа:</li>");
				
				$("#internalStability").append('<br />');
				
				$("#internalStability").append('<table id="matrixContiguity2"></table>');
				
				
				// Если вершины - числа
				if (typeVertex == 1) {
					
					for (var i = 0; i <= countVertex; i++) {
						
						$("#matrixContiguity2").append('<tr id="add'+ i +'"></tr>');
					
						for (var j = 0; j <= countVertex; j++) {

							if (i == 0) {
							
								if (j == 0) {
									$("tr#add"+i).append('<td class="cellMatrixContiguity"></td>');
								}
								else {
									$("tr#add"+i).append('<td class="cellMatrixContiguity">' + j + '</td>');
								}
							}
							else
							if (j == 0) {
							
								if (i == 0) {
									continue;
								}
								else {
									$("tr#add"+i).append('<td class="cellMatrixContiguity">' + i + '</td>');
								}
							} 
							else {
								//$("tr#add"+i).append('<td><input type="text" id="cellMatrix_'+i+','+j + '" value="' + matrixContiguity[i-1][j-1] + '" class="cellMatrixContiguity" /></td>');
								if (i == j) {
									$("tr#add"+i).append('<td><input type="text" id="cellMatrix_'+i+','+j + '" value="' + matrixContiguity[i-1][j-1] + '" class="cellMatrixContiguity cellDiagonal" /></td>');
								}
								else {
									$("tr#add"+i).append('<td><input type="text" id="cellMatrix_'+i+','+j + '" value="' + matrixContiguity[i-1][j-1] + '" class="cellMatrixContiguity" /></td>');
								}
							}
							
						}
						
					}
					
				}
				else
				// Если вершины - буквы
				if (typeVertex == 2) {
				
					for (var i = 0; i <= countVertex; i++) {
						
						$("#matrixContiguity2").append('<tr id="add'+ i +'"></tr>');
					
						for (var j = 0; j <= countVertex; j++) {

							if (i == 0) {
							
								if (j == 0) {
									$("tr#add"+i).append('<td class="cellMatrixContiguity"></td>');
								}
								else {
									$("tr#add"+i).append('<td class="cellMatrixContiguity">' + masForLetterVertex[j-1] + '</td>');
								}
							}
							else
							if (j == 0) {
							
								if (i == 0) {
									continue;
								}
								else {
									$("tr#add"+i).append('<td class="cellMatrixContiguity">' + masForLetterVertex[i-1] + '</td>');
								}
							} 
							else {
								//$("tr#add"+i).append('<td><input type="text" id="cellMatrix_'+i+','+j + '" value="' + matrixContiguity[i-1][j-1] + '" class="cellMatrixContiguity" /></td>');
								if (i == j) {
									$("tr#add"+i).append('<td><input type="text" id="cellMatrix_'+i+','+j + '" value="' + matrixContiguity[i-1][j-1] + '" class="cellMatrixContiguity cellDiagonal" /></td>');
								}
								else {
									$("tr#add"+i).append('<td><input type="text" id="cellMatrix_'+i+','+j + '" value="' + matrixContiguity[i-1][j-1] + '" class="cellMatrixContiguity" /></td>');
								}
							}
							
						}
						
					}
				}
				
				$("#internalStability").append('<br />');
		
			// Конец вывода матрицы смежности для дополнительного графа	

			
			// Нахождение дизъюнктивных пар

				$("#internalStability").append("<li>Дизъюнктивные пары:</li>");
			
				disjunctiveCouple = "";
				
				for (var i = 0; i < countVertex; i++) {
					for (var j = 0; j < countVertex; j++) {
					
						if (matrixContiguity[i][j] == 1) {
						
							// Если вершины - числа
							if (typeVertex == 1) {
								disjunctiveCouple += "(" + (i+1) + "v" +(j+1) +")"; 
							}	
							else
							// Если вершины - буквы
							if (typeVertex == 2) {
								disjunctiveCouple += "(" + masForLetterVertex[i] + "v" +masForLetterVertex[j] +")"; 
							}
							
						}
					
					}
				}
			
				// Вывод дизъюнктивнфх пар
				$("#internalStability").append("<p> КНФ: " + disjunctiveCouple + "</p>");
			
			// Конец нахождения дизъюнктивных пар
		
		
			// Нахождение ДНФ у дизъюнктивных пар
			
				$("#internalStability").append('<li>ДНФ у дизъюнктивных пар:</li>');
			
				// Вызываем свою пользовательскую функцию
				cnfToDnf(disjunctiveCouple, 1);
				
			// Конец нахождения ДНФ у дизъюнктивных пар
			
			
			// Нахождение недостающих вершин из ДНФ для каждой элементарной коньюнкции
				
				// Если вершины - числа
				if (typeVertex == 1) {
				
					for (var i = 0; i < masForOperandResult.length; i++) {
					
						strCellMissingVertex = "";
						
						for (var k = 1; k <= countVertex; k++) {
							
							status = false;							
							
							for (var j = 0; j < masForOperandResult[i].length; j++) {

								if ( k == masForOperandResult[i].charAt(j) ) {
									status = true;
								}
								
							}
						
							if (!status) {
								strCellMissingVertex += k;    
							}
							
						}
						
						if (strCellMissingVertex != "") {
							masMissingVertex[masMissingVertex.length] = strCellMissingVertex;
						}
							
					}
					
				}
				else 
				// Если вершины - буквы
				if (typeVertex == 2) {
				
					for (var i = 0; i < masForOperandResult.length; i++) {
					
						strCellMissingVertex = "";
						
						for (var k = 0; k < countVertex; k++) {
							
							status = false;							
							
							for (var j = 0; j < masForOperandResult[i].length; j++) {

								if ( masForLetterVertex[k] == masForOperandResult[i].charAt(j) ) {
									status = true;
								}
								
							}
						
							if (!status) {
								strCellMissingVertex += masForLetterVertex[k];    
							}
							
						}
						
						if (strCellMissingVertex != "") {
							masMissingVertex[masMissingVertex.length] = strCellMissingVertex;
						}
							
					}
				
				}
			
			// Конец нахождения недостающих вершин из ДНФ для кажой элементарной коньюнкции
			
			
			// Вывод массива, который содержит недостающие вершины
			
				$("#internalStability").append("<li>Недостающие вершины у ДНФ:</li>");
				
				$("#internalStability").append("<br />");
		
				for (var i = 0; i < masMissingVertex.length; i++) {
					
					$("#internalStability").append("{");
					
					for (var j = 0; j < masMissingVertex[i].length; j++) {
						
						if (j == masMissingVertex[i].length-1) {
							$("#internalStability").append(masMissingVertex[i].charAt(j));
						}
						else {
							$("#internalStability").append(masMissingVertex[i].charAt(j) + ", ");
						}
					}
					
					$("#internalStability").append("} ");
				}
				
				$("#internalStability").append("<br /><br />");
				
			// Конец вывода массива, который содержит недостающие вершины 
			
			
			// Нахождение клик графа
			
				maxValue = 0;
				
				for (var i = 0; i < masMissingVertex.length; i++) {
					if ( i == 0) {
						maxValue = masMissingVertex[i].length;
					}
					else {
						if (maxValue < masMissingVertex[i].length) {
							maxValue = masMissingVertex[i].length;
						}
					}
				}
			
				$("#internalStability").append("<li>Максимальный из подграфов дает клику: </li>");
				
				$("#internalStability").append("<br />");
				
				countClikes = 0;
				
				
				for (var i = 0; i < masMissingVertex.length; i++) {
					if (masMissingVertex[i].length == maxValue) {
						countClikes++;
						
						$("#internalStability").append("{");
						
						for (var j = 0; j < masMissingVertex[i].length; j++) {
							
							if (j == masMissingVertex[i].length-1) {
								$("#internalStability").append(masMissingVertex[i].charAt(j));
							}
							else {
								$("#internalStability").append(masMissingVertex[i].charAt(j) + ", ");
							}
							
						}
						
						$("#internalStability").append("} ");
					}
				}
				
				$("#internalStability").append("<br /><br />");
				
				$("#internalStability").append("<li>Количество вышенайденных клик: " + countClikes + "</li>");
				
			// Конец нахождения клик графа
			
		// КОНЕЦ НАХОЖДЕНИЯ КЛИК У ГРАФА
		
		$("#step4").fadeIn("fast");
		
	});
	
});