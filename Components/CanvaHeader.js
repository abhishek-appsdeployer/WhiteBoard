import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import {RNCamera} from 'react-native-camera';

import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
import {SketchCanvas} from '@terrylinla/react-native-sketch-canvas';
import SvgShape from './SvgShape';

const Header = () => {
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <RNSketchCanvas
        containerStyle={{backgroundColor: 'transparent', flex: 1}}
        canvasStyle={{backgroundColor: 'transparent', flex: 1}}
        onStrokeEnd={data => {}}
        onUndoPressed={id => {
          // Alert.alert('do something')
        }}
        text={[
          {
            text: 'Welcome to my GitHub',
            font: 'fonts/IndieFlower.ttf',
            fontSize: 30,
            position: {x: 0, y: 0},
            anchor: {x: 0, y: 0},
            coordinate: 'Absolute',
            fontColor: 'red',
          },
          {
            text: 'Center\nMULTILINE\nHero',
            fontSize: 25,
            position: {x: 0.5, y: 0.5},
            anchor: {x: 0.5, y: 0.5},
            coordinate: 'Ratio',
            overlay: 'SketchOnText',
            fontColor: 'black',
            alignment: 'Center',
            lineHeightMultiple: 1,
          },
          {
            text: 'Right\nMULTILINE',
            fontSize: 25,
            position: {x: 1, y: 0.25},
            anchor: {x: 1, y: 0.5},
            coordinate: 'Ratio',
            overlay: 'TextOnSketch',
            fontColor: 'black',
            alignment: 'Right',
            lineHeightMultiple: 1,
          },
          {
            text: 'Signature',
            font: 'Zapfino',
            fontSize: 40,
            position: {x: 0, y: 1},
            anchor: {x: 0, y: 1},
            coordinate: 'Ratio',
            overlay: 'TextOnSketch',
            fontColor: '#444444',
          },
        ]}
        clearComponent={
          <View style={styles.functionButton}>
            <Text style={{color: 'white'}}>Clear</Text>
          </View>
        }
        undoComponent={
          <View style={styles.functionButton}>
            <Text style={{color: 'white'}}>Undo</Text>
          </View>
        }
        tvParallaxMagnification={2}
        onClearPressed={() => {
          // Alert.alert('do something')
        }}
        eraseComponent={
          <View style={styles.functionButton}>
            <Text style={{color: 'white'}}>Eraser</Text>
          </View>
        }
        strokeComponent={color => (
          <View style={[{backgroundColor: color}, styles.strokeColorButton]} />
        )}
        strokeSelectedComponent={(color, index, changed) => {
          return (
            <View
              style={[
                {backgroundColor: color, borderWidth: 2},
                styles.strokeColorButton,
              ]}
            />
          );
        }}
        strokeWidthComponent={w => {
          return (
            <View style={styles.strokeWidthButton}>
              <View
                style={{
                  backgroundColor: 'white',
                  marginHorizontal: 2.5,
                  width: Math.sqrt(w / 3) * 10,
                  height: Math.sqrt(w / 3) * 10,
                  borderRadius: (Math.sqrt(w / 3) * 10) / 2,
                }}
              />
            </View>
          );
        }}
        defaultStrokeIndex={0}
        defaultStrokeWidth={1}
        saveComponent={
          <View style={styles.functionButton}>
            <Text style={{color: 'white'}}>Save</Text>
          </View>
        }
        savePreference={() => {
          return {
            folder: 'RNSketchCanvas',
            filename: String(Math.ceil(Math.random() * 100000000)),
            transparent: false,
            imageType: 'png',
          };
        }}
        onSketchSaved={(success, path) => {
          Alert.alert(success ? 'Image saved!' : 'Failed to save image!', path);
        }}
        onPathsChange={pathsCount => {
          console.log('pathsCount', pathsCount);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  strokeColorButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  strokeWidthButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#39579A',
  },
  functionButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    height: 30,
    width: 60,
    backgroundColor: '#39579A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    alignSelf: 'stretch',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  page: {
    flex: 1,
    height: 300,
    elevation: 2,
    marginVertical: 8,
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.75,
    shadowRadius: 2,
  },
});

export default Header;
