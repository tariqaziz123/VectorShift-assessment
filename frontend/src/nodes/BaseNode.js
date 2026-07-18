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
    width: 220,
    minHeight: 90,
    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.15)',
    color: '#e2e8f0',
    ...style
  };

  const handleStyle = {
    width: '12px',
    height: '12px',
    background: '#6366f1',
    border: '2px solid #818cf8',
    borderRadius: '50%',
    transition: 'all 0.2s ease'
  };

  const labelStyle = {
    fontSize: '12px',
    fontWeight: '500',
    color: '#94a3b8',
    marginBottom: '4px',
    display: 'block'
  };

  const inputStyle = {
    width: '100%',
    padding: '8px 12px',
    background: '#1e293b',
    border: '1px solid #475569',
    borderRadius: '6px',
    color: '#e2e8f0',
    fontSize: '13px',
    outline: 'none',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box'
  };

  const selectStyle = {
    ...inputStyle,
    cursor: 'pointer'
  };

  return (
    <div style={defaultStyle}>
      {handles.map((handle, index) => (
        <Handle
          key={index}
          type={handle.type}
          position={handle.position}
          id={handle.id || `${id}-${handle.type}-${index}`}
          style={{ ...handleStyle, ...handle.style }}
        />
      ))}
      
      <div style={{ 
        borderBottom: '1px solid #334155', 
        paddingBottom: '8px',
        marginBottom: '4px'
      }}>
        <span style={{ 
          fontWeight: '600', 
          fontSize: '14px',
          color: '#f1f5f9',
          letterSpacing: '0.5px'
        }}>{title}</span>
      </div>
      
      {fields.map((field, index) => (
        <div key={index} style={{ marginBottom: '4px' }}>
          <label style={labelStyle}>
            {field.label}
          </label>
          {field.type === 'select' ? (
            <select 
              value={field.value} 
              onChange={field.onChange}
              style={selectStyle}
            >
              {field.options.map((option, optIndex) => (
                <option key={optIndex} value={option.value} style={{ background: '#1e293b' }}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input 
              type={field.type || 'text'} 
              value={field.value} 
              onChange={field.onChange}
              style={inputStyle}
            />
          )}
        </div>
      ))}
      
      {children}
    </div>
  );
};
