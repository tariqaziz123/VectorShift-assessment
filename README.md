# Pipeline Builder Application

A modern web application for building and analyzing data pipelines using a visual node-based interface.

## Overview

This application provides a drag-and-drop interface for creating data pipelines with various node types, connecting them to form workflows, and analyzing the resulting pipeline structure. It features a React frontend with ReactFlow for the visual editor and a FastAPI backend for pipeline analysis.

## Features

### Visual Pipeline Editor
- **Drag-and-drop interface**: Easily add nodes to the canvas by dragging them from the toolbar
- **Node connections**: Connect nodes by dragging from handles to create data flow
- **Interactive canvas**: Pan, zoom, and manipulate the pipeline layout
- **Node selection**: Select nodes with visual feedback (indigo outline and glow)
- **Keyboard shortcuts**: Delete selected nodes using Delete or Backspace keys

### Node Types

#### Basic Nodes (Always Visible)
- **Input**: Entry point for data with configurable name and type (Text/File)
- **LLM**: Language Model node with system and prompt inputs
- **Output**: Exit point for pipeline results with configurable name and type
- **Text**: Text processing with dynamic variable detection

#### Advanced Nodes
- **Math**: Mathematical operations with two operands and configurable operations (+, -, *, /)
- **Condition**: Conditional logic with comparison operators and true/false outputs
- **API**: HTTP API calls with configurable URL and method (GET, POST, PUT, DELETE)
- **Transform**: String transformations (uppercase, lowercase, trim, reverse, custom regex)
- **Delay**: Time delay node with configurable millisecond delay

### Special Features

#### Enhanced Text Node
- **Dynamic resizing**: Node automatically adjusts size based on text content length
- **Variable detection**: Automatically detects `{{variable}}` patterns and creates corresponding input handles
- **Visual feedback**: Displays detected variables in an indigo panel with monospace font

#### Node Abstraction
- **BaseNode component**: Reusable component that standardizes node structure and styling
- **Consistent styling**: All nodes share a modern dark theme with gradients and shadows
- **Easy extensibility**: New nodes can be created quickly using the BaseNode abstraction

### Pipeline Analysis
- **Node counting**: Counts total nodes in the pipeline
- **Edge counting**: Counts total connections between nodes
- **DAG detection**: Uses Kahn's algorithm to check if the pipeline forms a Directed Acyclic Graph
- **User-friendly alerts**: Displays analysis results with emoji indicators

### Modern UI/UX
- **Dark theme**: Professional dark slate/indigo color scheme
- **Gradient backgrounds**: Depth and visual interest throughout the interface
- **Smooth transitions**: Hover effects and animations for better user experience
- **Custom scrollbars**: Styled scrollbars matching the theme
- **Responsive design**: Adapts to different screen sizes

## Architecture

### Frontend (React)
- **ReactFlow**: Visual node-based editor library
- **Zustand**: State management for nodes and edges
- **Custom components**: Modular node components with shared abstraction

### Backend (FastAPI)
- **FastAPI**: Modern Python web framework
- **Pydantic**: Data validation and serialization
- **CORS support**: Cross-origin requests enabled for frontend integration
- **DAG algorithm**: Kahn's algorithm for cycle detection

## Project Structure

```
VectorShift-assessment/
├── frontend/
│   ├── src/
│   │   ├── nodes/
│   │   │   ├── BaseNode.js          # Shared node abstraction
│   │   │   ├── inputNode.js         # Input node component
│   │   │   ├── outputNode.js        # Output node component
│   │   │   ├── llmNode.js           # LLM node component
│   │   │   ├── textNode.js          # Enhanced text node with variable detection
│   │   │   ├── mathNode.js          # Mathematical operations
│   │   │   ├── conditionNode.js     # Conditional logic
│   │   │   ├── apiNode.js           # API calls
│   │   │   ├── transformNode.js     # String transformations
│   │   │   └── delayNode.js         # Time delays
│   │   ├── App.js                   # Main application component
│   │   ├── ui.js                    # ReactFlow canvas component
│   │   ├── toolbar.js               # Node toolbar component
│   │   ├── submit.js                # Submit button with backend integration
│   │   ├── store.js                 # Zustand state management
│   │   ├── draggableNode.js         # Draggable node component
│   │   └── index.css                # Global styles and ReactFlow overrides
│   ├── package.json
│   └── README.md
└── backend/
    ├── main.py                       # FastAPI application with pipeline analysis
    └── requirements.txt             # Python dependencies
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Python (v3.8 or higher)
- pip

### Frontend Setup
```bash
cd frontend
npm install
```

### Backend Setup
```bash
cd backend
pip install fastapi uvicorn pydantic
```

## Running the Application

### Start the Backend
```bash
cd backend
uvicorn main:app --reload --port 8000
```

The backend will be available at `http://localhost:8000`

