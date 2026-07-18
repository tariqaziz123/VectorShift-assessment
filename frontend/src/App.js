import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

/**
 * The main App component that serves as the entry point for the application. It renders the PipelineToolbar, PipelineUI, and SubmitButton components within a styled container.
 * The container is styled with a minimum height, a linear gradient background, and a flex layout to arrange the child components vertically.
 */
function App() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;
