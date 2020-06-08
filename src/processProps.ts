import { ShapeCfg } from '@antv/g-canvas';
import { dedupeArrays } from './util/index';
import {
  Instance,
  Props,
  ELEMENT_PROPS,
  COLOR_ATTRS,
  GENERAL_LINE_ATTRS,
  FONT_ATTRS,
  CIRCLE_ATTRS,
  DOM_ATTRS,
  ELLIPSE_ATTRS,
  IMAGE_ATTRS,
  LINE_ATTRS,
  MARKER_ATTRS,
  PATH_ATTRS,
  POLYGON_ATTRS,
  POLYLINE_ATTRS,
  RECT_ATTRS,
  TEXT_ATTRS,
} from './types';

let zIndexWarningShowed = false;

const Z_INDEX_WARNING = `ReactG: You are using "zIndex" attribute for an element.
react-g may get confused with ordering. Just define correct order of elements in your render function of a component.
`;

const SHAPE_ATTRS = dedupeArrays([
  COLOR_ATTRS,
  GENERAL_LINE_ATTRS,
  FONT_ATTRS,
  CIRCLE_ATTRS,
  DOM_ATTRS,
  ELLIPSE_ATTRS,
  IMAGE_ATTRS,
  LINE_ATTRS,
  MARKER_ATTRS,
  PATH_ATTRS,
  POLYGON_ATTRS,
  POLYLINE_ATTRS,
  RECT_ATTRS,
  TEXT_ATTRS,
]);

const isEvent = (key: string) => key.slice(0, 2) === 'on';
const getEventName = (key: string) => key.substr(2).toLowerCase();
const isShapeProps = (key: string) => ELEMENT_PROPS.includes(key);
const isShapeAttr = (key: string) => SHAPE_ATTRS.includes(key);

export const getShapeProps = (newProps: Props): ShapeCfg => {
  const props: ShapeCfg = { attrs: {} };
  const attrs: ShapeCfg['attrs'] = {};
  Object.keys(newProps).forEach(propKey => {
    if (ELEMENT_PROPS.includes(propKey)) {
      props[propKey] = newProps[propKey];
    } else if (SHAPE_ATTRS.includes(propKey)) {
      attrs[propKey] = newProps[propKey];
    }
  });

  props.attrs = attrs;
  return props;
};

export const bindShapeEvent = (newProps: Props, instance: Instance) => {
  Object.keys(newProps).forEach(propKey => {
    if (isEvent(propKey)) {
      instance.on(getEventName(propKey), newProps[propKey]);
    }
  });
};

export const updateProps = (instance: Instance, newProps: Props, oldProps: Props = {}) => {
  // don't use zIndex
  if (!zIndexWarningShowed && 'zIndex' in newProps) {
    console.warn(Z_INDEX_WARNING);
    zIndexWarningShowed = true;
  }

  Object.keys(oldProps).forEach(key => {
    const propChanged = oldProps[key] !== newProps[key];
    if (propChanged) {
      if (isEvent(key)) {
        instance.off(getEventName(key));
      } else if (isShapeProps(key)) {
        instance.set(key, undefined);
      }
    }
  });

  Object.keys(newProps).forEach(key => {
    const propChanged = oldProps[key] !== newProps[key];

    if (propChanged) {
      if (isEvent(key)) {
        if (typeof newProps[key] === 'function') {
          instance.on(getEventName(key), newProps[key]);
        }
      } else if (isShapeProps(key)) {
        instance.set(key, newProps[key]);
      } else if (isShapeAttr(key)) {
        instance.attr(key, newProps[key]);
      }
    }
  });
};

export const hasUpdate = (newProps: Props, oldProps: Props): boolean => {
  const keys = [...Object.keys(oldProps), ...Object.keys(newProps)];
  return keys.findIndex(key => newProps[key] !== oldProps[key]) > 0;
};
