// Filters.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Filters = ({ title, onPress, selected }) => {
    return (
        <TouchableOpacity 
            style={[styles.filterButton, selected && styles.selectedFilter]}
            onPress={onPress}
        >
            <Text style={[styles.filterText, selected && styles.selectedFilterText]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    filterButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: 5,
        borderRadius: 20,
        backgroundColor: '#ddd',
    },
    selectedFilter: {
        backgroundColor: 'gray',
    },
    filterText: {
        color: 'black',
    },
    selectedFilterText: {
        color: 'white',
    },
});

export default Filters;
