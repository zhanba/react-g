import React, { Component } from 'react';
import { Canvas as GCanvas } from '@antv/g-canvas';
import { FiberRoot } from 'react-reconciler';
import { reconsiler } from './reconciler';

interface CanvasProps {
  width?: number;
  height?: number;

  classname?: string;
  role?: string;
  style?: React.CSSProperties;
  tabIndex?: number;
  title?: string;
}

export class Canvas extends Component<CanvasProps> {
  canvasRef = React.createRef<HTMLDivElement>();

  private canvas!: GCanvas;

  private container!: FiberRoot;

  componentDidMount() {
    const { width = 300, height = 200 } = this.props;
    this.canvas = new GCanvas({
      container: this.canvasRef.current!,
      width,
      height,
    });

    this.container = reconsiler.createContainer(this.canvas, false, false);
    reconsiler.updateContainer(this.props.children, this.container, null, () => {});
  }

  componentDidUpdate() {
    // applyNodeProps(this._stage, this.props, prevProps);

    reconsiler.updateContainer(this.props.children, this.container, null, () => {});
  }

  componentWillUnmount() {
    reconsiler.updateContainer(null, this.container, null, () => {});
    // this._stage.destroy();
  }

  render() {
    const { classname, role, style, tabIndex, title } = this.props;
    return (
      <div
        data-i={2}
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
