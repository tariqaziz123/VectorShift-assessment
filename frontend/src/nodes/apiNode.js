// apiNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

/**
 * ApiNode component represents a node in the pipeline that allows users to configure an API call.
 * It provides input fields for the API URL and HTTP method, and defines handles for connecting to other nodes.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.id - The unique identifier for the node.
 * @param {Object} props.data - The data associated with the node, including initial values for URL and method.
 * @returns {JSX.Element} The rendered ApiNode component.
 */

export const ApiNode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || 'https://api.example.com');
  const [method, setMethod] = useState(data?.method || 'GET');

  /**
   * Handles define the connection points for the node. The ApiNode has three handles:
   * - A target handle on the left for incoming parameters.
   * - A source handle on the right for outgoing responses.
   * - A source handle on the bottom for error handling.
   */
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

  /**
   * Fields define the input elements for the node's configuration. The ApiNode has two fields:
   * - A text input for the API URL.
   * - A select dropdown for the HTTP method (GET, POST, PUT, DELETE).
   */
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

  /**
   * The ApiNode component renders a BaseNode component, passing in the necessary props such as id, data, title, handles, and fields. The BaseNode is styled with a specific background color and border color to visually distinguish it as an API node.
   */
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
