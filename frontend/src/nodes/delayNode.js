// delayNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const DelayNode = ({ id, data }) => {
  const [delayMs, setDelayMs] = useState(data?.delayMs || '1000');

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-input`
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-output`
    }
  ];

  const fields = [
    {
      label: 'Delay (ms)',
      type: 'number',
      value: delayMs,
      onChange: (e) => setDelayMs(e.target.value)
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Delay"
      handles={handles}
      fields={fields}
      style={{ backgroundColor: '#ffebee', borderColor: '#d32f2f' }}
    >
      <div style={{ fontSize: '12px', color: '#666' }}>
        ⏱️ Waits before passing data
      </div>
    </BaseNode>
  );
}
