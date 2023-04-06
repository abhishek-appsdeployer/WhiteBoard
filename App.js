import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Screens/Home';
import Register from './Screens/Register';
import React, {useState, useEffect} from 'react';
import {
  Text,
  Pressable,
  TouchableOpacity,
  View,
  Alert,
  StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import Login from './Screens/Login';
import Profile from './Screens/Profile';

import {Store} from './Redux/imageslice';
import {Provider} from 'react-redux';
import Boards from './Screens/Boards';
import Feed from './Screens/Feed';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tabs = createBottomTabNavigator();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  if (initializing) return null;

  return (
    <>
      <Provider store={Store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={user ? 'Drawer' : 'register'}>
            <Stack.Screen
              options={{headerShown: false}}
              name="register"
              component={Register}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="login"
              component={Login}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Drawer"
              component={SideDrawer}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="profile"
              component={Profile}
            />
            <Stack.Screen
              options={{
                headerStyle: {backgroundColor: '#151617'},
                headerShown: true,
                headerTintColor: 'white',
                headerTitle: 'WhiteBoard',
              }}
              name="home"
              component={Home}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
};

const CustonDrawer = ({navigation, name, userdata}) => {
  return (
    <View style={styles.root}>
      <View style={styles.drawer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('profile', {userdata});
          }}
          style={styles.draweritem1}>
          <Text style={{color: 'white', fontSize: 18}}>{name}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.draweritem2}>
          <Text style={{fontSize: 18, fontWeight: '400', color: 'white'}}>
            Help
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.draweritem3}>
        <Icon name="time-outline" color={'#ffffff'} size={25} />
        <Text style={{fontSize: 18, fontWeight: '300', color: 'white'}}>
          Recent boards
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.draweritem4}>
        <Icon name="star-outline" color={'#ffffff'} size={25} />
        <Text style={{fontSize: 18, fontWeight: '300', color: 'white'}}>
          Starred boards
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const SideDrawer = ({navigation, route}) => {
  const username = route?.params?.res?.user?.email?.split('')[0].toUpperCase();
  const userdetail = route?.params?.res?.user;

  return (
    <Drawer.Navigator
      screenOptions={{headerStyle: {backgroundColor: '#151617'}}}
      drawerContent={() => (
        <CustonDrawer
          navigation={navigation}
          name={username}
          userdata={userdetail}
        />
      )}>
      <Drawer.Screen
        options={{
          headerTintColor: 'white',
          drawerContentStyle: {
            backgroundColor: '#151617',
          },
          drawerActiveBackgroundColor: '#223242',
          drawerLabelStyle: {color: 'white', fontSize: 16, fontWeight: '400'},
          drawerLabel: 'WhiteBoard',
          headerTitle: 'WhiteBoard',
        }}
        name="drawer"
        component={BottomTab}
      />
    </Drawer.Navigator>
  );
};

const BottomTab = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarStyle: {backgroundColor: '#151617'},
        headerShown: false,
      }}>
      <Tabs.Screen
        options={{
          tabBarLabelStyle: {fontSize: 14, color: 'white'},
          tabBarIcon: () => <Icon name="home" size={25} color={'white'} />,
        }}
        name="Boards"
        component={Boards}
      />
      <Tabs.Screen
        options={{
          tabBarLabelStyle: {fontSize: 14, color: 'white'},
          tabBarIcon: () => (
            <Icon name="notifications" size={25} color={'white'} />
          ),
        }}
        name="Feed"
        component={Feed}
      />
    </Tabs.Navigator>
  );
};
export default App;

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: '#191d22'},
  drawer: {
    borderBottomWidth: 0.2,
    borderColor: 'white',
    marginBottom: 10,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  draweritem1: {
    marginLeft: 20,
    margin: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1c4dc0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c4dc0',
    elevation: 5,
  },
  draweritem2: {
    elevation: 5,
    marginRight: 36,
    margin: 10,
    width: 60,
    height: 35,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#1c4dc0',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#1c4dc0',
    borderBottomWidth: 0.2,
  },
  draweritem3: {
    elevation: 5,
    marginRight: 25,
    margin: 10,
    width: '80%',
    height: 35,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#1c4dc0',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#1c4dc0',
    flexDirection: 'row',
  },
  draweritem4: {
    elevation: 5,
    marginRight: 25,
    margin: 10,
    // flex: 1,
    width: '80%',
    height: 35,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#1c4dc0',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#1c4dc0',
  },
});
