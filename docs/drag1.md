## Drag in hooks

```tsx
import React, { useState, useEffect } from 'react';
import { Canvas, Rect, Circle } from 'react-g-canvas';

const Drag: React.FC = () => {
  const [color, setColor] = useState('red');
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [dragstart, setDragstart] = useState({ x: 0, y: 0 });

  let handleDragstart;
  let handleDrag;
  let handleDragend;

  useEffect(() => {
    handleDragstart = e => {
      console.log('dragstart', e.x, e.y, position);
      setDragstart({ x: e.x, y: e.y });
    };

    handleDrag = e => {
      console.log('drag ---- ');
      console.log('drag', e.x, e.y);
      console.log('old position', position);
      console.log('old start', dragstart);
      console.log('new position', {
        x: position.x + e.x - dragstart.x,
        y: position.y + e.y - dragstart.y,
      });
      setPosition({ x: position.x + e.x - dragstart.x, y: position.y + e.y - dragstart.y });
      // setDragstart({ x: e.x, y: e.y });
    };

    handleDragend = e => {
      console.log('dragend', e);
      // setPosition({ x: e.x, y: e.y });
    };
  });

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
