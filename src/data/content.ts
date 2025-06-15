import { Topic, Test } from '../types/index'
import { additionalTopics } from './additionalTopics'
import { extendedTests } from './extendedTests'

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
    numbers[i] := i * 2;
    
  // Вывод массива
  for i := 1 to 5 do
    write(numbers[i], ' ');
end.
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
      matrix[i,j] := i + j;
      
  // Вывод матрицы
  for i := 1 to 3 do
  begin
    for j := 1 to 3 do
      write(matrix[i,j], ' ');
    writeln;
  end;
end.
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

Запись - это структура данных, которая может содержать поля разных типов.

## Объявление записи:

\`\`\`pascal
type
  Student = record
    name: string;
    age: integer;
    grade: real;
  end;

var
  student1: Student;
begin
  // Заполнение полей записи
  student1.name := 'John';
  student1.age := 20;
  student1.grade := 4.5;
  
  // Вывод данных
  writeln('Name: ', student1.name);
  writeln('Age: ', student1.age);
  writeln('Grade: ', student1.grade);
end.
\`\`\`

## Массив записей:

\`\`\`pascal
type
  Student = record
    name: string;
    age: integer;
    grade: real;
  end;

var
  students: array[1..3] of Student;
  i: integer;
begin
  // Заполнение массива записей
  students[1].name := 'John';
  students[1].age := 20;
  students[1].grade := 4.5;
  
  students[2].name := 'Mary';
  students[2].age := 19;
  students[2].grade := 4.8;
  
  students[3].name := 'Peter';
  students[3].age := 21;
  students[3].grade := 4.2;
  
  // Вывод данных
  for i := 1 to 3 do
  begin
    writeln('Student ', i, ':');
    writeln('Name: ', students[i].name);
    writeln('Age: ', students[i].age);
    writeln('Grade: ', students[i].grade);
    writeln;
  end;
end.
\`\`\`
`,
        topicId: '4',
        order: 2
      }
    ]
  },
  {
    id: '5',
    title: 'Файловый ввод-вывод',
    description: 'Работа с файлами в Pascal',
    order: 5,
    subTopics: [
      {
        id: '5.1',
        title: 'Текстовые файлы',
        content: `
# Работа с текстовыми файлами в Pascal

## Запись в файл:

\`\`\`pascal
var
  f: text;
begin
  assign(f, 'output.txt');
  rewrite(f);
  writeln(f, 'Hello, World!');
  writeln(f, 'This is a test file.');
  close(f);
end.
\`\`\`

## Чтение из файла:

\`\`\`pascal
var
  f: text;
  line: string;
begin
  assign(f, 'input.txt');
  reset(f);
  while not eof(f) do
  begin
    readln(f, line);
    writeln(line);
  end;
  close(f);
end.
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

## Запись в типизированный файл:

\`\`\`pascal
type
  Student = record
    name: string[30];
    age: integer;
    grade: real;
  end;

var
  f: file of Student;
  student: Student;
begin
  assign(f, 'students.dat');
  rewrite(f);
  
  student.name := 'John';
  student.age := 20;
  student.grade := 4.5;
  write(f, student);
  
  student.name := 'Mary';
  student.age := 19;
  student.grade := 4.8;
  write(f, student);
  
  close(f);
end.
\`\`\`

## Чтение из типизированного файла:

\`\`\`pascal
type
  Student = record
    name: string[30];
    age: integer;
    grade: real;
  end;

var
  f: file of Student;
  student: Student;
begin
  assign(f, 'students.dat');
  reset(f);
  
  while not eof(f) do
  begin
    read(f, student);
    writeln('Name: ', student.name);
    writeln('Age: ', student.age);
    writeln('Grade: ', student.grade);
    writeln;
  end;
  
  close(f);
end.
\`\`\`
`,
        topicId: '5',
        order: 2
      }
    ]
  }
]

// Объединяем основные темы с дополнительными
export const allTopics: Topic[] = [...topics, ...additionalTopics]

