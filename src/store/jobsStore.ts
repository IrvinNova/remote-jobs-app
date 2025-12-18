import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware'
import { remotiveApi } from '../api/remotiveApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Job } from '../types/job';

interface JobsState {
    allJobs: Job[];
    jobs: Job[];

    categories: string[];
    jobTypes: string[];

    selectedCategory: string | null;
    selectedJobType: string | null;

    pageSize: number;
    loadingMore: boolean;

    favorites: number[];
    loading: boolean;
    error: string | null;

    fetchJobs: () => Promise<void>;
    loadMore: () => void;
    setCategory: (category: string | null) => void;
    setJobType: (type: string | null) => void;
    toggleFavorite: (id: number) => void;
}

const PAGE_SIZE = 15;

export const useJobsStore = create<JobsState>()(
    persist(
        (set, get) => ({
            allJobs: [],
            jobs: [],

            categories: [],
            jobTypes: [],

            selectedCategory: null,
            selectedJobType: null,

            pageSize: PAGE_SIZE,
            loadingMore: false,

            favorites: [],
            loading: false,
            error: null,

            fetchJobs: async () => {
                try {
                    set({ loading: true, error: null });

                    const res = await remotiveApi.get('/remote-jobs');
                    const allJobs = res.data.jobs as Job[];

                    const categories = Array.from(
                        new Set(allJobs.map(job => job.category))
                    );

                    const jobTypes = Array.from(
                        new Set(allJobs.map(job => job.job_type))
                    );

                    set({
                        allJobs,
                        jobs: allJobs.slice(0, PAGE_SIZE),
                        categories,
                        jobTypes,
                        loadingMore: false,
                    });
                } catch {
                    set({ error: 'Error al cargar empleos' });
                } finally {
                    set({ loading: false });
                }
            },

            loadMore: () => {
                const { jobs, allJobs, loadingMore } = get();

                if (loadingMore || jobs.length >= allJobs.length) return;

                set({ loadingMore: true });

                set({
                    jobs: allJobs.slice(0, jobs.length + PAGE_SIZE),
                    loadingMore: false,
                });
            },

            setCategory: (category) => set({ selectedCategory: category }),
            setJobType: (type) => set({ selectedJobType: type }),

            toggleFavorite: (id) => {
                const favs = get().favorites;
                set({
                    favorites: favs.includes(id)
                        ? favs.filter(f => f !== id)
                        : [...favs, id],
                });
            },
        }),
        {
            name: 'jobs-storage',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                favorites: state.favorites,
            }),
        }
    )
);

