import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function Details({ uri, title, price, time, onPress, tag }) {
    const defaultImageUri = require('../../assets/user.png');

    return (
        <TouchableOpacity
            style={[styles.profileWrapper]}
            onPress={onPress}
        >
            {uri ? (
                <Image source={{ uri: uri }} style={styles.profileImage} />
            ) : (
                <Image source={defaultImageUri} style={styles.profileImage} />
            )}
            <View style={styles.textWrapper}>
                <Text style={[styles.upperText]}>{title}</Text>
                <Text>{time}</Text>
            </View>
            <View style={styles.detailsWrapper}>
                <Text style={styles.amountText}>${price}</Text>
                <View style={[styles.tagContainer, { backgroundColor: tag === 'Send' ? '#006442' : '#003171' }]}>
                    <Text style={styles.tagText}>{tag}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 20
    },
    profileWrapper: {
        flexDirection: 'row',
        padding: 10,
        margin: 10,
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor:'#fff',
        elevation:5
    },
    textWrapper: {
        marginHorizontal: 10,
        flex: 1,
    },
    upperText: {
        fontSize: 20,
        fontWeight: '500',
    },
    detailsWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    amountText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
    },
    tagContainer: {
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderRadius: 10,
    },
    tagText: {
        color: '#fff',
        fontSize: 18,
    },
    sendBg: {
        backgroundColor: '#ad862a',
    },
    receiveBg: {
        backgroundColor: '#04610c',
    },
});
