import { Topic } from '../types/index'

export const additionalTopics: Topic[] = [
  {
    id: '4',
    title: 'Массивы и строки',
    description: 'Работа с массивами данных и строковыми переменными',
    order: 4,
    subTopics: [
      {
        id: '4.1',
        title: 'Одномерные массивы',
        content: `
# Одномерные массивы в Pascal

Массив - это структура данных, позволяющая хранить несколько значений одного типа.

## Объявление массива:

\`\`\`pascal
var
  numbers: array[1..10] of integer;
  grades: array[1..5] of real;
  names: array[1..20] of string;
\`\`\`

## Работа с элементами массива:

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
  writeln('Введенные числа:');
  for i := 1 to 5 do
    writeln(numbers[i]);
end.
\`\`\`

## Поиск максимального элемента:

\`\`\`pascal
function FindMax(arr: array of integer; size: integer): integer;
var
  i, max: integer;
begin
  max := arr[1];
  for i := 2 to size do
    if arr[i] > max then
      max := arr[i];
  FindMax := max;
end;
\`\`\`
`,
        topicId: '4',
        order: 1
      },
      {
        id: '4.2',
        title: 'Двумерные массивы',
        content: `
# Двумерные массивы в Pascal

Двумерный массив представляет собой таблицу данных.

## Объявление двумерного массива:

\`\`\`pascal
var
  matrix: array[1..3, 1..4] of integer;
  table: array[1..10, 1..10] of real;
\`\`\`

## Заполнение и вывод матрицы:

\`\`\`pascal
program MatrixExample;
var
  matrix: array[1..3, 1..3] of integer;
  i, j: integer;
begin
  // Заполнение матрицы
  writeln('Введите элементы матрицы 3x3:');
  for i := 1 to 3 do
    for j := 1 to 3 do
    begin
      write('matrix[', i, ',', j, '] = ');
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
end.
\`\`\`

## Транспонирование матрицы:

\`\`\`pascal
procedure TransposeMatrix(var matrix: array of array of integer; n: integer);
var
  i, j, temp: integer;
begin
  for i := 1 to n do
    for j := i + 1 to n do
    begin
      temp := matrix[i, j];
      matrix[i, j] := matrix[j, i];
      matrix[j, i] := temp;
    end;
end;
\`\`\`
`,
        topicId: '4',
        order: 2
      },
      {
        id: '4.3',
        title: 'Строковые функции',
        content: `
# Работа со строками в Pascal

Pascal предоставляет множество функций для работы со строками.

## Основные строковые функции:

### Length - длина строки:
\`\`\`pascal
var
  str: string;
  len: integer;
begin
  str := 'Hello World';
  len := Length(str);  // len = 11
end;
\`\`\`

### Copy - копирование подстроки:
\`\`\`pascal
var
  str, substr: string;
begin
  str := 'Programming';
  substr := Copy(str, 1, 4);  // substr = 'Prog'
end;
\`\`\`

### Pos - поиск подстроки:
\`\`\`pascal
var
  str: string;
  position: integer;
begin
  str := 'Pascal Programming';
  position := Pos('Program', str);  // position = 8
end;
\`\`\`

### Delete - удаление подстроки:
\`\`\`pascal
var
  str: string;
begin
  str := 'Hello World';
  Delete(str, 7, 5);  // str = 'Hello '
end;
\`\`\`

### Insert - вставка подстроки:
\`\`\`pascal
var
  str: string;
begin
  str := 'Hello World';
  Insert('Beautiful ', str, 7);  // str = 'Hello Beautiful World'
end;
\`\`\`

## Пример программы обработки строк:

\`\`\`pascal
program StringProcessing;
var
  text: string;
  wordCount, i: integer;
  inWord: boolean;
begin
  write('Введите текст: ');
  readln(text);
  
  wordCount := 0;
  inWord := false;
  
  for i := 1 to Length(text) do
  begin
    if text[i] <> ' ' then
    begin
      if not inWord then
      begin
        inWord := true;
        wordCount := wordCount + 1;
      end;
    end
    else
      inWord := false;
  end;
  
  writeln('Количество слов: ', wordCount);
end.
\`\`\`
`,
        topicId: '4',
        order: 3
      }
    ]
  },
  {
    id: '5',
    title: 'Записи и множества',
    description: 'Сложные типы данных: записи и множества',
    order: 5,
    subTopics: [
      {
        id: '5.1',
        title: 'Записи (Record)',
        content: `
# Записи в Pascal

Запись - это структура данных, объединяющая несколько полей разных типов.

## Объявление записи:

\`\`\`pascal
type
  Student = record
    name: string;
    age: integer;
    grade: real;
    isPresent: boolean;
  end;

var
  pupil: Student;
  class: array[1..30] of Student;
\`\`\`

## Работа с записями:

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
  // Заполнение записи
  write('Имя ученика: ');
  readln(pupil.name);
  write('Возраст: ');
  readln(pupil.age);
  write('Оценка: ');
  readln(pupil.grade);
  
  // Вывод информации
  writeln('Информация об ученике:');
  writeln('Имя: ', pupil.name);
  writeln('Возраст: ', pupil.age);
  writeln('Оценка: ', pupil.grade:0:1);
end.
\`\`\`

## Массив записей:

\`\`\`pascal
program ClassList;
type
  Student = record
    name: string;
    grade: real;
  end;

var
  students: array[1..5] of Student;
  i: integer;
  avgGrade: real;
begin
  // Ввод данных о студентах
  for i := 1 to 5 do
  begin
    writeln('Студент ', i, ':');
    write('Имя: ');
    readln(students[i].name);
    write('Оценка: ');
    readln(students[i].grade);
  end;
  
  // Вычисление средней оценки
  avgGrade := 0;
  for i := 1 to 5 do
    avgGrade := avgGrade + students[i].grade;
  avgGrade := avgGrade / 5;
  
  writeln('Средняя оценка класса: ', avgGrade:0:2);
end.
\`\`\`
`,
        topicId: '5',
        order: 1
      },
      {
        id: '5.2',
        title: 'Множества (Set)',
        content: `
# Множества в Pascal

Множество - это набор уникальных элементов одного типа.

## Объявление множества:

\`\`\`pascal
type
  Digits = set of 0..9;
  Letters = set of 'A'..'Z';
  
var
  numbers: Digits;
  vowels: Letters;
\`\`\`

## Операции с множествами:

\`\`\`pascal
program SetOperations;
type
  Digits = set of 0..9;
  
var
  set1, set2, result: Digits;
begin
  // Создание множеств
  set1 := [1, 3, 5, 7, 9];
  set2 := [2, 4, 6, 8];
  
  // Объединение множеств
  result := set1 + set2;
  
  // Пересечение множеств
  result := set1 * set2;
  
  // Разность множеств
  result := set1 - set2;
  
  // Проверка принадлежности
  if 5 in set1 then
    writeln('5 принадлежит множеству set1');
    
  // Проверка включения
  if [1, 3] <= set1 then
    writeln('[1, 3] является подмножеством set1');
end.
\`\`\`

## Практический пример:

\`\`\`pascal
program VowelCounter;
type
  CharSet = set of char;
  
var
  text: string;
  vowels: CharSet;
  i, count: integer;
begin
  vowels := ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U',
             'а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я',
             'А', 'Е', 'Ё', 'И', 'О', 'У', 'Ы', 'Э', 'Ю', 'Я'];
  
  write('Введите текст: ');
  readln(text);
  
  count := 0;
  for i := 1 to Length(text) do
    if text[i] in vowels then
      count := count + 1;
      
  writeln('Количество гласных букв: ', count);
end.
\`\`\`
`,
        topicId: '5',
        order: 2
      }
    ]
  },
  {
    id: '6',
    title: 'Файлы и ввод-вывод',
    description: 'Работа с файлами и потоками данных',
    order: 6,
    subTopics: [
      {
        id: '6.1',
        title: 'Текстовые файлы',
        content: `
# Работа с текстовыми файлами в Pascal

Файлы позволяют сохранять данные между запусками программы.

## Объявление файловой переменной:

\`\`\`pascal
var
  inputFile, outputFile: text;
\`\`\`

## Открытие файлов:

\`\`\`pascal
// Открытие для чтения
assign(inputFile, 'input.txt');
reset(inputFile);

// Открытие для записи
assign(outputFile, 'output.txt');
rewrite(outputFile);

// Открытие для добавления
assign(outputFile, 'output.txt');
append(outputFile);
\`\`\`

## Чтение из файла:

\`\`\`pascal
program ReadFromFile;
var
  f: text;
  line: string;
  number: integer;
begin
  assign(f, 'data.txt');
  reset(f);
  
  while not eof(f) do
  begin
    readln(f, line);
    writeln('Прочитано: ', line);
  end;
  
  close(f);
end.
\`\`\`

## Запись в файл:

\`\`\`pascal
program WriteToFile;
var
  f: text;
  i: integer;
begin
  assign(f, 'numbers.txt');
  rewrite(f);
  
  for i := 1 to 10 do
    writeln(f, 'Число ', i, ' = ', i * i);
    
  close(f);
  writeln('Данные записаны в файл numbers.txt');
end.
\`\`\`

## Копирование файла:

\`\`\`pascal
program CopyFile;
var
  source, dest: text;
  line: string;
begin
  assign(source, 'source.txt');
  assign(dest, 'copy.txt');
  
  reset(source);
  rewrite(dest);
  
  while not eof(source) do
  begin
    readln(source, line);
    writeln(dest, line);
  end;
  
  close(source);
  close(dest);
  
  writeln('Файл скопирован');
end.
\`\`\`
`,
        topicId: '6',
        order: 1
      },
      {
        id: '6.2',
        title: 'Типизированные файлы',
        content: `
# Типизированные файлы в Pascal

Типизированные файлы хранят данные определенного типа в бинарном формате.

## Объявление типизированного файла:

\`\`\`pascal
type
  Student = record
    name: string[30];
    age: integer;
    grade: real;
  end;

var
  studentFile: file of Student;
  pupil: Student;
\`\`\`

## Работа с типизированными файлами:

\`\`\`pascal
program StudentDatabase;
type
  Student = record
    name: string[30];
    age: integer;
    grade: real;
  end;

var
  studentFile: file of Student;
  pupil: Student;
  choice: integer;

procedure AddStudent;
begin
  assign(studentFile, 'students.dat');
  {$I-}
  reset(studentFile);
  {$I+}
  if IOResult <> 0 then
    rewrite(studentFile)
  else
    seek(studentFile, filesize(studentFile));
    
  write('Имя студента: ');
  readln(pupil.name);
  write('Возраст: ');
  readln(pupil.age);
  write('Оценка: ');
  readln(pupil.grade);
  
  write(studentFile, pupil);
  close(studentFile);
  
  writeln('Студент добавлен в базу данных');
end;

procedure ShowAllStudents;
begin
  assign(studentFile, 'students.dat');
  {$I-}
  reset(studentFile);
  {$I+}
  if IOResult <> 0 then
  begin
    writeln('База данных пуста');
    exit;
  end;
  
  writeln('Список всех студентов:');
  writeln('Имя':30, 'Возраст':10, 'Оценка':10);
  writeln('':50, '-');
  
  while not eof(studentFile) do
  begin
    read(studentFile, pupil);
    writeln(pupil.name:30, pupil.age:10, pupil.grade:10:1);
  end;
  
  close(studentFile);
end;

begin
  repeat
    writeln('1. Добавить студента');
    writeln('2. Показать всех студентов');
    writeln('0. Выход');
    write('Выберите действие: ');
    readln(choice);
    
    case choice of
      1: AddStudent;
      2: ShowAllStudents;
    end;
    
    writeln;
  until choice = 0;
end.
\`\`\`
`,
        topicId: '6',
        order: 2
      }
    ]
  },
  {
    id: '7',
    title: 'Рекурсия и алгоритмы',
    description: 'Рекурсивные функции и основные алгоритмы',
    order: 7,
    subTopics: [
      {
        id: '7.1',
        title: 'Рекурсивные функции',
        content: `
# Рекурсия в Pascal

Рекурсия - это способ решения задач, при котором функция вызывает сама себя.

## Факториал:

\`\`\`pascal
function Factorial(n: integer): longint;
begin
  if n <= 1 then
    Factorial := 1
  else
    Factorial := n * Factorial(n - 1);
end;

program FactorialExample;
var
  num: integer;
begin
  write('Введите число: ');
  readln(num);
  writeln(num, '! = ', Factorial(num));
end.
\`\`\`

## Числа Фибоначчи:

\`\`\`pascal
function Fibonacci(n: integer): longint;
begin
  if n <= 2 then
    Fibonacci := 1
  else
    Fibonacci := Fibonacci(n - 1) + Fibonacci(n - 2);
end;

program FibonacciSequence;
var
  i, count: integer;
begin
  write('Сколько чисел Фибоначчи вывести? ');
  readln(count);
  
  writeln('Последовательность Фибоначчи:');
  for i := 1 to count do
    write(Fibonacci(i), ' ');
  writeln;
end.
\`\`\`

## Ханойские башни:

\`\`\`pascal
procedure Hanoi(n: integer; source, dest, aux: char);
begin
  if n = 1 then
    writeln('Переместить диск с ', source, ' на ', dest)
  else
  begin
    Hanoi(n - 1, source, aux, dest);
    writeln('Переместить диск с ', source, ' на ', dest);
    Hanoi(n - 1, aux, dest, source);
  end;
end;

program HanoiTowers;
var
  disks: integer;
begin
  write('Количество дисков: ');
  readln(disks);
  
  writeln('Решение головоломки "Ханойские башни":');
  Hanoi(disks, 'A', 'C', 'B');
end.
\`\`\`

## Быстрая сортировка:

\`\`\`pascal
procedure QuickSort(var arr: array of integer; low, high: integer);
var
  i, j, pivot, temp: integer;
begin
  if low < high then
  begin
    pivot := arr[high];
    i := low - 1;
    
    for j := low to high - 1 do
    begin
      if arr[j] <= pivot then
      begin
        i := i + 1;
        temp := arr[i];
        arr[i] := arr[j];
        arr[j] := temp;
      end;
    end;
    
    temp := arr[i + 1];
    arr[i + 1] := arr[high];
    arr[high] := temp;
    
    QuickSort(arr, low, i);
    QuickSort(arr, i + 2, high);
  end;
end;
\`\`\`
`,
        topicId: '7',
        order: 1
      },
      {
        id: '7.2',
        title: 'Алгоритмы поиска',
        content: `
# Алгоритмы поиска в Pascal

## Линейный поиск:

\`\`\`pascal
function LinearSearch(arr: array of integer; size, target: integer): integer;
var
  i: integer;
begin
  LinearSearch := -1;
  for i := 0 to size - 1 do
    if arr[i] = target then
    begin
      LinearSearch := i;
      exit;
    end;
end;

program LinearSearchExample;
var
  numbers: array[1..10] of integer;
  i, target, position: integer;
begin
  // Заполнение массива
  writeln('Введите 10 чисел:');
  for i := 1 to 10 do
  begin
    write('Число ', i, ': ');
    readln(numbers[i]);
  end;
  
  write('Какое число искать? ');
  readln(target);
  
  position := LinearSearch(numbers, 10, target);
  
  if position <> -1 then
    writeln('Число найдено на позиции ', position + 1)
  else
    writeln('Число не найдено');
end.
\`\`\`

## Бинарный поиск:

\`\`\`pascal
function BinarySearch(arr: array of integer; size, target: integer): integer;
var
  left, right, mid: integer;
begin
  left := 0;
  right := size - 1;
  BinarySearch := -1;
  
  while left <= right do
  begin
    mid := (left + right) div 2;
    
    if arr[mid] = target then
    begin
      BinarySearch := mid;
      exit;
    end
    else if arr[mid] < target then
      left := mid + 1
    else
      right := mid - 1;
  end;
end;

program BinarySearchExample;
var
  numbers: array[1..10] of integer;
  i, target, position: integer;
begin
  // Заполнение отсортированного массива
  writeln('Введите 10 чисел в порядке возрастания:');
  for i := 1 to 10 do
  begin
    write('Число ', i, ': ');
    readln(numbers[i]);
  end;
  
  write('Какое число искать? ');
  readln(target);
  
  position := BinarySearch(numbers, 10, target);
  
  if position <> -1 then
    writeln('Число найдено на позиции ', position + 1)
  else
    writeln('Число не найдено');
end.
\`\`\`
`,
        topicId: '7',
        order: 2
      },
      {
        id: '7.3',
        title: 'Алгоритмы сортировки',
        content: `
# Алгоритмы сортировки в Pascal

## Сортировка пузырьком:

\`\`\`pascal
procedure BubbleSort(var arr: array of integer; size: integer);
var
  i, j, temp: integer;
begin
  for i := 0 to size - 2 do
    for j := 0 to size - 2 - i do
      if arr[j] > arr[j + 1] then
      begin
        temp := arr[j];
        arr[j] := arr[j + 1];
        arr[j + 1] := temp;
      end;
end;
\`\`\`

## Сортировка выбором:

\`\`\`pascal
procedure SelectionSort(var arr: array of integer; size: integer);
var
  i, j, minIndex, temp: integer;
begin
  for i := 0 to size - 2 do
  begin
    minIndex := i;
    for j := i + 1 to size - 1 do
      if arr[j] < arr[minIndex] then
        minIndex := j;
        
    if minIndex <> i then
    begin
      temp := arr[i];
      arr[i] := arr[minIndex];
      arr[minIndex] := temp;
    end;
  end;
end;
\`\`\`

## Сортировка вставками:

\`\`\`pascal
procedure InsertionSort(var arr: array of integer; size: integer);
var
  i, j, key: integer;
begin
  for i := 1 to size - 1 do
  begin
    key := arr[i];
    j := i - 1;
    
    while (j >= 0) and (arr[j] > key) do
    begin
      arr[j + 1] := arr[j];
      j := j - 1;
    end;
    
    arr[j + 1] := key;
  end;
end;
\`\`\`

## Программа сравнения алгоритмов:

\`\`\`pascal
program SortingComparison;
var
  numbers: array[1..100] of integer;
  i, size, choice: integer;

procedure PrintArray;
begin
  for i := 1 to size do
    write(numbers[i], ' ');
  writeln;
end;

begin
  write('Размер массива (до 100): ');
  readln(size);
  
  writeln('Введите элементы массива:');
  for i := 1 to size do
  begin
    write('Элемент ', i, ': ');
    readln(numbers[i]);
  end;
  
  writeln('Исходный массив:');
  PrintArray;
  
  writeln('Выберите алгоритм сортировки:');
  writeln('1. Сортировка пузырьком');
  writeln('2. Сортировка выбором');
  writeln('3. Сортировка вставками');
  write('Ваш выбор: ');
  readln(choice);
  
  case choice of
    1: BubbleSort(numbers, size);
    2: SelectionSort(numbers, size);
    3: InsertionSort(numbers, size);
  end;
  
  writeln('Отсортированный массив:');
  PrintArray;
end.
\`\`\`
`,
        topicId: '7',
        order: 3
      }
    ]
  },
  {
    id: '8',
    title: 'Графика и визуализация',
    description: 'Создание графических программ в Pascal',
    order: 8,
    subTopics: [
      {
        id: '8.1',
        title: 'Основы графики',
        content: `
# Графика в Pascal

Pascal позволяет создавать графические программы с помощью модуля Graph.

## Инициализация графического режима:

\`\`\`pascal
program GraphicsExample;
uses Graph;

var
  gd, gm: integer;
begin
  gd := Detect;
  InitGraph(gd, gm, '');
  
  if GraphResult <> grOk then
  begin
    writeln('Ошибка инициализации графики');
    halt(1);
  end;
  
  // Графические команды здесь
  
  readln;
  CloseGraph;
end.
\`\`\`

## Основные графические функции:

\`\`\`pascal
program BasicGraphics;
uses Graph;

var
  gd, gm: integer;
begin
  gd := Detect;
  InitGraph(gd, gm, '');
  
  // Установка цвета
  SetColor(Red);
  
  // Рисование линии
  Line(100, 100, 200, 200);
  
  // Рисование прямоугольника
  Rectangle(50, 50, 150, 100);
  
  // Рисование закрашенного прямоугольника
  SetFillStyle(SolidFill, Blue);
  Bar(200, 50, 300, 100);
  
  // Рисование окружности
  Circle(400, 200, 50);
  
  // Рисование закрашенного круга
  SetFillStyle(SolidFill, Green);
  FillEllipse(500, 200, 30, 30);
  
  // Вывод текста
  OutTextXY(100, 300, 'Hello Graphics!');
  
  readln;
  CloseGraph;
end.
\`\`\`

## Анимация:

\`\`\`pascal
program SimpleAnimation;
uses Graph, Crt;

var
  gd, gm, x, y: integer;
  dx, dy: integer;
begin
  gd := Detect;
  InitGraph(gd, gm, '');
  
  x := 100;
  y := 100;
  dx := 2;
  dy := 3;
  
  repeat
    // Очистка экрана
    ClearDevice;
    
    // Рисование мяча
    SetColor(Red);
    SetFillStyle(SolidFill, Red);
    FillEllipse(x, y, 10, 10);
    
    // Обновление позиции
    x := x + dx;
    y := y + dy;
    
    // Отскок от границ
    if (x <= 10) or (x >= GetMaxX - 10) then
      dx := -dx;
    if (y <= 10) or (y >= GetMaxY - 10) then
      dy := -dy;
    
    Delay(50);
  until KeyPressed;
  
  CloseGraph;
end.
\`\`\`
`,
        topicId: '8',
        order: 1
      },
      {
        id: '8.2',
        title: 'Построение графиков',
        content: `
# Построение графиков функций в Pascal

## График синуса:

\`\`\`pascal
program SineGraph;
uses Graph;

var
  gd, gm: integer;
  x, y, centerX, centerY: integer;
  angle: real;
  scale: integer;
begin
  gd := Detect;
  InitGraph(gd, gm, '');
  
  centerX := GetMaxX div 2;
  centerY := GetMaxY div 2;
  scale := 100;
  
  // Рисование осей координат
  SetColor(White);
  Line(0, centerY, GetMaxX, centerY);  // ось X
  Line(centerX, 0, centerX, GetMaxY);  // ось Y
  
  // Подписи осей
  OutTextXY(GetMaxX - 20, centerY + 10, 'X');
  OutTextXY(centerX + 10, 10, 'Y');
  
  // Построение графика синуса
  SetColor(Red);
  angle := -2 * Pi;
  MoveTo(centerX + Round(angle * scale / Pi * 50), 
         centerY - Round(Sin(angle) * scale));
  
  while angle <= 2 * Pi do
  begin
    x := centerX + Round(angle * scale / Pi * 50);
    y := centerY - Round(Sin(angle) * scale);
    LineTo(x, y);
    angle := angle + 0.1;
  end;
  
  // Заголовок
  SetColor(Yellow);
  OutTextXY(10, 10, 'График функции y = sin(x)');
  
  readln;
  CloseGraph;
end.
\`\`\`

## График параболы:

\`\`\`pascal
program ParabolaGraph;
uses Graph;

var
  gd, gm: integer;
  x, y, centerX, centerY: integer;
  t: real;
  scale: integer;
begin
  gd := Detect;
  InitGraph(gd, gm, '');
  
  centerX := GetMaxX div 2;
  centerY := GetMaxY div 2;
  scale := 20;
  
  // Рисование осей
  SetColor(White);
  Line(0, centerY, GetMaxX, centerY);
  Line(centerX, 0, centerX, GetMaxY);
  
  // График параболы y = x²
  SetColor(Green);
  t := -10;
  MoveTo(centerX + Round(t * scale), 
         centerY - Round(t * t * scale / 10));
  
  while t <= 10 do
  begin
    x := centerX + Round(t * scale);
    y := centerY - Round(t * t * scale / 10);
    if (x >= 0) and (x <= GetMaxX) and (y >= 0) and (y <= GetMaxY) then
      LineTo(x, y);
    t := t + 0.1;
  end;
  
  SetColor(Yellow);
  OutTextXY(10, 10, 'График функции y = x²');
  
  readln;
  CloseGraph;
end.
\`\`\`

## Интерактивный график:

\`\`\`pascal
program InteractiveGraph;
uses Graph, Crt;

var
  gd, gm: integer;
  centerX, centerY: integer;
  key: char;
  a, b, c: real;

procedure DrawAxes;
begin
  SetColor(White);
  Line(0, centerY, GetMaxX, centerY);
  Line(centerX, 0, centerX, GetMaxY);
  
  OutTextXY(GetMaxX - 20, centerY + 10, 'X');
  OutTextXY(centerX + 10, 10, 'Y');
end;

procedure DrawParabola(a, b, c: real);
var
  x, y: integer;
  t, func: real;
begin
  SetColor(Red);
  t := -10;
  
  while t <= 10 do
  begin
    func := a * t * t + b * t + c;
    x := centerX + Round(t * 20);
    y := centerY - Round(func * 10);
    
    if (x >= 0) and (x <= GetMaxX) and (y >= 0) and (y <= GetMaxY) then
    begin
      if t = -10 then
        MoveTo(x, y)
      else
        LineTo(x, y);
    end;
    
    t := t + 0.1;
  end;
end;

begin
  gd := Detect;
  InitGraph(gd, gm, '');
  
  centerX := GetMaxX div 2;
  centerY := GetMaxY div 2;
  
  a := 1; b := 0; c := 0;
  
  repeat
    ClearDevice;
    DrawAxes;
    DrawParabola(a, b, c);
    
    SetColor(Yellow);
    OutTextXY(10, 10, 'y = ax² + bx + c');
    OutTextXY(10, 30, 'a = ' + FloatToStr(a));
    OutTextXY(10, 50, 'b = ' + FloatToStr(b));
    OutTextXY(10, 70, 'c = ' + FloatToStr(c));
    OutTextXY(10, 100, 'Управление: Q/A - a, W/S - b, E/D - c, ESC - выход');
    
    key := ReadKey;
    case key of
      'q', 'Q': a := a + 0.1;
      'a', 'A': a := a - 0.1;
      'w', 'W': b := b + 0.1;
      's', 'S': b := b - 0.1;
      'e', 'E': c := c + 1;
      'd', 'D': c := c - 1;
    end;
    
  until key = #27;
  
  CloseGraph;
end.
\`\`\`
`,
        topicId: '8',
        order: 2
      },
      {
        id: '8.3',
        title: 'UML-диаграмма проекта',
        content: `
# UML-диаграмма информационной системы

\`\`\`mermaid
graph TD;
    User["Пользователь"] -->|Регистрируется| System["Система"];
    System -->|Создает аккаунт| FirebaseAuth["Firebase Auth"];
    System -->|Сохраняет данные| Firestore["Firestore Database"];
    User -->|Входит в систему| System;
    System -->|Проверяет данные| FirebaseAuth;
    System -->|Получает роль| Firestore;
    User -->|Изучает темы| ViewContent["Просмотр контента"];
    User -->|Проходит тесты| Testing["Тестирование"];
    Testing -->|Сохраняет результаты| Firestore;
\`\`\`

# Диаграмма последовательности входа

\`\`\`mermaid
sequenceDiagram
    participant User as "Пользователь"
    participant System as "Система"
    participant Firebase as "Firebase"

    User->>System: Ввод логина/пароля
    System->>Firebase: Запрос на аутентификацию
    Firebase-->>System: Пользователь аутентифицирован (UID)
    System->>Firebase: Запрос данных пользователя из Firestore (по UID)
    Firebase-->>System: Данные пользователя (включая роль)
    System-->>User: Предоставление доступа к интерфейсу
\`\`\`
`,
        topicId: '8',
        order: 3
      }
    ]
  }
]; 