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

## Usage

### Container

Container include `Canvas` and `Group`.

### Shape

Shape include `Text`, `Circle`,`Ellipse`,`Image`,`Line`, `Marker`, `Path`, `Polygon` and `Polyline`.

```tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  Canvas,
  Group,
  Rect,
  Text,
  Circle,
  Ellipse,
  Image,
  Line,
  Marker,
  Path,
  Polygon,
  Polyline,
} from 'react-g-canvas';
import { IShape } from '@antv/g-canvas';

const App: React.FC = () => {
  return (
    <Canvas width={1000} height={800}>
      <Group>
        <Text x={200} y={60} text="测试文字" fill="black" textBaseline="top" />
        <Circle x={200} y={60} r={30} stroke="black" />
        <Ellipse x={100} y={120} rx={30} ry={20} stroke="red" ref={shapeRef} />
        <Image
          x={100}
          y={120}
          width={200}
          height={80}
          img="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg"
        />
        <Line x1={200} y1={60} x2={100} y2={120} stroke="black" startArrow endArrow />
      </Group>
      <Rect x={20} y={20} width={100} height={50} fill="blue" stroke="#456734" />
      <Group>
        <Group>
          <Rect x={10} y={10} width={100} height={50} fill={color} stroke="#456734" />
        </Group>
        <Marker x={100} y={100} r={10} symbol="square" stroke="blue" />
        <Marker
          x={250}
          y={200}
          r={10}
          symbol={(x, y, r) => {
            return [
              ['M', x - r, y],
              ['L', x + r, y],
            ];
          }}
          stroke="green"
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
          fill="grey"
        />
        <Polyline
          points={[
            [100, 30],
            [200, 20],
            [200, 50],
            [300, 100],
          ]}
          stroke="blue"
          startArrow
          endArrow
        />
      </Group>
    </Canvas>
  );
};

export default App;
```

### ref

Use ref to access `g` object.

### DOM element ✨ (experiment)

- HTML, use dom element in canvas

```tsx
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
            onMouseleave={event => {
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
```

- Tooltip, based on HTML, with Popper position engine

```tsx
import React, { useRef, useState } from 'react';
import { Canvas, Tooltip, Rect } from 'react-g-canvas';

const App: React.FC = () => {
  const [dragStart, setDragstart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 100, y: 100 });
  const portal = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div style={{ border: '1px solid #bfb3b3' }}>
        <Canvas width={600} height={400} style={{ position: 'relative' }}>
          <Tooltip content={<div>tootip content</div>}>
            <Rect
              x={position.x}
              y={position.y}
              width={120}
              height={120}
              stroke="black"
              fill="#fefefe"
              draggable
              onDragstart={event => {
                setDragstart({ x: event.x, y: event.y });
              }}
              onDrag={event => {
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
```

### More component is coming 🚀

## Performance

- TODO

## Documentation

[Here](https://zhanba.github.io/react-g/), under construction.
