// conditionNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const ConditionNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'equals');
  const [threshold, setThreshold] = useState(data?.threshold || '0');

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-input`
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-true`,
      style: { top: '30%' }
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-false`,
      style: { top: '70%' }
    }
  ];

  const fields = [
    {
      label: 'Condition',
      type: 'select',
      value: condition,
      onChange: (e) => setCondition(e.target.value),
      options: [
        { value: 'equals', label: '==' },
        { value: 'notEquals', label: '!=' },
        { value: 'greaterThan', label: '>' },
        { value: 'lessThan', label: '<' },
        { value: 'contains', label: 'contains' }
      ]
    },
    {
      label: 'Value',
      type: 'text',
      value: threshold,
      onChange: (e) => setThreshold(e.target.value)
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Condition"
      handles={handles}
      fields={fields}
      style={{ backgroundColor: '#fff3e0', borderColor: '#f57c00' }}
    />
  );
}
