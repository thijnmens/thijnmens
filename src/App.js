import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { Floor } from './Floor';
import { LookControls, WasdControls } from './Controls';
import Stats from 'stats.js';

export default function App() {
	const stats = new Stats();
	stats.showPanel(0);
	document.body.appendChild(stats.dom);

	function animate() {
		stats.begin();

		stats.end();
		requestAnimationFrame(animate);
	}

	requestAnimationFrame(animate);

	return (
		<Canvas>
			<Sky azimuth={1} inclination={0.6} distance={1000} />
			<ambientLight />
			<Suspense fallback={null}>
				<Floor />
			</Suspense>
			<LookControls />
			<WasdControls />
		</Canvas>
	);
}
