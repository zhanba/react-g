/* eslint-disable no-void */
/* eslint-disable react/no-children-prop */
/* eslint-disable react/no-render-return-value */
import React, { useEffect, useState, useRef, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { Group, GGroup, GCanvas } from '@react-g/core';

interface HtmlProps {
  classname?: string;
  style?: React.CSSProperties;
  portal?: React.MutableRefObject<HTMLElement>;
  children: React.ReactNode;
}

export const Html = React.forwardRef<HTMLDivElement, HtmlProps>(
  ({ style, classname, portal, children }, ref) => {
    const group = useRef<GGroup>(null);
    const [el] = useState(() => document.createElement('div'));

    const styles: React.CSSProperties = useMemo(
      () => ({
        position: 'absolute',
        ...style,
      }),
      [style],
    );

    useEffect(() => {
      const canvas = group.current?.getCanvas() as GCanvas;
      const target = portal?.current ?? canvas.get('container');
      if (group.current) {
        el.style.cssText = `position:absolute;top:0;left:0px;`;
        // el.style.cssText = `position:relative;`;
        if (target) {
          target.appendChild(el);
        }
        return () => {
          if (target) {
            target.removeChild(el);
          }
          ReactDOM.unmountComponentAtNode(el);
        };
      }
      return undefined;
    }, [portal]);

    useEffect(
      () =>
        void ReactDOM.render(
          <div ref={ref} style={styles} className={classname} children={children} />,
          el,
        ),
    );
    return <Group ref={group} />;
  },
);
