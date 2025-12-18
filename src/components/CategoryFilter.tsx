import { FlatList, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { useJobsStore } from '../store/jobsStore';

const FILTER_HEIGHT = 56;

const formatType = (type: string) =>
    type.replace('_', ' ').toUpperCase();

export const CategoryFilter = () => {
    const { categories, selectedCategory, setCategory } = useJobsStore();

    return (
        <View style={styles.container}>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                data={['All', ...categories]}
                keyExtractor={(item) => item}
                renderItem={({ item }) => {
                    const isAll = item === 'All';
                    const active =
                        (isAll && selectedCategory === null) ||
                        selectedCategory === item;

                    return (
                        <TouchableOpacity
                            style={[styles.item, active && styles.active]}
                            onPress={() => setCategory(isAll ? null : item)}
                        >
                            <Text style={[styles.text, active && styles.activeText]}>
                                {isAll ? 'All' : formatType(item)}
                            </Text>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        height: FILTER_HEIGHT,
        justifyContent: 'center',
    },
    listContent: {
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    item: {
        paddingHorizontal: 18,
        paddingVertical: 4,
        borderRadius: 20,
        backgroundColor: '#eee',
        marginHorizontal: 5,
    },
    active: {
        backgroundColor: '#007AFF',
    },
    text: {
        fontSize: 14,
    },
    activeText: {
        color: 'white',
        fontWeight: '600',
    },
});
