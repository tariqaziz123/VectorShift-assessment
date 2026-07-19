# Pipeline Builder Frontend

A visual pipeline builder application built with React and React Flow that allows users to create, connect, and validate data processing pipelines through an intuitive drag-and-drop interface.

## Features

### Core Functionality
- **Drag-and-Drop Interface**: Intuitive node-based pipeline creation using React Flow
- **Multiple Node Types**: Support for various processing nodes:
  - **Input/Output Nodes**: Entry and exit points for pipeline data
  - **Text Node**: Text processing with dynamic variable detection (`{{variable}}` syntax)
  - **Math Node**: Mathematical operations with two operands
  - **LLM Node**: Language Model integration with system and prompt inputs
  - **Condition Node**: Conditional logic with comparison operators
  - **API Node**: HTTP API calls with configurable URL and method
  - **Transform Node**: String transformations (uppercase, lowercase, trim, etc.)
  - **Delay Node**: Time delay with configurable millisecond duration

### User Experience Enhancements
- **Node Tooltips**: Hover over draggable nodes to see descriptions before adding them
- **Custom Controls**: Enhanced zoom controls with zoom level indicator and fit-to-screen functionality
- **Visual Styling**: Modern dark theme with gradient backgrounds and smooth animations
- **MiniMap**: Overview of the entire pipeline for better navigation

### Pipeline Validation
- **Mandatory Nodes**: Requires at least one Input and one Output node
- **Connection Validation**: Prevents invalid connections (self-connections, duplicates)
- **Disconnected Node Detection**: Ensures all nodes are properly connected
- **Required Field Validation**: Validates that all nodes have their required inputs filled before submission
- **DAG Validation**: Backend validation to ensure pipelines are valid Directed Acyclic Graphs

## Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode with hot-reloading enabled.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder with optimized bundling.

### `npm run eject`
**Note: This is a one-way operation.** Ejects from Create React App to customize build configuration.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser

### Backend Integration

The frontend connects to a FastAPI backend running on `http://localhost:8000` for pipeline validation and processing. Ensure the backend is running before submitting pipelines.

## Project Structure

```
frontend/
├── src/
│   ├── nodes/           # Node component definitions
│   │   ├── BaseNode.js  # Base component for all nodes
│   │   ├── inputNode.js
│   │   ├── outputNode.js
│   │   ├── textNode.js
│   │   └── ...
│   ├── ui.js            # Main React Flow canvas component
│   ├── store.js         # Zustand state management
│   ├── submit.js        # Pipeline submission component
│   ├── toolbar.js       # Node toolbar component
│   ├── draggableNode.js # Draggable node component
│   └── index.css        # Global styles
```

## Technology Stack

- **React**: UI framework
- **React Flow**: Node-based UI library
- **Zustand**: State management
- **Create React App**: Build tooling

## Usage

1. **Add Nodes**: Drag nodes from the toolbar onto the canvas
2. **Connect Nodes**: Drag from output handles to input handles to create connections
3. **Configure Nodes**: Click on nodes to configure their properties
4. **Validate**: Click "Submit Pipeline" to validate and analyze your pipeline
5. **Navigate**: Use zoom controls and minimap to navigate complex pipelines

## Development Notes

- The application uses modern React patterns including hooks and functional components
- State management is handled by Zustand for performance and simplicity
- Custom styling overrides React Flow defaults for a cohesive dark theme
- Connection validation prevents invalid pipeline structures before submission
