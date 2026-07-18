// mathNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const MathNode = ({ id, data }) => {
  const [operand1, setOperand1] = useState(data?.operand1 || '0');
  const [operand2, setOperand2] = useState(data?.operand2 || '0');
  const [operation, setOperation] = useState(data?.operation || 'add');

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-operand1`,
      style: { top: '30%' }
    },
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-operand2`,
      style: { top: '70%' }
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-result`
    }
  ];

  const fields = [
    {
      label: 'A',
      type: 'text',
      value: operand1,
      onChange: (e) => setOperand1(e.target.value)
    },
    {
      label: 'B',
      type: 'text',
      value: operand2,
      onChange: (e) => setOperand2(e.target.value)
    },
    {
      label: 'Op',
      type: 'select',
      value: operation,
      onChange: (e) => setOperation(e.target.value),
      options: [
        { value: 'add', label: '+' },
        { value: 'subtract', label: '-' },
        { value: 'multiply', label: '*' },
        { value: 'divide', label: '/' }
      ]
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Math"
      handles={handles}
      fields={fields}
      style={{ backgroundColor: '#e3f2fd', borderColor: '#1976d2' }}
    />
  );
}
