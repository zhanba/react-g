import { IContainer, IShape, Event, PathCommand } from '@antv/g-canvas';

/**
 * host config type
 */
export type Type = ElementType;
export type Props = any;
export type Container = IContainer;
export type Instance = IContainer | IShape;
export type TextInstance = any;
export type HydratableInstance = any;
export type PublicInstance = any;
export type HostContext = any;
export type UpdatePayload = any;
export type ChildSet = any;
export type TimeoutHandle = any;
export type NoTimeout = any;

export const G_CANVAS_ELEMENT = [
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

export const ELEMENT_PROPS = [
  'id',
  'name',
  'type',
  'visible',
  'capture',
  'destroyed',
  'zIndex',
  'draggable',
];

export const COLOR_ATTRS = [
  'fill',
  'stroke',
  'opacity',
  'fillOpacity',
  'strokeOpacity',
  'shadowColor',
  'shadowBlur',
  'shadowOffsetX',
  'shadowOffsetY',
  'globalCompositeOperation',
] as const;

export const GENERAL_LINE_ATTRS = [
  'lineCap',
  'lineJoin',
  'lineWidth',
  'lineAppendWidth',
  'miterLimit',
  'lineDash',
  'startArrow',
  'endArrow',
] as const;

export const FONT_ATTRS = [
  'font',
  'textAlign',
  'textBaseline',
  'fontStyle',
  'fontVariant',
  'fontSize',
  'fontFamily',
  'fontWeight',
] as const;

export const CIRCLE_ATTRS = ['x', 'y', 'r'] as const;

export const DOM_ATTRS = ['x', 'y', 'width', 'height', 'html'] as const;

export const ELLIPSE_ATTRS = ['x', 'y', 'rx', 'ry'] as const;

export const IMAGE_ATTRS = ['x', 'y', 'width', 'height', 'img'] as const;

export const LINE_ATTRS = ['x1', 'y1', 'x2', 'y2'] as const;

export const MARKER_ATTRS = ['x', 'y', 'r', 'symbol'] as const;

export const PATH_ATTRS = ['path'] as const;

export const POLYGON_ATTRS = ['points'] as const;

export const POLYLINE_ATTRS = ['points'] as const;

export const RECT_ATTRS = ['x', 'y', 'width', 'height', 'radius'] as const;

export const TEXT_ATTRS = ['x', 'y', 'text'] as const;

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
  onContextmenu: (evt: Event) => void;
  onMousewheel: (evt: Event) => void;
}>;

export type Matrix = [number, number, number, number, number, number];

export type PathType = string | PathCommand[];

export type Points = Array<[number, number]>;

export type Arrow =
  | {
      path: PathType;
      d: number;
    }
  | boolean;

export type ElementProps = Partial<{
  id: string;
  name: string;
  visible: boolean;
  capture: boolean;
  zIndex: number;
  draggable: boolean;
}>;

export type StyleProps = Partial<{
  fill: string;
  stroke: string;
  opacity: number;
  strokeOpacity: number;
  fillOpacity: number;
  shadowColor: string;
  shadowBlur: number;
  shadowOffsetX: number;
  shadowOffsetY: number;
  globalCompositeOperation: string;
}>;

export type LineStyleProps = Partial<{
  lineCap: 'butt' | 'round' | 'square';
  lineJoin: 'bevel' | 'round' | 'miter';
  lineWidth: number;
  lineAppendWidth: number;
  lineDash: number[];
  miterLimit: number;
  startArrow: Arrow;
  endArrow: Arrow;
}>;

export interface GElementComponent<Props, Node = Element>
  extends React.SFC<Props & ElementProps & StyleProps & GEvents & React.RefAttributes<Node>> {
  getPublicInstance(): Node;
}

export type RectProps = Partial<{
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
}>;

export type TextProps = Partial<{
  x: number;
  y: number;
  text: string;
  fontSize: number;
  fontFamily: string;
  fontStyle: 'normal' | 'italic' | 'oblique';
  fontWeight: 'normal' | 'bold' | 'bolder' | 'lighter' | number;
  fontVariant: 'normal' | 'small-caps' | string;
  textAlign: 'start' | 'center' | 'end' | 'left' | 'right';
  textBaseline: 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom';
}>;

export type CircleProps = Partial<{
  x: number;
  y: number;
  r: number;
}>;

export type EllipseProps = Partial<{
  x: number;
  y: number;
  rx: number;
  ry: number;
}>;

export type ImageProps = { img: string | HTMLImageElement | HTMLCanvasElement } & Partial<{
  x: number;
  y: number;
  width: number;
  height: number;
}>;

export type LineProps = Partial<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}> &
  LineStyleProps;

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
};

export type PathProps = { path: PathType } & LineStyleProps;

export type PolygonProps = { points: Points };

export type PolylineProps = { points: Points } & LineStyleProps;

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
