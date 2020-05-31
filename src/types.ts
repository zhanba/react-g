import { IContainer, IShape } from '@antv/g-canvas';

const G_CANVAS_ELEMENT = [
  'Group',
  'Rect',
  'Text',
  'Circle',
  'Ellipse',
  'Image',
  'Line',
  'Marker',
  'Path',
  'Polygon',
  'Polyline',
] as const;

type ElementType = typeof G_CANVAS_ELEMENT[number];

/**
 * host config type
 */
export type Type = ElementType;
export type Props = any;
export type Container = any;
export type Instance = IContainer | IShape;
export type TextInstance = any;
export type HydratableInstance = any;
export type PublicInstance = any;
export type HostContext = any;
export type UpdatePayload = any;
export type ChildSet = any;
export type TimeoutHandle = any;
export type NoTimeout = any;

/**
 * host component
 */
interface Group extends React.SFC<any> {}
interface Rect extends React.SFC<any> {}
interface Text extends React.SFC<{ x: number; y: number }> {}
interface Circle extends React.SFC<any> {}
interface Ellipse extends React.SFC<any> {}
interface Image extends React.SFC<any> {}
interface Line extends React.SFC<any> {}
interface Marker extends React.SFC<any> {}
interface Path extends React.SFC<any> {}
interface Polygon extends React.SFC<any> {}
interface Polyline extends React.SFC<any> {}

export const elements: { [key in ElementType]: React.SFC<any> } = {
  Group: ('Group' as unknown) as Group,
  Rect: ('Rect' as unknown) as Rect,
  Text: ('Text' as unknown) as Text,
  Circle: ('Circle' as unknown) as Circle,
  Ellipse: ('Ellipse' as unknown) as Ellipse,
  Image: ('Image' as unknown) as Image,
  Line: ('Line' as unknown) as Line,
  Marker: ('Marker' as unknown) as Marker,
  Path: ('Path' as unknown) as Path,
  Polygon: ('Polygon' as unknown) as Polygon,
  Polyline: ('Polyline' as unknown) as Polyline,
};
