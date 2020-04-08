# hello

```jsx
import React from 'react';

export default () => <h2>First Demo</h2>;
```

```tsx
import React, { useState, useEffect } from 'react';
import { ReactG } from 'react-g-canvas';

const { Canvas, Rect, Group } = ReactG;

const App: React.FC = () => {
  const [color, setColor] = useState('red');
  useEffect(() => {
    const timer = setTimeout(() => {
      setColor('green');
      console.log('setcolor');
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <Canvas width={600} height={400}>
      <Rect x={20} y={20} width={100} height={50} fill="blue" stroke="#456734"></Rect>
      <Group>
        <Group>
          <Rect x={10} y={10} width={100} height={50} fill={color} stroke="#456734"></Rect>
        </Group>
      </Group>
    </Canvas>
  );
};

export default App;
```
