"use client"

import type { FormEvent } from "react"

import { useState, useRef, useEffect } from "react"
import emailjs from '@emailjs/browser'

declare global {
  interface Window {
    turnstile: {
      render: (element: string | HTMLElement, options: {
        sitekey: string
        callback: (token: string) => void
        'error-callback'?: () => void
        'expired-callback'?: () => void
        theme?: 'light' | 'dark' | 'auto'
      }) => string
      reset: (widgetId: string) => void
      remove: (widgetId: string) => void
    }
    __turnstileScriptLoaded?: boolean
  }
}

function loadTurnstileScript(signal?: AbortSignal): Promise<void> {
  if (window.__turnstileScriptLoaded && window.turnstile) {
    return Promise.resolve()
  }
  return new Promise((resolve, reject) => {
    if (signal?.aborted) return reject(new Error('aborted'))
    signal?.addEventListener('abort', () => reject(new Error('aborted')), { once: true })

    // Script already injected (e.g. component remounted): poll for the global,
    // bounded (~5s) so it can't spin forever, and cancellable via the signal.
    if (document.querySelector('script[src*="challenges.cloudflare.com/turnstile"]')) {
      let tries = 0
      const check = () => {
        if (signal?.aborted) return
        if (window.turnstile) { window.__turnstileScriptLoaded = true; resolve() }
        else if (++tries > 100) reject(new Error('turnstile load timeout'))
        else setTimeout(check, 50)
      }
      check()
      return
    }

    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    script.async = true
    script.onload = () => { window.__turnstileScriptLoaded = true; resolve() }
    script.onerror = () => reject(new Error('turnstile failed to load'))
    document.head.appendChild(script)
  })
}

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [turnstileToken, setTurnstileToken] = useState<string>('')
  const [loadError, setLoadError] = useState(false)
  const turnstileRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string>('')

  useEffect(() => {
    let cancelled = false
    const controller = new AbortController()

    loadTurnstileScript(controller.signal).then(() => {
      if (cancelled || !turnstileRef.current) return
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = ''
      }
      requestAnimationFrame(() => {
        if (cancelled || !turnstileRef.current) return
        widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
          sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!,
          callback: (token: string) => {
            if (!cancelled) setTurnstileToken(token)
          },
          'error-callback': () => {
            if (!cancelled) setTurnstileToken('')
          },
          'expired-callback': () => {
            if (!cancelled) setTurnstileToken('')
          },
          theme: 'auto',
        })
      })
    }).catch(() => {
      if (!cancelled) setLoadError(true)
    })

    return () => {
      cancelled = true
      controller.abort()
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = ''
      }
    }
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!turnstileToken) {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 5000)
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'Ketan Mittal',
        },
        publicKey
      )

      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('EmailJS error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)

      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current)
        setTurnstileToken('')
      }

      setTimeout(() => setSubmitStatus('idle'), 5000)
    }
  }

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.03em] text-foreground">Contact</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 md:px-5 py-3 md:py-3.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all text-sm md:text-base"
              placeholder="John Doe"
              required
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 md:px-5 py-3 md:py-3.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all text-sm md:text-base"
              placeholder="john@example.com"
              required
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
            Your Message
          </label>
          <textarea
            id="message"
            rows={6}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 md:px-5 py-3 md:py-3.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all resize-none text-sm md:text-base"
            placeholder="Write your message here..."
            required
            disabled={isSubmitting}
          />
        </div>

        {/* Turnstile Widget */}
        <div ref={turnstileRef} className="flex justify-center md:justify-start" />

        {loadError && (
          <p className="text-sm text-muted-foreground">
            Verification couldn&apos;t load (it may be blocked by your browser or an
            extension). You can email me directly at{" "}
            <a href="mailto:mittal.ketan1@gmail.com" className="text-accent underline">
              mittal.ketan1@gmail.com
            </a>
            .
          </p>
        )}

        {submitStatus === 'success' && (
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-600 dark:text-green-400 text-sm">
            ✓ Message sent successfully! I'll get back to you soon.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-600 dark:text-red-400 text-sm">
            ✗ Failed to send message. Please complete the verification and try again.
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || !turnstileToken}
          className="inline-flex items-center justify-center w-full md:w-auto px-7 md:px-9 py-3 md:py-3.5 bg-accent text-accent-foreground rounded-full font-medium hover:opacity-90 transition-opacity text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  )
}