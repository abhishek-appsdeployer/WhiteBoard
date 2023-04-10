import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';
import Modal from 'react-native-modal';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const Profile = ({navigation, route}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [editName, seteditName] = useState("");
  const [users, setUser] = useState(auth().currentUser);
  const [displayName, setdisplayName] = useState(users.displayName);
 
  const submitName = () => {
    console.log('Name after edit', editName);
    updateUserName(editName);
    setdisplayName(editName)
  };
  const updateUserName = newName => {
    // Implement your logic to update the user's name, e.g. using Firebase Auth API or making an API request to your backend server
    // Example using Firebase Auth API:
    user
      .updateProfile({displayName: newName})
      .then(() => {
        // Success, user's name updated
        console.log('User name updated successfully');
        Alert.alert('Name updated successfully');
        setModalVisible(false);
      })
      .catch(error => {
        // Handle error
        console.log('Error updating user name:', error);
        Alert.alert('Error in updating name');
      });
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
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
            <Text style={styles.nametext}>{displayName}</Text>
            <Text style={styles.emailtext}>
              {user?.email ? user?.email : ''}
            </Text>
          </View>
          <View
            style={{flexDirection: 'row', left: -10, borderBottomWidth: 0.5}}>
            <TouchableOpacity style={styles.buttonedit}>
              <Text style={styles.edittext} onPress={toggleModal}>
                Edit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={SignOutHandler}
              style={styles.buttonsignout}>
              <Text style={styles.signouttext}>Signout</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* modals */}
        {/* <Button title="Open Modal" onPress={handleButtonClick} /> */}
        <View style={{}}>
          <Modal isVisible={isModalVisible} style={styles.modalContainer}>
            <View style={styles.modalContent}>
            <Icon size={35} color="white" name="close" style={{textAlign:"right"}}  onPress={toggleModal} />
              
              <TextInput
                onChangeText={seteditName}
                keyboardAppearance="dark"
                keyboardType="text"
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
                placeholder="Enter the name"
              />
              <Button title="submit" onPress={submitName} />
              
            </View>
          </Modal>
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
  modalContainer: {
    flex: 1,
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1c4dc0',
    borderRadius: 10,
    padding: 20,
    width: 300,
    height: 200,
  },
});
