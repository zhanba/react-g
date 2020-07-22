import React from 'react';
import { Text } from '@react-g/core';

export interface IconFontMapItem {
  name: string;
  unicode_decimal: number;
}

interface IconFontProps {
  x: number;
  y: number;
  type: string;
  fontFamily: string;
  iconFontMap: IconFontMapItem[];
}

export const IconFont: React.FC<IconFontProps> = ({ type, iconFontMap, x, y }) => {
  const matchIcon = iconFontMap.find((icon) => icon.name === type);
  let text;
  if (matchIcon) {
    text = String.fromCodePoint(matchIcon?.unicode_decimal);
  } else {
    text = '';
  }
  return <Text text={text} x={x} y={y} fill="#234567" />;
};
