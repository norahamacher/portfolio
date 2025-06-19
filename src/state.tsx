import { create } from 'zustand'
import { AVAILABLE_FILTERS, type Project, type ProjectFilter } from './domain'

type Store = {
    filters: ProjectFilter[],
    filteredData: readonly Project[],
    availableFilters: readonly ProjectFilter[],
    data: readonly Project[],
    addFilter: (filter: ProjectFilter) => void,
    removeFilter: (filter: ProjectFilter) => void;
    init: (data: Project[]) => void;
}

function filterData(projects: readonly Project[], filters: readonly ProjectFilter[]): Project[] {

    if (filters.length === 0) {
        return [...projects];
    }
    return projects.filter(project => {
        // A project must match ALL provided filters to be included
        return filters.every(filter => {
            switch (filter.type) {
                case "workplace":
                case "language":
                    return project[filter.type].toLowerCase() === filter.value.toLowerCase();
                case "framework":
                case "library":
                    return project[filter.type].some(f => f.toLowerCase() === filter.value.toLowerCase());
                case "year":
                    const yearValue = parseInt(filter.value);
                    return project.year.includes(yearValue);
                default:
                    return false;
            }
        });
    })
}

const extractAvailableFilterfromData = (projects: Project[]) => {
    const allExtractedFilters: ProjectFilter[] = [];
    for (const filterType of AVAILABLE_FILTERS) {
        const uniqueValues = new Set<string>();
        for (const project of projects) {

            let projectValue;

            switch (filterType) {
                case "year":
                    for (const year of project.year) {
                        uniqueValues.add(year.toString());
                    }
                    break;
                case "framework":
                case "library":
                    for (const value of project[filterType]) {
                        uniqueValues.add(value)
                    }
                    break;
                case "language":
                case "workplace":
                    projectValue = project[filterType];
                    if (projectValue) {
                        uniqueValues.add(projectValue);
                    }
                    break;
                default:
                    console.warn(`Unhandled filter type: ${filterType}`);
            }
        };

        // For each unique value found, create a ProjectFilter object
        for (const value of Array.from(uniqueValues)) {

            allExtractedFilters.push({
                type: filterType,
                value: value
            });
        }
    }

    return allExtractedFilters;
}
export const useStore = create<Store>()((set) => ({
    filters: [],
    filteredData: [],
    data: [],
    availableFilters: [],
    addFilter: (filter: ProjectFilter) => {
        set((state) => {
            const filtered = [...state.filters, filter];

            return {
                filters: filtered,
                filteredData: filterData(state.data, filtered)
            };


        })
    },
    removeFilter: (filter: ProjectFilter) => {
        set((state) => {
            const filtered = state.filters.filter(f => f.value !== filter.value);

            return {
                filters: filtered,
                filteredData: filterData(state.data, filtered)
            };
        })
    },
    init: (data: Project[]) => set(() => {
        return {
            data: data,
            filteredData: data,
            availableFilters: extractAvailableFilterfromData(data)

        }
    }),

}))

