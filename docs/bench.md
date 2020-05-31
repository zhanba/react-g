# benchmark

| 图元数量    | 100 | 1000 | 2000 | 6000 | 10000 | 14000 | 20000 |
| ----------- | --- | ---- | ---- | ---- | ----- | ----- | ----- |
| react-g fps | 60  | 60   | 46   | 17   | 10    | 7     | 5     |

```tsx
import React, { useState, useEffect } from 'react';
import { Canvas, Rect, Group } from 'react-g-canvas';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const nodes = 2000;

const rectData = [...Array(nodes).keys()].map(i => {
  const rect = {
    x: getRandomInt(600),
    y: getRandomInt(400),
    width: 20,
    height: 20,
    fill: '',
    stroke: '#456734',
    id: i + '',
  };
  return rect;
});

const BenchDemo: React.FC = () => {
  const [selectedId, setSelectedId] = useState('');
  //   const [color, setColor] = useState('red');

  const handleCanvasClick = () => {
    // console.log('click canvas');
    setSelectedId('');
  };

  const handleClick = e => {
    e.stopPropagation();
    const id = e.target.get('id');
    setSelectedId(id);
    // console.log(e, id);
  };

  return (
    <div>
      <span>nodes: {nodes}</span>
      <Canvas width={600} height={400}>
        <Group>
          {rectData.map(rect => (
            <Rect
              key={rect.id}
              x={rect.x}
              y={rect.y}
              width={rect.width}
              height={rect.height}
              fill={selectedId === '' ? 'blue' : rect.id === selectedId ? 'red' : 'grey'}
              stroke={rect.stroke}
              onMouseover={handleClick}
            ></Rect>
          ))}
        </Group>
        <Rect
          x={10}
          y={200}
          width={100}
          height={100}
          fill="blue"
          onClick={handleCanvasClick}
        ></Rect>
      </Canvas>
    </div>
  );
};

export default BenchDemo;
```
