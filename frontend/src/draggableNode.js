// draggableNode.js

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    const nodeColors = {
      customInput: 'from-blue-500 to-blue-600',
      llm: 'from-purple-500 to-purple-600',
      customOutput: 'from-green-500 to-green-600',
      text: 'from-yellow-500 to-yellow-600',
      math: 'from-pink-500 to-pink-600',
      condition: 'from-orange-500 to-orange-600',
      api: 'from-cyan-500 to-cyan-600',
      transform: 'from-indigo-500 to-indigo-600',
      delay: 'from-red-500 to-red-600'
    };

    const gradient = nodeColors[type] || 'from-gray-500 to-gray-600';
    
    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
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
  