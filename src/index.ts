import { Canvas } from './Canvas';

interface Rect extends React.SFC<any> {}
interface Group extends React.SFC<any> {}

const TYPES = {
  Group: ('Group' as unknown) as Group,
  Rect: ('Rect' as unknown) as Rect,
  Text: 'Text',
  Circle: 'Circle',
  Ellipse: 'Ellipse',
  Image: 'Image',
  Line: 'Line',
  Marker: 'Marker',
  Path: 'Path',
  Polygon: 'Polygon',
  Polyline: 'Polyline',
};

export const ReactG = {
  Canvas,
  ...TYPES,
};
