'use client'
import React from 'react'

import { Demo } from '~/demos/Demo'

import { StatusTable, WidgetData } from './StatusTable'

const example: WidgetData[] = [
  {
    name: 'Sector One',
    egginess: {
      egg: 'good',
      state: 'Fault',
      override: true,
    },
    wibbly: {
      percentage: 72,
      state: 'Ok',
    },
    zoops: {
      count: 42,
      state: 'Failed',
      failSafe: true,
    },
  },
  {
    name: 'Zone Five',
    egginess: {
      egg: 'bad',
      state: 'Ok',
    },
    wibbly: {
      percentage: 33,
      state: 'Ok',
    },
    zoops: {
      count: 6,
      state: 'Ok',
    },
  },
]

type Flat = {
  name: string
  wibble: number
  wibble_state: 'Ok' | 'Unknown' | 'Fault' | 'Failed' | 'Disabled'
  zoop_count: number
  zoop_state: 'Ok' | 'Unknown' | 'Fault' | 'Failed' | 'Disabled'
  zoop_fail_safe: boolean
  egg: 'good' | 'bad'
  egg_state: 'Ok' | 'Unknown' | 'Fault' | 'Failed' | 'Disabled'
  egg_fail_safe: boolean
  egg_override: boolean
}
const flat: Flat = {
  name: 'Demo Row',
  wibble: 50,
  wibble_state: 'Ok',
  zoop_count: 12,
  zoop_state: 'Ok',
  zoop_fail_safe: false,
  egg: 'good',
  egg_state: 'Ok',
  egg_fail_safe: false,
  egg_override: false,
}

const map = (x: Flat): WidgetData => ({
  name: x.name,
  egginess: {
    egg: x.egg,
    state: x.egg_state,
    failSafe: x.egg_fail_safe,
    override: x.egg_override,
  },
  wibbly: {
    percentage: x.wibble,
    state: x.wibble_state,
  },
  zoops: {
    count: x.zoop_count,
    state: x.zoop_state,
    failSafe: x.zoop_fail_safe,
  },
})

export const StatusTableDemo = () => {
  return (
    <Demo
      title="Widget Status Table"
      initialState={flat}
      controls={[
        {
          title: 'Controls',
          controls: [
            { type: 'text', name: 'name' },
            {
              type: 'range',
              name: 'wibble',
              label: 'Wibble %',
              range: [0, 100],
            },
            {
              type: 'select',
              name: 'wibble_state',
              label: 'Wibble State',
              options: [
                { label: 'Ok', value: 'Ok' },
                { label: 'Unknown', value: 'Unknown' },
                { label: 'Fault', value: 'Fault' },
                { label: 'Failed', value: 'Failed' },
                { label: 'Disabled', value: 'Disabled' },
              ],
            },
          ],
        },
        {
          controls: [
            {
              type: 'number',
              name: 'zoop_count',
              label: 'Zoops #',
            },
            {
              type: 'select',
              name: 'zoop_state',
              label: 'Zoop State',
              options: [
                { label: 'Ok', value: 'Ok' },
                { label: 'Unknown', value: 'Unknown' },
                { label: 'Fault', value: 'Fault' },
                { label: 'Failed', value: 'Failed' },
                { label: 'Disabled', value: 'Disabled' },
              ],
            },
            {
              type: 'boolean',
              name: 'zoop_fail_safe',
              label: 'Zoop Failsafe',
            },
          ],
        },
        {
          controls: [
            {
              type: 'select',
              name: 'egg',
              label: 'Egg Sample',
              options: [
                { label: 'Good', value: 'good' },
                { label: 'Bad', value: 'bad' },
              ],
            },
            {
              type: 'select',
              name: 'egg_state',
              label: 'Egg State',
              options: [
                { label: 'Ok', value: 'Ok' },
                { label: 'Unknown', value: 'Unknown' },
                { label: 'Fault', value: 'Fault' },
                { label: 'Failed', value: 'Failed' },
                { label: 'Disabled', value: 'Disabled' },
              ],
            },
            {
              type: 'boolean',
              name: 'egg_fail_safe',
              label: 'Egg Failsafe',
            },
            {
              type: 'boolean',
              name: 'egg_override',
              label: 'Egg override',
            },
          ],
        },
      ]}
      render={(state) => <StatusTable widgets={[...example, map(state)]} />}
    />
  )
}
