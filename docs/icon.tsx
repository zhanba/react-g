import React, { useRef } from 'react';
import { Canvas as GCanvas } from '@antv/g-canvas';
import { Canvas, Group, IconFont } from 'react-g-canvas';

const App: React.FC = () => {
  const canvasRef = useRef<GCanvas>();

  return (
    <Canvas width={600} height={400} ref={canvasRef}>
      <Group>
        <IconFont type="api" x={100} y={100} />
      </Group>
    </Canvas>
  );
};

export default App;
