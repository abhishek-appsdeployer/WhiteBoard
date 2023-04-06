import Lottie from 'lottie-react-native';
import {View, Text} from 'react-native';

const Loader = () => {
  return (
    <View style={{flex: 1, height: 500, backgroundColor: 'black'}}>
      <Lottie
        style={{flex: 1}}
        source={require('../../WhiteBoardApp/assets/animation.json')}
        autoPlay={true}
        loop={true}
      />
    </View>
  );
};
export default Loader;
