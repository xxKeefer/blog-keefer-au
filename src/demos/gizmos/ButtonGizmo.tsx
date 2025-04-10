'use client'

import { Demo } from '../Demo'

export type ButtonGizmoProps = { label: string; disabled: boolean }
export const ButtonGizmo = ({ disabled, label }: ButtonGizmoProps) => (
  <button className="btn btn-primary" disabled={disabled}>
    {label}
  </button>
)

export const ButtonDemo = () => {
  return (
    <Demo
      title="Demo: Toggle Me"
      initialState={{ label: 'Click me', disabled: false }}
      controls={[
        { type: 'text', name: 'label' },
        { type: 'boolean', name: 'disabled' },
      ]}
      render={(state) => <ButtonGizmo {...state} />}
    />
  )
}
