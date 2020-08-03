import React, { useRef, useState } from 'react';
import { Canvas, Rect } from '@react-g/core';
import { Tooltip } from '@react-g/component';

const App: React.FC = () => {
  const [dragStart, setDragstart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 100, y: 100 });
  const portal = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div style={{ border: '1px solid #bfb3b3' }}>
        <Canvas width={600} height={400} style={{ position: 'relative' }}>
          <Tooltip content="tootip content">
            <Rect
              x={position.x}
              y={position.y}
              width={120}
              height={120}
              stroke="black"
              fill="#fefefe"
              draggable
              onDragstart={(event) => {
                setDragstart({ x: event.x, y: event.y });
              }}
              onDrag={(event) => {
                setPosition({
                  x: position.x + event.x - dragStart.x,
                  y: position.y + event.y - dragStart.y,
                });
                setDragstart({
                  x: event.x,
                  y: event.y,
                });
              }}
              onDragend={() => {
                setDragstart({ x: 0, y: 0 });
              }}
            />
          </Tooltip>
        </Canvas>
      </div>
      <div ref={portal} />
    </div>
  );
};

export default App;
