import { useState, useCallback, useRef } from 'react'
import type * as React from 'react'
import {
  useDomainDiagnosticsQuery,
  useCreateFeedbackTokenMutation,
  useSubmitDomainDiagnosticsMutation,
} from 'app/gql/generated'
import { Subscription } from './Subscription'

export const Diagnostics: React.FC = () => {
  const [subscription, setSubscription] = useState(false)
  const initial = useDomainDiagnosticsQuery({
    fetchPolicy: 'no-cache',
    ssr: false,
  })
  const [issue] = useCreateFeedbackTokenMutation()
  const [submit, result] = useSubmitDomainDiagnosticsMutation()
  const [pending, setPending] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const inFlight = useRef(false)
  const retry = useRef<{ domain: string; token: string } | null>(null)
  const snapshot =
    result.data?.submitDomainDiagnostics ?? initial.data?.domainDiagnostics
  const loading = pending || initial.loading
  const error = submitError || (!result.data && initial.error?.message)
  const onRefresh = useCallback(
    async (event: React.SubmitEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (inFlight.current) {
        return
      }
      const value = new FormData(event.currentTarget).get('domain')
      const domain = (typeof value === 'string' && value.trim()) || 'beget.ru'
      inFlight.current = true
      setPending(true)
      setSubmitError('')
      try {
        let token: string | undefined
        if (domain.toLowerCase().replace(/\.$/, '') !== 'beget.ru') {
          if (retry.current?.domain !== domain) {
            token = (await issue()).data?.createChatToken ?? undefined
            if (!token) {
              throw new Error('Не удалось получить токен обратной связи.')
            }
            retry.current = { domain, token }
          }
          token = retry.current.token
        }
        await submit({ variables: { domain, token } })
        retry.current = null
      } catch (error) {
        setSubmitError(
          error instanceof Error
            ? error.message
            : 'Не удалось выполнить проверку.',
        )
      } finally {
        inFlight.current = false
        setPending(false)
      }
    },
    [issue, submit],
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
      {error && <p role="alert">{error}</p>}
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
