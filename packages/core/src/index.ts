import GraphEvent from '@antv/g-base/lib/event/graph-event';
import { WrappedCanvas } from './Canvas';
import { elements, PathType } from './types';

const {
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
} = elements;

export {
  WrappedCanvas as Canvas,
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
};

export { Canvas as GCanvas, Group as GGroup, Point } from '@antv/g-canvas';

export { GraphEvent, PathType };
