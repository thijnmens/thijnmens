// https://codesandbox.io/s/wft0n?file=/src/WasdControls.js and https://codesandbox.io/s/wft0n?file=/src/LookControls.js
// modified

import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Euler, Vector3 } from 'three';

const euler = new Euler(0, 0, 0, 'YXZ');
const vec = new Vector3();

// Reference to a set of active KeyboardEvent.code entries
const useCodes = () => {
	const codes = useRef(new Set());
	useEffect(() => {
		const onKeyDown = (e) => codes.current.add(e.code);
		const onKeyUp = (e) => codes.current.delete(e.code);
		window.addEventListener('keydown', onKeyDown);
		window.addEventListener('keyup', onKeyUp);
		return () => {
			window.removeEventListener('keydown', onKeyDown);
			window.removeEventListener('keyup', onKeyUp);
		};
	}, []);
	return codes;
};

export function LookControls() {
	const { camera, gl } = useThree();
	useEffect(() => {
		const state = {
			drag: false,
			prev: { screenX: null, screenY: null },
		};
		gl.domElement.style.cursor = 'grab';
		const onMouseDown = (e) => {
			state.drag = true;
			e.target.style.cursor = 'grabbing';
			e.target.setPointerCapture(e.pointerId);
			state.prev.screenX = e.screenX;
			state.prev.screenY = e.screenY;
		};
		const onMouseUp = () => {
			state.drag = false;
			gl.domElement.style.cursor = 'grab';
		};
		const onMouseMove = (e) => {
			if (state.drag) {
				const dx = e.screenX - state.prev.screenX;
				const dy = e.screenY - state.prev.screenY;
				euler.setFromQuaternion(camera.quaternion);
				euler.y -= dx * 0.002;
				euler.x -= dy * 0.002;
				camera.quaternion.setFromEuler(euler);
			}
			state.prev.screenX = e.screenX;
			state.prev.screenY = e.screenY;
		};
		gl.domElement.addEventListener('mousemove', onMouseMove);
		gl.domElement.addEventListener('mousedown', onMouseDown);
		gl.domElement.addEventListener('mouseup', onMouseUp);
	}, [camera, gl]);
	return null;
}

// Rotation logic from three/examples/jsm/controls/PointerLockControls.js
export function WasdControls() {
	const { camera } = useThree();

	const code = useCodes();
	const moveForward = (distance) => {
		vec.setFromMatrixColumn(camera.matrix, 0);
		vec.crossVectors(camera.up, vec);
		camera.position.addScaledVector(vec, distance);
	};
	const moveRight = (distance) => {
		vec.setFromMatrixColumn(camera.matrix, 0);
		camera.position.addScaledVector(vec, distance);
	};
	useFrame((_, delta) => {
		const speed = code.current.has('ShiftLeft') ? 5 : 2;
		if (code.current.has('KeyW')) moveForward(delta * speed);
		if (code.current.has('KeyA')) moveRight(-delta * speed);
		if (code.current.has('KeyS')) moveForward(-delta * speed);
		if (code.current.has('KeyD')) moveRight(delta * speed);
	});
	return null;
}
