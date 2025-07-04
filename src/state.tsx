import { create } from 'zustand'
import { Category, OR_CATEGORIES, type Featured, type Project, type ProjectFilter, type TagData, type UIProject } from './domain'


type Store = {
    filters: ProjectFilter[],
    filteredData: readonly UIProject[],
    availableFilters: readonly ProjectFilter[],
    data: readonly Project[],
    projectCount: number;
    addFilter: (filter: ProjectFilter) => void,
    removeFilter: (filter: ProjectFilter) => void;
    clearFilters: () => void;
    init: (data: Project[]) => void;
}

function convertDataToUi(projects: readonly Project[]): UIProject[] {

    const getTags = (data: Project): TagData[] => {
        const libs = data.library.map(lib => { return { type: Category.LIBRARY, value: lib } })
        const langs = data.language.map(lang => { return { type: Category.LANGUAGE, value: lang } })
        const frameworks = data.framework.map(fram => { return { type: Category.FRAMEWORK, value: fram } })
        const years = data.year.map(year => { return { type: Category.YEAR, value: year.toString() } });
        const workplace = data.workplace ? [{ type: Category.WORKPLACE, value: data.workplace }] : [];
        const motivation = data.motivation ? [{ type: Category.MOTIVATION, value: data.motivation }] : []
        return [...libs, ...langs, ...years, ...frameworks, ...workplace, ...motivation];
    }

    const sorted = [...projects].sort((a, b) => {

        if (a.featured && !b.featured) {
            return -1;
        }
        if (!a.featured && b.featured) {
            return 1;
        }
        return 0;
    })

    return sorted.map(project => {
        return {
            id: project.id,
            title: project.title,
            description: project.description,
            media: project.media,
            url: project.url,
            tags: getTags(project),
            featured: project.featured
        }
    })
}
function filterData(projects: readonly Project[], filters: readonly ProjectFilter[]): UIProject[] {

    if (filters.length === 0) {
        return convertDataToUi(projects);
    }
    const filtered = projects.filter(project => {

        return filters.every(filter => {

            switch (filter.type) {
                case Category.WORKPLACE:
                case Category.MOTIVATION:
                    return project[filter.type] === filter.value;
                case Category.FRAMEWORK:
                case Category.LIBRARY:
                case Category.LANGUAGE:
                    return project[filter.type].some(f => f.toLowerCase() === filter.value.toLowerCase());
                case Category.YEAR:
                    const yearValue = parseInt(filter.value);
                    return project.year.includes(yearValue);
                case Category.FEATURED:
                    const featured = filter.value as Featured;

                    if (featured === "yes") {
                        return project.featured === true;
                    } else {
                        return !project.featured;
                    }
                default:
                    return false;
            }
        });
    })

    return convertDataToUi(filtered);
}

const extractAvailableFilterfromData = (projects: Project[]) => {
    const allExtractedFilters: ProjectFilter[] = [];
    for (const filterType of Object.values(Category)) {
        const uniqueValues = new Set<string>();
        for (const project of projects) {

            let projectValue;

            switch (filterType) {
                case Category.YEAR:
                    for (const year of project.year) {
                        uniqueValues.add(year.toString());
                    }
                    break;
                case Category.FRAMEWORK:
                case Category.LIBRARY:
                case Category.LANGUAGE:
                    for (const value of project[filterType]) {
                        uniqueValues.add(value)
                    }
                    break;

                case Category.WORKPLACE:
                case Category.MOTIVATION:
                    projectValue = project[filterType];
                    if (projectValue) {
                        uniqueValues.add(projectValue);
                    }
                    break;
                case Category.FEATURED:
                    projectValue = project[filterType];
                    if (projectValue) {
                        uniqueValues.add("yes");
                    } else {
                        uniqueValues.add("no");
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
    projectCount: 0,
    clearFilters: () => {
        set((state) => {
            return {
                filters: [],
                filteredData: filterData(state.data, []),
                projectCount: state.data.length,
            }
        })
    },
    addFilter: (filter: ProjectFilter) => {
        set((state) => {
            let filtered;
            if (OR_CATEGORIES.includes(filter.type)) {
                filtered = [...state.filters].filter(f => f.type !== filter.type);
            } else {
                filtered = [...state.filters];
            }

            filtered = [...filtered, filter];
            const filteredData = filterData(state.data, filtered);
            return {
                filters: filtered,
                filteredData: filteredData,
                projectCount: filteredData.length,
            };


        })
    },
    removeFilter: (filter: ProjectFilter) => {
        set((state) => {
            const filtered = state.filters.filter(f => f.value !== filter.value);
            const filteredData = filterData(state.data, filtered);
            return {
                filters: filtered,
                filteredData: filteredData,
                projectCount: filteredData.length,
            };
        })
    },
    init: (data: Project[]) => set(() => {
        return {
            data: data,
            filteredData: filterData(data, []),
            availableFilters: extractAvailableFilterfromData(data),
            projectCount: data.length
        }
    }),

}))

