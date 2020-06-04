import React, { Component } from 'react';
import { Canvas, Circle, Group } from 'react-g-canvas';

interface State {
  position: {
    x: number;
    y: number;
  };
  dragstart: {
    x: number;
    y: number;
  };
}

export default class Drag extends Component<{}, State> {
  state = {
    position: { x: 100, y: 100 },
    dragstart: { x: 0, y: 0 },
  };

  handleDragstart = e => {
    console.log(e.x, e.y);
    this.setState({ dragstart: { x: e.x, y: e.y } });
    console.log('after start', this.state.dragstart);
  };

  handleDrag = e => {
    // console.log('start', this.state.dragstart);
    this.setState(state => ({
      ...state,
      position: {
        x: state.position.x + e.x - state.dragstart.x,
        y: state.position.y + e.y - state.dragstart.y,
      },
    }));

    this.setState({ dragstart: { x: e.x, y: e.y } });
  };

  handleDragend = () => {};

  render() {
    const { position } = this.state;
    return (
      <div>
        <span>position: {`${position.x}, ${position.y}`}</span>
        <div style={{ border: '1px solid #bfb3b3' }}>
          <Canvas
            width={600}
            height={400}
            draggable
            onDragstart={this.handleDragstart}
            onDrag={this.handleDrag}
            onDragend={this.handleDragend}
          >
            <Group>
              <Circle x={position.x} y={position.y} r={30} stroke="black" fill="green" />
            </Group>
          </Canvas>
        </div>
      </div>
    );
  }
}
