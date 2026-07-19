// draggableNode.js

/**
 * DraggableNode component represents a draggable node in the pipeline that can be dragged onto the canvas. It provides a visual representation of the node with a specific type and label.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.type - The type of the node.
 * @param {string} props.label - The label for the node.
 * @returns {JSX.Element} The rendered DraggableNode component.
 */
export const DraggableNode = ({ type, label }) => {
  /**
   * Handles the drag start event for the node, setting the cursor style and transferring the node type data to the drag event.
   *
   * @param {Object} event - The drag event object.
   * @param {string} nodeType - The type of the node being dragged.
   */
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    /**
     * A mapping of node types to their descriptions.
     */
    const nodeDescriptions = {
      customInput: 'Entry point for data with configurable name and type',
      llm: 'Language Model node with system and prompt inputs',
      customOutput: 'Exit point for pipeline results with configurable name and type',
      text: 'Text processing with dynamic variable detection',
      math: 'Mathematical operations with two operands',
      condition: 'Conditional logic with comparison operators',
      api: 'HTTP API calls with configurable URL and method',
      transform: 'String transformations (uppercase, lowercase, trim, etc.)',
      delay: 'Time delay node with configurable millisecond delay'
    };

    const description = nodeDescriptions[type] || 'Drag to add this node to the canvas';
    
    /**
     * Renders the DraggableNode component with the specified type, label, and description. The node is styled with a gradient background, rounded corners, and a shadow effect. It is draggable and responds to mouse events for visual feedback.
     */
    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        title={description}
        style={{ 
          cursor: 'grab', 
          minWidth: '90px', 
          height: '70px',
          display: 'flex', 
          alignItems: 'center', 
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
          border: '1px solid #60a5fa',
          justifyContent: 'center', 
          flexDirection: 'column',
          boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3), 0 2px 4px -1px rgba(59, 130, 246, 0.15)',
          transition: 'all 0.2s ease',
          padding: '8px'
        }} 
        draggable
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 8px 12px -1px rgba(59, 130, 246, 0.4), 0 4px 6px -1px rgba(59, 130, 246, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 6px -1px rgba(59, 130, 246, 0.3), 0 2px 4px -1px rgba(59, 130, 246, 0.15)';
        }}
      >
          <span style={{ 
            color: '#fff', 
            fontWeight: '600', 
            fontSize: '13px',
            textAlign: 'center'
          }}>{label}</span>
      </div>
    );
  };
  