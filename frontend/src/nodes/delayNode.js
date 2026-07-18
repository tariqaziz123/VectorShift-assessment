// delayNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

/**
 * DelayNode component represents a node in the pipeline that introduces a delay in the data flow. It provides an input field for specifying the delay duration in milliseconds and defines handles for connecting to other nodes.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.id - The unique identifier for the node.
 * @param {Object} props.data - The data associated with the node, including initial values for delay duration.
 * @returns {JSX.Element} The rendered DelayNode component.
 */
export const DelayNode = ({ id, data }) => {
  const [delayMs, setDelayMs] = useState(data?.delayMs || '1000');

  /**
   * Handles define the connection points for the node. The DelayNode has two handles:
   * - A target handle on the left for incoming data.
   * - A source handle on the right for outgoing data after the delay.
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
      id: `${id}-output`
    }
  ];

  /**   * Fields define the input elements for the node's configuration. The DelayNode has one field:
   * - A number input for specifying the delay duration in milliseconds.
   */
  const fields = [
    {
      label: 'Delay (ms)',
      type: 'number',
      value: delayMs,
      onChange: (e) => setDelayMs(e.target.value)
    }
  ];

  /**
   * The DelayNode component renders a BaseNode component, passing in the necessary props such as id, data, title, handles, and fields. The BaseNode is styled with a specific background color and border color to visually distinguish it as a delay node.
   */
  return (
    <BaseNode
      id={id}
      data={data}
      title="Delay"
      handles={handles}
      fields={fields}
      style={{ backgroundColor: '#ffebee', borderColor: '#d32f2f' }}
    >
      <div style={{ fontSize: '12px', color: '#666' }}>
        ⏱️ Waits before passing data
      </div>
    </BaseNode>
  );
}
