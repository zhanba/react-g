import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { usePopper } from 'react-popper';
import { Group, GGroup, GCanvas } from '@react-g/core';
import { Html } from './Html';
import './tooltip.css';

interface Props {
  content: React.ReactNode;
}

interface ShapePosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

let ticking = false;

export const Tooltip: React.FC<Props> = ({ content, children }) => {
  const [hovered, setHovered] = useState(false);
  const tooltipRef = useRef<GGroup>(null);
  const popperElement = useRef(null);
  const [childProps, setChildProps] = useState();
  // const [childrenPosition, setChildrenPosition] = useState<ShapePosition>({
  //   x: 0,
  //   y: 0,
  //   width: 0,
  //   height: 0,
  // });

  const [groupPosition, setGroupPosition] = useState<ShapePosition>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const childrenRef = useRef<GGroup>(null);

  const setPosition = useCallback(() => {
    if (childrenRef !== null) {
      // console.log('ref node', childrenRef);
      const canvas: GCanvas = childrenRef.current?.getCanvas();
      const bbox = childrenRef.current?.getBBox();
      const position = canvas.getClientByPoint(bbox?.x || 0, bbox?.y || 0);
      setGroupPosition({
        x: position.x,
        y: position.y,
        width: bbox?.width ?? 0,
        height: bbox?.height ?? 0,
      });
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        setPosition();
        ticking = false;
      });

      ticking = true;
    }
  }, []);

  useEffect(() => {
    // console.log('mount --- ');
    setPosition();
  }, [childProps]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  //  console.log('container', container);

  // console.log('groupPosition', groupPosition);

  const virtualReference = useMemo(
    () => ({
      getBoundingClientRect() {
        return {
          top: groupPosition.y,
          left: groupPosition.x,
          bottom: groupPosition.y,
          right: groupPosition.x,
          width: groupPosition.width,
          height: groupPosition.height,
        };
      },
    }),
    [groupPosition],
  );

  const { styles, attributes } = usePopper(virtualReference, popperElement?.current, {
    placement: 'top',
    modifiers: [
      {
        name: 'arrow',
        enabled: true,
      },
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
      {
        name: 'flip',
      },
    ],
  });

  useEffect(() => {
    React.Children.forEach(children, (ele) => {
      if (React.isValidElement(ele)) {
        setChildProps(ele.props);
      }
    });
  });

  // console.log('position --- ');
  // console.log('position', groupPosition);
  // console.log('style', styles);

  return (
    <Group ref={tooltipRef}>
      <Html>
        <div
          className="react-g-tooltip"
          role="tooltip"
          ref={popperElement}
          style={{
            ...styles.popper,
            // display: hovered ? '' : 'none',
            background: '#333',
            color: 'white',
            padding: '4px 8px',
            fontSize: 12,
            borderRadius: 4,
          }}
          {...attributes.popper}
        >
          {content}
          <div className="react-g-tooltip-arrow" data-popper-arrow />
        </div>
      </Html>

      <Group
        ref={childrenRef}
        onMouseenter={() => {
          setHovered(true);
        }}
        onMouseleave={() => {
          setHovered(false);
        }}
      >
        {children}
      </Group>
    </Group>
  );
};
