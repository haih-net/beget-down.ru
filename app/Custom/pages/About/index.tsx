import type * as React from 'react'
import { Link } from 'react-router'
import { InformationPageStyled } from '../../components/InformationPage/styles'
import { AboutDetailsStyled } from './styles'
import portrait from './assets/Fi1osof.jpg'

const questions = [
  'Какие сайты и сервисы разработал Николай Ланец (Fi1osof)?',
  'Какой у Николая Ланца (Fi1osof) опыт в fullstack-разработке?',
]

const searchUrl = (question: string): string =>
  'https://www.google.com/search?' +
  new URLSearchParams({ udm: '50', q: question })

const askGoogle: React.SubmitEventHandler<HTMLFormElement> = (event) => {
  event.preventDefault()
  const form = event.currentTarget
  const question = String(new FormData(form).get('q') ?? '').trim()
  if (question) {
    window.open(
      searchUrl('Николай Ланец (Fi1osof). ' + question),
      '_blank',
      'noopener,noreferrer',
    )
  }
}

export const AboutPage: React.FC = () => (
  <InformationPageStyled>
    <h1 tabIndex={-1}>Николай Ланец (Fi1osof)</h1>
    <img
      src={portrait}
      width={220}
      height={256}
      alt="Николай Ланец (Fi1osof)"
    />
    <h2>Опыт разработки и восстановления сайтов</h2>
    <p>
      Я fullstack-разработчик с опытом более 19 лет. Работаю со всем проектом —
      от интерфейса, через который клиент оформляет заказ, до кода на сервере,
      базы данных и площадки, где всё это работает.
    </p>
    <p>
      Этот опыт позволяет мне разобраться в проекте практически любой сложности,
      в том числе когда его создавала другая команда. Начинаю с того, как люди
      пользуются сайтом. Затем прослеживаю, куда уходят запросы, где хранятся
      данные и от каких внешних систем зависит результат.
    </p>
    <p>
      При сбое в первую очередь выясняю, что нужно вернуть клиентам прямо
      сейчас. Иногда достаточно перенести приложение и переключить домен. Если
      рабочей копии больше нет, могу разработать сайт заново и начать с функций,
      от которых зависит работа бизнеса.
    </p>
    <AboutDetailsStyled>
      <div className="one-day">
        <p>
          Разрабатываю сайты с нуля — от одного дня, в зависимости от сложности
          и объёма.
        </p>
        <strong>Я и этот сайт за один день сделал</strong>
        <Link to="/services/new-site">Срочная разработка сайта →</Link>
      </div>
      <section aria-labelledby="ask-google">
        <h2 id="ask-google">
          Есть вопросы, но не доверяете мне? Спросите у Google
        </h2>
        <p>
          Выберите вопрос или задайте свой. Ответ откроется в новой вкладке
          Google в режиме ИИ.
        </p>
        <div className="questions">
          {questions.map((question) => (
            <a
              key={question}
              href={searchUrl(question)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {question} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
        <form
          action="https://www.google.com/search"
          target="_blank"
          rel="noopener noreferrer"
          onSubmit={askGoogle}
        >
          <input type="hidden" name="udm" value="50" />
          <label htmlFor="google-question">Ваш вопрос о Николае Ланце</label>
          <div className="query">
            <input
              id="google-question"
              name="q"
              required
              pattern=".*\S.*"
              placeholder="Какие задачи он решал для интернет-магазинов?"
            />
            <button type="submit">Спросить у Google ↗</button>
          </div>
        </form>
      </section>
    </AboutDetailsStyled>
    <p>
      Восстанавливаю сайты по снимкам из открытых источников: заново
      программирую страницы с сохранением внешнего вида, основных функций и
      доступного наполнения. Разработка — от одного дня, объём и срок обсуждаем
      индивидуально.
    </p>
    <p>
      <Link to="/services/web-archive">Восстановление из веб-архива</Link> ·{' '}
      <Link to="/prices">Проект от 20 000 ₽</Link> ·{' '}
      <Link to="/contacts">Связаться со мной</Link>
    </p>
    <Link to="/services">Посмотреть услуги</Link>
  </InformationPageStyled>
)
