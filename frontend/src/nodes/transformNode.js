// transformNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TransformNode = ({ id, data }) => {
  const [transformType, setTransformType] = useState(data?.transformType || 'uppercase');
  const [customPattern, setCustomPattern] = useState(data?.customPattern || '');

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-input`
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-output`}
  ];

  const fields = [
    {
      label: 'Transform',
      type: 'select',
      value: transformType,
      onChange: (e) => setTransformType(e.target.value),
      options: [
        { value: 'uppercase', label: 'Uppercase' },
        { value: 'lowercase', label: 'Lowercase' },
        { value: 'trim', label: 'Trim' },
        { value: 'reverse', label: 'Reverse' },
        { value: 'custom', label: 'Custom Regex' }
      ]
    }
  ];

  const conditionalFields = transformType === 'custom' ? [
    {
      label: 'Pattern',
      type: 'text',
      value: customPattern,
      onChange: (e) => setCustomPattern(e.target.value)
    }
  ] : [];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Transform"
      handles={handles}
      fields={[...fields, ...conditionalFields]}
      style={{ backgroundColor: '#e8f5e9', borderColor: '#388e3c' }}
    />
  );
}
