import React, { Component, createRef } from 'react';
import { Canvas, Group, Image as GImage } from '@react-g/core';
import { Canvas as GCanvas, Group as GGroup, Point } from '@antv/g-canvas';
import GraphEvent from '@antv/g-base/lib/event/graph-event';
import { mat3 } from '@antv/matrix-util';
import pic from './icon.jpg';

const DELTA = 0.05;

export const imageLoader = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      resolve(image);
    };
    image.onerror = () => {
      reject(new Error(`image ${src} load error`));
    };
    image.src = src;
  });

export interface Props {
  width?: number;
  height?: number;
  minZoom?: number;
  maxZoom?: number;
  sensitivity?: number;
  img: string;
}

interface State {
  image?: HTMLImageElement;
}

class ImageViewer extends Component<Props, State> {
  canvasRef = createRef<GCanvas>();

  viewRef = createRef<GGroup>();

  state: State = {
    image: undefined,
  };

  static defaultProps = {
    width: 600,
    height: 400,
    /**
     * Minimum scale size
     * @type {number}
     */
    minZoom: 0.02,
    /**
     * Maxmum scale size
     * @type {number}
     */
    maxZoom: 10,
    sensitivity: 2,
  };

  componentDidMount() {
    // this.canvasRef.current.set('localRefresh', false);
    const { img } = this.props;
    imageLoader(img).then((image) => {
      this.setState({
        image,
      });
    });
  }

  getZoom(): number {
    const matrix = this.viewRef.current?.getMatrix();
    return matrix ? matrix[0] : 1;
  }

  handleMousewheel = (event: GraphEvent) => {
    event.preventDefault();
    const e = event.originalEvent as WheelEvent;
    if (!this.canvasRef.current) {
      return;
    }
    // const point = this.canvasRef.current.getPointByClient(e.clientX, e.clientY);
    const { sensitivity, maxZoom, minZoom } = this.props;
    let ratio = this.getZoom();
    if (e.deltaY < 0) {
      ratio = 1 - DELTA * sensitivity;
    } else {
      ratio = 1 + DELTA * sensitivity;
    }
    const zoom = ratio * this.getZoom();
    if (zoom > maxZoom || zoom < minZoom) {
      return;
    }
    this.zoom(ratio, { x: event.x, y: event.y });
  };

  zoom(ratio: number, center?: Point) {
    let matrix = this.viewRef.current?.getMatrix() as mat3;
    if (!matrix) {
      matrix = mat3.create();
    }
    const { minZoom, maxZoom } = this.props;
    if (center) {
      mat3.translate(matrix, matrix, [-center.x, -center.y]);
      mat3.scale(matrix, matrix, [ratio, ratio]);
      mat3.translate(matrix, matrix, [center.x, center.y]);
    } else {
      mat3.scale(matrix, matrix, [ratio, ratio]);
    }
    if (minZoom && matrix[0] < minZoom) {
      return;
    }
    if (maxZoom && matrix[0] > maxZoom) {
      return;
    }
    this.viewRef.current?.setMatrix(matrix as number[]);
    this.canvasRef.current?.draw();
  }

  render() {
    const { width, height } = this.props;
    const { image } = this.state;
    return (
      <Canvas
        width={width}
        height={height}
        ref={this.canvasRef}
        onMousewheel={this.handleMousewheel}
      >
        <Group ref={this.viewRef}>
          {image && (
            <GImage x={100} y={100} width={image.width} height={image.height} img={image} />
          )}
        </Group>
      </Canvas>
    );
  }
}

export default () => <ImageViewer img={pic} />;
