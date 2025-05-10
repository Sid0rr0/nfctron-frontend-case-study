import type { AnyFieldApi } from '@tanstack/react-form'

export default function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <div>
      {field.state.meta.isTouched && !field.state.meta.isValid
        ? (
            <em className="text-sm text-red-500">{field.state.meta.errors.join(', ')}</em>
          )
        : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </div>
  )
}
