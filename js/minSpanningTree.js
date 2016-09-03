// Описание: 
//
// Разработал: Матвей Калин, студент группы РИС - 14 - 1б
//
// Дата:

$(document).ready(function() {
	
	// СОЗДАНИЕ ПЕРЕМЕННЫХ
	
		// Количество вершин
		var countVertex = 0;
		
		// Переменная, в которой хранится общая стоимость 
		// всех ребер остовного дерева
		var cost = 0;
	
		// Массив, в котором для каждого элемента 
		// мы храним ссылку на его предка в дереве.
		var parent = new Array();
		
		// Переменная для хранения первого числа в паре
		var a = 0;
		
		// Переменная для хранения второго числа в паре
		var b = 0;
		
		// Переменная для хранения веса ребра между вершинами "a" и "b"
		var l = 0;
		
		// Счетчики
		var count = 0;
		var countG = 0;
		
		// Временная переменная
		//var t1, t2, tw = 0;
		var t1 = 0;
		var t2 = 0;
		var tw = 0;
	  
		// Одномерный массив, в котором храниться граф,
		// у этого массива в каждой ячеки есть еще массив,
		// состоящий из трех ячеек:
		// g[i][0] - Первая вершина
		// g[i][1] - Вторая вершина
		// g[i][2] - Вес ребра, между первой вершиной и второй
		var g = new Array();
		
		// Одномерный массив, в котором храниться 
		// минимальное остовное дерево в графе "g"
		// у этого массива в каждой ячеки есть еще массив,
		// состоящий из трех ячеек:
		// minSpanningTree[i][0] - Первая вершина
		// minSpanningTree[i][1] - Вторая вершина
		// minSpanningTree[i][2] - Вес ребра, между первой вершиной и второй
		var minSpanningTree = new Array();
		
		// Переменная отвечающая за тип вершин, если в переменной содержится "1", то вершины обозначены цифрами.
		// Если в переменной содержится "2", то вершины обозначены буквами.
		var typeVertex = 0;
		
		// Массив, который будет содержать вершины в виде букв
		var masForLetterVertex = new Array();
	
	// КОНЕЦ СОЗДАНИЯ ПЕРЕМЕННЫХ
	
	
	// ОПРЕДЕЛЕНИЕ ФУНКЦИЙ
		
		// Функция, которая ищет лидера во множестве
		function find_set(v) {
			if (v == parent[v]) {
				return v;
			}
			else {
				return find_set(parent[v]);
			}
		} // Конец функции "find_set(v)"
		
		
		// Функция, которая объединяет два множества
		function union_sets(a, b) {
			
			a = find_set(a);
			b = find_set(b);
			
			if (a != b) {
				parent[b] = a;
			}
			
		} // Конец функции "find_set(v)"
	
	
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
		
		// Симметричное заполнение матрицы смежности для неориентированного взвешенного графа
		undirectedWeight();
		
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
		
		
		// ЗАПОЛНЕНИЕ МАССИВА "g"
			
			countG = 0;

			for (var i = 0; i < countVertex; i++) {	
				for (var j = 0; j < countVertex; j++) {
	
					if (Number(document.getElementById('cellMatrix_'+i+','+j).value) != 0) {

						g[countG] = new Array(3);
						
						// Первая вершина, обозначающая откуда мы можем попасть во вторую
						g[countG][0] = i;
						
						// Вторая вершина, обозначающая куда мы можем попасть из первой
						g[countG][1] = j;
						
						// Вес ребра между первой и второй вершиной
						g[countG][2] = Number(document.getElementById('cellMatrix_'+i+','+j).value);
						
						//alert((g[countG][0]+1) + ", " + (g[countG][1]+1) + ", " + g[countG][2]);
						
						countG++;

					}
					
				}
			}
	
		// КОНЕЦ ЗАПОЛНЕНИЯ МАССИВА "g"
		
			
		// ВЫВОД МАССИВА "g"
			/*
			for (var i = 0; i < g.length; i++) {
				for (var j = 0; j < 3; j++) {
				
					if (j==0) {
						alert("Первая вершина: " + (g[i][j]+1) );
					}
					
					if (j==1) {
						alert("Вторая вершина: " + (g[i][j]+1) );
					}
					
					if (j==2) {
						alert("Вес между первой и второй: " + g[i][j]);
					}
				}
			}
			*/
		// КОНЕЦ ВЫВОДА МАССИВА "g"
		
		
		// СОРТИРОВКА ПАР ВЕРШИН В ГРАФЕ "g" ПО ВЕСУ В ПОРЯДКЕ ВОЗРАСТАНИЯ
		
			// Метод пузырька
			for (var i = 0; i < g.length-1; i++) {
				for (var j = 0; j < g.length-i-1; j++) {

					if ( Number(g[j][2]) > Number(g[j+1][2]) ) {
						
						t1 = g[j][0];
						t2 = g[j][1];
						tw = g[j][2];
						
						g[j][0] = g[j+1][0];
						g[j][1] = g[j+1][1];
						g[j][2] = g[j+1][2];
						
						g[j+1][0] = t1;
						g[j+1][1] = t2;
						g[j+1][2] = tw;
					}
				
				}
			}
		
		// КОНЕЦ СОРТИРОВКИ ПАР ВЕРШИН В ГРАФЕ "g" ПО ВЕСУ В ПОРЯДКЕ ВОЗРАСТАНИЯ 
		
		
		// ВЫВОД МАССИВА "g"
		/*
			for (var i = 0; i < g.length; i++) {
				for (var j = 0; j < 3; j++) {
				
					if (j==0) {
						alert("Первая вершина: " + (g[i][j]+1) );
					}
					
					if (j==1) {
						alert("Вторая вершина: " + (g[i][j]+1) );
					}
					
					if (j==2) {
						alert("Вес между первой и второй: " + g[i][j]);
					}
				}
			}
			*/
		// КОНЕЦ ВЫВОДА МАССИВА "g"
		
		
		// ВЫЗЫВАЕМ ПРОЦЕДУРУ "make_set()" В ЦИКЛЕ ДЛЯ КАЖДОЙ ВЕРШИНЫ
		
			for (var i = 0; i < g.length; i++) {
				 parent[i] = i;
			}
		
		// КОНЕЦ ВЫЗЫВА ПРОЦЕДУРЫ "make_set()" В ЦИКЛЕ ДЛЯ КАЖДОЙ ВЕРШИНЫ
	
		
		// ЦИКЛ, КОТОРЫЙ ПРОВЕРЯЕТ СОДЕРЖАТЬСЯ ЛИ ПАРЫ ВЕРШИН В ОДНОМ МНОЖЕСТВЕ
	
			count = 0;
			cost = 0;
			
			for (var i = 0; i < g.length; i++) {
			
				a = g[i][0];
				b = g[i][1];
				l = g[i][2];
				
				// Если вершины из разных множеств, то 
				if ( find_set(a) != find_set(b) ) {
				
					cost += l;
					
					count++;
					
					minSpanningTree[count-1] = new Array(3);
				
					// Записываем в минимальное остовное дерево
					minSpanningTree[count-1][0] = a;
					minSpanningTree[count-1][1] = b;
					minSpanningTree[count-1][2] = l;
					
					union_sets(a, b);
				
				}
			
			}
	
		// КОНЕЦ ЦИКЛА, КОТОРЫЙ ПРОВЕРЯЕТ СОДЕРЖАТЬСЯ ЛИ ПАРЫ ВЕРШИН В ОДНОМ МНОЖЕСТВЕ
	
	
		// ВЫВОД МАССИВА "minSpanningTree", ОН ЯВЛЯЕТСЯ МИНИМАЛЬНЫМ ОСТОВНЫМ ДЕРЕВОМ
	
			$("#resultMatrixContiguity").append('<p>В минимальное остовное дерево входят следующие ребра: </p>');
	
			/*for (var i = 0; i < minSpanningTree.length; i++) {
				//alert((minSpanningTree[i][0]+1) + ", " + (minSpanningTree[i][1]+1) + ", " + minSpanningTree[i][2]);
				$("#resultMatrixContiguity").append('<p> Ребро с вершинами: ' + (minSpanningTree[i][0]+1) + ", " + (minSpanningTree[i][1]+1) + ". Вес этого ребра: " + minSpanningTree[i][2] + '</p>');
			}*/
			
			
			
			for (var i = 0; i < minSpanningTree.length; i++) {
			
				// Если вершины - числа
				if (typeVertex == 1) {
					$("#resultMatrixContiguity").append('<p> Ребро с вершинами: ' + (minSpanningTree[i][0]+1) + ", " + (minSpanningTree[i][1]+1) + ". Вес этого ребра: " + minSpanningTree[i][2] + '</p>');
				}
				else
				// Если вершины - буквы
				if (typeVertex == 2) {
					$("#resultMatrixContiguity").append('<p> Ребро с вершинами: ' + (masForLetterVertex[minSpanningTree[i][0]]) + ", " + (masForLetterVertex[minSpanningTree[i][1]]) + ". Вес этого ребра: " + minSpanningTree[i][2] + '</p>');
				}
			
			}
			
			
			$("#resultMatrixContiguity").append('<p>Общая стоимость: ' + cost + '</p>');
	
		// КОНЕЦ ВЫВОДА МАССИВА "minSpanningTree" 
	
		$("#step4").fadeIn("fast");
	
	});
	
});