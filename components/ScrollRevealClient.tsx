"use client"

import { useEffect } from "react"

type Props = {
  children: React.ReactNode
}

export default function ScrollRevealClient({ children }: Props) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"))
    if (!els.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement
          if (entry.isIntersecting) {
            const delay = el.dataset.delay ? `${el.dataset.delay}ms` : undefined
            if (delay) el.style.setProperty("--reveal-delay", delay)
            el.classList.add("visible")
            // Optionally unobserve to keep it once visible
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.12 }
    )

    els.forEach((el, i) => {
      // If no explicit data-delay, stagger automatically
      if (!el.dataset.delay) {
        el.dataset.delay = String(i * 80)
      }
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return <>{children}</>
}
