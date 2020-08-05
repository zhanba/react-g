/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { usePopper } from 'react-popper';
import { Group, GGroup, GCanvas } from '@react-g/core';
import { match } from 'simplematch';
import { Html } from './Html';

type TriggerType = 'hover' | 'click' | 'contextMenu';

interface Props {
  content: React.ReactNode;
  trigger?: TriggerType;
}

interface ShapePosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

let ticking = false;

export const Dropdown: React.FC<Props> = ({ content, trigger = 'click', children }) => {
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);
  const tooltipRef = useRef<GGroup>(null);
  const popperElement = useRef<HTMLDivElement>(null);
  const [childProps, setChildProps] = useState();

  const [groupPosition, setGroupPosition] = useState<ShapePosition>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const childrenRef = useRef<GGroup>(null);

  const updatePosition = useCallback(() => {
    if (childrenRef !== null) {
      const canvas: GCanvas = childrenRef.current?.getCanvas();
      const bbox = childrenRef.current?.getCanvasBBox();
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
        updatePosition();
        ticking = false;
      });

      ticking = true;
    }
  }, []);

  useEffect(() => {
    updatePosition();
  }, [childProps, hovered, selected]);

  useEffect(() => {
    popperElement.current?.focus();
  }, [selected]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

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
    placement: 'bottom',
    modifiers: [
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
    React.Children.forEach(children, ele => {
      if (React.isValidElement(ele)) {
        setChildProps(ele.props);
      }
    });
  });

  const displayContent = match<TriggerType, boolean>({
    hover: () => hovered,
    click: () => selected,
    contextMenu: () => false,
  })(trigger);

  return displayContent ? (
    <Group ref={tooltipRef}>
      <Html>
        <div
          ref={popperElement}
          style={{
            ...styles.popper,
            outline: 'none',
          }}
          {...attributes.popper}
          onBlur={() => {
            setSelected(false);
          }}
          tabIndex={0}
        >
          {content}
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
  ) : (
    <Group
      ref={childrenRef}
      onMouseenter={() => {
        setHovered(true);
      }}
      onMouseleave={() => {
        setHovered(false);
      }}
      onClick={() => {
        setSelected(true);
      }}
    >
      {children}
    </Group>
  );
};
