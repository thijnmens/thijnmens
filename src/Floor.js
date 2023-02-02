import { Plane } from '@react-three/drei';
import { Euler, Texture, Vector3 } from 'three';
import Grass from './Grass';

export const Floor = () => {
	return (
		<>
			{/*<Grass position={new Vector3(0, 0, 0)} />
			<Grass position={new Vector3(100, 0, 0)} />
			<Grass position={new Vector3(0, 0, 100)} />
			<Grass position={new Vector3(100, 0, 100)} />*/}
			<Grass options={{ bW: 0.12, bH: 1, joints: 5 }} width={500} instances={500000} />
			/*
			<Plane
				args={[1000, 1000]}
				position={new Vector3(0, -4.9, 0)}
				rotation={new Euler(window.getRad(-90), 0, 0)}
			>
				<meshStandardMaterial color={0x6b8322} />
			</Plane>
			*/
		</>
	);
};
