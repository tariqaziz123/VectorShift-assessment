// inputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

/**
 * InputNode component represents a node in the pipeline that allows users to define an input variable. It provides input fields for specifying the name and type of the input, and defines a handle for connecting to other nodes that will use this input.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.id - The unique identifier for the node.
 * @param {Object} props.data - The data associated with the node, including initial values for input name and type.
 * @returns {JSX.Element} The rendered InputNode component.
 */
export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  /**
   * Handles define the connection points for the node. The InputNode has one handle:
   * - A source handle on the right for outgoing data to other nodes that will use this input.
   */
  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  /**
   * Handles the change event for the input type select dropdown, updating the state with the selected input type.
   */
  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  /**
   * The handles for the node, defining the connection points for outgoing data. The InputNode has one source handle on the right.
   */
  const handles = [
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-value`
    }
  ];

  /**
   * The fields for the node, defining the input elements for configuring the input name and type. The InputNode has two fields:
   * - A text input for specifying the name of the input variable.
   * - A select dropdown for choosing the type of the input (Text or File).
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
      value: inputType,
      onChange: handleTypeChange,
      options: [
        { value: 'Text', label: 'Text' },
        { value: 'File', label: 'File' }
      ]
    }
  ];

  /**
   * The InputNode component renders a BaseNode component, passing in the necessary props such as id, data, title, handles, and fields. The BaseNode is styled with a specific background color and border color to visually distinguish it as an input node.
   */
  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      handles={handles}
      fields={fields}
    />
  );
}
