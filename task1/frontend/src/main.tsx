import "./index.css";

import { createRoot } from 'react-dom/client';
import { App } from './App';

// No StrictMode. In dev it double-invokes effects, which against a deliberately five-second
// endpoint means two slow requests per page load and a confusing wait.
createRoot(document.getElementById('root')!).render(<App />);
