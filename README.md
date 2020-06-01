# react-g

[![NPM version][npm-image]][npm-url]

[npm-image]: http://img.shields.io/npm/v/react-g-canvas.svg?style=flat-square&color=blue
[npm-url]: http://npmjs.org/package/react-g-canvas

React render for @antv/g.

Building visualization component in declarative and composable way.

## Install

```sh
npm i react-g-canvas
```

## Example

```tsx
import React, { useState, useEffect } from 'react';
import { Canvas, Group, Rect, Text } from 'react-g-canvas';

const App: React.FC = () => {
  const [color, setColor] = useState('yellow');

  useEffect(() => {
    const timer = setTimeout(() => {
      setColor('green');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Canvas width={1000} height={800}>
      <Group>
        <Rect x={10} y={10} width={100} height={50} fill={color} stroke="#456734" />
        <Text x={200} y={60} text="test" fill="black" />
      </Group>
    </Canvas>
  );
};

export default App;
```

## Documentation

[Here](https://zhanba.github.io/react-g/), under construction.
