import { Test } from '../types/index'

export const extendedTests: Test[] = [
  {
    id: '6',
    title: 'Тест по массивам',
    description: 'Проверка знаний работы с одномерными и двумерными массивами',
    questions: [
      {
        id: '6.1',
        text: 'Как правильно объявить массив из 10 целых чисел в Pascal?',
        options: [
          'var arr: array[10] of integer;',
          'var arr: array[1..10] of integer;',
          'var arr: integer[10];',
          'var arr[10]: integer;'
        ],
        correctAnswer: 1
      },
      {
        id: '6.2',
        text: 'Какой индекс имеет первый элемент массива array[5..15]?',
        options: [
          '0',
          '1',
          '5',
          '15'
        ],
        correctAnswer: 2
      },
      {
        id: '6.3',
        text: 'Как обратиться к элементу двумерного массива?',
        options: [
          'matrix(i, j)',
          'matrix[i, j]',
          'matrix[i][j]',
          'matrix{i, j}'
        ],
        correctAnswer: 1
      },
      {
        id: '6.4',
        text: 'Что произойдет при обращении к несуществующему элементу массива?',
        options: [
          'Вернется 0',
          'Вернется nil',
          'Произойдет ошибка времени выполнения',
          'Программа продолжит работу'
        ],
        correctAnswer: 2
      },
      {
        id: '6.5',
        text: 'Как найти максимальный элемент в массиве?',
        options: [
          'Использовать функцию max()',
          'Перебрать все элементы в цикле',
          'Отсортировать массив',
          'Использовать оператор case'
        ],
        correctAnswer: 1
      }
    ],
    timeLimit: 15,
    type: 'selfCheck'
  },
  {
    id: '7',
    title: 'Тест по строкам',
    description: 'Проверка знаний работы со строковыми данными',
    questions: [
      {
        id: '7.1',
        text: 'Какая функция возвращает длину строки в Pascal?',
        options: [
          'Size()',
          'Length()',
          'Count()',
          'Len()'
        ],
        correctAnswer: 1
      },
      {
        id: '7.2',
        text: 'Как извлечь подстроку из строки s начиная с позиции 3 длиной 5 символов?',
        options: [
          'Substring(s, 3, 5)',
          'Copy(s, 3, 5)',
          'Mid(s, 3, 5)',
          'Extract(s, 3, 5)'
        ],
        correctAnswer: 1
      },
      {
        id: '7.3',
        text: 'Какая функция находит позицию подстроки в строке?',
        options: [
          'Find()',
          'Search()',
          'Pos()',
          'Index()'
        ],
        correctAnswer: 2
      },
      {
        id: '7.4',
        text: 'Как добавить строку в конец другой строки?',
        options: [
          'Использовать оператор +',
          'Использовать функцию Concat()',
          'Использовать процедуру Insert()',
          'Все перечисленные способы'
        ],
        correctAnswer: 3
      },
      {
        id: '7.5',
        text: 'Что делает процедура Delete(s, 3, 2)?',
        options: [
          'Удаляет 2 символа начиная с позиции 3',
          'Удаляет символы с позиции 2 до позиции 3',
          'Удаляет 3 символа начиная с позиции 2',
          'Удаляет символ на позиции 3'
        ],
        correctAnswer: 0
      }
    ],
    timeLimit: 12,
    type: 'selfCheck'
  },
  {
    id: '8',
    title: 'Комплексный тест по Pascal',
    description: 'Итоговый тест по всем темам Pascal для 8 класса',
    questions: [
      {
        id: '8.1',
        text: 'Какая структура программы на Pascal является правильной?',
        options: [
          'program Name; begin ... end;',
          'program Name; var ...; begin ... end.',
          'begin program Name; ... end.',
          'Name: program; begin ... end.'
        ],
        correctAnswer: 1
      },
      {
        id: '8.2',
        text: 'Какой оператор используется для присваивания в Pascal?',
        options: [
          '=',
          ':=',
          '==',
          '<-'
        ],
        correctAnswer: 1
      },
      {
        id: '8.3',
        text: 'Что выведет программа: writeln(5 div 2, \' \', 5 mod 2);?',
        options: [
          '2.5 0',
          '2 1',
          '2.5 1',
          '3 1'
        ],
        correctAnswer: 1
      },
      {
        id: '8.4',
        text: 'Какой цикл всегда выполняется хотя бы один раз?',
        options: [
          'for',
          'while',
          'repeat-until',
          'Все перечисленные'
        ],
        correctAnswer: 2
      },
      {
        id: '8.5',
        text: 'Чем отличается процедура от функции?',
        options: [
          'Процедура не может иметь параметров',
          'Функция всегда возвращает значение',
          'Процедура выполняется быстрее',
          'Нет различий'
        ],
        correctAnswer: 1
      }
    ],
    timeLimit: 25,
    type: 'final'
  }
]; 