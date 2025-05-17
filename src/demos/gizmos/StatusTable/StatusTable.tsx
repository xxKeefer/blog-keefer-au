import {
  CheckCircle,
  Egg,
  EggCrack,
  Question,
  UserSwitch,
  Warning,
  WarningOctagon,
} from '@phosphor-icons/react/dist/ssr'
import React, { JSX } from 'react'
import { match, P } from 'ts-pattern'

export const StatusTable = ({ widgets }: { widgets: WidgetData[] }) => {
  return (
    <div className="rounded-box border-base-content/5 bg-base-100 overflow-x-auto border">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Wibble %</th>
            <th>Zoops #</th>
            <th>Egg Sample</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {widgets.map((data) => (
            <StatusTableRow key={data.name} data={data} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

const StatusTableRow = ({ data }: { data: WidgetData }) => {
  return (
    <tr>
      <th className="text-base-content">{data.name}</th>
      <td>
        <progress
          className="progress w-full"
          value={data.wibbly.percentage}
          max={100}
        ></progress>
      </td>
      <td className="text-base-content">{data.zoops.count}</td>
      <td>
        {data.egginess.egg === 'good' ? (
          <div className="badge badge-success flex gap-2">
            <Egg size={16} weight="fill" /> <span>Good</span>
          </div>
        ) : (
          <div className="badge badge-error flex gap-2">
            <EggCrack size={16} weight="fill" /> <span>Bad</span>
          </div>
        )}
      </td>
      <StatusCell data={data} />
    </tr>
  )
}

type GizmoData = {
  failSafe?: boolean
  override?: boolean
  state: 'Ok' | 'Unknown' | 'Fault' | 'Failed' | 'Disabled'
}

type GizmoStatus = {
  override?: boolean
  state: 'ok-disabled' | 'unknown' | 'fault' | 'failed' | 'fail-safe'
}

const mapGizmoStatus = (gizmo: GizmoData) =>
  match([gizmo, gizmo.override])
    .returnType<GizmoStatus>()
    .with([{ state: P._, failSafe: true }, P._], ([_, override]) => ({
      state: 'fail-safe',
      override,
    }))
    .with([{ state: 'Failed' }, P._], ([_, override]) => ({
      state: 'failed',
      override,
    }))
    .with([{ state: 'Fault' }, P._], ([_, override]) => ({
      state: 'fault',
      override,
    }))
    .with([{ state: 'Unknown' }, P._], ([_, override]) => ({
      state: 'unknown',
      override,
    }))
    .with([{ state: P._ }, P._], ([_, override]) => ({
      state: 'ok-disabled',
      override,
    }))
    .exhaustive()

const SEVERITY = new Map<GizmoStatus['state'], number>([
  ['fail-safe', 1],
  ['failed', 2],
  ['fault', 3],
  ['unknown', 4],
  ['ok-disabled', Infinity],
])

function bySeverity<T extends Pick<GizmoStatus, 'state'>>(a: T, b: T): number {
  const _a = SEVERITY.get(a.state) ?? Infinity
  const _b = SEVERITY.get(b.state) ?? Infinity
  return _a - _b
}

const StateIcon = new Map<GizmoStatus['state'], JSX.Element>([
  [
    'ok-disabled',
    <CheckCircle
      key="ok-disabled"
      size={24}
      weight="fill"
      className="fill-success"
      data-testid="icon-ok"
    />,
  ],
  [
    'unknown',
    <Question
      key="unknown"
      size={24}
      weight="fill"
      className="fill-info"
      data-testid="icon-unknown"
    />,
  ],
  [
    'fault',
    <Warning
      key="fault"
      size={24}
      weight="fill"
      className="fill-warning"
      data-testid="icon-warning"
    />,
  ],
  [
    'failed',
    <WarningOctagon
      key="failed"
      size={24}
      weight="fill"
      className="fill-error"
      data-testid="icon-error"
    />,
  ],
  [
    'fail-safe',
    <Warning
      key="fail-safe"
      size={24}
      weight="fill"
      className="fill-warning"
      data-testid="icon-warning"
    />,
  ],
])

const StatusCell = ({ data }: { data: WidgetData }) => {
  const { name, ...gizmos } = data
  const states = Object.values(gizmos) satisfies GizmoData[]
  const statuses = states.map(mapGizmoStatus).sort(bySeverity)

  return (
    <td>
      <div className="flex gap-2">
        {statuses.some((x) => x.override) && (
          <UserSwitch
            size={24}
            weight="fill"
            className="fill-base-content"
            data-testid="override"
          />
        )}{' '}
        {StateIcon.get(statuses[0].state)}
      </div>
    </td>
  )
}

type WibbleAnalyser = {
  percentage: number

  state: 'Ok' | 'Unknown' | 'Fault' | 'Failed' | 'Disabled'
}

type ZoopCounter = {
  count: number
  failSafe?: boolean
  state: 'Ok' | 'Unknown' | 'Fault' | 'Failed' | 'Disabled'
}

type EggSampler = {
  egg: 'good' | 'bad'
  failSafe?: boolean
  override?: boolean
  state: 'Ok' | 'Unknown' | 'Fault' | 'Failed' | 'Disabled'
}

export type WidgetData = {
  name: string
  egginess: EggSampler
  zoops: ZoopCounter
  wibbly: WibbleAnalyser
}

// which all contribute to
// type WidgetStatus = {
//   override?: boolean
//   state: 'Ok' | 'Unknown' | 'Fault' | 'Failed' // Note: no Disabled
// }
