// transformNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

/**
 * TransformNode component represents a node in the pipeline that allows users to transform text content. It provides input fields for specifying the transformation type and custom pattern, and defines handles for connecting to other nodes.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.id - The unique identifier for the node.
 * @param {Object} props.data - The data associated with the node, including initial values for transformation type and custom pattern.
 * @returns {JSX.Element} The rendered TransformNode component.
 */
export const TransformNode = ({ id, data }) => {
  const [transformType, setTransformType] = useState(data?.transformType || 'uppercase');
  const [customPattern, setCustomPattern] = useState(data?.customPattern || '');

  /**
   * The handles for the node, defining the connection points for incoming and outgoing data. The TransformNode has two handles:
   * - A target handle on the left for incoming text to be transformed.
   * - A source handle on the right for the transformed text.
   */
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

  /**
   * The fields for the node, defining the input elements for configuring the transformation type and custom pattern.
   */
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

  /**
   * The conditional fields for the node, defining the input elements for configuring the custom pattern when the transformation type is 'custom'.
   */
  const conditionalFields = transformType === 'custom' ? [
    {
      label: 'Pattern',
      type: 'text',
      value: customPattern,
      onChange: (e) => setCustomPattern(e.target.value)
    }
  ] : [];

  /**
   * The TransformNode component renders a BaseNode component, passing in the necessary props such as id, data, title, handles, and fields. The BaseNode is styled with a specific background color and border color to visually distinguish it as a transform node.
   */
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
