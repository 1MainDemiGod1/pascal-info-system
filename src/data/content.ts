import { Topic, Test } from '../types'

export const topics: Topic[] = [
  {
    id: '1',
    title: 'Введение в Pascal',
    description: 'Основные понятия и структура программы на Pascal',
    order: 1,
    subTopics: [
      {
        id: '1.1',
        title: 'Структура программы',
        content: `
# Структура программы на Pascal

Программа на Pascal состоит из следующих основных частей:

1. Заголовок программы
2. Раздел описаний
3. Основной блок программы

## Пример структуры:

\`\`\`pascal
program HelloWorld;
var
  message: string;
begin
  message := 'Hello, World!';
  writeln(message);
end.
\`\`\`

## Компоненты:

- **program** - объявление имени программы
- **var** - раздел описания переменных
- **begin** - начало исполняемой части
- **end.** - конец программы
`,
        topicId: '1',
        order: 1
      },
      {
        id: '1.2',
        title: 'Переменные и типы данных',
        content: `
# Переменные и типы данных в Pascal

## Основные типы данных:

1. **Integer** - целые числа
2. **Real** - вещественные числа
3. **Char** - символы
4. **String** - строки
5. **Boolean** - логический тип

## Объявление переменных:

\`\`\`pascal
var
  age: Integer;
  name: String;
  isStudent: Boolean;
\`\`\`
`,
        topicId: '1',
        order: 2
      }
    ]
  },
  {
    id: '2',
    title: 'Управляющие конструкции',
    description: 'Условные операторы и циклы',
    order: 2,
    subTopics: [
      {
        id: '2.1',
        title: 'Условные операторы',
        content: `
# Условные операторы в Pascal

## Оператор if:

\`\`\`pascal
if condition then
  statement;

if condition then
  statement1
else
  statement2;
\`\`\`

## Оператор case:

\`\`\`pascal
case expression of
  value1: statement1;
  value2: statement2;
  else statement3;
end;
\`\`\`
`,
        topicId: '2',
        order: 1
      },
      {
        id: '2.2',
        title: 'Циклы',
        content: `
# Циклы в Pascal

## Цикл for:

\`\`\`pascal
for i := 1 to 10 do
  writeln(i);
\`\`\`

## Цикл while:

\`\`\`pascal
while condition do
  statement;
\`\`\`

## Цикл repeat-until:

\`\`\`pascal
repeat
  statement;
until condition;
\`\`\`
`,
        topicId: '2',
        order: 2
      }
    ]
  },
  {
    id: '3',
    title: 'Процедуры и функции',
    description: 'Создание и использование подпрограмм',
    order: 3,
    subTopics: [
      {
        id: '3.1',
        title: 'Процедуры',
        content: `
# Процедуры в Pascal

Процедура - это подпрограмма, которая выполняет определенную последовательность действий.

## Объявление процедуры:

\`\`\`pascal
procedure PrintMessage(message: string);
begin
  writeln(message);
end;
\`\`\`

## Вызов процедуры:

\`\`\`pascal
PrintMessage('Hello, World!');
\`\`\`

## Процедура с параметрами:

\`\`\`pascal
procedure Swap(var a, b: integer);
var
  temp: integer;
begin
  temp := a;
  a := b;
  b := temp;
end;
\`\`\`
`,
        topicId: '3',
        order: 1
      },
      {
        id: '3.2',
        title: 'Функции',
        content: `
# Функции в Pascal

Функция - это подпрограмма, которая возвращает значение.

## Объявление функции:

\`\`\`pascal
function Sum(a, b: integer): integer;
begin
  Sum := a + b;
end;
\`\`\`

## Вызов функции:

\`\`\`pascal
var
  result: integer;
begin
  result := Sum(5, 3);
  writeln(result); // Выведет: 8
end;
\`\`\`

## Рекурсивные функции:

\`\`\`pascal
function Factorial(n: integer): integer;
begin
  if n <= 1 then
    Factorial := 1
  else
    Factorial := n * Factorial(n - 1);
end;
\`\`\`
`,
        topicId: '3',
        order: 2
      }
    ]
  },
  {
    id: '4',
    title: 'Массивы и записи',
    description: 'Работа с структурами данных',
    order: 4,
    subTopics: [
      {
        id: '4.1',
        title: 'Массивы',
        content: `
# Массивы в Pascal

## Одномерные массивы:

\`\`\`pascal
var
  numbers: array[1..5] of integer;
  i: integer;
begin
  // Заполнение массива
  for i := 1 to 5 do
    numbers[i] := i * i;
    
  // Вывод массива
  for i := 1 to 5 do
    writeln(numbers[i]);
end;
\`\`\`

## Двумерные массивы:

\`\`\`pascal
var
  matrix: array[1..3, 1..3] of integer;
  i, j: integer;
begin
  // Заполнение матрицы
  for i := 1 to 3 do
    for j := 1 to 3 do
      matrix[i, j] := i * j;
      
  // Вывод матрицы
  for i := 1 to 3 do
  begin
    for j := 1 to 3 do
      write(matrix[i, j], ' ');
    writeln;
  end;
end;
\`\`\`
`,
        topicId: '4',
        order: 1
      },
      {
        id: '4.2',
        title: 'Записи',
        content: `
# Записи в Pascal

Запись - это структура данных, содержащая набор полей разных типов.

## Определение типа записи:

\`\`\`pascal
type
  Student = record
    name: string;
    age: integer;
    grade: real;
  end;
\`\`\`

## Работа с записями:

\`\`\`pascal
var
  student: Student;
begin
  // Заполнение полей записи
  student.name := 'John';
  student.age := 20;
  student.grade := 4.5;
  
  // Вывод информации
  writeln('Name: ', student.name);
  writeln('Age: ', student.age);
  writeln('Grade: ', student.grade);
end;
\`\`\`

## Массив записей:

\`\`\`pascal
var
  students: array[1..3] of Student;
  i: integer;
begin
  // Заполнение массива записей
  for i := 1 to 3 do
  begin
    students[i].name := 'Student ' + IntToStr(i);
    students[i].age := 18 + i;
    students[i].grade := 3.5 + i * 0.5;
  end;
  
  // Вывод информации
  for i := 1 to 3 do
  begin
    writeln('Student ', i, ':');
    writeln('  Name: ', students[i].name);
    writeln('  Age: ', students[i].age);
    writeln('  Grade: ', students[i].grade);
  end;
end;
\`\`\`
`,
        topicId: '4',
        order: 2
      }
    ]
  },
  {
    id: '5',
    title: 'Работа с файлами',
    description: 'Ввод-вывод данных в файлы',
    order: 5,
    subTopics: [
      {
        id: '5.1',
        title: 'Текстовые файлы',
        content: `
# Работа с текстовыми файлами в Pascal

## Открытие файла:

\`\`\`pascal
var
  f: Text;
begin
  Assign(f, 'file.txt');
  Rewrite(f); // Создание нового файла
  // или
  Append(f); // Добавление в существующий файл
  // или
  Reset(f); // Открытие существующего файла для чтения
\`\`\`

## Запись в файл:

\`\`\`pascal
var
  f: Text;
begin
  Assign(f, 'file.txt');
  Rewrite(f);
  writeln(f, 'Hello, World!');
  writeln(f, 'This is a test');
  Close(f);
end;
\`\`\`

## Чтение из файла:

\`\`\`pascal
var
  f: Text;
  line: string;
begin
  Assign(f, 'file.txt');
  Reset(f);
  while not Eof(f) do
  begin
    readln(f, line);
    writeln(line);
  end;
  Close(f);
end;
\`\`\`
`,
        topicId: '5',
        order: 1
      },
      {
        id: '5.2',
        title: 'Типизированные файлы',
        content: `
# Работа с типизированными файлами в Pascal

## Определение типа файла:

\`\`\`pascal
type
  Student = record
    name: string[50];
    age: integer;
    grade: real;
  end;
  StudentFile = file of Student;
\`\`\`

## Запись в типизированный файл:

\`\`\`pascal
var
  f: StudentFile;
  student: Student;
begin
  Assign(f, 'students.dat');
  Rewrite(f);
  
  student.name := 'John';
  student.age := 20;
  student.grade := 4.5;
  Write(f, student);
  
  Close(f);
end;
\`\`\`

## Чтение из типизированного файла:

\`\`\`pascal
var
  f: StudentFile;
  student: Student;
begin
  Assign(f, 'students.dat');
  Reset(f);
  
  while not Eof(f) do
  begin
    Read(f, student);
    writeln('Name: ', student.name);
    writeln('Age: ', student.age);
    writeln('Grade: ', student.grade);
  end;
  
  Close(f);
end;
\`\`\`
`,
        topicId: '5',
        order: 2
      }
    ]
  },
  {
    id: '6',
    title: 'Модули',
    description: 'Создание и использование модулей',
    order: 6,
    subTopics: [
      {
        id: '6.1',
        title: 'Создание модулей',
        content: `
# Создание модулей в Pascal

## Структура модуля:

\`\`\`pascal
unit MyUnit;

interface
  // Объявления типов, констант, переменных и заголовков процедур/функций
  type
    TPoint = record
      x, y: integer;
    end;
    
  function Distance(p1, p2: TPoint): real;
  procedure PrintPoint(p: TPoint);

implementation
  // Реализация процедур и функций
  function Distance(p1, p2: TPoint): real;
  begin
    Distance := sqrt(sqr(p2.x - p1.x) + sqr(p2.y - p1.y));
  end;
  
  procedure PrintPoint(p: TPoint);
  begin
    writeln('Point: (', p.x, ', ', p.y, ')');
  end;
end.
\`\`\`

## Использование модуля:

\`\`\`pascal
program Test;
uses MyUnit;

var
  p1, p2: TPoint;
begin
  p1.x := 0; p1.y := 0;
  p2.x := 3; p2.y := 4;
  
  PrintPoint(p1);
  PrintPoint(p2);
  writeln('Distance: ', Distance(p1, p2):0:2);
end.
\`\`\`
`,
        topicId: '6',
        order: 1
      },
      {
        id: '6.2',
        title: 'Стандартные модули',
        content: `
# Стандартные модули Pascal

## Модуль System:

\`\`\`pascal
uses System;
// Содержит базовые типы и процедуры
\`\`\`

## Модуль Math:

\`\`\`pascal
uses Math;
// Математические функции
var
  x: real;
begin
  x := 3.14;
  writeln('sin(x) = ', sin(x):0:4);
  writeln('cos(x) = ', cos(x):0:4);
  writeln('sqrt(x) = ', sqrt(x):0:4);
end;
\`\`\`

## Модуль Crt:

\`\`\`pascal
uses Crt;
// Управление консолью
begin
  ClrScr; // Очистка экрана
  TextColor(Red);
  writeln('Red text');
  TextColor(White);
  writeln('White text');
end;
\`\`\`
`,
        topicId: '6',
        order: 2
      }
    ]
  }
]

