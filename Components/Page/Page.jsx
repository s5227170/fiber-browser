import { useThree } from "@react-three/fiber";

export function Page({ m = 0.4, urls, ...props }) {
  return (
    <group {...props}>
      <group position={[0, 0, 0]}>{props.children} </group>
    </group>
  );
}
