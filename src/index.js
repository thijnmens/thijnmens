import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

window.getRad = (deg) => {
	return (deg * Math.PI) / 180;
};

createRoot(document.getElementById('root')).render(<App />);
