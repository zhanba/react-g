import { Canvas } from './Canvas';

interface Rect extends React.SFC<any> {}
interface Group extends React.SFC<any> {}

const TYPES = {
  Group: ('Group' as unknown) as Group,
  Rect: ('Rect' as unknown) as Rect,
  Text: 'Text',
};

export const ReactG = {
  Canvas,
  ...TYPES,
};

// function processProps(newProps: any, node: VNode, id: number) {
//   const props: any = {};
//   for (const propKey of Object.keys(newProps)) {
//     if (typeof newProps[propKey] === 'function') {
//       const contextKey = `${REMAX_METHOD}_${id}_${propKey}`;
//       node.container.createCallback(
//         contextKey,
//         createCallbackProxy(propKey, node, newProps[propKey]),
//       );
//       props[propKey] = contextKey;
//     } else if (propKey === 'style') {
//       props[propKey] = newProps[propKey] || '';
//     } else if (propKey === 'children') {
//       // pass
//     } else {
//       props[propKey] = newProps[propKey];
//     }
//   }

//   return props;
// }
