'use client'
import React, { JSX, useState } from 'react'

// type ControlType = 'text' | 'number' | 'boolean' | 'select'

type ControlGroup = {
  title?: string
  controls: ControlConfig[]
}

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
      type: 'range'
      name: string
      label?: string
      range: [min: number, max: number]
      step?: number
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
      <label key={config.name} className="flex flex-col gap-2 text-sm">
        {config.label ?? config.name}
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(config.name, e.target.checked)}
          className="checkbox checkbox-lg checkbox-neutral invert"
        />
      </label>
    ),
  ],

  [
    'text',
    ({ config, value, onChange }) => (
      <label key={config.name} className="flex flex-col gap-2 text-sm">
        {config.label ?? config.name}
        <input
          type="text"
          value={String(value)}
          onChange={(e) => onChange(config.name, e.target.value)}
          className="input input-sm input-neutral text-base-content border-base-100"
        />
      </label>
    ),
  ],
  [
    'number',
    ({ config, value, onChange }) => (
      <label key={config.name} className="flex flex-col gap-2 text-sm">
        {config.label ?? config.name}
        <input
          type="number"
          value={Number(value)}
          onChange={(e) => onChange(config.name, Number(e.target.value))}
          className="input input-sm input-neutral text-base-content border-base-100"
        />
      </label>
    ),
  ],
  [
    'range',
    ({ config, value, onChange }) => {
      const {
        range: [min, max],
        step,
      } = config as Extract<ControlConfig, { type: 'range' }>
      return (
        <label key={config.name} className="flex flex-col gap-2 text-sm">
          {config.label ?? config.name}
          <input
            type="range"
            min={min}
            max={max}
            step={step ?? 1}
            value={Number(value)}
            onChange={(e) => onChange(config.name, Number(e.target.value))}
            className="range range-sm range-neutral text-base-content border-base-100 invert"
          />
        </label>
      )
    },
  ],
  [
    'select',
    ({ config, value, onChange }) => {
      const selectConfig = config as Extract<ControlConfig, { type: 'select' }>
      return (
        <label key={config.name} className="flex flex-col gap-2 text-sm">
          {selectConfig.label ?? selectConfig.name}
          <select
            value={String(value)}
            onChange={(e) => onChange(config.name, e.target.value)}
            className="input input-sm input-neutral text-base-content border-base-100"
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
  controls?: ControlGroup[]
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

  const renderControlGroup = (group: ControlGroup, index: number) => (
    <div key={index} className="pt-4">
      {group.title && (
        <h4 className="text-accent-content text-lg font-bold">{group.title}</h4>
      )}
      <div className="flex flex-wrap items-center justify-start gap-4 font-mono">
        {group.controls.map(renderControl)}
      </div>
    </div>
  )

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
    <div className="not-prose bg-neutral text-accent-content flex w-screen max-w-full flex-col gap-2 p-4 shadow-md md:rounded-lg">
      {title && (
        <h3 className="text-accent-content text-xl font-black">{title}</h3>
      )}
      {description && (
        <p className="text-accent-content text-sm">{description}</p>
      )}
      <div className="bg-base-100 block overflow-x-auto rounded border p-4">
        {render(state)}
      </div>
      {controls.length > 0 && controls.map(renderControlGroup)}
    </div>
  )
}
