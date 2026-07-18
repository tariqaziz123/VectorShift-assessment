// apiNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const ApiNode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || 'https://api.example.com');
  const [method, setMethod] = useState(data?.method || 'GET');

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-params`
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-response`
    },
    {
      type: 'source',
      position: Position.Bottom,
      id: `${id}-error`
    }
  ];

  const fields = [
    {
      label: 'URL',
      type: 'text',
      value: url,
      onChange: (e) => setUrl(e.target.value)
    },
    {
      label: 'Method',
      type: 'select',
      value: method,
      onChange: (e) => setMethod(e.target.value),
      options: [
        { value: 'GET', label: 'GET' },
        { value: 'POST', label: 'POST' },
        { value: 'PUT', label: 'PUT' },
        { value: 'DELETE', label: 'DELETE' }
      ]
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="API Call"
      handles={handles}
      fields={fields}
      style={{ backgroundColor: '#f3e5f5', borderColor: '#7b1fa2', height: 100 }}
    />
  );
}
