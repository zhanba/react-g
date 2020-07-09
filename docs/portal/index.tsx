import React, { useRef, useState } from 'react';
import { Canvas, Circle, Html } from 'react-g-canvas';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import { Shape } from '@antv/g-canvas';

const App: React.FC = () => {
  const circleRef = useRef<Shape.Circle>();
  const portal = useRef<HTMLDivElement>(null);
  const [hovered, setHoverd] = useState(false);
  const [cursor, setCursor] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  return (
    <div>
      <div style={{ border: '1px solid #bfb3b3' }}>
        <Canvas width={600} height={400}>
          {hovered && (
            <Html portal={portal}>
              <div style={{ position: 'absolute', top: cursor.y + 10, left: cursor.x + 10 }}>
                <Button>button</Button>
                <div style={{ color: 'red' }}>test</div>
              </div>
            </Html>
          )}
          <Circle
            ref={circleRef}
            x={100}
            y={100}
            r={30}
            stroke="black"
            fill="green"
            onMouseenter={event => {
              setHoverd(true);
              setCursor({
                x: event.clientX,
                y: event.clientY,
              });
            }}
            onMousemove={event => {
              if (hovered) {
                setCursor({ x: event.clientX, y: event.clientY });
              }
            }}
            onMouseleave={() => {
              setHoverd(false);
              setCursor({
                x: 0,
                y: 0,
              });
            }}
          />
        </Canvas>
      </div>
      <div ref={portal} />
    </div>
  );
};

export default App;