export const tests: Test[] = [
  {
    id: '1.1',
    title: 'Тест по структуре программы',
    description: 'Проверьте свои знания о структуре программы на Pascal',
    type: 'self-check',
    subTopicId: '1.1',
    createdAt: new Date(),
    createdBy: 'system',
    questions: [
      {
        id: '1.1.1',
        question: 'Какая часть программы на Pascal является обязательной?',
        options: [
          'Заголовок программы',
          'Раздел описаний',
          'Основной блок программы',
          'Все перечисленные'
        ],
        correctAnswer: 3
      },
      {
        id: '1.1.2',
        question: 'Как обозначается конец программы в Pascal?',
        options: [
          'end',
          'end.',
          'stop',
          'finish'
        ],
        correctAnswer: 1
      },
      {
        id: '1.1.3',
        question: 'В каком разделе программы объявляются переменные?',
        options: [
          'program',
          'var',
          'begin',
          'const'
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: '1.2',
    title: 'Тест по типам данных',
    description: 'Проверьте свои знания о типах данных в Pascal',
    type: 'self-check',
    subTopicId: '1.2',
    createdAt: new Date(),
    createdBy: 'system',
    questions: [
      {
        id: '1.2.1',
        question: 'Какой тип данных используется для хранения целых чисел?',
        options: [
          'Real',
          'Integer',
          'Char',
          'String'
        ],
        correctAnswer: 1
      },
      {
        id: '1.2.2',
        question: 'Какой тип данных используется для хранения одного символа?',
        options: [
          'String',
          'Char',
          'Text',
          'Symbol'
        ],
        correctAnswer: 1
      },
      {
        id: '1.2.3',
        question: 'Какой тип данных используется для хранения логических значений?',
        options: [
          'Logic',
          'Boolean',
          'TrueFalse',
          'Condition'
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: '2.1',
    title: 'Тест по условным операторам',
    description: 'Проверьте свои знания об условных операторах в Pascal',
    type: 'self-check',
    subTopicId: '2.1',
    createdAt: new Date(),
    createdBy: 'system',
    questions: [
      {
        id: '2.1.1',
        question: 'Какой оператор используется для простого условия?',
        options: [
          'if-then',
          'when-then',
          'case-of',
          'select-when'
        ],
        correctAnswer: 0
      },
      {
        id: '2.1.2',
        question: 'Какой оператор используется для множественного выбора?',
        options: [
          'if-then-else',
          'case-of',
          'switch-case',
          'select-case'
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: '2.2',
    title: 'Тест по циклам',
    description: 'Проверьте свои знания о циклах в Pascal',
    type: 'self-check',
    subTopicId: '2.2',
    createdAt: new Date(),
    createdBy: 'system',
    questions: [
      {
        id: '2.2.1',
        question: 'Какой цикл используется, когда известно количество итераций?',
        options: [
          'while',
          'for',
          'repeat-until',
          'do-while'
        ],
        correctAnswer: 1
      },
      {
        id: '2.2.2',
        question: 'Какой цикл выполняется хотя бы один раз?',
        options: [
          'while',
          'for',
          'repeat-until',
          'if-then'
        ],
        correctAnswer: 2
      }
    ]
  },
  {
    id: '3.1',
    title: 'Тест по процедурам',
    description: 'Проверьте свои знания о процедурах в Pascal',
    type: 'self-check',
    subTopicId: '3.1',
    createdAt: new Date(),
    createdBy: 'system',
    questions: [
      {
        id: '3.1.1',
        question: 'Что такое процедура в Pascal?',
        options: [
          'Функция, которая возвращает значение',
          'Подпрограмма, выполняющая последовательность действий',
          'Тип данных',
          'Оператор цикла'
        ],
        correctAnswer: 1
      },
      {
        id: '3.1.2',
        question: 'Как объявляется процедура в Pascal?',
        options: [
          'function имя_процедуры',
          'procedure имя_процедуры',
          'sub имя_процедуры',
          'void имя_процедуры'
        ],
        correctAnswer: 1
      },
      {
        id: '3.1.3',
        question: 'Как передать параметр по ссылке в процедуру?',
        options: [
          'Использовать ключевое слово ref',
          'Использовать ключевое слово var',
          'Использовать ключевое слово pointer',
          'Использовать ключевое слово address'
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: '3.2',
    title: 'Тест по функциям',
    description: 'Проверьте свои знания о функциях в Pascal',
    type: 'self-check',
    subTopicId: '3.2',
    createdAt: new Date(),
    createdBy: 'system',
    questions: [
      {
        id: '3.2.1',
        question: 'Чем функция отличается от процедуры?',
        options: [
          'Функция не может принимать параметры',
          'Функция всегда возвращает значение',
          'Функция не может содержать локальные переменные',
          'Функция не может вызывать другие функции'
        ],
        correctAnswer: 1
      },
      {
        id: '3.2.2',
        question: 'Как объявляется функция в Pascal?',
        options: [
          'procedure имя_функции',
          'function имя_функции',
          'sub имя_функции',
          'void имя_функции'
        ],
        correctAnswer: 1
      },
      {
        id: '3.2.3',
        question: 'Как присвоить значение функции в Pascal?',
        options: [
          'return значение',
          'result := значение',
          'имя_функции := значение',
          'exit(значение)'
        ],
        correctAnswer: 2
      }
    ]
  },
  {
    id: '4.1',
    title: 'Тест по массивам',
    description: 'Проверьте свои знания о массивах в Pascal',
    type: 'self-check',
    subTopicId: '4.1',
    createdAt: new Date(),
    createdBy: 'system',
    questions: [
      {
        id: '4.1.1',
        question: 'Как объявляется одномерный массив в Pascal?',
        options: [
          'array[размер] of тип',
          'array[начало..конец] of тип',
          'array of тип',
          'тип[]'
        ],
        correctAnswer: 1
      },
      {
        id: '4.1.2',
        question: 'Как объявляется двумерный массив в Pascal?',
        options: [
          'array[размер1, размер2] of тип',
          'array[начало1..конец1, начало2..конец2] of тип',
          'array of array of тип',
          'тип[][]'
        ],
        correctAnswer: 1
      },
      {
        id: '4.1.3',
        question: 'Как обратиться к элементу двумерного массива?',
        options: [
          'массив[индекс1][индекс2]',
          'массив[индекс1, индекс2]',
          'массив(индекс1, индекс2)',
          'массив{индекс1, индекс2}'
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: '4.2',
    title: 'Тест по записям',
    description: 'Проверьте свои знания о записях в Pascal',
    type: 'self-check',
    subTopicId: '4.2',
    createdAt: new Date(),
    createdBy: 'system',
    questions: [
      {
        id: '4.2.1',
        question: 'Как объявляется тип записи в Pascal?',
        options: [
          'type имя = struct',
          'type имя = record',
          'type имя = class',
          'type имя = object'
        ],
        correctAnswer: 1
      },
      {
        id: '4.2.2',
        question: 'Как обратиться к полю записи?',
        options: [
          'запись->поле',
          'запись.поле',
          'запись[поле]',
          'запись(поле)'
        ],
        correctAnswer: 1
      },
      {
        id: '4.2.3',
        question: 'Могут ли поля записи быть разных типов?',
        options: [
          'Нет, все поля должны быть одного типа',
          'Да, поля могут быть разных типов',
          'Только если запись объявлена как variant',
          'Только если запись объявлена как union'
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: '5.1',
    title: 'Тест по текстовым файлам',
    description: 'Проверьте свои знания о работе с текстовыми файлами в Pascal',
    type: 'self-check',
    subTopicId: '5.1',
    createdAt: new Date(),
    createdBy: 'system',
    questions: [
      {
        id: '5.1.1',
        question: 'Какой тип используется для текстовых файлов в Pascal?',
        options: [
          'File',
          'Text',
          'String',
          'Char'
        ],
        correctAnswer: 1
      },
      {
        id: '5.1.2',
        question: 'Какая процедура используется для создания нового файла?',
        options: [
          'Open',
          'Create',
          'Rewrite',
          'New'
        ],
        correctAnswer: 2
      },
      {
        id: '5.1.3',
        question: 'Как проверить достижение конца файла?',
        options: [
          'if FileEnd(f) then',
          'if EndOfFile(f) then',
          'if Eof(f) then',
          'if FileEof(f) then'
        ],
        correctAnswer: 2
      }
    ]
  },
  {
    id: '5.2',
    title: 'Тест по типизированным файлам',
    description: 'Проверьте свои знания о работе с типизированными файлами в Pascal',
    type: 'self-check',
    subTopicId: '5.2',
    createdAt: new Date(),
    createdBy: 'system',
    questions: [
      {
        id: '5.2.1',
        question: 'Как объявить типизированный файл?',
        options: [
          'file of тип',
          'typed file of тип',
          'binary file of тип',
          'record file of тип'
        ],
        correctAnswer: 0
      },
      {
        id: '5.2.2',
        question: 'Какая процедура используется для записи в типизированный файл?',
        options: [
          'WriteFile',
          'Write',
          'WriteRecord',
          'WriteBinary'
        ],
        correctAnswer: 1
      },
      {
        id: '5.2.3',
        question: 'Как читать данные из типизированного файла?',
        options: [
          'ReadFile(f, data)',
          'Read(f, data)',
          'ReadRecord(f, data)',
          'ReadBinary(f, data)'
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: '6.1',
    title: 'Тест по созданию модулей',
    description: 'Проверьте свои знания о создании модулей в Pascal',
    type: 'self-check',
    subTopicId: '6.1',
    createdAt: new Date(),
    createdBy: 'system',
    questions: [
      {
        id: '6.1.1',
        question: 'Какое ключевое слово используется для объявления модуля?',
        options: [
          'module',
          'unit',
          'package',
          'library'
        ],
        correctAnswer: 1
      },
      {
        id: '6.1.2',
        question: 'В каком разделе модуля объявляются типы и процедуры?',
        options: [
          'declaration',
          'interface',
          'public',
          'export'
        ],
        correctAnswer: 1
      },
      {
        id: '6.1.3',
        question: 'В каком разделе модуля реализуются процедуры и функции?',
        options: [
          'implementation',
          'body',
          'private',
          'code'
        ],
        correctAnswer: 0
      }
    ]
  },
  {
    id: '6.2',
    title: 'Тест по стандартным модулям',
    description: 'Проверьте свои знания о стандартных модулях Pascal',
    type: 'self-check',
    subTopicId: '6.2',
    createdAt: new Date(),
    createdBy: 'system',
    questions: [
      {
        id: '6.2.1',
        question: 'Какой модуль содержит базовые типы и процедуры?',
        options: [
          'Base',
          'Core',
          'System',
          'Main'
        ],
        correctAnswer: 2
      },
      {
        id: '6.2.2',
        question: 'В каком модуле находятся математические функции?',
        options: [
          'Math',
          'Calc',
          'Numbers',
          'Arithmetic'
        ],
        correctAnswer: 0
      },
      {
        id: '6.2.3',
        question: 'Какой модуль используется для управления консолью?',
        options: [
          'Console',
          'Screen',
          'Crt',
          'Terminal'
        ],
        correctAnswer: 2
      }
    ]
  }
] 