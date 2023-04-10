import {useState} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {boardActions} from '../Redux/BoardSlice';
const Boards = ({navigation}) => {
  const dispatch = useDispatch();
  const boardsnumarr = useSelector(state => state.boardslice.boards);
  const [x, setx] = useState(0);
  const AddBoardHandler = () => {
    setx(x + 1);
    setTimeout(() => {
      Alert.alert('New Board Added');
      dispatch(boardActions.addboard(x));
    }, 2000);
  };
  const BoardHandler = data => {
    const GoToWhiteBoardHandler = () => {
      navigation.navigate('home');
    };
    const BoardDeleted = () => {
      console.log('Board deleted');
      Alert.alert(
        'Confirmation',
        'Are you sure you want to delete?',
        [
          { text: 'Yes', onPress:()=>{  dispatch(boardActions.deleteboard(data.item))}},
          { text: 'No', onPress: () => {}, style: 'cancel' },
        ],
        { cancelable: false }
      );
      // {
      //   dispatch(boardActions.deleteboard(data.item));
      //   Alert.alert('Board Deleted');
      // }
    };
    return (
      <>
        <TouchableOpacity
          style={styles.renderItem}
          onPress={GoToWhiteBoardHandler}>
          <Icon
            style={styles.threedoticon}
            size={105}
            name="clipboard-outline"
            color="#000000"
          />
          <Pressable onPress={BoardDeleted}>
            <Text
              style={{
                borderWidth: 1,
                padding: 5,
                borderRadius: 5,
                elevation: 3,
                backgroundColor: '#000000',
                fontSize: 15,
                fontWeight: '700',
                color: 'white',
                marginBottom: 10,
              }}>
              Remove
            </Text>
          </Pressable>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <>
      <View style={styles.boardcontainer}>
        <Text style={styles.text}>Boards</Text>
        <TouchableOpacity style={styles.addboard} onPress={AddBoardHandler}>
          <Icon name="add" size={25} style={{color: 'white'}} />
        </TouchableOpacity>
      </View>
      <View style={styles.view}>
        <FlatList
          numColumns={2}
          data={boardsnumarr}
          renderItem={BoardHandler}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
};
export default Boards;

const styles = StyleSheet.create({
  root: {flex: 1, margin: 10, marginTop: 10},

  text: {
    marginLeft: 3,
    fontSize: 25,
    fontWeight: '300',
    color: 'black',
    marginBottom: 10,
  },
  renderItem: {
    margin: 5,
    height: 200,
    width: 160,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#b8d9e9',
    borderColor: '#b8d9e9',
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  renderItemtext: {},
  threedoticon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addboard: {
    width: 30,
    height: 30,
    marginRight: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: '#000000',
  },
  boardcontainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
  },
});
