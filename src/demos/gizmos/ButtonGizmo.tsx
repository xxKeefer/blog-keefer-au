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
      description="Something here about what this does"
      initialState={{ label: 'Click me', disabled: false }}
      controls={[
        { type: 'text', name: 'label' },
        { type: 'number', name: 'count' },
        { type: 'boolean', name: 'disabled' },
        {
          type: 'select',
          name: 'test',
          options: [
            { label: 'this', value: 'a' },
            { label: 'that', value: 'b' },
            { label: 'other', value: 'c' },
          ],
        },
      ]}
      render={(state) => <ButtonGizmo {...state} />}
    />
  )
}
