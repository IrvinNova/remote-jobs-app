import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    Share,
    Dimensions,
} from 'react-native';
import { icons } from '../constants/icons';
import { RouteProp } from '@react-navigation/native';
import RenderHTML from 'react-native-render-html';
import * as WebBrowser from 'expo-web-browser';
import { useJobsStore } from '../store/jobsStore';
import { RootStackParamList } from '../../App';


type Props = {
    route: RouteProp<RootStackParamList, 'JobDetail'>;
};

export const JobDetailScreen = ({ route }: Props) => {
    const { job } = route.params;
    const { favorites, toggleFavorite } = useJobsStore();
    const isFav = favorites.includes(job.id);

    const { width } = Dimensions.get('window');

    const handleApply = async () => {
        await WebBrowser.openBrowserAsync(job.url);
    };

    const handleShare = () => {
        Share.share({
            message: `${job.title} at ${job.company_name}\n${job.url}`,
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Logo */}
            <Image source={{ uri: job.company_logo }} style={styles.logo} />

            {/* Title */}
            <Text style={styles.title}>{job.title}</Text>

            {/* Company */}
            <Text style={styles.company}>{job.company_name}</Text>

            {/* Meta info */}
            <View style={styles.meta}>
                <Text>{job.candidate_required_location}</Text>
                <Text>{job.category} · {job.job_type}</Text>
                <Text>
                    {new Date(job.publication_date).toLocaleDateString()}
                </Text>
            </View>

            {/* Salary */}
            {job.salary ? (
                <Text style={styles.salary}>💰 {job.salary}</Text>
            ) : null}

            {/* Actions */}
            <View style={styles.actions}>
                <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => toggleFavorite(job.id)}>
                    <Image
                        source={isFav ? icons.favoriteFilled : icons.empty}
                        style={{ width: 25, height: 25 }}
                    />
                    <Text style={styles.action}>
                        {isFav ? 'Quitar favorito' : 'Guardar'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ alignItems: 'center' }} onPress={handleApply}>
                    <Image source={icons.apply} style={{ width: 25, height: 25 }} />
                    <Text style={styles.action}>Aplicar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ alignItems: 'center' }} onPress={handleShare}>
                    <Image source={icons.share} style={{ width: 25, height: 25 }} />
                    <Text style={styles.action}>Compartir</Text>
                </TouchableOpacity>
            </View>

            {/* Description */}
            <RenderHTML
                contentWidth={width}
                source={{ html: job.description }}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: 'white'
    },
    logo: {
        width: 80,
        height: 80,
        alignSelf: 'center',
        marginBottom: 12,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    company: {
        textAlign: 'center',
        color: '#666',
        marginBottom: 10,
    },
    meta: {
        alignItems: 'center',
        marginBottom: 10,
    },
    salary: {
        textAlign: 'center',
        fontWeight: '600',
        marginBottom: 10,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 16,
    },
    action: {
        fontSize: 14,
        color: '#007AFF',
    },
});
