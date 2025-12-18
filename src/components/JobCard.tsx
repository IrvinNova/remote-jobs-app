import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Job } from '../types/job';
import { useJobsStore } from '../store/jobsStore';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { icons } from '../constants/icons';


type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'JobDetail'>;

export const JobCard = ({ job }: { job: Job }) => {
    const navigation = useNavigation<NavigationProp>();
    const { favorites, toggleFavorite } = useJobsStore();
    const isFav = favorites.includes(job.id);

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('JobDetail', { job })}
            activeOpacity={0.8}
        >
            <Image source={{ uri: job.company_logo }} style={styles.logo} />
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>{job.title}</Text>
                <Text>{job.company_name}</Text>
                <Text>{job.candidate_required_location}</Text>
                <Text>{new Date(job.publication_date).toLocaleDateString()}</Text>
            </View>

            <TouchableOpacity onPress={() => toggleFavorite(job.id)}>
                <Image
                    source={isFav ? icons.favoriteFilled : icons.empty}
                    style={{ width: 35, height: 35 }}
                />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        padding: 12,
        borderBottomWidth: 1,
        borderColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    title: {
        fontWeight: 'bold',
    },
});
