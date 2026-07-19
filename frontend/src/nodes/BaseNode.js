// BaseNode.js

import { Handle } from 'reactflow';

/**
 * BaseNode component serves as a generic node structure for the pipeline, providing a consistent layout and styling for various types of nodes. It accepts props to customize its title, handles, fields, and additional children components.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.id - The unique identifier for the node.
 * @param {Object} props.data - The data associated with the node.
 * @param {string} props.title - The title displayed at the top of the node.
 * @param {Array} props.handles - An array of handle configurations for connecting to other nodes.
 * @param {Array} props.fields - An array of field configurations for user input within the node.
 * @param {Object} props.style - Additional styles to customize the node's appearance.
 * @param {React.ReactNode} props.children - Additional child components to render within the node.
 * @returns {JSX.Element} The rendered BaseNode component.
 */
export const BaseNode = ({ 
  id, 
  data, 
  title, 
  handles = [], 
  fields = [],
  style = {},
  children 
}) => {
  /**
   * The default style for the node, including dimensions, background, border, and other visual properties.
   */
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

  /**
   * The style for the handles, defining their size, color, border, and transition effects.
   */
  const handleStyle = {
    width: '12px',
    height: '12px',
    background: '#6366f1',
    border: '2px solid #818cf8',
    borderRadius: '50%',
    transition: 'all 0.2s ease'
  };

  /**
   * The style for the labels, defining their font size, weight, color, and margin.
   */
  const labelStyle = {
    fontSize: '12px',
    fontWeight: '500',
    color: '#94a3b8',
    marginBottom: '4px',
    display: 'block'
  };

  /**
   * The style for the input fields, defining their width, padding, background, border, border radius, color, font size, outline, transition effects, and box sizing.
   */
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

  /**
   * The style for the select dropdown, inheriting from the input style and adding a pointer cursor.
   */
  const selectStyle = {
    ...inputStyle,
    cursor: 'pointer'
  };

  /**
   * The BaseNode component renders a div containing the handles, title, fields, and any additional children. It maps over the handles and fields arrays to create the respective elements, applying the defined styles for consistent appearance.
   */
  return (
    <div style={defaultStyle}>
      {handles.map((handle, index) => (
        <Handle
          key={handle.id || `${id}-${handle.type}-${index}`}
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
        <div key={field.label || index} style={{ marginBottom: '4px' }}>
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
                <option key={option.value || optIndex} value={option.value} style={{ background: '#1e293b' }}>
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
