/* eslint-disable @typescript-eslint/no-unused-vars */
import ReactReconciler, { OpaqueHandle } from 'react-reconciler';
import React from 'react';
import {
  unstable_scheduleCallback as scheduleDeferredCallback,
  unstable_cancelCallback as cancelDeferredCallback,
  unstable_now as now,
  unstable_shouldYield as shouldYield,
} from 'scheduler';
import { Group as GGroup, Shape, IContainer } from '@antv/g-canvas';
import { bindShapeEvent, getShapeProps, updateProps } from './processProps';

import { generateId } from './util/id';
import { log } from './util/debug';
import {
  Type,
  Props,
  Instance,
  TextInstance,
  HydratableInstance,
  PublicInstance,
  HostContext,
  UpdatePayload,
  ChildSet,
  TimeoutHandle,
  NoTimeout,
  Container,
} from './types';
import { getClosestInstanceFromNode } from './ReactDOMComponentTree';
import { insertBefore } from './util/element';

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
  getPublicInstance(instance: Instance | TextInstance): PublicInstance {
    return instance;
  },
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
    const id = generateId();
    const shapeType = type.toLowerCase();
    let instance;
    const shapeProps = { id, type: shapeType, ...getShapeProps(props) };
    if (type === 'Group') {
      instance = new GGroup(shapeProps);
    } else {
      instance = new Shape[type](shapeProps);
    }
    bindShapeEvent(props, instance);
    log('createInstance ', shapeProps, instance);
    return instance;
  },
  appendInitialChild(parentInstance: Instance, child: Instance | TextInstance): void {
    // log('appendInitialChild', child);
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
    // return hasUpdate(newProps, oldProps);
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
    log('appendChild');
    if (parentInstance.isGroup()) {
      (parentInstance as IContainer).add(child);
    }
    const autoDraw = parentInstance.getCanvas().get('autoDraw');
    if (!autoDraw) {
      parentInstance.getCanvas().draw();
    }
  },
  appendChildToContainer(container: Container, child: Instance | TextInstance): void {
    log('appendChildToContainer', container, child);
    if (child.isGroup() && child.isCanvas()) {
      console.error('Canvas children must be Group or Shape!');
      return;
    }

    container.add(child);

    const autoDraw = container.getCanvas().get('autoDraw');
    if (!autoDraw) {
      container.getCanvas().draw();
    }
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
    log('commitUpdate', instance, newProps);
    updateProps(instance, newProps, oldProps);
    const autoDraw = instance.getCanvas().get('autoDraw');
    if (!autoDraw) {
      instance.getCanvas().draw();
    }
  },
  insertBefore(
    parentInstance: Instance,
    child: Instance | TextInstance,
    beforeChild: Instance | TextInstance,
  ): void {
    insertBefore(parentInstance, child, beforeChild);
    const autoDraw = parentInstance.getCanvas().get('autoDraw');
    if (!autoDraw) {
      parentInstance.getCanvas().draw();
    }
  },
  insertInContainerBefore(
    container: Container,
    child: Instance | TextInstance,
    beforeChild: Instance | TextInstance,
  ): void {
    insertBefore(container, child, beforeChild);
    const autoDraw = container.getCanvas().get('autoDraw');
    if (!autoDraw) {
      container.getCanvas().draw();
    }
  },
  removeChild(parentInstance: Instance, child: Instance | TextInstance): void {
    log('removeChild', parentInstance, child);
    if (parentInstance.isGroup()) {
      (parentInstance as IContainer).removeChild(child);
    }
    const autoDraw = parentInstance.getCanvas().get('autoDraw');
    if (!autoDraw) {
      parentInstance.getCanvas().draw();
    }
  },
  removeChildFromContainer(container: Container, child: Instance | TextInstance): void {
    container.removeChild(child);
    const autoDraw = container.getCanvas().get('autoDraw');
    if (!autoDraw) {
      container.getCanvas().draw();
    }
  },
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

reconsiler.injectIntoDevTools({
  findFiberByHostInstance: getClosestInstanceFromNode,
  bundleType: process.env.NODE_ENV !== 'production' ? 1 : 0,
  version: React.version,
  rendererPackageName: 'react-g',
  // getInspectorDataForViewTag: (tag: number) => {
  //   console.log(tag);
  // },
});
