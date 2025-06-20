import React from 'react'

import './FilterButton.css'
import { useStore } from '../state';
import type { Category } from '../domain';

interface FilterButtonProps {
    value: string;
    type: Category,
}

const FilterButton: React.FC<FilterButtonProps> = ({ value, type }) => {
    const addFilter = useStore((state) => state.addFilter);
    const removeFilter = useStore((state => state.removeFilter));
    const filters = useStore((state) => state.filters);
    const isActive = filters.some(f => f.value === value);

    const handleClick = () => {
        if (isActive) {
            removeFilter({ type: type, value: value })
        } else {
            addFilter({ type: type, value: value })
        }
    }

    const className = `filter-btn ${isActive ? "active" : ""} ${type}`;
    return (

        <div onClick={handleClick} className={className}>{value}</div>
    )
}

export default FilterButton;
