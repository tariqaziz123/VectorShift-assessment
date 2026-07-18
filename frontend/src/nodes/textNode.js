// textNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  const handles = [
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-output`
    }
  ];

  const fields = [
    {
      label: 'Text',
      type: 'text',
      value: currText,
      onChange: handleTextChange
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      handles={handles}
      fields={fields}
    />
  );
}
