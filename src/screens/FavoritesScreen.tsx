import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { icons } from '../constants/icons';
import { useJobsStore } from '../store/jobsStore';
import { JobCard } from '../components/JobCard';

export const FavoritesScreen = () => {
    const { favorites, allJobs } = useJobsStore();

    const favoriteJobs = allJobs.filter(job =>
        favorites.includes(job.id)
    );

    if (favoriteJobs.length === 0) {
        return (
            <View style={styles.empty}>
                <Image source={icons.favorite} style={{ width: 48, height: 48 }} />
                <Text>Sin favoritos</Text>
                <Text>Guarda empleos para verlos aquí</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={favoriteJobs}
            style={{ backgroundColor: 'white' }}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <JobCard job={item} />}

        />
    );
};

const styles = StyleSheet.create({
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 6,
    },
});
