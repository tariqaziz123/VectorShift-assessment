// outputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

/**
 * OutputNode component represents a node in the pipeline that allows users to configure an output. It provides input fields for specifying the output name and type, and defines a handle for connecting to other nodes.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.id - The unique identifier for the node.
 * @param {Object} props.data - The data associated with the node, including initial values for output name and type.
 * @returns {JSX.Element} The rendered OutputNode component.
 */
export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  /**
   * Handles the change event for the output name input field.
   * @param {Object} e - The change event object.
   */
  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  /**
   * Handles the change event for the output type select field.
   * @param {Object} e - The change event object.
   */
  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  /**
   * Handles define the connection points for the node. The OutputNode has one handle:
   * - A target handle on the left for incoming values.
   */
  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-value`
    }
  ];

  /**
   * The fields for the node, defining the input elements for configuring the output name and type.
   */
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

  /**
   * The OutputNode component renders a BaseNode component, passing in the necessary props such as id, data, title, handles, and fields. The BaseNode is styled with a specific background color and border color to visually distinguish it as an output node.
   */
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
