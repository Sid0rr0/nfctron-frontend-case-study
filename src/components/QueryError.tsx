import { useTranslation } from 'react-i18next'

interface ErrorDisplayProps {
  title?: string
  error: unknown
  onRetry?: () => void

}

export default function ErrorDisplay({
  error,
  onRetry,
}: ErrorDisplayProps) {
  const { t } = useTranslation()
  const errorMessage = error instanceof Error
    ? error.message
    : 'An unknown error occurred'

  return (
    <div className="flex flex-col items-center justify-center p-6 max-w-md mx-auto text-center">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 w-full">
        <h3 className="text-lg font-medium text-red-800 mb-2">{t('error.fetching')}</h3>
        <p className="text-red-700 text-sm">{errorMessage}</p>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          {t('error.tryAgain')}
        </button>
      )}
    </div>
  )
}
