// submit.js

import { useStore } from './store';
import { shallow } from 'zustand/shallow';

/**
 * SubmitButton component renders a button that allows users to submit their pipeline for analysis.
 * @returns {JSX.Element} The rendered SubmitButton component.
 */
export const SubmitButton = () => {
    /**
     * useStore hook is used to access the nodes and edges from the Zustand store. The shallow comparison is used to prevent unnecessary re-renders when the state changes.
     */
    const { nodes, edges } = useStore(
        (state) => ({ nodes: state.nodes, edges: state.edges }),
        shallow
    );

    /**
     * validatePipeline function checks if the pipeline has at least one input and one output node, and that all nodes are connected.
     * @returns {Object} Validation result with isValid boolean and errorMessage string.
     */
    const validatePipeline = () => {
        const hasInputNode = nodes.some(node => node.type === 'customInput');
        const hasOutputNode = nodes.some(node => node.type === 'customOutput');
        
        if (!hasInputNode && !hasOutputNode) {
            return {
                isValid: false,
                errorMessage: '❌ Pipeline must have at least one Input node and one Output node'
            };
        }
        
        if (!hasInputNode) {
            return {
                isValid: false,
                errorMessage: '❌ Pipeline must have at least one Input node'
            };
        }
        
        if (!hasOutputNode) {
            return {
                isValid: false,
                errorMessage: '❌ Pipeline must have at least one Output node'
            };
        }
        
        // Check for disconnected nodes
        const disconnectedNodes = nodes.filter(node => {
            const hasIncomingEdge = edges.some(edge => edge.target === node.id);
            const hasOutgoingEdge = edges.some(edge => edge.source === node.id);
            
            // Input nodes should have outgoing edges
            if (node.type === 'customInput') {
                return !hasOutgoingEdge;
            }
            // Output nodes should have incoming edges
            if (node.type === 'customOutput') {
                return !hasIncomingEdge;
            }
            // Other nodes should have at least one connection
            return !hasIncomingEdge && !hasOutgoingEdge;
        });
        
        if (disconnectedNodes.length > 0) {
            const disconnectedNodeTypes = disconnectedNodes.map(n => n.type).join(', ');
            return {
                isValid: false,
                errorMessage: `❌ Pipeline has ${disconnectedNodes.length} disconnected node(s): ${disconnectedNodeTypes}. All nodes must be connected.`
            };
        }
        
        return {
            isValid: true,
            errorMessage: null
        };
    };

    /**
     * handleSubmit function is an asynchronous function that sends a POST request to the backend API with the current nodes and edges of the pipeline. It handles the response and displays user-friendly alerts based on the analysis results or any errors encountered during submission.
     */
    const handleSubmit = async () => {
        // Validate pipeline before submission
        const validation = validatePipeline();
        if (!validation.isValid) {
            alert(validation.errorMessage);
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nodes: nodes,
                    edges: edges
                })
            });

            if (!response.ok) {
                throw new Error('Failed to submit pipeline');
            }

            const data = await response.json();
            
            // Display user-friendly alert
            const dagStatus = data.is_dag ? '✅ Valid DAG' : '❌ Not a DAG (contains cycles)';
            alert(
                `Pipeline Analysis Results:\n\n` +
                `📊 Number of Nodes: ${data.num_nodes}\n` +
                `🔗 Number of Edges: ${data.num_edges}\n` +
                `${dagStatus}`
            );
        } catch (error) {
            alert(`Error submitting pipeline: ${error.message}`);
        }
    };

    /**
     * The SubmitButton component renders a styled button that triggers the handleSubmit function when clicked. The button is centered and has a gradient background, rounded corners, and hover effects for better user experience.
     */
    return (
        <div style={{
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '20px',
            borderTop: '1px solid #334155',
            background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)'
        }}>
            <button 
                type="button"
                onClick={handleSubmit}
                style={{
                    padding: '12px 32px',
                    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                    border: '1px solid #818cf8',
                    borderRadius: '8px',
                    color: '#f1f5f9',
                    fontSize: '15px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px -1px rgba(99, 102, 241, 0.3), 0 2px 4px -1px rgba(99, 102, 241, 0.15)',
                    transition: 'all 0.2s ease',
                    letterSpacing: '0.5px'
                }}
                onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 12px -1px rgba(99, 102, 241, 0.4), 0 4px 6px -1px rgba(99, 102, 241, 0.2)';
                }}
                onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 6px -1px rgba(99, 102, 241, 0.3), 0 2px 4px -1px rgba(99, 102, 241, 0.15)';
                }}
            >
                Submit Pipeline
            </button>
        </div>
    );
}
