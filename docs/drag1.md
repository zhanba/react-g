## drag in hooks

```tsx
import React, { useState, useEffect } from 'react';
import { Canvas, Rect, Circle } from 'react-g-canvas';

const Drag: React.FC = () => {
  const [color, setColor] = useState('red');
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [dragstart, setDragstart] = useState({ x: 0, y: 0 });

  const handleDragstart = e => {
    setDragstart({ x: e.x, y: e.y });
  };

  const handleDrag = e => {
    setPosition({ x: position.x + e.x - dragstart.x, y: position.y + e.y - dragstart.y });
    setDragstart({ x: e.x, y: e.y });
  };

  const handleDragend = e => {};

  return (
    <div>
      <span>position: {`${position.x}, ${position.y}`}</span>
      <div style={{ border: '1px solid #bfb3b3' }}>
        <Canvas width={600} height={400}>
          <Circle
            x={position.x}
            y={position.y}
            r={30}
            stroke="black"
            fill="green"
            draggable={true}
            onDragstart={handleDragstart}
            onDrag={handleDrag}
            onDragend={handleDragend}
          />
        </Canvas>
      </div>
    </div>
  );
};

export default Drag;
```
