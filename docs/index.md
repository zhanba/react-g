# Shape

## Shape

<code src="./shape.tsx" />
 
## Click

```tsx
import React, { useState, useEffect } from 'react';
import { Canvas, Rect } from 'react-g-canvas';

const ClickDemo: React.FC = () => {
  const [color, setColor] = useState('red');

  return (
    <Canvas width={600} height={400}>
      <Rect
        x={10}
        y={10}
        width={100}
        height={50}
        fill={color}
        stroke="#456734"
        onClick={() => setColor('blue')}
      ></Rect>
    </Canvas>
  );
};

export default ClickDemo;
```
