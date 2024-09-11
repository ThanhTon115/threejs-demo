import { Canvas, useLoader } from "@react-three/fiber";
import "./App.css";
import { useRef, useState } from "react";
import { Html, OrbitControls } from "@react-three/drei";
import { TextureLoader, BackSide } from "three";
const stepMap = {
  1: "1-Entrance.jpeg",
  2: "2-Window Table.jpeg",
  3: "3-Window Table 2.jpeg",
  4: "4-Corner.jpeg",
};
const Sphere360Background = ({ currentStep = 1, updateStep }) => {
  const meshRef = useRef();
  const texture = useLoader(
    TextureLoader,
    `/src/assets/360-images/${stepMap[currentStep]}`
  );

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={BackSide} />
      {currentStep < 4 && (
        <Html transform position={[-306, -136, 360]} scale={[3, 3, 3]}>
          <img
            onClick={() => updateStep("right")}
            src="/src/assets/footstep.png"
            style={{
              cursor: "pointer",
              transform: "rotate3d(1200, 350, 0, 30deg)",
            }}
          />
        </Html>
      )}
      {currentStep > 1 && (
        <Html transform position={[0, 0, 0]} scale={[3, 3, 3]}>
          <img
            onClick={() => updateStep("left")}
            src="/src/assets/footstep.png"
            style={{
              cursor: "pointer",
              transform: "rotate3d(1200, 350, 0, 30deg)",
            }}
          />
        </Html>
      )}
    </mesh>
  );
};
const App = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const updateStep = (stepType: "left" | "right") => {
    setLoading(true);
    if (stepType === "right") {
      setCurrentStep(currentStep + 1);
    } else setCurrentStep(currentStep - 1);
    setLoading(false);
  };
  return (
    <div className="main-body">
      <Canvas camera={{ position: [36, 9, -92], fov: 45 }}>
        {!loading && (
          <Sphere360Background
            currentStep={currentStep}
            updateStep={updateStep}
          />
        )}
        <ambientLight intensity={0.5} />
        <pointLight position={[24, 24, 50]} />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};
export default App;
