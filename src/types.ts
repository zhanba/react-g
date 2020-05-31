import { IContainer, IShape, Event, PathCommand } from '@antv/g-canvas';

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
 * event
 */
export type GEvents = Partial<{
  onMousedown: (evt: Event) => void;
  onMouseup: (evt: Event) => void;
  onClick: (evt: Event) => void;
  onDblclick: (evt: Event) => void;
  onMousemove: (evt: Event) => void;
  onMouseover: (evt: Event) => void;
  onMouseout: (evt: Event) => void;
  onMouseenter: (evt: Event) => void;
  onMouseleave: (evt: Event) => void;
  onTouchstart: (evt: Event) => void;
  onTouchmove: (evt: Event) => void;
  onTouchend: (evt: Event) => void;
  onDragstart: (evt: Event) => void;
  onDrag: (evt: Event) => void;
  onDragend: (evt: Event) => void;
  onDragenter: (evt: Event) => void;
  onDragleave: (evt: Event) => void;
  onDragover: (evt: Event) => void;
  onDrop: (evt: Event) => void;
}>;

export interface GElementComponent<Props, Node = Element>
  extends React.SFC<Props & GEvents & React.RefAttributes<Node>> {
  getPublicInstance(): Node;
}

export type Matrix = [number, number, number, number, number, number];

export type PathType = string | PathCommand[];

export type Points = Array<[number, number]>;

export type Arrow =
  | {
      path: PathType;
      d: number;
    }
  | boolean;

export type BaseShapeProps = Partial<{
  lineWidth: number;
  lineAppendWidth: number;
  fill: string;
  stroke: string;
  strokeOpacity: number;
  fillOpacity: number;
  matrix: Matrix;
  opacity: number;
}>;

export type RectProps = Partial<{
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
}> &
  BaseShapeProps;

export type TextProps = Partial<{
  x: number;
  y: number;
  text: string;
  fontSize: number;
  fontFamily: string;
  fontStyle: string;
  fontWeight: string;
  fontVariant: string;
  textAlign: string;
  textBaseline: string;
}> &
  BaseShapeProps;

export type CircleProps = Partial<{
  x: number;
  y: number;
  r: number;
}> &
  BaseShapeProps;

export type EllipseProps = Partial<{
  x: number;
  y: number;
  rx: number;
  ry: number;
}> &
  BaseShapeProps;

export type ImageProps = { img: string | Image | HTMLCanvasElement } & Partial<{
  x: number;
  y: number;
  width: number;
  height: number;
}> &
  BaseShapeProps;

export type LineProps = Partial<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  startArrow: Arrow;
  endArrow: Arrow;
}> &
  BaseShapeProps;

export type MarkerProps = {
  x: number;
  y: number;
  r: number;
  symbol:
    | 'circle'
    | 'square'
    | 'diamond'
    | 'triangle'
    | 'triangle-down'
    | ((x: number, y: number, r: number) => PathType);
} & BaseShapeProps;

export type PathProps = { path: PathType } & Partial<{
  startArrow: Arrow;
  endArrow: Arrow;
}> &
  BaseShapeProps;

export type PolygonProps = { points: Points } & BaseShapeProps;

export type PolylineProps = { points: Points } & Partial<{
  startArrow: Arrow;
  endArrow: Arrow;
}> &
  BaseShapeProps;

/**
 * host component
 */
export interface Group extends GElementComponent<{}, IContainer> {}
export interface Rect extends GElementComponent<RectProps, IShape> {}
export interface Text extends GElementComponent<TextProps, IShape> {}
export interface Circle extends GElementComponent<CircleProps, IShape> {}
export interface Ellipse extends GElementComponent<EllipseProps, IShape> {}
export interface Image extends GElementComponent<ImageProps, IShape> {}
export interface Line extends GElementComponent<LineProps, IShape> {}
export interface Marker extends GElementComponent<MarkerProps, IShape> {}
export interface Path extends GElementComponent<PathProps, IShape> {}
export interface Polygon extends GElementComponent<PolygonProps, IShape> {}
export interface Polyline extends GElementComponent<PolylineProps, IShape> {}

export const elements = {
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
