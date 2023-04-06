import Svg, {
  Circle,
  Ellipse,
  G,
  Text,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native';
import RNSketchCanvas, {
  SketchCanvas,
} from '@terrylinla/react-native-sketch-canvas';
import {DragTextEditor} from 'react-native-drag-text-editor';
import {Zoom} from 'react-native-reanimated-zoom';

const SvgShape = () => {
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        {alignItems: 'center', justifyContent: 'center'},
      ]}>
      <DragTextEditor
        minWidth={100}
        minHeight={100}
        w={200}
        h={200}
        x={350}
        y={400}
        FontColor={'#000000'}
        LineHeight={15}
        TextAlign={'left'}
        LetterSpacing={0}
        FontSize={15}
        isDraggable={true}
        isResizable={true}
        TopRightAction={() => console.log('-Top Right Pressed')}
        centerPress={() => console.log('-Center Pressed')}
        onDragStart={() => console.log('-Drag Started')}
        onDragEnd={() => console.log('- Drag ended')}
        onDrag={() => console.log('- Dragging...')}
        onResizeStart={() => console.log('- Resize Started')}
        onResize={() => console.log('- Resizing...')}
        onResizeEnd={() => console.log('- Resize Ended')}
      />
    </View>
  );
};

export default SvgShape;
