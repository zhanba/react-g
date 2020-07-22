import { IContainer, IElement, ICanvas } from '@antv/g-canvas';
import { Instance, TextInstance } from '../types';

function removeFromArray(arr: any[], obj: any) {
  const index = arr.indexOf(obj);
  if (index !== -1) {
    arr.splice(index, 1);
  }
}

function removeChild(container: IContainer, element: IElement, destroy: boolean = true) {
  // 不再调用 element.remove() 方法，会出现循环调用
  if (destroy) {
    element.destroy();
  } else {
    element.set('parent', null);
    element.set('canvas', null);
  }
  removeFromArray(container.getChildren(), element);
}

/**
 * 设置 canvas
 * @param {IElement} element 元素
 * @param {ICanvas}  canvas  画布
 */
function setCanvas(element: IElement, canvas: ICanvas) {
  element.set('canvas', canvas);
  if (element.isGroup()) {
    const children: IElement[] = element.get('children');
    if (children.length) {
      children.forEach(child => {
        setCanvas(child, canvas);
      });
    }
  }
}

/**
 * 设置 timeline
 * @param {IElement} element  元素
 * @param {Timeline} timeline 时间轴
 */
function setTimeline(element: IElement, timeline: any) {
  element.set('timeline', timeline);
  if (element.isGroup()) {
    const children: IElement[] = element.get('children');
    if (children.length) {
      children.forEach(child => {
        setTimeline(child, timeline);
      });
    }
  }
}

/**
 * TODO g没有insertbefore方法，目前是基于源码修改，后面需要提pr到g
 * @param parentInstance
 * @param child
 * @param beforeChild
 */
export const insertBefore = (
  parentInstance: Instance,
  child: Instance | TextInstance,
  beforeChild: Instance | TextInstance,
) => {
  const canvas = parentInstance.getCanvas();
  const children = (parentInstance as IContainer).getChildren();
  const index = children.indexOf(beforeChild);
  if (index < 0) {
    return;
  }

  const timeline = parentInstance.get('timeline');
  const preParent = child.getParent();
  if (preParent) {
    removeChild(preParent, child, false);
  }
  child.set('parent', parentInstance);
  if (canvas) {
    setCanvas(child, canvas);
  }
  if (timeline) {
    setTimeline(child, timeline);
  }

  children.splice(index, 0, child);
  child.onCanvasChange('add');
  // @ts-ignore
  // eslint-disable-next-line no-underscore-dangle
  parentInstance._applyElementMatrix(child);
};
