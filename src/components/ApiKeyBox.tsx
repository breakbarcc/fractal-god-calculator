import { useEffect, useState } from 'react'
import type { Gw2FetchResult, LogLevel } from '../lib/gw2Api'
import { fetchGw2AccountData } from '../lib/gw2Api'

interface StatusLine {
  text: string
  level: LogLevel
}

export function ApiKeyBox({
  apiKey,
  setApiKey,
  onFetched,
}: Readonly<{
  apiKey: string
  setApiKey: (key: string) => void
  onFetched: (result: Gw2FetchResult) => void
}>) {
  const [showKey, setShowKey] = useState(false)
  const [loading, setLoading] = useState(false)
  const [statusLines, setStatusLines] = useState<StatusLine[]>([])

  async function handleFetch() {
    if (!apiKey.trim()) {
      setStatusLines([{ text: 'Bitte zuerst einen API-Schlüssel eintragen.', level: 'warn' }])
      return
    }
    setLoading(true)
    const lines: StatusLine[] = []
    const log = (text: string, level?: LogLevel) => {
      lines.push({ text, level })
      setStatusLines([...lines])
    }
    try {
      const result = await fetchGw2AccountData(apiKey, log)
      onFetched(result)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (apiKey.trim()) {
      void handleFetch()
    }
    // Nur beim Mount: lädt automatisch, falls beim Reload bereits ein Key aus localStorage vorhanden ist.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="mt-4.5 rounded-xl border border-line bg-relic/5 p-3.5 px-4">
      <label className="mb-1.5 block text-xs text-text-dim">
        GW2-API-Schlüssel{' '}
        <span className="text-text-faint">(nur „account, wallet, inventories, progression, unlocks“ nötig)</span>
      </label>
      <div className="flex gap-2">
        <input
          type={showKey ? 'text' : 'password'}
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="XXXXXXXX-XXXX-XXXX-...-XXXXXXXXXXXX"
          className="flex-1 rounded-lg border border-line bg-panel-2 px-2.5 py-2 text-left font-mono text-[13px] text-text focus:border-arcane focus:outline-none focus:shadow-[0_0_0_3px_rgba(155,127,224,.18)]"
        />
        <button
          type="button"
          onClick={() => setShowKey((v) => !v)}
          className="cursor-pointer rounded-lg border border-line bg-panel-2 px-3 text-sm text-text-dim"
        >
          👁
        </button>
      </div>
      <button
        type="button"
        onClick={handleFetch}
        disabled={loading}
        className="mt-2.5 w-full cursor-pointer rounded-lg border border-line-strong bg-[linear-gradient(135deg,rgba(155,127,224,.25),rgba(91,155,213,.2))] px-3 py-2.5 text-[12.5px] font-semibold text-text transition-[filter] hover:brightness-115 disabled:cursor-wait disabled:opacity-50"
      >
        {loading ? '⇩ Lädt …' : '⇩ Bestand aus GW2-API laden'}
      </button>
      {statusLines.length > 0 && (
        <div className="mt-2.5 font-mono text-[11px] leading-[1.6] whitespace-pre-wrap text-text-faint">
          {statusLines.map((line, i) => (
            <div key={i} className={line.level === 'ok' ? 'text-ok' : line.level === 'warn' ? 'text-warn' : undefined}>
              {line.text}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
