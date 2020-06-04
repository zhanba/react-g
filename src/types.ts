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

type ElementProps = typeof ELEMENT_PROPS[number];

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

type ColorAttrs = typeof COLOR_ATTRS[number];

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

type GeneralLineAttrs = typeof GENERAL_LINE_ATTRS[number];

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

type FontAttrs = typeof FONT_ATTRS[number];

export const CIRCLE_ATTRS = ['x', 'y', 'r'] as const;

type CircleAttrs = typeof CIRCLE_ATTRS[number];

export const DOM_ATTRS = ['x', 'y', 'width', 'height', 'html'] as const;

type DomAttrs = typeof DOM_ATTRS[number];

export const ELLIPSE_ATTRS = ['x', 'y', 'rx', 'ry'] as const;

type EllipseAttrs = typeof ELLIPSE_ATTRS[number];

export const IMAGE_ATTRS = ['x', 'y', 'width', 'height', 'img'] as const;

type ImageAttrs = typeof IMAGE_ATTRS[number];

export const LINE_ATTRS = ['x1', 'y1', 'x2', 'y2'] as const;

type LineAttrs = typeof LINE_ATTRS[number];

export const MARKER_ATTRS = ['x', 'y', 'r', 'symbol'] as const;

type MarkerAttrs = typeof MARKER_ATTRS[number];

export const PATH_ATTRS = ['path'] as const;

type PathAttrs = typeof PATH_ATTRS[number];

export const POLYGON_ATTRS = ['points'] as const;

type PolygonAttrs = typeof POLYGON_ATTRS[number];

export const POLYLINE_ATTRS = ['points'] as const;

type PolylineAttrs = typeof POLYLINE_ATTRS[number];

export const RECT_ATTRS = ['x', 'y', 'width', 'height', 'radius'] as const;

type RectAttrs = typeof RECT_ATTRS[number];

export const TEXT_ATTRS = ['x', 'y', 'text'] as const;

type TextAttrs = typeof TEXT_ATTRS[number];

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
  name: string;
  capture: true;
  draggable: boolean;
  lineWidth: number;
  lineAppendWidth: number;
  lineDash: number[];
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
  fontStyle: 'normal' | 'italic' | 'oblique';
  fontWeight: 'normal' | 'bold' | 'bolder' | 'lighter' | number;
  fontVariant: 'normal' | 'small-caps' | string;
  textAlign: 'start' | 'center' | 'end' | 'left' | 'right';
  textBaseline: 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom';
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

export type ImageProps = { img: string | HTMLImageElement | HTMLCanvasElement } & Partial<{
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
