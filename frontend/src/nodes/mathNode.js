// mathNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

/**
 * MathNode component represents a node in the pipeline that allows users to perform mathematical operations on two operands. It provides input fields for specifying the operands and selecting the operation, and defines handles for connecting to other nodes.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.id - The unique identifier for the node.
 * @param {Object} props.data - The data associated with the node, including initial values for operands and operation.
 * @returns {JSX.Element} The rendered MathNode component.
 */
export const MathNode = ({ id, data }) => {
  const [operand1, setOperand1] = useState(data?.operand1 || '0');
  const [operand2, setOperand2] = useState(data?.operand2 || '0');
  const [operation, setOperation] = useState(data?.operation || 'add');

  /**
   * Handles define the connection points for the node. The MathNode has three handles:
   * - A target handle on the left for the first operand.
   * - A target handle on the left for the second operand.
   * - A source handle on the right for the result of the operation.
   */
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

  /**
   * The fields for the node, defining the input elements for configuring the operands and operation.
   */
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

  /**
   * The MathNode component renders a BaseNode component, passing in the necessary props such as id, data, title, handles, and fields. The BaseNode is styled with a specific background color and border color to visually distinguish it as a math node.
   */
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
