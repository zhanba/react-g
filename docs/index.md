# demo

## Shape

```tsx
import React, { useState, useEffect } from 'react';
import { ReactG } from 'react-g-canvas';

const {
  Canvas,
  Rect,
  Group,
  Text,
  Circle,
  Ellipse,
  Image,
  Line,
  Marker,
  Path,
  Polygon,
  Polyline,
} = ReactG;

const App: React.FC = () => {
  const [color, setColor] = useState('red');
  useEffect(() => {
    const timer = setTimeout(() => {
      setColor('green');
      console.log('setcolor');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <Canvas width={600} height={400}>
      <Group>
        <Text x={200} y={60} text="测试文字以" fill="black" />
        <Circle x={200} y={60} r={30} stroke="black" />
        <Ellipse x={100} y={120} rx={30} ry={20} stroke="red" />
        <Image
          x={100}
          y={120}
          width={200}
          height={80}
          img="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg"
        />
        <Line x1={200} y1={60} x2={100} y2={120} stroke="black" startArrow={true} endArrow={true} />
      </Group>
      <Rect x={20} y={20} width={100} height={50} fill="blue" stroke="#456734"></Rect>
      <Group>
        <Group>
          <Rect x={10} y={10} width={100} height={50} fill={color} stroke="#456734"></Rect>
        </Group>
        <Marker
          x={10}
          y={200}
          r={10}
          symbol={function(x, y, r) {
            return [['M', x, y], ['L', x + r, y + r], ['L', x + r * 2, y], ['Z']];
          }}
          stroke="black"
        />
        <Path
          startArrow={{
            path: 'M 10,0 L -10,-10 L -10,10 Z', // 自定义箭头为中心点在(0, 0)，指向 x 轴正方向的path
            d: 10,
          }}
          endArrow={{
            path: 'M 10,0 L -10,-10 L -10,10 Z', // 自定义箭头为中心点在(0, 0)，指向 x 轴正方向的path
            d: 10,
          }}
          path={[
            ['M', 300, 100],
            ['L', 400, 200],
          ]}
          stroke="#000"
          lineWidth={8}
        />
        <Polygon
          points={[
            [30, 30],
            [40, 20],
            [30, 50],
            [60, 100],
          ]}
          fill="red"
        />
        <Polyline
          points={[
            [100, 30],
            [200, 20],
            [200, 50],
            [300, 100],
          ]}
          fill="red"
          startArrow={true}
          endArrow={true}
        />
      </Group>
    </Canvas>
  );
};

export default App;
```

## Click

```tsx
import React, { useState, useEffect } from 'react';
import { ReactG } from 'react-g-canvas';

const { Canvas, Rect } = ReactG;

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

## Drag

```tsx
import React, { useState, useEffect } from 'react';
import { ReactG } from 'react-g-canvas';

const { Canvas, Rect } = ReactG;

const Drag: React.FC = () => {
  const [color, setColor] = useState('red');
  const [position, setPosition] = useState({ x: 10, y: 10 });
  const [dragstart, setDragstart] = useState({ x: 0, y: 0 });

  const handleDragstart = e => {
    console.log('dragstart', e.x, e.y, position);
    setDragstart({ x: e.x, y: e.y });
  };

  const handleDrag = e => {
    console.log('drag', position.x, e.x, dragstart.x, position.y, e.y, dragstart.y);

    setPosition({ x: position.x + e.x - dragstart.x, y: position.y + e.y - dragstart.y });
    setDragstart({ x: e.x, y: e.y });
  };

  const handleDragend = e => {
    // console.log('dragend', e);
    // setPosition({ x: e.x, y: e.y });
  };

  return (
    <div>
      <span>position: {`${position.x}, ${position.y}`}</span>
      <div style={{ border: '1px solid #bfb3b3' }}>
        <Canvas width={600} height={400}>
          <Rect
            x={position.x}
            y={position.y}
            width={100}
            height={50}
            fill={color}
            stroke="#456734"
            draggable={true}
            onClick={() => setColor('blue')}
            onDragstart={handleDragstart}
            onDrag={handleDrag}
            onDragend={handleDragend}
          ></Rect>
        </Canvas>
      </div>
    </div>
  );
};

export default Drag;
```
