import {useState} from 'react';
import {
  View,
  Text,
  Alert,
  TextInput,
  Pressable,
  TouchableOpacity,
  Appearance,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';

const Login = ({navigation}) => {
  const [usercred, setusercrd] = useState({email: '', password: ''});
  const [userdata, setuserdata] = useState([]);
  const [error, seterror] = useState({error: ''});
  const colorScheme = Appearance.getColorScheme();
  console.log('123', colorScheme);
  const SignupTextHandler = () => {
    navigation.replace('register');
  };
  console.log(userdata);

  const SignUPHandler = async () => {
    // if (usercred.email === '') {
    //   seterror({error: 'Email field required'});
    //   Alert.alert('email field required');
    //   return;
    // }
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (!reg.test(usercred.email)) {
      seterror({error: 'Please enter a valid email address '});
      return;
    }
    // if (usercred.email.includes('@') && usercred.email.includes('.com')) {
    // } else {
    //   seterror({error: 'Please enter a valid email address '});
    //   return;
    // }
    if (usercred.password?.length >= 6) {
    } 
    else {
      seterror({error: 'Please enter a valid password '});
      return;
    }
    if (usercred.password === '') {
      seterror({error: 'Password field required'});
      Alert.alert('Password field required');
      return;
    }
    try {
      const res = await auth().signInWithEmailAndPassword(
        `${usercred.email}`,
        `${usercred.password}`,
      );
      if (res) {
        setuserdata(res);
        console.log(res);
        Alert.alert('Login sucessfull');
        navigation.navigate('Drawer', {res});
      }
    } catch (err) {
      console.log(err.toString());
      // seterror({error: err.toString()});
      seterror({error: 'Please enter a valid password '});
      // Alert.alert(err.toString().slice(7));
    }
    setusercrd({email: '', password: ''});
  };
  return (
    <>
      <LinearGradient
        style={{
          flex: 1,
          elevation: 4,
        }}
        colors={['#151617', '#1c2436', '#151617']}>
        <View>
          <Text
            style={{
              fontSize: 45,
              fontWeight: '900',
              color: '#ffffff',
              marginTop: 50,
              textAlign: 'center',
            }}>
            WhiteBoard
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            marginTop: -20,
            margin: 5,
            padding: 10,
            overflow: 'hidden',
          }}>
          <Text style={{color: 'white', fontSize: 25, fontWeight: '600'}}>
            Welcome
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: '200',
              marginLeft: -5,
            }}>
            {' '}
            Login to continue
          </Text>
          <TextInput
            value={usercred.email}
            onChangeText={text => {
              setusercrd({...usercred, email: text});
            }}
            keyboardAppearance="dark"
            keyboardType="email-address"
            // maxLength={20}
            style={{
              borderWidth: 1,
              height: 50,
              borderRadius: 5,
              borderColor: 'white',
              backgroundColor: 'white',
              elevation: 3,
              marginTop: 15,
              marginBottom: 15,
              fontSize: 20,
              color: 'black',
            }}
            placeholder="Email"
          />
          <TextInput
            onChangeText={text => {
              setusercrd({...usercred, password: text});
            }}
            value={usercred.password}
            keyboardAppearance="dark"
            keyboardType="ascii-capable"
            // maxLength={6}
            secureTextEntry={true}
            style={{
              fontSize: 20,
              // width: '100%',
              borderWidth: 1,
              height: 50,
              borderRadius: 5,
              borderColor: 'white',
              backgroundColor: 'white',
              elevation: 3,
              marginTop: 15,
              marginBottom: 15,
              color: 'black',
            }}
            placeholder="Password"
          />
          {error && <Text style={{color: 'yellow'}}>{error.error}</Text>}
          <Text style={{color: 'yellow'}} onPress={()=>navigation.navigate("forgot")}>Forgot Password</Text>
          <TouchableOpacity
            android_ripple={{color: 'white'}}
            onPress={SignUPHandler}
            style={{
              overflow: 'hidden',
              borderWidth: 1,
              height: 50,
              borderRadius: 5,
              borderColor: '#1c2436',
              backgroundColor: '#1c4dc0',
              elevation: 3,
              marginTop: 15,
              marginBottom: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20, color: 'white'}}>Login</Text>
          </TouchableOpacity>

          <Text
            style={{
              marginTop: 15,
              textAlign: 'right',
              fontSize: 16,
              color: 'white',
              fontWeight: '200',
            }}>
            Already a user{''}?
            <Text
              onPress={SignupTextHandler}
              style={{
                color: '#c9d35a',
                fontSize: 18,
                fontWeight: '400',
              }}>
              {' '}
              SignUp
            </Text>
          </Text>
        </View>
      </LinearGradient>
    </>
  );
};
export default Login;
