import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, ScrollView, ActivityIndicator, Text} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectButton } from '../redux/sendData/helloSlice';
import Filters from '../components/Filters';
import Details from '../components/Details';
import { fetchUserData } from '../utility/fetchUserData';

export default function Description({ navigation }) {
    const unsentData = useSelector(state => state.data.updatedData);    
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    console.log(data);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sendData = await fetchUserData('send');
                const receiveData = await fetchUserData('receive');
                setData([...sendData, ...receiveData]);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data: ', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const goToActivityDetails = (item) => {
        dispatch(selectButton(item));
        navigation.navigate('Final');
    };

    // Filter data based on searchQuery and selectedFilter
    const filteredData = data.filter(item => {
        const matchesSearchQuery = item.companyName.toLowerCase().includes(searchQuery.toLowerCase());
        if (selectedFilter === 'All') {
            return matchesSearchQuery;
        } else if (selectedFilter === 'Send') {
            return matchesSearchQuery && item.tag === 'Send';
        } else if (selectedFilter === 'Receive') {
            return matchesSearchQuery && item.tag === 'Receive';
        }
        return matchesSearchQuery;
    });

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.textInputStyles}>
                <FontAwesome name="search" size={24} color="black" style={{ marginHorizontal: 10 }} />
                <TextInput
                    placeholder="Search"
                    style={{ flex: 1 }}
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                />
            </View>
            <View style={{ flexDirection: 'row', padding: 10, marginTop: 5 }}>
                <Filters
                    title={'All'}
                    onPress={() => setSelectedFilter('All')}
                    selected={selectedFilter === 'All'}
                />
                <Filters
                    title={'Send'}
                    onPress={() => setSelectedFilter('Send')}
                    selected={selectedFilter === 'Send'}
                />
                <Filters
                    title={'Receive'}
                    onPress={() => setSelectedFilter('Receive')}
                    selected={selectedFilter === 'Receive'}
                />
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={{backgroundColor:"orange", elevation:10, borderRadius:10, margin:10, width:100, padding:5}}>
                    <Text style={{color:'#fff', textAlign:'center', fontWeight:'bold'}}>Pending Data</Text>
                </View>
                {unsentData.map((value, index) => (
                    <Details
                        key={index}
                        title={value.companyName}
                        time={value.time}
                        price={value.price}
                        uri={value.imgUri || value.imageURL}
                        tag={value.buttons}
                        onPress={() => goToActivityDetails(value)}
                    />
                ))}

                <View style={{backgroundColor:"orange", elevation:10, borderRadius:10, margin:10, width:100, padding:5}}>
                    <Text style={{color:'#fff', textAlign:'center', fontWeight:'bold'}}>Sent Data</Text>
                </View>
                {filteredData.map((value, index) => (
                    <Details
                        key={index}
                        title={value.companyName}
                        time={value.time}
                        price={value.price}
                        uri={value.imageUri}
                        tag={value.tag}
                        onPress={() => goToActivityDetails(value)}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7faf8',
    },
    textInputStyles: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderWidth: 1,
        padding: 10,
        marginHorizontal: 20,
        marginTop: 10,
        borderRadius: 20,
    },
    scrollViewContent: {
        paddingBottom: 20,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
