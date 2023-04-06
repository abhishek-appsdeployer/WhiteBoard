import {Text, View, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
const Profile = ({navigation, route}) => {
  const user = route?.params?.userdata;
  console.log(user);
  const SignOutHandler = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    navigation.navigate('register');
    Alert.alert('User signed out!');
  };
  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={['#151617', '#1c2436', '#151617']}>
      <View style={styles.root}>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon size={35} color="white" name="arrow-back" />
          </TouchableOpacity>
        </View>
        <View>
          <View style={styles.logocontainerview}>
            <Text style={styles.logotext}>
              {user?.email.split('')[0].toUpperCase()}
            </Text>
          </View>
          <View style={{padding: 5}}>
            <Text style={styles.nametext}>
              {user?.displayname ? user?.displayname : ''}
            </Text>
            <Text style={styles.emailtext}>
              {user?.email ? user?.email : ''}
            </Text>
          </View>
          <View
            style={{flexDirection: 'row', left: -10, borderBottomWidth: 0.5}}>
            <TouchableOpacity style={styles.buttonedit}>
              <Text style={styles.edittext}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={SignOutHandler}
              style={styles.buttonsignout}>
              <Text style={styles.signouttext}>Signout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};
export default Profile;

const styles = StyleSheet.create({
  root: {flex: 1, borderWidth: 0, padding: 10, margin: 5},
  logocontainerview: {
    marginTop: 25,
    borderWidth: 0.3,
    width: 60,
    height: 60,
    borderRadius: 30,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ffffff',
    backgroundColor: '#1c4dc0',
  },
  logotext: {fontSize: 35, color: 'white'},
  buttonedit: {
    borderWidth: 0.2,
    width: 90,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    margin: 15,
    backgroundColor: '#1c4dc0',
    borderColor: '#ffffff',
    elevation: 5,
  },
  buttonsignout: {
    borderColor: '#ffffff',
    elevation: 5,
    backgroundColor: '#1c4dc0',
    borderRadius: 15,
    borderWidth: 0.2,
    width: 100,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
  image: {width: 100, height: 35, left: -30},
  edittext: {
    color: 'white',
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
  },
  signouttext: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontWeight: '300',
  },
  nametext: {fontSize: 20, fontWeight: '600', color: 'white', marginTop: 10},
  emailtext: {fontSize: 17, fontWeight: '300', color: 'white'},
});
