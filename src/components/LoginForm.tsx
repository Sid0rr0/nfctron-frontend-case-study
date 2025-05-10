import FieldInfo from '@/components/FieldInfo'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/userContext'
import { useForm } from '@tanstack/react-form'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function LoginForm() {
  const [responseMesasge, setResponseMesasge] = useState('')
  const auth = useAuth()
  const { t } = useTranslation()

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(value),
        })

        const data = await response.json()
        setResponseMesasge(data.message)

        if (response.ok) {
          auth.login({
            email: data.user.email,
            firstName: data.user.firstName,
            lastName: data.user.lastName,
          })
        }
      }
      catch (error) {
        console.error('Login error:', error)
        setResponseMesasge(t('error.login'))
      }
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
            name="password"
            children={field => (
              <div className="flex flex-col gap-1">
                <label htmlFor={field.name}>
                  {t('password')}
                  :
                </label>
                <input
                  className="bg-zinc-200"
                  type="password"
                  autoComplete="password"
                  required
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
            <Button type="submit" disabled={!canSubmit}>
              {isSubmitting ? '...' : t('login')}
            </Button>
          )}
        />
      </form>

      <div>
        {responseMesasge}
      </div>
    </div>
  )
}
