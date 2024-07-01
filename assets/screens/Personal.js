import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import ProfileCards from '../components/ProfileCards';
import Buttons2 from '../components/Buttons2';
import { useSelector, useDispatch } from 'react-redux';
import Details from '../components/Details';
import { AntDesign } from '@expo/vector-icons';
import { selectButton } from '../redux/sendData/helloSlice';
import { auth, db } from '../configuration/Configuration';
import { doc, getDoc } from 'firebase/firestore';
import { fetchUserData as fetchExternalUserData } from '../utility/fetchUserData';

export default function Personal({ navigation }) {
  const dispatch = useDispatch();
  const buttons = useSelector(state => state.button.buttonText);
  const [userData, setUserData] = useState({ name: '', imageUrl: '' });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sendData = await fetchExternalUserData('send');
        const receiveData = await fetchExternalUserData('receive');
        setData([...sendData, ...receiveData]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data: ', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchUserData = async () => {
    const user = auth.currentUser;

    if (user) {
      // Fetch user data
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
      } else {
        console.log('No such document!');
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const filterData = data.filter((item) => item.tag === buttons);

  const totalPrice = data.reduce((acc, item) => acc + parseInt(item.price, 10), 0);
  const totalTagPrice = filterData.reduce((sum, item) => sum + parseFloat(item.price), 0);

  const goToActivityDetails = (item) => {
    dispatch(selectButton(item));
    navigation.navigate('Final');
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.upperSection}>
        <Image
          source={require('../../assets/road.jpg')}
          style={styles.imageStyle}
        />
        <AntDesign
          name="arrowleft"
          size={24}
          color="black"
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}
        />
        <View style={{ position: 'relative', bottom: 50, alignItems: 'center' }}>
          <Image
            source={userData.imageUrl ? { uri: userData.imageUrl } : require('../../assets/female.jpg')}
            style={styles.profileImage}
          />
          <Text style={styles.nameText}>{userData.name || 'Ronald White'} </Text>
          <Text style={styles.roleText}>{buttons} Summary</Text>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#fff',
              padding: 10,
              elevation: 5,
              margin: 10,
              width: '100%',
              justifyContent: 'space-around',
              borderRadius: 10,
            }}
          >
            <ProfileCards numbers={totalTagPrice} title={buttons} />
            <ProfileCards numbers={totalPrice} title={'Total'} />
            <ProfileCards numbers={filterData.length} title={`${buttons} items`} />
          </View>
        </View>
      </View>
      <ScrollView style={styles.bottom}>
        {filterData.length > 0 ? (
          filterData.map((value, index) => (
            <Details
              key={index}
              title={value.companyName}
              time={value.time}
              price={value.price}
              uri={value.imageUri}
              tag={value.tag}
              onPress={() => goToActivityDetails(value)}
            />
          ))
        ) : (
          <View style={styles.noDataView}>
            <Text> No {buttons} data to show</Text>
          </View>
        )}
      </ScrollView>
      <View style={[styles.buttonsStyle, { bottom: 10 }]}>
        <View style={{ marginTop: 20, position: 'relative', left: 'auto', bottom: 'auto' }}>
          <Buttons2 onPress={() => navigation.navigate('UpdateDetails')} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7faf8',
  },
  upperSection: {
    alignItems: 'center',
  },
  imageStyle: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 50,
  },
  nameText: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  roleText: {
    fontSize: 16,
    color: '#555',
  },
  bottom: {
    position: 'relative',
    bottom: 40,
  },
  buttonsStyle: {
    position: 'absolute',
    right: 20,
    bottom: 30,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataView: {
    alignItems: 'center',
    marginTop: 20,
  },
});
