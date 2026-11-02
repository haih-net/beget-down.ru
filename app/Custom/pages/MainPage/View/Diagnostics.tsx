import { useState, useCallback } from 'react'
import type * as React from 'react'
import { useDomainDiagnosticsQuery } from 'app/gql/generated'
import { Subscription } from './Subscription'

export const Diagnostics: React.FC = () => {
  const [subscription, setSubscription] = useState(false)
  const { data, loading, error, refetch } = useDomainDiagnosticsQuery({
    fetchPolicy: 'no-cache',
    ssr: false,
    notifyOnNetworkStatusChange: true,
  })
  const snapshot = data?.domainDiagnostics
  const onRefresh = useCallback(
    (event: React.SubmitEvent<HTMLFormElement>) => {
      event.preventDefault()
      const domain = new FormData(event.currentTarget).get('domain')
      void refetch({
        domain: (typeof domain === 'string' && domain.trim()) || null,
        refresh: true,
      }).catch(() => undefined)
    },
    [refetch],
  )
  const open = useCallback(() => setSubscription(true), [])
  const close = useCallback(() => setSubscription(false), [])
  return (
    <section id="diagnostics" tabIndex={-1}>
      <p className="label">01 / Проверка с сервера сводки</p>
      <h2>Можно ли переключить домен?</h2>
      <p>
        Начальная проверка — для beget.ru. Введите свой домен, чтобы увидеть его
        регистратора и ответы DNS.
      </p>
      <form className="probe-actions" onSubmit={onRefresh}>
        <label>
          Домен или поддомен{' '}
          <input
            name="domain"
            placeholder="beget.ru"
            maxLength={254}
            spellCheck={false}
          />
        </label>
        <button type="submit" disabled={loading}>
          Обновить
        </button>
      </form>
      {loading && <p role="status">Идёт проверка…</p>}
      {error && <p role="alert">{error.message}</p>}
      {snapshot && (
        <>
          <p>
            <strong>{snapshot.domain}</strong> · Замер завершён{' '}
            {new Date(snapshot.checkedAt).toLocaleString('ru-RU', {
              timeZone: 'Europe/Moscow',
            })}{' '}
            МСК
          </p>
          <div className="cards">
            {snapshot.checks.map((check) => (
              <article key={check.label}>
                <span className="probe-state" data-result={check.state}>
                  {check.state === 'observed'
                    ? 'Получен ответ'
                    : check.state === 'failed'
                      ? 'Проверка не удалась'
                      : 'Не подтверждено'}
                </span>
                <h3>{check.label}</h3>
                <p>{check.detail}</p>
              </article>
            ))}
          </div>
        </>
      )}
      <button type="button" className="subscribe" onClick={open}>
        Подписаться на уведомления
      </button>
      {subscription && (
        <Subscription domain={snapshot?.domain || 'beget.ru'} close={close} />
      )}
    </section>
  )
}
