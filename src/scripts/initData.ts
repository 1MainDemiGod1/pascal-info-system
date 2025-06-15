import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'

const topics = [
  {
    title: 'Введение в Pascal',
    description: 'Основы программирования на языке Pascal',
    subTopics: [
      {
        title: 'Структура программы',
        content: `Программа на Pascal состоит из следующих частей:
1. Заголовок программы
2. Раздел описаний
3. Раздел операторов

Пример:
program HelloWorld;
begin
  writeln('Hello, World!');
end.`,
        examples: [
          `program FirstProgram;
begin
  writeln('Моя первая программа');
end.`
        ],
        test: {
          title: 'Тест по структуре программы',
          description: 'Проверка знаний о структуре программы на Pascal',
          questions: [
            {
              text: 'Какая часть программы обязательна?',
              options: [
                'Заголовок программы',
                'Раздел описаний',
                'Раздел операторов',
                'Все перечисленные'
              ],
              correctAnswer: 3
            },
            {
              text: 'Как заканчивается программа на Pascal?',
              options: [
                'end',
                'end.',
                'stop',
                'finish'
              ],
              correctAnswer: 1
            }
          ],
          type: 'selfCheck'
        }
      },
      {
        title: 'Переменные и типы данных',
        content: `В Pascal есть следующие основные типы данных:
1. Integer - целые числа
2. Real - вещественные числа
3. Char - символы
4. String - строки
5. Boolean - логический тип

Пример объявления переменных:
var
  age: Integer;
  name: String;
  isStudent: Boolean;`,
        examples: [
          `var
  number: Integer;
  price: Real;
  letter: Char;
  text: String;
  flag: Boolean;`
        ],
        test: {
          title: 'Тест по переменным и типам данных',
          description: 'Проверка знаний о переменных и типах данных в Pascal',
          questions: [
            {
              text: 'Какой тип данных используется для целых чисел?',
              options: [
                'Real',
                'Integer',
                'Char',
                'String'
              ],
              correctAnswer: 1
            },
            {
              text: 'Какой тип данных используется для вещественных чисел?',
              options: [
                'Real',
                'Integer',
                'Char',
                'String'
              ],
              correctAnswer: 0
            }
          ],
          type: 'selfCheck'
        }
      }
    ]
  },
  {
    title: 'Управляющие конструкции',
    description: 'Условные операторы и циклы в Pascal',
    subTopics: [
      {
        title: 'Условные операторы',
        content: `В Pascal есть следующие условные операторы:
1. if-then
2. if-then-else
3. case-of

Пример:
if age >= 18 then
  writeln('Совершеннолетний')
else
  writeln('Несовершеннолетний');`,
        examples: [
          `if score >= 60 then
  writeln('Зачет')
else
  writeln('Незачет');`,
          `case grade of
  'A': writeln('Отлично');
  'B': writeln('Хорошо');
  'C': writeln('Удовлетворительно');
  else writeln('Неудовлетворительно');
end;`
        ],
        test: {
          title: 'Тест по условным операторам',
          description: 'Проверка знаний об условных операторах в Pascal',
          questions: [
            {
              text: 'Какой оператор используется для множественного выбора?',
              options: [
                'if-then',
                'if-then-else',
                'case-of',
                'switch'
              ],
              correctAnswer: 2
            },
            {
              text: 'Как заканчивается оператор case?',
              options: [
                'end',
                'end;',
                'endcase',
                'end;'
              ],
              correctAnswer: 3
            }
          ],
          type: 'selfCheck'
        }
      },
      {
        title: 'Циклы',
        content: `В Pascal есть следующие виды циклов:
1. for-to-do
2. while-do
3. repeat-until

Пример:
for i := 1 to 10 do
  writeln(i);`,
        examples: [
          `for i := 1 to 5 do
  writeln(i * i);`,
          `while x > 0 do
begin
  writeln(x);
  x := x - 1;
end;`,
          `repeat
  writeln('Введите число > 0');
  readln(x);
until x > 0;`
        ],
        test: {
          title: 'Тест по циклам',
          description: 'Проверка знаний о циклах в Pascal',
          questions: [
            {
              text: 'Какой цикл выполняется хотя бы один раз?',
              options: [
                'for-to-do',
                'while-do',
                'repeat-until',
                'do-while'
              ],
              correctAnswer: 2
            },
            {
              text: 'Какой цикл используется, когда известно количество повторений?',
              options: [
                'for-to-do',
                'while-do',
                'repeat-until',
                'foreach'
              ],
              correctAnswer: 0
            }
          ],
          type: 'selfCheck'
        }
      }
    ]
  }
]

export const initializeData = async () => {
  try {
    for (const topic of topics) {
      const topicDoc = await addDoc(collection(db, 'topics'), {
        title: topic.title,
        description: topic.description,
        createdAt: new Date(),
        updatedAt: new Date()
      })

      for (const subTopic of topic.subTopics) {
        const testDoc = await addDoc(collection(db, 'tests'), {
          ...subTopic.test,
          createdAt: new Date(),
          updatedAt: new Date()
        })

        await addDoc(collection(db, 'subTopics'), {
          ...subTopic,
          topicId: topicDoc.id,
          test: {
            id: testDoc.id,
            ...subTopic.test
          },
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }
    }
    console.log('Data initialized successfully')
  } catch (error) {
    console.error('Error initializing data:', error)
  }
} 