'use client'
import { useEffect, useRef, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Image from 'next/image'

export function NavigationProgress() {
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setLoading(false)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
  }, [pathname, searchParams])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a')
      if (!target) return

      const href = target.getAttribute('href')
      if (!href) return
      if (target.target === '_blank') return
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return

      const isInternal = href.startsWith('/') || href.startsWith(window.location.origin)
      if (!isInternal) return

      const resolved = new URL(href, window.location.href)
      const current = new URL(window.location.href)

      const isSameDestination =
        resolved.pathname.replace(/\/+$/, '') === current.pathname.replace(/\/+$/, '') &&
        resolved.search === current.search

      if (isSameDestination) return

      setLoading(true)

      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setLoading(false), 6000)
    }

    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  if (!loading) return null

  return (
    <div style={{
        position: 'fixed', inset: 0,
        background: 'rgba(255 255 255 / 96%)',
        display: 'flex', alignItems: 'center',
        justifyContent: 'center', zIndex: 9999
      }}>
        <div>
        <div style={{ animation: 'pulse 1.2s ease-in-out infinite' }}>
          <Image src="/images/logo/colored-logo.png" alt="logo Loading" width={520} height={136} style={{ width: 200 }} />
        </div>
        <p style={{textAlign:'center', marginTop:'1.5rem', textTransform:'uppercase', font:'var(--font-14)', fontWeight:'500', letterSpacing:'0.1rem'}}>Loading...</p>
        </div>
        <style>{`@keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1) } 50% { opacity: 0.5; transform: scale(0.9) } }`}</style>
      </div>
  )
}