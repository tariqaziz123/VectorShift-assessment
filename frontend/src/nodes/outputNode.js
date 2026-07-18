// outputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-value`
    }
  ];

  const fields = [
    {
      label: 'Name',
      type: 'text',
      value: currName,
      onChange: handleNameChange
    },
    {
      label: 'Type',
      type: 'select',
      value: outputType,
      onChange: handleTypeChange,
      options: [
        { value: 'Text', label: 'Text' },
        { value: 'File', label: 'Image' }
      ]
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      handles={handles}
      fields={fields}
    />
  );
}
