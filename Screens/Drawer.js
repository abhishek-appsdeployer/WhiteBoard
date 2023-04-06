import {
  Box,
  Canvas,
  Rect,
  rect,
  rrect,
  Selector,
  useComputedValue,
  useLoop,
  useMultiTouchHandler,
  useTouchHandler,
  useValue,
} from '@shopify/react-native-skia';
import React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {DragTextEditor} from 'react-native-drag-text-editor';
import {Zoom} from 'react-native-reanimated-zoom';
const Heights = new Array(10).fill(0).map((_, i) => i * 0.1);
const Drawers = ({route}) => {
  const viewComponent = () => <View style={styles.cornerStyles} />;

  const _cornerComponent = [
    {
      side: 'TR',
      customCornerComponent: () => viewComponent(),
    },
  ];

  const _rotateComponent = {
    side: 'bottom',
    customRotationComponent: () => viewComponent(),
  };

  const _resizerSnapPoints = ['top', 'bootom'];

  const Position = useValue(10);
  const Cy = useValue(10);

  const TouchHandler = useMultiTouchHandler({
    onActive: ({x, y}) => {
      Position.current = x;
      Cy.current = y;
    },
  });
  console.log(Position);
  const size = useValue({width: 0, height: 0});
  const rct = useComputedValue(() => {
    return rect(0, 0, size.current.width, size.current.height / 2);
  }, [size]);
  console.log(size);
  const loop = useLoop();
  const heights = useComputedValue(
    () => Heights.map((_, i) => loop.current * i * 10),
    [loop],
  );

  return (
    <>
      {/* <Zoom style={{flex: 1}}> */}
      <Canvas onSize={size} style={{flex: 1}} onTouch={TouchHandler}>
        {/* {Heights.map((_, i) => (
          <Rect
            key={i}
            x={i * 20}
            y={0}
            width={16}
            height={Selector(heights, v => v[i])}
            color="red"
          />
        ))} */}
        {/* <Rect x={Position} y={Cy} width={50} height={50} color={'red'} /> */}

        <Rect x={Position} y={Cy} width={1} height={1} color={'red'} />
        {/* <Rect x={0} y={50} width={Position} height={200} color={'yellow'} /> */}

        {/* <Box box={rrect(rect(64, 64, 128, 128), 24, 24)} color="#add8e6" /> */}
      </Canvas>
      <Button
        title="Add"
        onPress={() => {
          array.push({
            x: Position,
            y: Cy,
            width: 50,
            height: 50,
            color: 'red',
          });
        }}
      />
      {/* <DragTextEditor
          visible={true}
          resizerSnapPoints={_resizerSnapPoints}
          cornerComponents={_cornerComponent}
          rotationComponent={_rotateComponent}
          externalTextStyles={styles.textStyles}
          externalBorderStyles={styles.borderStyles}
        /> */}
      {/* </Zoom> */}
    </>
  );
};

const styles = StyleSheet.create({
  borderStyles: {
    borderStyle: 'dashed',
    borderColor: 'gray',
  },
  textStyles: {
    color: '#000',
  },
  cornerStyles: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderColor: '#aaa',
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default Drawers;
