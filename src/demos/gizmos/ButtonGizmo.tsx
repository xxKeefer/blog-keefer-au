'use client'

export type ButtonGizmoProps = { label: string; disabled: boolean }
export const ButtonGizmo = ({ disabled, label }: ButtonGizmoProps) => (
  <button className="btn btn-primary" disabled={disabled}>
    {label}
  </button>
)
