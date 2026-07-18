// llmNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

/**
 * LLMNode component represents a node in the pipeline that allows users to configure a Large Language Model (LLM) interaction. It defines handles for connecting to other nodes, including input handles for system and prompt data, and an output handle for the LLM response.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.id - The unique identifier for the node.
 * @param {Object} props.data - The data associated with the node.
 * @returns {JSX.Element} The rendered LLMNode component.
 */
export const LLMNode = ({ id, data }) => {

  /**
   * Handles define the connection points for the node. The LLMNode has three handles:
   * - A target handle on the left for incoming system data.
   * - A target handle on the left for incoming prompt data.
   * - A source handle on the right for outgoing LLM responses.
   */
  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-system`,
      style: { top: `${100/3}%` }
    },
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-prompt`,
      style: { top: `${200/3}%` }
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-response`
    }
  ];

  /**
   * The LLMNode component renders a BaseNode component, passing in the necessary props such as id, data, title, and handles.
   */
  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      handles={handles}
    >
      <div>
        <span>This is a LLM.</span>
      </div>
    </BaseNode>
  );
}
