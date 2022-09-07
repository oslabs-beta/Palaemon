import { createRoot, Root } from 'react-dom/client';
import App from './App';

const rootElement: HTMLElement | null = document.getElementById('root');

if (!rootElement) throw new Error('Fail to get root element in index.ts');

const root: Root = createRoot(rootElement);

root.render(<App />);