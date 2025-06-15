import React, { useEffect, useRef } from 'react'
// mermaid will be loaded dynamically from CDN to avoid bundler issues

const diagram = `graph LR
    Student((Студент)) --> Register{{"Регистрация"}}
    Student --> Login{{"Вход в систему"}}
    Student --> Browse{{"Просмотр тем"}}
    Student --> ReadSub{{"Чтение подтем"}}
    Student --> SelfTest{{"Пройти самоконтроль"}}
    Student --> ViewFeed{{"Просмотр обратной связи"}}
    Student --> FinalTest{{"Пройти итоговый тест"}}
    Student --> ViewRes{{"Просмотр результатов"}}
    Student --> UpdateProf{{"Обновить профиль"}}

    Teacher((Преподаватель)) --> Login
    Teacher --> ManageContent{{"Управление темами/подтемами"}}
    Teacher --> CreateTests{{"Создание/Редактирование тестов"}}
    Teacher --> ViewStudRes{{"Просмотр результатов студентов"}}

    Admin((Администратор)) --> Login
    Admin --> ManageUsers{{"Управление пользователями"}}
    Admin --> ManageContentA{{"Управление контентом"}}
    Admin --> SysSettings{{"Настройки системы"}}
`;

export default function UseCaseDiagram(){
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mounted = true;

    const render = async () => {
      try {
        const mermaid = (window as any).mermaid;
        if (ref.current && mermaid) {
          const { svg } = await mermaid.render('useCaseDiagramSvg', diagram);
          if (mounted && ref.current) {
            ref.current.innerHTML = svg;
          }
        }
      } catch (e) {
        if (ref.current) {
          ref.current.innerHTML = 'Error rendering diagram';
        }
        console.error(e);
      }
    };

    if ((window as any).mermaid) {
      render();
    } else {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js';
      script.onload = () => {
        const mermaid = (window as any).mermaid
        mermaid.initialize({ startOnLoad: true, theme: 'base' });
        render()
      }
      document.body.appendChild(script);
    }

    return () => {
      mounted = false;
    };
  }, []);

  return <div ref={ref} />;
} 