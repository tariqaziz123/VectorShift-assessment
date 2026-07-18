// conditionNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

/**
 * ConditionNode component represents a node in the pipeline that allows users to configure a conditional check. It provides input fields for selecting a condition type and specifying a threshold value, and defines handles for connecting to other nodes based on the evaluation of the condition.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.id - The unique identifier for the node.
 * @param {Object} props.data - The data associated with the node, including initial values for condition and threshold.
 * @returns {JSX.Element} The rendered ConditionNode component.
 */
export const ConditionNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'equals');
  const [threshold, setThreshold] = useState(data?.threshold || '0');

  /**
   * Handles define the connection points for the node. The ConditionNode has three handles:
   * - A target handle on the left for incoming data.
   * - A source handle on the right for the "true" branch of the condition.
   * - A source handle on the right for the "false" branch of the condition.
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

  /**
   * The fields for the node, defining the input elements for configuring the condition and threshold.
   */
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

  /**   * The ConditionNode component renders a BaseNode component, passing in the necessary props such as id, data, title, handles, and fields. The BaseNode is styled with a specific background color and border color to visually distinguish it as a condition node.
   */
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
