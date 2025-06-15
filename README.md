# Pascal Learning System

Информационная система для обучения программированию на языке Pascal.

## Функциональность

### Для студентов
- Просмотр теоретического материала
- Прохождение тестов для самоконтроля
- Прохождение тестов для проверки знаний
- Просмотр результатов тестов

### Для преподавателей
- Создание и редактирование тем
- Создание и редактирование подтем
- Создание и редактирование тестов
- Просмотр статистики успеваемости

### Для администраторов
- Управление пользователями
- Управление ролями пользователей
- Просмотр системной статистики

## Технологии

- React
- TypeScript
- Material-UI
- Firebase (Authentication, Firestore)

## Установка и запуск

1. Клонируйте репозиторий:
```bash
git clone https://github.com/your-username/pascal-info-system.git
cd pascal-info-system
```

2. Установите зависимости:
```bash
npm install
```

3. Создайте файл `.env` в корневой директории и добавьте конфигурацию Firebase:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Запустите приложение:
```bash
npm run dev
```

## Структура проекта

```
src/
  ├── components/     # React компоненты
  ├── contexts/       # React контексты
  ├── pages/         # Страницы приложения
  ├── types/         # TypeScript типы
  ├── firebase.ts    # Конфигурация Firebase
  ├── App.tsx        # Корневой компонент
  └── main.tsx       # Точка входа

docs/
  └── use-case-diagram.puml  # UML-диаграмма прецедентов
```

## UML-диаграмма

UML-диаграмма прецедентов находится в файле `docs/use-case-diagram.puml`. Для генерации изображения диаграммы используйте PlantUML.

## Лицензия

MIT
