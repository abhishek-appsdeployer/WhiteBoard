import {
  Image,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {imageSliceAction} from '../Redux/imageslice';

const Feed = ({navigation}) => {
  const dispatch = useDispatch();
  const imagedata = useSelector(state => state.imageslice.value);
  console.log('imagedata', imagedata);
  const imageHandler = data => {
    console.log(data);

    const ImagePressHandler = () => {
      console.log(data);
      if (data) {
        dispatch(imageSliceAction.deleteimage({id: data.index}));
        Alert.alert('Image Deleted');
      }
    };

    return (
      <View style={styles.root}>
        <Pressable onPress={ImagePressHandler}>
          <Image
            source={{uri: data.item.image}}
            resizeMode="contain"
            style={styles.image}
          />
        </Pressable>
      </View>
    );
  };
  return (
    <View style={styles.flatlist}>
      {imagedata.length > 0 ? (
        <FlatList data={imagedata} renderItem={imageHandler} />
      ) : (
        <View style={styles.textload}>
          <Text style={styles.text}> No Image.... </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1, elevation: 5, margin: 5},
  image: {
    width: 340,
    height: 400,
    margin: 5,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },
  flatlist: {
    flex: 1,
  },
  textload: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    fontWeight: '100',
  },
});

export default Feed;
