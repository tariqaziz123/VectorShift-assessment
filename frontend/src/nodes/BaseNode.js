// BaseNode.js

import { Handle, Position } from 'reactflow';

export const BaseNode = ({ 
  id, 
  data, 
  title, 
  handles = [], 
  fields = [],
  style = {},
  children 
}) => {
  const defaultStyle = {
    width: 200,
    height: 80,
    border: '1px solid black',
    padding: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    ...style
  };

  return (
    <div style={defaultStyle}>
      {handles.map((handle, index) => (
        <Handle
          key={index}
          type={handle.type}
          position={handle.position}
          id={handle.id || `${id}-${handle.type}-${index}`}
          style={handle.style}
        />
      ))}
      
      <div>
        <span style={{ fontWeight: 'bold' }}>{title}</span>
      </div>
      
      {fields.map((field, index) => (
        <div key={index}>
          <label>
            {field.label}:
            {field.type === 'select' ? (
              <select 
                value={field.value} 
                onChange={field.onChange}
                style={{ marginLeft: '4px' }}
              >
                {field.options.map((option, optIndex) => (
                  <option key={optIndex} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input 
                type={field.type || 'text'} 
                value={field.value} 
                onChange={field.onChange}
                style={{ marginLeft: '4px' }}
              />
            )}
          </label>
        </div>
      ))}
      
      {children}
    </div>
  );
};
