import type { AnyFieldApi } from '@tanstack/react-form'
import { useTranslation } from 'react-i18next'

export default function FieldInfo({ field }: { field: AnyFieldApi }) {
  const { t } = useTranslation()
  return (
    <div>
      {field.state.meta.isTouched && !field.state.meta.isValid
        ? (
            <em className="text-sm text-red-500">{field.state.meta.errors.join(', ')}</em>
          )
        : null}
      {field.state.meta.isValidating ? t('validating') : null}
    </div>
  )
}
