import React from 'react';
import { Text } from '@react-g/core';

export interface IconFontMapItem {
  name: string;
  unicode_decimal: number;
}

interface IconFontProps {
  x: number;
  y: number;
  name: string;
  color: string;
  fontSize: number;
  fontFamily: string;
  iconFontMap: IconFontMapItem[];
}

export const IconFont: React.FC<IconFontProps> = ({
  name,
  iconFontMap,
  x,
  y,
  color,
  fontSize,
  fontFamily,
}) => {
  const matchIcon = iconFontMap.find((icon) => icon.name === name);
  let text;
  if (matchIcon) {
    text = String.fromCodePoint(matchIcon?.unicode_decimal);
  } else {
    text = '';
  }
  return <Text text={text} x={x} y={y} fill={color} fontSize={fontSize} fontFamily={fontFamily} />;
};
