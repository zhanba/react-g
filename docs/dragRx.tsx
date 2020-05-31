import React from 'react';

import { useEventCallback } from 'rxjs-hooks';
import { map } from 'rxjs/operators';
import { Canvas, Rect, Circle } from 'react-g-canvas';

const App: React.FC = () => {
  const [handleDrag, [x, y]] = useEventCallback(event$ => event$.pipe(map(e => [e.x, e.y])), [
    100,
    100,
  ]);
  return (
    <div>
      {/* <span>position: {`${x}, ${y}`}</span> */}
      <div style={{ border: '1px solid #bfb3b3' }}>
        <Canvas width={600} height={400}>
          <Circle
            x={x}
            y={y}
            r={30}
            stroke="black"
            fill="green"
            draggable
            // onDragstart={handleDragstart}
            onDrag={handleDrag}
            // onDragend={handleDragend}
          />
        </Canvas>
      </div>
    </div>
  );
};

export default App;
