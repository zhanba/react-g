import React, { Component } from 'react';
import { Canvas as GCanvas, Cursor } from '@antv/g-canvas';
import { FiberRoot } from 'react-reconciler';
import { reconsiler } from './reconciler';
import { bindShapeEvent, updateProps } from './processProps';
import { GEvents } from './types';

interface CanvasBaseProps {
  width?: number;
  height?: number;
  classname?: string;
  role?: string;
  style?: React.CSSProperties;
  tabIndex?: number;
  title?: string;
  cursor?: Cursor;
  forwardedRef?: ForwardedRef<GCanvas>;
  children: React.ReactNode;
}

type ForwardedRef<T> = ((instance: T | null) => void) | React.MutableRefObject<T | null> | null;

type CanvasProps = CanvasBaseProps & GEvents;

export class Canvas extends Component<CanvasProps> {
  canvasRef = React.createRef<HTMLDivElement>();

  private canvas!: GCanvas;

  private container!: FiberRoot;

  componentDidMount() {
    const { width = 300, height = 200, cursor } = this.props;
    this.canvas = new GCanvas({
      container: this.canvasRef.current!,
      width,
      height,
      cursor,
    });

    this.setRef(this.canvas);
    bindShapeEvent(this.props, this.canvas);

    this.container = reconsiler.createContainer(this.canvas, false, false);
    reconsiler.updateContainer(this.props.children, this.container, null, () => {});
  }

  componentDidUpdate(prevProps: Readonly<CanvasProps>) {
    updateProps(this.canvas, this.props, prevProps);
    reconsiler.updateContainer(this.props.children, this.container, null, () => {});
  }

  componentWillUnmount() {
    this.setRef(null);
    reconsiler.updateContainer(null, this.container, null, () => {});
    this.canvas.destroy();
  }

  setRef(value: GCanvas | null) {
    const { forwardedRef } = this.props;
    if (!forwardedRef) {
      return;
    }
    if (typeof forwardedRef === 'function') {
      forwardedRef(value);
    } else {
      forwardedRef.current = value;
    }
  }

  render() {
    const { classname, role, style, tabIndex, title } = this.props;
    return (
      <div
        ref={this.canvasRef}
        className={classname}
        role={role}
        style={style}
        tabIndex={tabIndex}
        title={title}
      />
    );
  }
}

export const WrappedCanvas = React.forwardRef<GCanvas, CanvasProps>((props, ref) => {
  return <Canvas {...props} forwardedRef={ref} />;
});
