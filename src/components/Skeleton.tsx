import { Skeleton as ShadSkeleton } from '@/components/ui/skeleton'

export default function Skeleton() {
  return (
    <div className="flex flex-col items-start justify-center gap-2">
      <ShadSkeleton className="h-1/2 min-h-32 w-1/2 min-w-64 rounded-xl" />
      <ShadSkeleton className="h-4 w-1/2 min-w-64" />
      <ShadSkeleton className="h-4 w-16" />
    </div>
  )
}
