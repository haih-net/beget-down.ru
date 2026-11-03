import type * as React from 'react'
import { sections } from './sections'
export const Content: React.FC = () => (
  <>
    <section id={sections[0].id} tabIndex={-1}>
      <h2>{sections[0].label}</h2>
      <p>
        По моим наблюдениям, к <strong>3 ноября 2026 года, 21:00 МСК</strong>{' '}
        Beget отключил комментарии и эмодзи-реакции в своем официальном
        телеграм-канале. В приложении Telegram реакции пропали, а в веб-версии
        пока ещё отображаются.
      </p>
      <p>
        21:00 — время моего наблюдения, а не установленный момент изменения
        настроек канала. В частности, на веб-странице{' '}
        <a href="https://t.me/beget_official/572">сообщения №572</a> всё ещё
        видны эмодзи и счётчики реакций. То же видно на приложенном скриншоте{' '}
        <a href="https://t.me/beget_official/573">сообщения №573</a>.
      </p>
      <p>
        Наличие прежних реакций в веб-версии само по себе не означает, что можно
        добавить новую. Причину различий между приложением и веб-версией по этим
        наблюдениям установить нельзя.
      </p>
    </section>
    <section id={sections[1].id} tabIndex={-1}>
      <h2>{sections[1].label}</h2>
      <p>
        Сохраняю два скриншота веб-версии, сделанные около 21:00. Они фиксируют
        оставшиеся на веб-страницах реакции; исчезновение эмодзи в приложении
        описано выше по моему наблюдению.
      </p>
      <figure className="telegram-screenshot">
        <a href="/blog/telegram-comments-november-3-2100/beget-572.png">
          <img
            src="/blog/telegram-comments-november-3-2100/beget-572.png"
            width={678}
            height={838}
            loading="lazy"
            alt="Веб-версия сообщения Beget №572: под текстом видны эмодзи и счётчики реакций"
          />
        </a>
        <figcaption>
          <a href="https://t.me/beget_official/572">Сообщение №572</a>. Скриншот
          от 3 ноября 2026 года, 21:00:30 МСК: реакции в веб-версии ещё
          отображаются.
        </figcaption>
      </figure>
      <figure className="telegram-screenshot">
        <a href="/blog/telegram-comments-november-3-2100/beget-573.png">
          <img
            src="/blog/telegram-comments-november-3-2100/beget-573.png"
            width={678}
            height={838}
            loading="lazy"
            alt="Веб-версия сообщения Beget №573: под текстом сохраняются эмодзи-реакции со счётчиками"
          />
        </a>
        <figcaption>
          <a href="https://t.me/beget_official/573">Сообщение №573</a>. Скриншот
          от 3 ноября 2026 года, 21:00:10 МСК: реакции также видны.
        </figcaption>
      </figure>
    </section>
  </>
)
