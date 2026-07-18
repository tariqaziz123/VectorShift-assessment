// textNode.js

import { useState, useEffect, useMemo } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Parse variables from text ({{variableName}})
  const variables = useMemo(() => {
    const regex = /\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}/g;
    const found = new Set();
    let match;
    while ((match = regex.exec(currText)) !== null) {
      found.add(match[1]);
    }
    return Array.from(found);
  }, [currText]);

  // Calculate dynamic node size based on text content
  const nodeStyle = useMemo(() => {
    const textLength = currText.length;
    const baseWidth = 220;
    const baseHeight = 90;
    const variableCount = variables.length;
    
    // Increase width based on text length (capped at reasonable max)
    const dynamicWidth = Math.min(baseWidth + Math.max(0, textLength - 20) * 3, 400);
    
    // Increase height based on variable count and text length
    const dynamicHeight = Math.min(
      baseHeight + Math.max(0, variableCount - 1) * 25 + Math.max(0, Math.floor(textLength / 50)) * 10,
      250
    );

    return {
      width: dynamicWidth,
      minHeight: dynamicHeight
    };
  }, [currText, variables]);

  // Create dynamic handles for variables
  const handles = useMemo(() => {
    const variableHandles = variables.map((variable, index) => ({
      type: 'target',
      position: Position.Left,
      id: `${id}-${variable}`,
      style: {
        top: `${30 + (index * 25)}%`
      }
    }));

    return [
      ...variableHandles,
      {
        type: 'source',
        position: Position.Right,
        id: `${id}-output`
      }
    ];
  }, [id, variables]);

  const fields = [
    {
      label: 'Text',
      type: 'text',
      value: currText,
      onChange: handleTextChange
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      handles={handles}
      fields={fields}
      style={nodeStyle}
    >
      {variables.length > 0 && (
        <div style={{ 
          marginTop: '8px', 
          padding: '8px', 
          background: 'rgba(99, 102, 241, 0.1)', 
          borderRadius: '6px',
          border: '1px solid rgba(99, 102, 241, 0.3)'
        }}>
          <div style={{ 
            fontSize: '11px', 
            color: '#a5b4fc', 
            marginBottom: '4px',
            fontWeight: '500'
          }}>
            Variables:
          </div>
          {variables.map((variable, index) => (
            <div key={index} style={{ 
              fontSize: '12px', 
              color: '#c7d2fe',
              fontFamily: 'monospace'
            }}>
              {'{{' + variable + '}}'}
            </div>
          ))}
        </div>
      )}
    </BaseNode>
  );
}
