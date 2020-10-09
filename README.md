# react-g

[![NPM version][npm-image-core]][npm-url-core]

[npm-image-core]: https://img.shields.io/npm/v/@react-g/core?label=%40react-g%2Fcore&style=plastic
[npm-url-core]: http://npmjs.org/package/@react-g/core

[![NPM version][npm-image-component]][npm-url-component]

[npm-image-component]: https://img.shields.io/npm/v/@react-g/component?label=%40react-g%2Fcomponent&style=plastic
[npm-url-component]: http://npmjs.org/package/@react-g/core

[![NPM version][npm-image-hooks]][npm-url-hooks]

[npm-image-hooks]: https://img.shields.io/npm/v/@react-g/hooks?label=%40react-g%2Fhooks&style=plastic
[npm-url-hooks]: http://npmjs.org/package/@react-g/core

Building visualization component in declarative and composable way.


## Install

```sh
npm i @react-g/core
npm i @react-g/component
npm i @react-g/hooks
```

## Example

```tsx
import React, { useState, useEffect } from 'react';
import { Canvas, Group, Rect, Text } from '@react-g/core';

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