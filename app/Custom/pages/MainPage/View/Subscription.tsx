import { useEffect, useRef, useCallback } from 'react'
import type * as React from 'react'
import {
  Controller,
  FormProvider,
  useForm,
  type ControllerProps,
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
  useCreateFeedbackTokenMutation,
  useSubmitFeedbackMutation,
  type SubmitFeedbackMutationVariables,
} from 'app/gql/generated'
import { FeedbackDialog } from '../../../components/Feedback/styles'

type FormData = Pick<SubmitFeedbackMutationVariables['data'], 'contacts'>
const schema: yup.ObjectSchema<FormData> = yup.object({
  contacts: yup
    .string()
    .trim()
    .email('Проверьте адрес почты')
    .max(254)
    .required('Введите email'),
})
const renderEmail: ControllerProps<FormData, 'contacts'>['render'] = ({
  field,
  fieldState,
}) => (
  <label>
    Email
    <input
      {...field}
      type="email"
      autoComplete="email"
      required
      aria-invalid={!!fieldState.error}
    />
    {fieldState.error && <span role="alert">{fieldState.error.message}</span>}
  </label>
)
export const Subscription: React.FC<{ domain: string; close: () => void }> = ({
  domain,
  close,
}) => {
  const dialog = useRef<HTMLDialogElement>(null)
  const token = useRef('')
  const pending = useRef(false)
  const form = useForm<FormData>({
    defaultValues: { contacts: '' },
    resolver: yupResolver(schema),
  })
  const [issue] = useCreateFeedbackTokenMutation()
  const [send, { data }] = useSubmitFeedbackMutation()
  useEffect(() => {
    dialog.current?.showModal()
  }, [])
  const submit = async (values: FormData) => {
    if (pending.current) {
      return
    }
    pending.current = true
    try {
      if (!token.current) {
        token.current = (await issue()).data?.createChatToken || ''
      }
      if (!token.current) {
        throw new Error('Не удалось открыть обращение.')
      }
      const result = await send({
        variables: {
          data: {
            ...values,
            token: token.current,
            message: 'Подписка на уведомления о сбое Beget. Домен: ' + domain,
          },
        },
      })
      if (!result.data?.submitFeedback) {
        throw new Error('Подтверждение сохранения не получено.')
      }
    } catch (error) {
      form.setError('root', {
        message:
          error instanceof Error
            ? error.message
            : 'Не удалось сохранить обращение.',
      })
    } finally {
      pending.current = false
    }
  }
  const cancel = useCallback(
    (event: React.SyntheticEvent) => {
      event.preventDefault()
      if (!pending.current) {
        close()
      }
    },
    [close],
  )
  return (
    <FeedbackDialog
      ref={dialog}
      aria-labelledby="subscribe-title"
      onCancel={cancel}
    >
      <button
        type="button"
        className="close"
        aria-label="Закрыть"
        onClick={close}
        disabled={form.formState.isSubmitting}
      >
        ×
      </button>
      <h2 id="subscribe-title">Уведомления о сбое</h2>
      {data?.submitFeedback ? (
        <p role="status">Заявка на подписку сохранена.</p>
      ) : (
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(submit)} noValidate>
            <p>Оставьте email для уведомлений о состоянии {domain}.</p>
            <Controller
              name="contacts"
              control={form.control}
              render={renderEmail}
            />
            {form.formState.errors.root && (
              <p role="alert">{form.formState.errors.root.message}</p>
            )}
            <button className="submit" disabled={form.formState.isSubmitting}>
              Сохранить заявку
            </button>
          </form>
        </FormProvider>
      )}
    </FeedbackDialog>
  )
}
