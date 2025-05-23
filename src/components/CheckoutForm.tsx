import FieldInfo from '@/components/FieldInfo'
import { useCheckout } from '@/hooks/checkoutContext'
import { useForm } from '@tanstack/react-form'
import { useTranslation } from 'react-i18next'
import { Button } from './ui/button'

interface CheckoutProps {
  data: {
    email?: string
    firstName?: string
    lastName?: string
  }
  onSubmit: (data: {
    email: string
    firstName: string
    lastName: string
  }) => void
}

export default function CheckoutForm(props: CheckoutProps) {
  const { t } = useTranslation()
  const checkout = useCheckout()
  const form = useForm({
    defaultValues: {
      email: props.data.email || '',
      firstName: props.data.firstName || '',
      lastName: props.data.lastName || '',

    },
    onSubmit: async ({ value }) => {
      props.onSubmit(value)
    },
  })

  return (
    <div className="text-zinc-900">
      <form
        className="flex flex-col gap-4 "
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <div>
          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? 'An email is required'
                  : value.length < 3
                    ? t('error.emailLength')
                    : undefined,
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: async ({ value }) => {
                return (
                  value.includes('error') && 'No "error" allowed in email'
                )
              },
            }}
            children={(field) => {
              return (
                <div className="flex flex-col gap-1">
                  <label htmlFor={field.name}>
                    {t('email')}
                    :
                  </label>
                  <input
                    className="bg-zinc-200"
                    id={field.name}
                    type="email"
                    required
                    autoComplete="email"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={e => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </div>
              )
            }}
          />
        </div>
        <div>
          <form.Field
            name="firstName"
            children={field => (
              <div className="flex flex-col gap-1">
                <label htmlFor={field.name}>
                  {t('firstName')}
                  :
                </label>
                <input
                  className="bg-zinc-200"
                  type="firstName"
                  required
                  autoComplete="firstName"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={e => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </div>
            )}
          />
        </div>
        <div>
          <form.Field
            name="lastName"
            children={field => (
              <div className="flex flex-col gap-1">
                <label htmlFor={field.name}>
                  {t('lastName')}
                  :
                </label>
                <input
                  className="bg-zinc-200"
                  type="lastName"
                  autoComplete="lastName"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={e => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </div>
            )}
          />
        </div>
        <form.Subscribe
          selector={state => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit || checkout.state.count <= 0}>
              {isSubmitting ? '...' : t('send')}
            </Button>
          )}
        />
      </form>

    </div>
  )
}
