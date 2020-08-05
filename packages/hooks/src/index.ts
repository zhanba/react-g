// eslint-disable-next-line import/no-extraneous-dependencies
import { mat3, ext } from '@antv/matrix-util';
import { Group, Canvas, Point } from '@antv/g-canvas';

export function useZoom(minZoom?: number, maxZoom?: number) {
  const getZoom = (view: Group) => {
    let zoom = 1;
    const viewMatrix = view.getMatrix();
    zoom = viewMatrix ? viewMatrix[0] : 1;
    return zoom;
  };
  const setZoom = (view: Group, ratio: number, center?: Point) => {
    let matrix = view.getMatrix();
    if (!matrix) {
      matrix = mat3.create() as number[];
    }
    let newMatrix;
    if (center) {
      newMatrix = ext.transform(matrix, [
        ['t', -center.x, -center.y],
        ['s', ratio, ratio],
        ['t', center.x, center.y],
      ]);
    } else {
      newMatrix = ext.transform(matrix, [['s', ratio, ratio]]);
    }

    if (minZoom && newMatrix[0] < minZoom) {
      return;
    }
    if (maxZoom && newMatrix[0] > maxZoom) {
      return;
    }
    view.setMatrix(newMatrix);
  };
  return [getZoom, setZoom] as const;
}

export function useFitView() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [zoom, setZoom] = useZoom();
  const fitview = (view: Group, width: number, height: number, fitViewPadding: number) => {
    view.resetMatrix();
    const bbox = view.getCanvasBBox()!;
    const canvasCenter = {
      x: width / 2,
      y: height / 2,
    };
    const viewCenter = {
      x: bbox.x + bbox.width / 2,
      y: bbox.y + bbox.height / 2,
    };

    view.translate(canvasCenter.x - viewCenter.x, canvasCenter.y - viewCenter.y);
    const w = (width! - fitViewPadding! * 2) / bbox.width;
    const h = (height! - fitViewPadding! * 2) / bbox.height;
    let ratio = w;
    if (w > h) {
      ratio = h;
    }
    if (ratio < 1) {
      setZoom(view, ratio, canvasCenter);
    }
  };
  return fitview;
}

export function useCanvasSize(canvas: Canvas) {
  const changeSize = (width: number, height: number) => {
    canvas.changeSize(width, height);
    canvas.draw();
  };
  return changeSize;
}
