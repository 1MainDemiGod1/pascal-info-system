export interface Article {
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

export const articles: Article[] = [
  {
    id: 1,
    title: "Введение в Pascal. Структура программы",
    sections: [
      {
        title: "История языка Pascal",
        anchor: "history",
        content: `Pascal - это язык программирования, названный в честь французского математика Блеза Паскаля.
        Он был разработан Никлаусом Виртом в 1970 году как язык для обучения программированию.`
      },
      {
        title: "Структура программы",
        anchor: "structure",
        content: `Структура программы на Pascal:
\`\`\`pascal
program ProgramName;  // Название программы
uses ...;            // Подключаемые модули
const ...;          // Раздел констант
var ...;            // Раздел переменных
begin               // Начало программы
  // Команды
end.                // Конец программы
\`\`\``
      },
      {
        title: "Первая программа",
        anchor: "first-program",
        content: `Пример простой программы:
\`\`\`pascal
program HelloWorld;
begin
  writeln('Hello, World!');
end.
\`\`\``
      },
      {
        title: "Особенности языка",
        anchor: "features",
        content: `Основные особенности языка Pascal:
        - Строгая типизация
        - Простой и понятный синтаксис
        - Структурное программирование
        - Понятная структура программы`
      }
    ],
    quiz: {
      questions: [
        {
          question: "Какое ключевое слово используется для начала программы?",
          options: ["start", "begin", "program", "var"],
          correctAnswer: 2
        },
        {
          question: "Чем заканчивается программа на Pascal?",
          options: ["end", "end.", "finish", "stop"],
          correctAnswer: 1
        },
        {
          question: "Где объявляются переменные в программе?",
          options: ["В разделе var", "В разделе begin", "После end", "В разделе program"],
          correctAnswer: 0
        },
        {
          question: "Какая команда выводит текст с переходом на новую строку?",
          options: ["write", "writeln", "print", "println"],
          correctAnswer: 1
        },
        {
          question: "Какой знак используется для комментариев в одно строку?",
          options: ["//", "/*", "(*", "#"],
          correctAnswer: 0
        }
      ]
    }
  },
  {
    id: 2,
    title: "Типы данных и переменные",
    sections: [
      {
        title: "Целые типы данных",
        anchor: "integer-types",
        content: `Целые числа в Pascal представлены несколькими типами:
        - Shortint: -128..127
        - Integer: -32768..32767
        - Longint: -2147483648..2147483647

        Пример использования:
\`\`\`pascal
var
  age: integer;
  count: shortint;
  population: longint;
\`\`\``
      },
      {
        title: "Вещественные типы",
        anchor: "real-types",
        content: `Для чисел с дробной частью используются типы:
        - Real: числа с плавающей точкой
        - Double: повышенной точности

        Пример:
\`\`\`pascal
var
  price: real;
  pi: double;
\`\`\``
      },
      {
        title: "Логический и символьный типы",
        anchor: "bool-char-types",
        content: `Логический тип (Boolean):
        - Принимает значения True или False
        - Используется в условиях и циклах

        Символьный тип (Char):
        - Хранит один символ в апострофах
        - Например: 'A', '1', '$'

        Пример:
\`\`\`pascal
var
  isStudent: boolean;
  grade: char;
\`\`\``
      },
      {
        title: "Строковый тип",
        anchor: "string-type",
        content: `String - тип для работы с текстом:
        - Последовательность символов в апострофах
        - Максимальная длина: 255 символов

        Пример:
\`\`\`pascal
var
  name: string;
  address: string[50];  // строка до 50 символов

name := 'Иван';
address := 'ул. Примерная, д.1';
\`\`\``
      },
      {
        title: "Объявление и инициализация",
        anchor: "variables",
        content: `Правила работы с переменными:
        1. Сначала объявляем в разделе var
        2. Затем присваиваем значения через :=
        3. Тип переменной не может быть изменен

        Пример:
\`\`\`pascal
var
  age: integer;
  name: string;
  isStudent: boolean;
  grade: real;

begin
  age := 15;
  name := 'Иван';
  isStudent := True;
  grade := 4.5;
end.
\`\`\``
      }
    ],
    quiz: {
      questions: [
        {
          question: "Какой тип данных используется для хранения целых чисел?",
          options: ["real", "string", "integer", "char"],
          correctAnswer: 2
        },
        {
          question: "Как объявить строковую переменную?",
          options: ["var str: text;", "var str: string;", "var str: char;", "var str: words;"],
          correctAnswer: 1
        },
        {
          question: "Какой оператор используется для присваивания в Pascal?",
          options: ["=", ":=", "->", "=="],
          correctAnswer: 1
        },
        {
          question: "Какой тип данных используется для хранения значений True/False?",
          options: ["logical", "bool", "boolean", "binary"],
          correctAnswer: 2
        },
        {
          question: "Какой тип данных используется для чисел с дробной частью?",
          options: ["integer", "real", "float", "double"],
          correctAnswer: 1
        }
      ]
    }
  },
  {
    id: 3,
    title: "Ввод и вывод данных",
    sections: [
      {
        title: "Вывод данных",
        anchor: "output",
        content: `В Pascal есть две основные процедуры для вывода:

        1. write - вывод без перехода на новую строку
        2. writeln - вывод с переходом на новую строку

        Примеры:
        writeln('Привет, мир!');
        write('Введите число: ');

        Можно выводить несколько значений:
        var
          name: string;
          age: integer;
        begin
          name := 'Иван';
          age := 15;
          writeln('Имя: ', name, ', возраст: ', age);
        end.`
      },
      {
        title: "Форматированный вывод",
        anchor: "formatted-output",
        content: `Для красивого вывода чисел используется форматирование:

        var x: real;
        begin
          x := 3.14159;
          writeln(x:0:2);  // Выведет: 3.14
          writeln(x:6:3);  // Выведет: _3.142 (где _ - пробел)
        end.

        Для целых чисел:
        var n: integer;
        begin
          n := 42;
          writeln(n:4);    // Выведет: __42 (где _ - пробел)
        end.`
      },
      {
        title: "Ввод данных",
        anchor: "input",
        content: `Для ввода данных используются процедуры:

        1. read - ввод без перехода на новую строку
        2. readln - ввод с переходом на новую строку

        Пример ввода числа:
        var
          number: integer;
        begin
          write('Введите число: ');
          readln(number);
          writeln('Вы ввели: ', number);
        end.

        Ввод строки:
        var
          name: string;
        begin
          write('Введите имя: ');
          readln(name);
          writeln('Привет, ', name, '!');
        end.`
      },
      {
        title: "Работа с несколькими значениями",
        anchor: "multiple-io",
        content: `Можно вводить несколько значений:

        var
          a, b: integer;
          name: string;
        begin
          write('Введите два числа: ');
          readln(a, b);
          write('Введите имя: ');
          readln(name);
          writeln(name, ', сумма чисел: ', a + b);
        end.

        Важно помнить:
        - readln без параметров просто ждет нажатия Enter
        - При вводе нескольких значений их нужно разделять пробелом
        - После readln курсор переходит на новую строку`
      }
    ],
    quiz: {
      questions: [
        {
          question: "Какая процедура выводит текст с переходом на новую строку?",
          options: ["write", "writeln", "print", "println"],
          correctAnswer: 1
        },
        {
          question: "Как вывести число 3.14159 с двумя знаками после запятой?",
          options: [
            "writeln(3.14159:2)",
            "writeln(3.14159:0:2)",
            "writeln(3.14159, 2)",
            "writeln(format(3.14159, 2))"
          ],
          correctAnswer: 1
        },
        {
          question: "Какая процедура используется для ввода данных с переходом на новую строку?",
          options: ["read", "readln", "input", "scanf"],
          correctAnswer: 1
        },
        {
          question: "Как ра��деляются несколько значений при вводе?",
          options: [
            "Запятой",
            "Точкой с запятой",
            "Пробелом",
            "Переносом строки"
          ],
          correctAnswer: 2
        },
        {
          question: "Что делает readln без параметров?",
          options: [
            "Ничего",
            "Выводит пустую строку",
            "Ждет нажатия Enter",
            "Вызывает ошибку"
          ],
          correctAnswer: 2
        }
      ]
    }
  },
  {
    id: 4,
    title: "Условные операторы",
    sections: [
      {
        title: "Оператор if",
        anchor: "if",
        content: `Простейшая форма условного оператора:

\`\`\`pascal
if условие then
  оператор;
\`\`\`

Пример:
\`\`\`pascal
var age: integer;
begin
  readln(age);
  if age >= 18 then
    writeln('Вы совершеннолетний');
end.
\`\`\``
      },
      {
        title: "Оператор if-else",
        anchor: "if-else",
        content: `Полная форма условного оператора:

\`\`\`pascal
if условие then
  оператор1
else
  оператор2;
\`\`\`

Пример:
\`\`\`pascal
var grade: integer;
begin
  readln(grade);
  if grade >= 4 then
    writeln('Хорошая оценка')
  else
    writeln('Недостаточно постараться лучше');
end.
\`\`\``
      },
      {
        title: "Составной оператор",
        anchor: "compound",
        content: `Когда нужно выполнить несколько операторов:

\`\`\`pascal
if условие then
begin
  оператор1;
  оператор2;
  оператор3;
end
else
begin
  оператор4;
  оператор5;
end;
\`\`\`

Пример:
\`\`\`pascal
var score: integer;
begin
  readln(score);
  if score > 90 then
  begin
    writeln('Отлично!');
    writeln('Вы получаете дополнительные баллы');
  end
  else
  begin
    writeln('Хорошая попытка');
    writeln('Попробуйте еще раз');
  end;
end.
\`\`\``
      },
      {
        title: "Вложенные условия",
        anchor: "nested-if",
        content: `Условные операторы можно вкладывать друг в друга:

\`\`\`pascal
if условие1 then
  if условие2 then
    оператор1
  else
    оператор2
else
  оператор3;
\`\`\`

Пример:
\`\`\`pascal
var age, height: integer;
begin
  readln(age, height);
  if age >= 12 then
    if height >= 140 then
      writeln('Можно на аттракцион')
    else
      writeln('Недостаточный рост')
  else
    writeln('Недостаточный возраст');
end.
\`\`\``
      }
    ],
    quiz: {
      questions: [
        {
          question: "Какое ключевое слово используется для условного оператора?",
          options: ["when", "if", "switch", "case"],
          correctAnswer: 1
        },
        {
          question: "Что означает else в условном операторе?",
          options: [
            "Всегда выполняется",
            "Никогда не выполняется",
            "Выполняется при истинном условии",
            "Выполняется при ложном условии"
          ],
          correctAnswer: 3
        },
        {
          question: "Как записать составной оператор в Pascal?",
          options: [
            "{ операторы }",
            "begin операторы end",
            "[ операторы ]",
            "операторы"
          ],
          correctAnswer: 1
        },
        {
          question: "Сколько веток else может быть у одного if?",
          options: ["Ни одной", "Только одна", "Две", "Сколько угодно"],
          correctAnswer: 1
        },
        {
          question: "Какой знак используется для сравнения на равенство в Pascal?",
          options: ["==", "=", ":=", "<>"],
          correctAnswer: 1
        }
      ]
    }
  },
  {
    id: 5,
    title: "Оператор выбора case",
    sections: [
      {
        title: "Синтаксис case",
        anchor: "case-syntax",
        content: `Оператор case используется для множественного выбора:

\`\`\`pascal
case переменная of
  значение1: оператор1;
  значение2: оператор2;
  значение3: оператор3;
else
  операторы
end;
\`\`\`

Переменная должна быть порядкового типа (integer, char, boolean, enum).`
      },
      {
        title: "Простой пример",
        anchor: "simple-case",
        content: `Пример использования case:

\`\`\`pascal
var grade: integer;
begin
  readln(grade);
  case grade of
    5: writeln('Отлично');
    4: writeln('Хорошо');
    3: writeln('Удовлетворительно');
    2: writeln('Неудовлетворительно');
  else
    writeln('Некорректная оценка');
  end;
end.
\`\`\``
      },
      {
        title: "Диапазоны значений",
        anchor: "case-ranges",
        content: `В case можно использовать диапазоны значений:

\`\`\`pascal
var age: integer;
begin
  readln(age);
  case age of
    0..2: writeln('Младенец');
    3..6: writeln('Дошкольник');
    7..17: writeln('Школьник');
    18..25: writeln('Студент');
  else
    writeln('Взрослый');
  end;
end.
\`\`\``
      }
    ],
    quiz: {
      questions: [
        {
          question: "Для каких типов данных можно использовать case?",
          options: [
            "Только для целых чисел",
            "Для любых типов данных",
            "Для порядковых типов",
            "Только для строк"
          ],
          correctAnswer: 2
        },
        {
          question: "Можно ли использовать диапазоны значений в case?",
          options: [
            "Нет, только отдельные значения",
            "Да, через две точки (..)",
            "Да, через запятую",
            "Да, через дефис"
          ],
          correctAnswer: 1
        },
        {
          question: "Обязательна ли ветка else в операторе case?",
          options: [
            "Да, всегда",
            "Нет, необязательна",
            "Только при работе с числами",
            "Только при работе со строками"
          ],
          correctAnswer: 1
        }
      ]
    }
  },
  {
    id: 6,
    title: "Циклы в Pascal",
    sections: [
      {
        title: "Цикл for",
        anchor: "for-loop",
        content: `Цикл с известным числом повторений:

\`\`\`pascal
for счетчик := начальное_значение to конечное_значение do
  оператор;
\`\`\`

Пример:
\`\`\`pascal
var i: integer;
begin
  for i := 1 to 5 do
    writeln('Iteration ', i);
end.

Можно использовать downto для обратного отсчета:
for i := 10 downto 1 do
  writeln(i);
\`\`\``
      },
      {
        title: "Цикл while",
        anchor: "while-loop",
        content: `Цикл с предусловием:

\`\`\`pascal
while условие do
  оператор;
\`\`\`

Пример:
\`\`\`pascal
var n: integer;
begin
  n := 1;
  while n <= 5 do
  begin
    writeln(n);
    n := n + 1;
  end;
end.
\`\`\``
      },
      {
        title: "Цикл repeat-until",
        anchor: "repeat-loop",
        content: `Цикл с постусловием:

\`\`\`pascal
repeat
  операторы
until условие;
\`\`\`

Пример:
\`\`\`pascal
var password: string;
begin
  repeat
    write('Введите пароль: ');
    readln(password);
  until password = 'correct';
  writeln('Доступ разрешен');
end.
\`\`\``
      }
    ],
    quiz: {
      questions: [
        {
          question: "Какой цикл используется, когда известно число повторений?",
          options: ["while", "repeat", "for", "loop"],
          correctAnswer: 2
        },
        {
          question: "В каком цикле условие проверяется после выполнения тела цикла?",
          options: ["while", "repeat-until", "for", "do-while"],
          correctAnswer: 1
        },
        {
          question: "Как организовать обратный отсчет в цикле for?",
          options: ["reverse", "backward", "downto", "desc"],
          correctAnswer: 2
        }
      ]
    }
  },
  {
    id: 7,
    title: "Массивы",
    sections: [
      {
        title: "Объявление массивов",
        anchor: "array-declaration",
        content: `Массив - это пронумерованная последовательность элементов одного типа.

        Синтаксис:
\`\`\`pascal
var
  имя_массива: array[нижняя_граница..верхняя_граница] of тип;
\`\`\`

Пример:
\`\`\`pascal
var
  numbers: array[1..5] of integer;
  grades: array[0..10] of real;
  letters: array[1..26] of char;
\`\`\``
      },
      {
        title: "Работа с элементами",
        anchor: "array-elements",
        content: `Доступ к элементам осуществляется по индексу:
\`\`\`pascal
var
  arr: array[1..5] of integer;
  i: integer;
begin
  // Заполнение массива
  for i := 1 to 5 do
    arr[i] := i * 2;
  
  // Вывод массива
  for i := 1 to 5 do
    writeln('arr[', i, '] = ', arr[i]);
end.
\`\`\``
      },
      {
        title: "Многомерные массивы",
        anchor: "multidimensional-arrays",
        content: `Двумерный массив (матрица):
\`\`\`pascal
var
  matrix: array[1..3, 1..3] of integer;
  i, j: integer;
begin
  // Заполнение матрицы
  for i := 1 to 3 do
    for j := 1 to 3 do
      matrix[i,j] := i + j;
end.
\`\`\``
      }
    ],
    quiz: {
      questions: [
        {
          question: "Как объявить массив из 10 целых чисел?",
          options: [
            "var arr: array[10] of integer;",
            "var arr: array[1..10] of integer;",
            "var arr: array(1,10) of integer;",
            "var arr: integer[10];"
          ],
          correctAnswer: 1
        },
        {
          question: "С какого индекса могут начинаться массивы в Pascal?",
          options: [
            "Только с 0",
            "Только с 1",
            "С любого целого числа",
            "Только с положительных чисел"
          ],
          correctAnswer: 2
        },
        {
          question: "Как объявить двумерный массив 3x3?",
          options: [
            "array[3,3] of integer",
            "array[1..3, 1..3] of integer",
            "array[3][3] of integer",
            "array(3,3) of integer"
          ],
          correctAnswer: 1
        }
      ]
    }
  },
  {
    id: 8,
    title: "Процедуры и функции",
    sections: [
      {
        title: "Проце��уры",
        anchor: "procedures",
        content: `Процедура - подпрограмма, выполняющая определенные действия.

        Синтаксис:
\`\`\`pascal
procedure имя_процедуры(параметры);
begin
  операторы
end;
\`\`\`

Пример:
\`\`\`pascal
procedure PrintHello(name: string);
begin
  writeln('Hello, ', name, '!');
end;

begin
  PrintHello('John');
end.
\`\`\``
      },
      {
        title: "Функции",
        anchor: "functions",
        content: `Функция - подпрограмма, возвращающая значение.

        Синтаксис:
\`\`\`pascal
function имя_функции(параметры): тип_результата;
begin
  операторы;
  имя_функции := значение;
end;
\`\`\`

Пример:
\`\`\`pascal
function Square(x: integer): integer;
begin
  Square := x * x;
end;

var n: integer;
begin
  n := Square(5); // n = 25
end.
\`\`\``
      },
      {
        title: "Параметры-значения и параметры-переменные",
        anchor: "parameters",
        content: `Параметры-значения (по умолчанию):
        procedure Test(x: integer);

        Параметры-переменные (с var):
        procedure Swap(var a, b: integer);
        begin
          var temp := a;
          a := b;
          b := temp;
        end;

        Пример использования:
\`\`\`pascal
var x, y: integer;
begin
  x := 5;
  y := 10;
  Swap(x, y);
  // Теперь x = 10, y = 5
end.
\`\`\``
      }
    ],
    quiz: {
      questions: [
        {
          question: "В чем отличие процедуры от функции?",
          options: [
            "Процедура всегда быстрее",
            "Функция возвращает значение, процедура - нет",
            "Процедура может иметь параметры, функция - нет",
            "Нет отличий"
          ],
          correctAnswer: 1
        },
        {
          question: "Как передать параметр по ссылке?",
          options: [
            "Использовать ключевое слово ref",
            "Использовать ключевое слово var",
            "Использовать &",
            "Использовать pointer"
          ],
          correctAnswer: 1
        },
        {
          question: "Может ли функция изменять свои параметры?",
          options: [
            "Нет, никогда",
            "Да, если они объявлены с var",
            "Только глобальные переменные",
            "Только локальные переменные"
          ],
          correctAnswer: 1
        }
      ]
    }
  },
  {
    id: 9,
    title: "Строки и работа с текстом",
    sections: [
      {
        title: "Строковый тип",
        anchor: "string-type",
        content: `В Pascal есть два вида строк:
        1. Короткие строки (String[N]) - до 255 символов
        2. Длинные строки (AnsiString) - без ограничения длины

        Пример объявления:
\`\`\`pascal
var
  name: string[20];     // Строка до 20 символов
  text: string;         // Строка стандартной длины (255)
  long: AnsiString;     // Длинная строка
\`\`\``
      },
      {
        title: "Операции со строками",
        anchor: "string-operations",
        content: `Основные операции:
        1. Конкатенация (объединение): +
        2. Сравнение: =, <>, <, >
        3. Присваивание: :=

        Пример:
\`\`\`pascal
var
  first, last, full: string;
begin
  first := 'Иван';
  last := 'Петров';
  full := first + ' ' + last;  // 'Иван Петров'
end.
\`\`\``
      },
      {
        title: "Встроенные функции для строк",
        anchor: "string-functions",
        content: `Часто используемые функции:

        1. Length(str) - длина строки
        2. Copy(str, start, count) - копирование подстроки
        3. Delete(str, start, count) - удаление части строки
        4. Insert(substr, str, pos) - вставка подстроки
        5. Pos(substr, str) - поиск подстроки

        Пример:
\`\`\`pascal
var s: string;
begin
  s := 'Pascal';
  writeln(Length(s));        // 6
  writeln(Copy(s, 1, 3));    // 'Pas'
  writeln(Pos('cal', s));    // 4
end.
\`\`\``
      }
    ],
    quiz: {
      questions: [
        {
          question: "Какая максимальная длина у стандартной строки в Pascal?",
          options: ["128 символов", "255 символов", "1024 символа", "Без ограничений"],
          correctAnswer: 1
        },
        {
          question: "Какой оператор используется для объединения строк?",
          options: [",", "+", "&", "||"],
          correctAnswer: 1
        },
        {
          question: "Какая функция возвращает длину строки?",
          options: ["size", "length", "strlen", "count"],
          correctAnswer: 1
        },
        {
          question: "Как получить часть строки?",
          options: ["substring", "copy", "slice", "extract"],
          correctAnswer: 1
        }
      ]
    }
  },
  {
    id: 10,
    title: "Файлы и работа с данными",
    sections: [
      {
        title: "Типы файлов",
        anchor: "file-types",
        content: `В Pascal есть три типа файлов:
        1. Текстовые файлы (text)
        2. Типизированные файлы (file of type)
        3. Нетипизированные файлы (file)

        Объявление:
\`\`\`pascal
var
  t: text;              // текстовый файл
  f: file of integer;   // файл целых чисел
  b: file;              // нетипизированный файл
\`\`\``
      },
      {
        title: "Работа с текстовыми файлами",
        anchor: "text-files",
        content: `Основные операции:

        1. Assign(f, 'имя_файла') - связывание с файлом
        2. Reset(f) - открытие для чтения
        3. Rewrite(f) - открытие для записи
        4. Close(f) - закрытие файла

        Пример чтения:
\`\`\`pascal
var
  f: text;
  s: string;
begin
  Assign(f, 'input.txt');
  Reset(f);
  while not Eof(f) do
  begin
    readln(f, s);
    writeln(s);
  end;
  Close(f);
end.
\`\`\``
      },
      {
        title: "Запись в файл",
        anchor: "file-writing",
        content: `Пример записи в файл:

\`\`\`pascal
var
  f: text;
  i: integer;
begin
  Assign(f, 'output.txt');
  Rewrite(f);
  for i := 1 to 10 do
    writeln(f, i);
  Close(f);
end.

Важно:
- Всегда закрывайте файлы после работы
- Проверяйте наличие файла перед чтением
- Используйте {$I+} для обработки ошибок
\`\`\``
      },
      {
        title: "Типизированные файлы",
        anchor: "typed-files",
        content: `Работа с типизированными файлами:

\`\`\`pascal
var
  f: file of integer;
  n: integer;
begin
  Assign(f, 'numbers.dat');
  Rewrite(f);
  for n := 1 to 10 do
    write(f, n);
  Close(f);
  
  Reset(f);
  while not Eof(f) do
  begin
    read(f, n);
    write(n, ' ');
  end;
  Close(f);
end.
\`\`\``
      }
    ],
    quiz: {
      questions: [
        {
          question: "Какой процедурой открывается файл для чтения?",
          options: ["Open", "Reset", "Rewrite", "Read"],
          correctAnswer: 1
        },
        {
          question: "Как проверить достижение конца файла?",
          options: ["EndFile", "Eof", "FileEnd", "IsEnd"],
          correctAnswer: 1
        },
        {
          question: "Какая процедура связывает файловую переменную с реальным файлом?",
          options: ["Connect", "Assign", "Bind", "Link"],
          correctAnswer: 1
        },
        {
          question: "Что произойдет при Rewrite существующего файла?",
          options: [
            "Файл будет дополнен",
            "Файл будет создан заново",
            "Появится ошибка",
            "Ничего не произойдет"
          ],
          correctAnswer: 1
        },
        {
          question: "Какой тип файла используется для хранения данных определенного типа?",
          options: [
            "text",
            "file of type",
            "binary",
            "data"
          ],
          correctAnswer: 1
        }
      ]
    }
  }
] 