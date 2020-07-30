import React, { useState, useRef } from 'react';
import { Canvas as GCanvas } from '@antv/g-canvas';
import { Canvas, Group, Ellipse, Line } from '@react-g/core';

const App: React.FC = () => {
  const canvasRef = useRef<GCanvas>(null);
  const [visible, setVisible] = useState(true);
  return (
    <Canvas
      width={600}
      height={400}
      ref={canvasRef}
      onMouseenter={() => setVisible(false)}
      onMouseleave={() => setVisible(true)}
    >
      <Group>
        {visible && <Ellipse x={100} y={120} rx={30} ry={20} stroke="red" />}
        <Line x1={200} y1={60} x2={100} y2={120} stroke="black" startArrow endArrow />
      </Group>
    </Canvas>
  );
};

export default App;
