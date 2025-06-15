export interface ExtendedArticle {
  id: number;
  title: string;
  sections: {
    title: string;
    anchor: string;
    content: string;
  }[];
  quiz: {
    questions: {
      question: string;
      options: string[];
      correctAnswer: number;
    }[];
  };
}

export const extendedArticles: ExtendedArticle[] = [
  {
    id: 10,
    title: "Массивы в Pascal. Одномерные и многомерные массивы",
    sections: [
      {
        title: "Что такое массив",
        anchor: "array-concept",
        content: `Массив - это структура данных, которая позволяет хранить множество элементов одного типа под одним именем.
        Каждый элемент массива имеет свой индекс (номер), по которому к нему можно обратиться.
        
        Представьте массив как ряд пронумерованных ящиков, в каждом из которых хранится значение.`
      },
      {
        title: "Объявление одномерного массива",
        anchor: "array-declaration",
        content: `Синтаксис объявления массива:
\`\`\`pascal
var
  имя_массива: array[начальный_индекс..конечный_индекс] of тип_элементов;
\`\`\`

Примеры:
\`\`\`pascal
var
  numbers: array[1..10] of integer;     // массив из 10 целых чисел
  grades: array[1..5] of real;          // массив из 5 вещественных чисел
  names: array[0..19] of string;        // массив из 20 строк
  flags: array[1..100] of boolean;      // массив из 100 логических значений
\`\`\``
      },
      {
        title: "Работа с элементами массива",
        anchor: "array-elements",
        content: `Обращение к элементу массива:
\`\`\`pascal
имя_массива[индекс]
\`\`\`

Пример программы:
\`\`\`pascal
program ArrayExample;
var
  numbers: array[1..5] of integer;
  i: integer;
begin
  // Заполнение массива
  for i := 1 to 5 do
  begin
    write('Введите число ', i, ': ');
    readln(numbers[i]);
  end;
  
  // Вывод массива
  writeln('Вы ввели числа:');
  for i := 1 to 5 do
    writeln('numbers[', i, '] = ', numbers[i]);
end.
\`\`\``
      },
      {
        title: "Двумерные массивы",
        anchor: "2d-arrays",
        content: `Двумерный массив можно представить как таблицу с строками и столбцами.

Объявление:
\`\`\`pascal
var
  matrix: array[1..3, 1..4] of integer;  // матрица 3x4
\`\`\`

Пример работы с матрицей:
\`\`\`pascal
program MatrixExample;
var
  matrix: array[1..3, 1..3] of integer;
  i, j, sum: integer;
begin
  // Заполнение матрицы
  for i := 1 to 3 do
    for j := 1 to 3 do
    begin
      write('Введите элемент [', i, ',', j, ']: ');
      readln(matrix[i, j]);
    end;
  
  // Вывод матрицы
  writeln('Матрица:');
  for i := 1 to 3 do
  begin
    for j := 1 to 3 do
      write(matrix[i, j]:4);
    writeln;
  end;
  
  // Сумма элементов главной диагонали
  sum := 0;
  for i := 1 to 3 do
    sum := sum + matrix[i, i];
  writeln('Сумма главной диагонали: ', sum);
end.
\`\`\``
      }
    ],
    quiz: {
      questions: [
        {
          question: "Как правильно объявить массив из 15 целых чисел?",
          options: [
            "var arr: array[15] of integer;",
            "var arr: array[1..15] of integer;",
            "var arr: integer[15];",
            "var arr[1..15]: integer;"
          ],
          correctAnswer: 1
        },
        {
          question: "Какой индекс у первого элемента массива array[5..20]?",
          options: ["0", "1", "5", "20"],
          correctAnswer: 2
        },
        {
          question: "Как обратиться к элементу двумерного массива?",
          options: [
            "matrix(i, j)",
            "matrix[i, j]",
            "matrix[i][j]",
            "matrix{i, j}"
          ],
          correctAnswer: 1
        },
        {
          question: "Сколько элементов в массиве array[0..9, 1..5]?",
          options: ["45", "50", "40", "35"],
          correctAnswer: 1
        }
      ]
    }
  },
  {
    id: 11,
    title: "Строки в Pascal. Функции для работы со строками",
    sections: [
      {
        title: "Строковый тип данных",
        anchor: "string-type",
        content: `Строка в Pascal - это последовательность символов, заключенная в апострофы.
        
        Объявление строковых переменных:
\`\`\`pascal
var
  name: string;              // строка до 255 символов
  shortStr: string[20];      // строка до 20 символов
  message: string[100];      // строка до 100 символов
\`\`\`

Примеры строковых литералов:
\`\`\`pascal
'Hello, World!'
'Pascal Programming'
'Строка на русском языке'
'123456'
\`\`\``
      },
      {
        title: "Основные строковые функции",
        anchor: "string-functions",
        content: `Pascal предоставляет множество функций для работы со строками:

**Length(s)** - возвращает длину строки:
\`\`\`pascal
var
  text: string;
  len: integer;
begin
  text := 'Hello';
  len := Length(text);  // len = 5
end;
\`\`\`

**Copy(s, start, count)** - копирует подстроку:
\`\`\`pascal
var
  original, part: string;
begin
  original := 'Programming';
  part := Copy(original, 1, 4);  // part = 'Prog'
end;
\`\`\`

**Pos(substr, s)** - находит позицию подстроки:
\`\`\`pascal
var
  text: string;
  position: integer;
begin
  text := 'Pascal Language';
  position := Pos('Lang', text);  // position = 8
end;
\`\`\``
      },
      {
        title: "Процедуры для изменения строк",
        anchor: "string-procedures",
        content: `**Delete(s, start, count)** - удаляет часть строки:
\`\`\`pascal
var
  text: string;
begin
  text := 'Hello World';
  Delete(text, 7, 5);  // text = 'Hello '
end;
\`\`\`

**Insert(substr, s, position)** - вставляет подстроку:
\`\`\`pascal
var
  text: string;
begin
  text := 'Hello World';
  Insert('Beautiful ', text, 7);  // text = 'Hello Beautiful World'
end;
\`\`\`

**Concat(s1, s2, ...)** - объединяет строки:
\`\`\`pascal
var
  result: string;
begin
  result := Concat('Hello', ' ', 'World');  // result = 'Hello World'
  // Или можно использовать оператор +
  result := 'Hello' + ' ' + 'World';
end;
\`\`\``
      },
      {
        title: "Практические примеры",
        anchor: "string-examples",
        content: `Программа подсчета слов в тексте:
\`\`\`pascal
program WordCount;
var
  text: string;
  i, words: integer;
  inWord: boolean;
begin
  write('Введите текст: ');
  readln(text);
  
  words := 0;
  inWord := false;
  
  for i := 1 to Length(text) do
  begin
    if text[i] <> ' ' then
    begin
      if not inWord then
      begin
        inWord := true;
        words := words + 1;
      end;
    end
    else
      inWord := false;
  end;
  
  writeln('Количество слов: ', words);
end.
\`\`\`

Программа замены символов:
\`\`\`pascal
program ReplaceChar;
var
  text: string;
  oldChar, newChar: char;
  i: integer;
begin
  write('Введите текст: ');
  readln(text);
  write('Какой символ заменить: ');
  readln(oldChar);
  write('На какой символ заменить: ');
  readln(newChar);
  
  for i := 1 to Length(text) do
    if text[i] = oldChar then
      text[i] := newChar;
      
  writeln('Результат: ', text);
end.
\`\`\``
      }
    ],
    quiz: {
      questions: [
        {
          question: "Какая функция возвращает длину строки?",
          options: ["Size()", "Length()", "Count()", "Len()"],
          correctAnswer: 1
        },
        {
          question: "Что вернет Copy('Programming', 5, 4)?",
          options: ["'gram'", "'ramm'", "'ammi'", "'mmin'"],
          correctAnswer: 0
        },
        {
          question: "Что делает процедура Delete(s, 3, 2)?",
          options: [
            "Удаляет 2 символа начиная с позиции 3",
            "Удаляет символы с позиции 2 до 3",
            "Удаляет 3 символа начиная с позиции 2",
            "Ничего не делает"
          ],
          correctAnswer: 0
        },
        {
          question: "Как объединить строки 'Hello' и 'World'?",
          options: [
            "'Hello' + 'World'",
            "Concat('Hello', 'World')",
            "Оба способа правильные",
            "Join('Hello', 'World')"
          ],
          correctAnswer: 2
        }
      ]
    }
  },
  {
    id: 12,
    title: "Записи в Pascal. Структурированные данные",
    sections: [
      {
        title: "Понятие записи",
        anchor: "record-concept",
        content: `Запись (record) - это структурированный тип данных, который позволяет объединить 
        несколько переменных разных типов под одним именем.
        
        Записи удобно использовать для представления объектов реального мира, 
        которые имеют несколько характеристик.
        
        Например, информация о студенте может включать:
        - Имя (строка)
        - Возраст (целое число)
        - Средний балл (вещественное число)
        - Статус стипендиата (логическое значение)`
      },
      {
        title: "Объявление записи",
        anchor: "record-declaration",
        content: `Синтаксис объявления записи:
\`\`\`pascal
type
  ИмяЗаписи = record
    поле1: тип1;
    поле2: тип2;
    ...
    полеN: типN;
  end;
\`\`\`

Пример:
\`\`\`pascal
type
  Student = record
    name: string;
    age: integer;
    grade: real;
    hasScholarship: boolean;
  end;

var
  pupil: Student;
  class: array[1..30] of Student;
\`\`\``
      },
      {
        title: "Работа с полями записи",
        anchor: "record-fields",
        content: `Обращение к полям записи осуществляется через точку:
\`\`\`pascal
имя_переменной.имя_поля
\`\`\`

Пример программы:
\`\`\`pascal
program StudentRecord;
type
  Student = record
    name: string;
    age: integer;
    grade: real;
  end;

var
  pupil: Student;
begin
  // Заполнение полей записи
  write('Введите имя студента: ');
  readln(pupil.name);
  write('Введите возраст: ');
  readln(pupil.age);
  write('Введите средний балл: ');
  readln(pupil.grade);
  
  // Вывод информации
  writeln('Информация о студенте:');
  writeln('Имя: ', pupil.name);
  writeln('Возраст: ', pupil.age, ' лет');
  writeln('Средний балл: ', pupil.grade:0:2);
  
  // Проверка успеваемости
  if pupil.grade >= 4.5 then
    writeln('Отличник!')
  else if pupil.grade >= 3.5 then
    writeln('Хорошист')
  else
    writeln('Нужно подтянуть учебу');
end.
\`\`\``
      },
      {
        title: "Массивы записей",
        anchor: "array-of-records",
        content: `Часто записи используются в массивах для хранения информации о группе объектов:

\`\`\`pascal
program ClassManagement;
type
  Student = record
    name: string;
    math, physics, chemistry: integer;
    average: real;
  end;

var
  students: array[1..5] of Student;
  i: integer;
  classAverage: real;

procedure CalculateAverage(var s: Student);
begin
  s.average := (s.math + s.physics + s.chemistry) / 3;
end;

begin
  // Ввод данных о студентах
  for i := 1 to 5 do
  begin
    writeln('Студент ', i, ':');
    write('Имя: ');
    readln(students[i].name);
    write('Математика: ');
    readln(students[i].math);
    write('Физика: ');
    readln(students[i].physics);
    write('Химия: ');
    readln(students[i].chemistry);
    
    CalculateAverage(students[i]);
    writeln;
  end;
  
  // Вывод результатов
  writeln('Результаты класса:');
  writeln('Имя':20, 'Мат':5, 'Физ':5, 'Хим':5, 'Ср.':8);
  writeln('':43, '-');
  
  classAverage := 0;
  for i := 1 to 5 do
  begin
    with students[i] do
    begin
      writeln(name:20, math:5, physics:5, chemistry:5, average:8:2);
      classAverage := classAverage + average;
    end;
  end;
  
  classAverage := classAverage / 5;
  writeln('Средний балл по классу: ', classAverage:0:2);
end.
\`\`\``
      }
    ],
    quiz: {
      questions: [
        {
          question: "Как объявляется запись в Pascal?",
          options: [
            "type Name = struct ... end;",
            "type Name = record ... end;",
            "type Name = class ... end;",
            "record Name = ... end;"
          ],
          correctAnswer: 1
        },
        {
          question: "Как обратиться к полю записи?",
          options: [
            "record->field",
            "record.field",
            "record[field]",
            "record::field"
          ],
          correctAnswer: 1
        },
        {
          question: "Что позволяет делать оператор with?",
          options: [
            "Создавать новые записи",
            "Упрощать обращение к полям записи",
            "Копировать записи",
            "Удалять записи"
          ],
          correctAnswer: 1
        },
        {
          question: "Могут ли поля записи иметь разные типы данных?",
          options: [
            "Нет, все поля должны быть одного типа",
            "Да, поля могут иметь разные типы",
            "Только числовые типы",
            "Только строковые типы"
          ],
          correctAnswer: 1
        }
      ]
    }
  }
]; 