/* eslint-disable @typescript-eslint/no-unused-vars */
import ReactReconciler, { OpaqueHandle } from 'react-reconciler';
import {
  unstable_scheduleCallback as scheduleDeferredCallback,
  unstable_cancelCallback as cancelDeferredCallback,
  unstable_now as now,
  unstable_shouldYield as shouldYield,
} from 'scheduler';
import { Group as GGroup, Shape, IElement, IContainer, ShapeBase, IShape } from '@antv/g-canvas';
import { generateId } from './id';
import shallowEqualObjects from './shallowEqual';

const { Rect: GRect } = Shape;

type Type = 'Rect' | 'Circle' | 'Text' | 'Group';
type Props = any;
type Container = any;
type Instance = IContainer | IShape;
type TextInstance = any;
type HydratableInstance = any;
type PublicInstance = any;
type HostContext = any;
type UpdatePayload = any;
type ChildSet = any;
type TimeoutHandle = any;
type NoTimeout = any;

const handleEvent = (newProps: any, node: Instance) => {
  Object.keys(newProps).forEach(propKey => {
    if (typeof newProps[propKey] === 'function') {
      const isEvent = propKey.slice(0, 2) === 'on';
      if (isEvent) {
        const eventName = propKey.slice(2).toLowerCase();
        node.on(eventName, newProps[propKey]);
      }
    }
  });
};

function processProps(newProps: any) {
  const elementProps = ['draggable', 'zIndex', 'capture', 'visible', 'type', 'id'];
  const shapeAttrs = [
    'x',
    'y',
    'rx',
    'ry',
    'x1',
    'y1',
    'x2',
    'y2',
    'width',
    'height',
    'text',
    'fill',
    'stroke',
    'img',
    'startArrow',
    'endArrow',
    'symbol',
    'path',
    'lineWidth',
    'points',
  ];
  const props: any = {};
  const attrs: any = {};

  Object.keys(newProps).forEach(propKey => {
    if (typeof newProps[propKey] === 'function') {
      // pass
    } else if (propKey === 'children') {
      // pass
    } else if (elementProps.includes(propKey)) {
      props[propKey] = newProps[propKey];
    } else if (props.attrs) {
      props.attrs[propKey] = newProps[propKey];
    } else {
      props.attrs = {};
      props.attrs[propKey] = newProps[propKey];
    }
    if (elementProps.includes(propKey)) {
      props[propKey] = newProps[propKey];
    } else if (shapeAttrs.includes(propKey)) {
      attrs[propKey] = newProps[propKey];
    }
  });

  // elementProps.forEach(propKey => {
  //   if (newProps.hasOwnProperty(propKey)) {
  //     props[propKey] = newProps[propKey];
  //   }
  // });

  // shapeAttrs.forEach(propKey => {
  //   if (newProps.hasOwnProperty(propKey)) {
  //     attrs[propKey] = newProps[propKey];
  //   }
  // });

  props.attrs = attrs;

  return props;
}

export const reconsiler = ReactReconciler<
  Type,
  Props,
  Container,
  Instance,
  TextInstance,
  HydratableInstance,
  PublicInstance,
  HostContext,
  UpdatePayload,
  ChildSet,
  TimeoutHandle,
  NoTimeout
