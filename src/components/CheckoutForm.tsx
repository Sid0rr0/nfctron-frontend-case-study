import FieldInfo from '@/components/FieldInfo'
import { useForm } from '@tanstack/react-form'
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
                    ? 'email must be at least 3 characters'
                    : undefined,
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: async ({ value }) => {
                await new Promise(resolve => setTimeout(resolve, 1000))
                return (
                  value.includes('error') && 'No "error" allowed in email'
                )
              },
            }}
            children={(field) => {
              return (
                <div className="flex flex-col gap-1">
                  <label htmlFor={field.name}>Email:</label>
                  <input
                    className="bg-zinc-200"
                    id={field.name}
                    type="text"
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
                <label htmlFor={field.name}>First Name:</label>
                <input
                  className="bg-zinc-200"
                  type="firstName"
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
                <label htmlFor={field.name}>Last Name:</label>
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
            <Button type="submit" disabled={!canSubmit}>
              {isSubmitting ? '...' : 'Purchase'}
            </Button>
          )}
        />
      </form>

    </div>
  )
}
