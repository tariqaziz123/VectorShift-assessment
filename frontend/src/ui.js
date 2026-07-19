// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { MathNode } from './nodes/mathNode';
import { ConditionNode } from './nodes/conditionNode';
import { ApiNode } from './nodes/apiNode';
import { TransformNode } from './nodes/transformNode';
import { DelayNode } from './nodes/delayNode';

import 'reactflow/dist/style.css';

/**
 * PipelineUI component renders the main user interface for building a pipeline using a drag-and-drop approach. It utilizes the React Flow library to manage nodes and edges, allowing users to create and connect various types of nodes in a visual manner.
 * @returns {JSX.Element} The rendered PipelineUI component.
 */
const gridSize = 20;
const proOptions = { hideAttribution: true };

/**
 * nodeTypes defines the available node types for the pipeline UI.
 */
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  math: MathNode,
  condition: ConditionNode,
  api: ApiNode,
  transform: TransformNode,
  delay: DelayNode,
};

/**
 * selector function is used to extract specific parts of the Zustand store for use in the component.
 */
const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

/**
 * PipelineUI component renders the main user interface for building a pipeline using a drag-and-drop approach. It utilizes the React Flow library to manage nodes and edges, allowing users to create and connect various types of nodes in a visual manner.
 * @returns {JSX.Element} The rendered PipelineUI component.
 */
export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(selector, shallow);

    /**
     * getInitNodeData function initializes the data for a new node based on its ID and type.
     * @param {string} nodeID - The unique identifier for the node.
     * @param {string} type - The type of the node.
     * @returns {Object} The initialized node data.
     */
    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    /**
     * onDrop function handles the drop event when a node is dragged and dropped onto the canvas.
     * @param {Object} event - The drop event object.
     */
    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            // check if the dropped element is valid
            if (type === undefined || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance]
    );

    /**
     * onDragOver function handles the drag over event for the canvas.
     * @param {Object} event - The drag over event object.
     */
    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    /**
     * The PipelineUI component renders the React Flow canvas with nodes and edges, allowing users to interact with the pipeline visually. It includes controls, a minimap, and a background grid for better user experience.
     */
    return (
        <div ref={reactFlowWrapper} style={{width: '100wv', height: '70vh', background: '#0f172a'}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
                deleteKeyCode={['Delete', 'Backspace']}
                nodesDraggable={true}
                nodesConnectable={true}
                elementsSelectable={true}
                style={{ background: '#0f172a' }}
            >
                <Background color="#334155" gap={gridSize} size={1} />
                <Controls 
                    style={{
                        background: '#1e293b',
                        border: '1px solid #334155',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
                    }}
                />
                <MiniMap 
                    style={{
                        background: '#1e293b',
                        border: '1px solid #334155',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
                    }}
                    nodeColor="#6366f1"
                    maskColor="rgba(15, 23, 42, 0.8)"
                />
            </ReactFlow>
        </div>
    )
}
