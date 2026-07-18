// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ 
            padding: '20px', 
            background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
            borderBottom: '1px solid #334155',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
        }}>
            <div style={{ 
                marginBottom: '16px'
            }}>
                <h2 style={{ 
                    color: '#f1f5f9', 
                    fontSize: '18px', 
                    fontWeight: '600',
                    margin: 0,
                    letterSpacing: '0.5px'
                }}>Pipeline Nodes</h2>
                <p style={{ 
                    color: '#94a3b8', 
                    fontSize: '13px', 
                    margin: '4px 0 0 0' 
                }}>Drag nodes to the canvas to build your pipeline</p>
            </div>
            <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '12px',
                alignItems: 'center'
            }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='math' label='Math' />
                <DraggableNode type='condition' label='Condition' />
                <DraggableNode type='api' label='API' />
                <DraggableNode type='transform' label='Transform' />
                <DraggableNode type='delay' label='Delay' />
            </div>
        </div>
    );
};
