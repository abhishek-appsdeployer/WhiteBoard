import LinearGradient from 'react-native-linear-gradient';
import {DrawWithOptions} from '@archireport/react-native-svg-draw';
import {View, TouchableOpacity, Text, Alert, StyleSheet} from 'react-native';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {PermissionsAndroid} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {imageSliceAction} from '../Redux/imageslice';

const Home = gestureHandlerRootHOC(({route}) => {
  const [id, setid] = useState(0);
  const image = route?.params?.value?.item;
  console.log(image);

  const dispatch = useDispatch();
  const [showcanvas, Setshowcanvas] = useState(false);
  const TouchHandler = () => {
    Setshowcanvas(!showcanvas);
  };
  const CloseButtonHandler = () => {
    Setshowcanvas(!showcanvas);
  };
  const snapHandler = async i => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Cool Photo App Permission',
        message:
          'Cool Photo App needs access to your storage' +
          'so you can save pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    const imageuri = await i;
    console.log('asd', imageuri);
    if (granted) {
      await CameraRoll.save(imageuri);
      Alert.alert('Image Saved');
    }
    console.log(imageuri);
    setid(id + 1);
    dispatch(imageSliceAction.addimage({id: id, image: imageuri}));
  };
  return (
    <View style={{flex: 1}}>
      {showcanvas ? (
        <DrawWithOptions
          image={require('../assets/imageback.jpg')}
          takeSnapshot={snapHandler}
          linearGradient={LinearGradient}
          close={CloseButtonHandler}
        />
      ) : (
        <View style={styles.view}>
          <TouchableOpacity style={styles.root} onPress={TouchHandler}>
            <Icon name="add" size={30} style={{color: 'white'}} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
});
export default Home;

const styles = StyleSheet.create({
  root: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c4dc0',
    borderColor: '#1c4dc0',
    position: 'relative',
    left: 290,
    bottom: 20,
  },
  view: {flex: 1, justifyContent: 'flex-end'},
});
