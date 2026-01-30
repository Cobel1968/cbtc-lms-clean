'use client';
export const dynamic = 'force-dynamic';
import { useEffect, useState } from 'react'
import AdaptiveProgressBar from '@/components/shared/AdaptiveProgressBar'
import IELTSProgress from '@/components/student/IELTSProgress'

export default function Dashboard() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="animate-pulse bg-slate-50 h-screen" />

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Cobel Engine: Learning Insights</h1>
      {/* Dashboard Content Here */}
      <IELTSProgress currentBand={5.5} targetBand={7.0} density={1.35} />
    </main>
  )
}