export const tests: Test[] = [
  {
    id: '1',
    title: 'Тест по основам Pascal',
    description: 'Проверка знаний основных понятий языка Pascal',
    questions: [
      {
        id: '1.1',
        text: 'Какая структура является обязательной в программе на Pascal?',
        options: [
          'Только begin..end',
          'program, begin..end',
          'var, begin..end',
          'program, var, begin..end'
        ],
        correctAnswer: 3
      },
      {
        id: '1.2',
        text: 'Какой тип данных используется для хранения целых чисел?',
        options: [
          'Real',
          'Integer',
          'String',
          'Boolean'
        ],
        correctAnswer: 1
      },
      {
        id: '1.3',
        text: 'Как объявляется переменная в Pascal?',
        options: [
          'variable name: type',
          'var name: type',
          'name := type',
          'type name'
        ],
        correctAnswer: 1
      }
    ],
    timeLimit: 10,
    type: 'selfCheck'
  },
  {
    id: '2',
    title: 'Тест по управляющим конструкциям',
    description: 'Проверка знаний условных операторов и циклов',
    questions: [
      {
        id: '2.1',
        text: 'Какой оператор используется для множественного выбора?',
        options: [
          'if',
          'case',
          'switch',
          'select'
        ],
        correctAnswer: 1
      },
      {
        id: '2.2',
        text: 'Какой цикл выполняется хотя бы один раз?',
        options: [
          'for',
          'while',
          'repeat-until',
          'do-while'
        ],
        correctAnswer: 2
      },
      {
        id: '2.3',
        text: 'Как записывается условие в операторе if?',
        options: [
          'if (condition) then',
          'if condition then',
          'if condition:',
          'if condition do'
        ],
        correctAnswer: 1
      }
    ],
    timeLimit: 10,
    type: 'selfCheck'
  },
  {
    id: '3',
    title: 'Тест по процедурам и функциям',
    description: 'Проверка знаний подпрограмм в Pascal',
    questions: [
      {
        id: '3.1',
        text: 'Чем отличается функция от процедуры?',
        options: [
          'Функция не может иметь параметров',
          'Функция всегда возвращает значение',
          'Процедура не может изменять параметры',
          'Нет различий'
        ],
        correctAnswer: 1
      },
      {
        id: '3.2',
        text: 'Как объявляется функция в Pascal?',
        options: [
          'function name: type',
          'function name(): type',
          'function name(parameters): type',
          'type function name'
        ],
        correctAnswer: 2
      },
      {
        id: '3.3',
        text: 'Как передать параметр по ссылке в Pascal?',
        options: [
          'Использовать ключевое слово ref',
          'Использовать ключевое слово var',
          'Использовать ключевое слово out',
          'Использовать символ &'
        ],
        correctAnswer: 1
      }
    ],
    timeLimit: 10,
    type: 'selfCheck'
  },
  {
    id: '4',
    title: 'Тест по массивам и записям',
    description: 'Проверка знаний структур данных в Pascal',
    questions: [
      {
        id: '4.1',
        text: 'Как объявляется одномерный массив в Pascal?',
        options: [
          'array[1..n] of type',
          'type[] name',
          'name: array of type',
          'array type name[n]'
        ],
        correctAnswer: 0
      },
      {
        id: '4.2',
        text: 'Как объявляется запись в Pascal?',
        options: [
          'record name { fields }',
          'type name = record fields end',
          'struct name { fields }',
          'class name { fields }'
        ],
        correctAnswer: 1
      },
      {
        id: '4.3',
        text: 'Как обратиться к полю записи в Pascal?',
        options: [
          'record.field',
          'record->field',
          'record[field]',
          'record:field'
        ],
        correctAnswer: 0
      }
    ],
    timeLimit: 10,
    type: 'selfCheck'
  },
  {
    id: '5',
    title: 'Тест по файловому вводу-выводу',
    description: 'Проверка знаний работы с файлами в Pascal',
    questions: [
      {
        id: '5.1',
        text: 'Какой оператор используется для открытия файла на запись?',
        options: [
          'open',
          'rewrite',
          'create',
          'write'
        ],
        correctAnswer: 1
      },
      {
        id: '5.2',
        text: 'Какой оператор используется для открытия файла на чтение?',
        options: [
          'read',
          'reset',
          'open',
          'load'
        ],
        correctAnswer: 1
      },
      {
        id: '5.3',
        text: 'Как закрыть файл в Pascal?',
        options: [
          'close(file)',
          'file.close()',
          'close file',
          'end file'
        ],
        correctAnswer: 0
      }
    ],
    timeLimit: 10,
    type: 'selfCheck'
  }
]

// Объединяем основные тесты с дополнительными
export const allTests: Test[] = [...tests, ...extendedTests] 