'use client'
import React, { JSX, useState } from 'react'

// type ControlType = 'text' | 'number' | 'boolean' | 'select'

type ControlOption = { label: string; value: string | number | boolean }

type ControlConfig =
  | {
      type: 'text' | 'number'
      name: string
      label?: string
    }
  | {
      type: 'boolean'
      name: string
      label?: string
    }
  | {
      type: 'select'
      name: string
      label?: string
      options: ControlOption[]
    }

const ControlRenderMap = new Map<
  ControlConfig['type'],
  (props: {
    config: ControlConfig
    value: unknown
    onChange: (name: string, value: unknown) => void
  }) => JSX.Element
>([
  [
    'boolean',
    ({ config, value, onChange }) => (
      <label key={config.name} className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(config.name, e.target.checked)}
        />
        {config.label ?? config.name}
      </label>
    ),
  ],
  [
    'text',
    ({ config, value, onChange }) => (
      <label key={config.name} className="flex flex-col text-sm">
        {config.label ?? config.name}
        <input
          type="text"
          value={String(value)}
          onChange={(e) => onChange(config.name, e.target.value)}
          className="mt-1 rounded border p-1"
        />
      </label>
    ),
  ],
  [
    'number',
    ({ config, value, onChange }) => (
      <label key={config.name} className="flex flex-col text-sm">
        {config.label ?? config.name}
        <input
          type="number"
          value={Number(value)}
          onChange={(e) => onChange(config.name, Number(e.target.value))}
          className="mt-1 rounded border p-1"
        />
      </label>
    ),
  ],
  [
    'select',
    ({ config, value, onChange }) => {
      const selectConfig = config as Extract<ControlConfig, { type: 'select' }>
      return (
        <label key={config.name} className="flex flex-col text-sm">
          {selectConfig.label ?? selectConfig.name}
          <select
            value={String(value)}
            onChange={(e) => onChange(config.name, e.target.value)}
            className="mt-1 rounded border p-1"
          >
            {selectConfig.options.map((opt) => (
              <option key={String(opt.value)} value={String(opt.value)}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      )
    },
  ],
])

type DemoProps<T extends Record<string, unknown>> = {
  title?: string
  description?: string
  initialState: T
  controls?: ControlConfig[]
  render: (state: T) => React.ReactNode
}

export function Demo<T extends Record<string, unknown>>({
  title,
  description,
  initialState,
  controls = [],
  render,
}: DemoProps<T>) {
  const [state, setState] = useState<T>(initialState)

  const updateField = (name: keyof T, value: unknown) => {
    setState((prev) => ({ ...prev, [name]: value }))
  }

  const renderControl = (config: ControlConfig) => {
    const value = state[config.name as keyof T]

    const Control = ControlRenderMap.get(config.type)!
    return (
      <Control
        key={config.name}
        config={config}
        value={value}
        onChange={updateField}
      />
    )
  }

  return (
    <div className="my-6 rounded-lg p-4 shadow-md">
      {title && <h3 className="mb-1 text-lg font-semibold">{title}</h3>}
      {description && <p className="mb-3 text-sm">{description}</p>}
      <div className="mb-4">
        <div className="rounded border p-4">{render(state)}</div>
      </div>
      {controls.length > 0 && (
        <div className="mt-2 space-y-2">
          <h4 className="text-sm font-medium">Controls</h4>
          <div className="flex flex-wrap gap-4">
            {controls.map(renderControl)}
          </div>
        </div>
      )}
    </div>
  )
}
