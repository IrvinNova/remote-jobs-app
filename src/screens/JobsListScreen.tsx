import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    RefreshControl,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';
import { icons } from '../constants/icons';
import { useEffect, useState } from 'react';
import { useJobsStore } from '../store/jobsStore';
import { JobCard } from '../components/JobCard';
import { CategoryFilter } from '../components/CategoryFilter';
import { JobTypeFilter } from '../components/JobTypeFilter';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Jobs'
>;

export const JobsListScreen = () => {
     const navigation = useNavigation<NavigationProp>();
    const {
        jobs,
        fetchJobs,
        loading,
        error,
        selectedCategory,
        selectedJobType,
        loadMore,
        loadingMore,
    } = useJobsStore();

    const [search, setSearch] = useState('');


    useEffect(() => {
        fetchJobs();
    }, []);

    const filteredJobs = jobs.filter(job => {
        const matchesSearch =
            job.title.toLowerCase().includes(search.toLowerCase()) ||
            job.company_name.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
            !selectedCategory || job.category === selectedCategory;

        const matchesJobType =
            !selectedJobType || job.job_type === selectedJobType;

        return matchesSearch && matchesCategory && matchesJobType;
    });



    if (loading && !jobs.length) {
        return <ActivityIndicator size="large" />;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <TextInput
                placeholder="Buscar empleo o empresa"
                value={search}
                onChangeText={setSearch}
                style={{ padding: 10, borderWidth: 1, margin: 10, borderRadius: 20 }}
            />

            <CategoryFilter />

            <JobTypeFilter />

            <TouchableOpacity style={{ alignSelf: 'center', alignItems: 'center'}} onPress={() => navigation.navigate('Favorites')}>
                <Image source={icons.favorite} style={{ width: 25, height: 25 }} />
                <Text style={{ fontSize: 18 }}>Favoritos</Text>
            </TouchableOpacity>

            {!filteredJobs.length ? (
                <Text style={{ textAlign: 'center', marginTop: 40 }}>
                    No hay resultados
                </Text>
            ) : (
                <FlatList
                    data={filteredJobs}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <JobCard job={item} />}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.4}
                    ListFooterComponent={
                        loadingMore ? <ActivityIndicator style={{ margin: 20 }} /> : null
                    }
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={fetchJobs}

                        />
                    }
                />
            )}
        </View>
    );
};