### Start the Frontend
```bash
cd frontend
npm start
```

The frontend will be available at `http://localhost:3000`

## Usage

### Building a Pipeline
1. **Add nodes**: Drag nodes from the toolbar to the canvas
2. **Connect nodes**: Drag from a node's handle to another node's handle to create connections
3. **Configure nodes**: Click on nodes to configure their parameters
4. **Delete nodes**: Select a node and press Delete or Backspace to remove it
5. **Submit pipeline**: Click "Submit Pipeline" to analyze the pipeline structure

### Text Node Variable Detection
1. Add a Text node to the canvas
2. Enter text with variables in double curly brackets: `Hello {{name}}, your score is {{score}}`
3. The node will automatically:
   - Resize to accommodate the text
   - Create input handles for each detected variable
   - Display the variables in a visual panel

### Pipeline Analysis
When you submit a pipeline, the backend analyzes:
- **Number of nodes**: Total nodes in the pipeline
- **Number of edges**: Total connections between nodes  
- **DAG status**: Whether the pipeline contains cycles (not a valid DAG)

The results are displayed in a user-friendly alert with emoji indicators.

## API Endpoints

### POST `/pipelines/parse`
Analyzes a pipeline structure and returns metrics.

**Request Body:**
```json
{
  "nodes": [
    {
      "id": "customInput-1",
      "type": "customInput",
      "position": {"x": 100, "y": 100},
      "data": {"inputName": "input_1", "inputType": "Text"}
    }
  ],
  "edges": [
    {
      "id": "reactflow__edge-1-2",
      "source": "customInput-1",
      "target": "llm-1",
      "type": "smoothstep"
    }
  ]
}
```

**Response:**
```json
{
  "num_nodes": 2,
  "num_edges": 1,
  "is_dag": true
}
```

## Technology Stack

### Frontend
- **React 18**: UI library
- **ReactFlow 11**: Node-based editor
- **Zustand**: State management
- **CSS-in-JS**: Inline styling with modern CSS features

### Backend
- **FastAPI**: Web framework
- **Pydantic**: Data validation
- **Uvicorn**: ASGI server

## Key Implementation Details

### Node Abstraction
The `BaseNode` component provides a consistent structure for all nodes:
- Shared styling (gradients, borders, shadows)
- Handle rendering system
- Field rendering (text, select inputs)
- Custom style overrides
- Children content support

### DAG Detection Algorithm
The backend uses Kahn's algorithm for topological sorting to detect cycles:
1. Build adjacency list and in-degree count
2. Initialize queue with nodes having zero in-degree
3. Process nodes and update in-degrees
4. If all nodes are visited, the graph is a DAG

### Variable Detection
The Text node uses regex to detect JavaScript variable names:
- Pattern: `/\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}/g`
- Validates JavaScript naming conventions
- Creates dynamic handles for each detected variable

## Development

### Adding New Nodes
1. Create a new component in `frontend/src/nodes/`
2. Extend the `BaseNode` component
3. Define handles and fields
4. Register the node in `frontend/src/ui.js`
5. Add to toolbar in `frontend/src/toolbar.js`

### Styling Guidelines
- Use the established color palette (slate grays + indigo accents)
- Maintain consistent spacing and sizing
- Apply gradients for depth
- Include hover effects and transitions
- Follow the existing component structure

## Future Enhancements

Potential improvements for the application:
- Save/load pipeline configurations
- Export pipelines to various formats
- Real-time collaboration features
- Additional node types
- Pipeline execution engine
- Advanced analytics and visualization
- Undo/redo functionality
- Node templates and presets

## License

This project is part of a technical assessment for VectorShift.