>({
  getPublicInstance(instance: Instance | TextInstance): PublicInstance {},
  getRootHostContext(rootContainerInstance: Container): HostContext {},
  getChildHostContext(
    parentHostContext: HostContext,
    type: Type,
    rootContainerInstance: Container,
  ): HostContext {},

  prepareForCommit(containerInfo: Container): void {},
  resetAfterCommit(containerInfo: Container): void {},

  createInstance(
    type: Type,
    props: Props,
    rootContainerInstance: Container,
    hostContext: HostContext,
    internalInstanceHandle: OpaqueHandle,
  ): Instance {
    // console.log('createInstance ', type, props);
    let instance;
    if (type === 'Group') {
      instance = new GGroup({ id: generateId(), ...processProps(props) });
    } else {
      instance = new Shape[type]({ id: generateId(), ...processProps(props) });
    }
    handleEvent(props, instance);
    return instance;
  },
  appendInitialChild(parentInstance: Instance, child: Instance | TextInstance): void {
    // console.log('appendInitialChild', child);
    if (parentInstance.isGroup()) {
      (parentInstance as IContainer).add(child);
    }
  },
  finalizeInitialChildren(
    parentInstance: Instance,
    type: Type,
    props: Props,
    rootContainerInstance: Container,
    hostContext: HostContext,
  ): boolean {
    return false;
  },

  prepareUpdate(
    instance: Instance,
    type: Type,
    oldProps: Props,
    newProps: Props,
    rootContainerInstance: Container,
    hostContext: HostContext,
  ): null | UpdatePayload {
    // console.log('prepareUpdate', oldProps, newProps);
    if (JSON.stringify(processProps(oldProps)) === JSON.stringify(processProps(newProps))) {
      return false;
    }
    // if (shallowEqualObjects(oldProps, newProps)) {
    //   return false;
    // }
    return true;
  },

  shouldSetTextContent(type: Type, props: Props): boolean {
    return false;
  },
  shouldDeprioritizeSubtree(type: Type, props: Props): boolean {
    return false;
  },

  createTextInstance(
    text: string,
    rootContainerInstance: Container,
    hostContext: HostContext,
    internalInstanceHandle: OpaqueHandle,
  ): TextInstance {},

  scheduleDeferredCallback(callback: () => any, options?: { timeout: number }): any {},
  // scheduleDeferredCallback,
  cancelDeferredCallback(callbackID: any): void {},

  setTimeout(handler: (...args: any[]) => void, timeout: number): TimeoutHandle | NoTimeout {},
  clearTimeout(handle: TimeoutHandle | NoTimeout): void {},
  noTimeout: undefined,

  now,

  // Temporary workaround for scenario where multiple renderers concurrently
  // render using the same context objects. E.g. React DOM and React ART on the
  // same page. DOM is the primary renderer {}, ART is the secondary renderer.
  isPrimaryRenderer: false,

  supportsMutation: true,
  supportsPersistence: false,
  supportsHydration: false,

  // -------------------
  //      Mutation
  //     (optional)
  // -------------------
  appendChild(parentInstance: Instance, child: Instance | TextInstance): void {
    // console.log('appendChild');
    if (parentInstance.isGroup()) {
      (parentInstance as IContainer).add(child);
    }
  },
  appendChildToContainer(container: Container, child: Instance | TextInstance): void {
    // console.log('appendChildToContainer', container, child);
    if (child.isGroup() && child.isCanvas()) {
      console.error('Canvas children must be Group or Shape!');
      return;
    }

    container.add(child);
  },
  commitTextUpdate(textInstance: TextInstance, oldText: string, newText: string): void {},
  commitMount(
    instance: Instance,
    type: Type,
    newProps: Props,
    internalInstanceHandle: OpaqueHandle,
  ): void {},
  commitUpdate(
    instance: Instance,
    updatePayload: UpdatePayload,
    type: Type,
    oldProps: Props,
    newProps: Props,
    internalInstanceHandle: OpaqueHandle,
  ): void {
    // console.log('commitUpdate', instance, newProps);
    instance.attr(newProps);
  },
  insertBefore(
    parentInstance: Instance,
    child: Instance | TextInstance,
    beforeChild: Instance | TextInstance,
  ): void {},
  insertInContainerBefore(
    container: Container,
    child: Instance | TextInstance,
    beforeChild: Instance | TextInstance,
  ): void {},
  removeChild(parentInstance: Instance, child: Instance | TextInstance): void {},
  removeChildFromContainer(container: Container, child: Instance | TextInstance): void {},
  resetTextContent(instance: Instance): void {},

  // -------------------
  //     Persistence
  //     (optional)
  // -------------------
  cloneInstance(
    instance: Instance,
    updatePayload: null | UpdatePayload,
    type: Type,
    oldProps: Props,
    newProps: Props,
    internalInstanceHandle: OpaqueHandle,
    keepChildren: boolean,
    recyclableInstance: Instance,
  ): Instance {
    return instance;
  },

  createContainerChildSet(container: Container): ChildSet {},

  appendChildToContainerChildSet(childSet: ChildSet, child: Instance | TextInstance): void {},
  finalizeContainerChildren(container: Container, newChildren: ChildSet): void {},

  replaceContainerChildren(container: Container, newChildren: ChildSet): void {},

  // -------------------
  //     Hydration
  //     (optional)
  // -------------------
  canHydrateInstance(instance: HydratableInstance, type: Type, props: Props): null | Instance {
    return instance;
  },
  canHydrateTextInstance(instance: HydratableInstance, text: string): null | TextInstance {},
  getNextHydratableSibling(
    instance: Instance | TextInstance | HydratableInstance,
  ): null | HydratableInstance {},
  getFirstHydratableChild(parentInstance: Instance | Container): null | HydratableInstance {},
  hydrateInstance(
    instance: Instance,
    type: Type,
    props: Props,
    rootContainerInstance: Container,
    hostContext: HostContext,
    internalInstanceHandle: OpaqueHandle,
  ): null | UpdatePayload {},
  hydrateTextInstance(
    textInstance: TextInstance,
    text: string,
    internalInstanceHandle: OpaqueHandle,
  ): boolean {
    return false;
  },
  didNotMatchHydratedContainerTextInstance(
    parentContainer: Container,
    textInstance: TextInstance,
    text: string,
  ): void {},
  didNotMatchHydratedTextInstance(
    parentType: Type,
    parentProps: Props,
    parentInstance: Instance,
    textInstance: TextInstance,
    text: string,
  ): void {},
  didNotHydrateContainerInstance(
    parentContainer: Container,
    instance: Instance | TextInstance,
  ): void {},
  didNotHydrateInstance(
    parentType: Type,
    parentProps: Props,
    parentInstance: Instance,
    instance: Instance | TextInstance,
  ): void {},
  didNotFindHydratableContainerInstance(
    parentContainer: Container,
    type: Type,
    props: Props,
  ): void {},
  didNotFindHydratableContainerTextInstance(parentContainer: Container, text: string): void {},
  didNotFindHydratableInstance(
    parentType: Type,
    parentProps: Props,
    parentInstance: Instance,
    type: Type,
    props: Props,
  ): void {},
  didNotFindHydratableTextInstance(
    parentType: Type,
    parentProps: Props,
    parentInstance: Instance,
    text: string,
  ): void {},
});
