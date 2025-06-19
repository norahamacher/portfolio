import React, { useState } from 'react'

import './FilterButton.css'
import { useStore } from '../state';
import type { Filter } from '../domain';

interface FilterButtonProps {
    label: string;
    type: Filter,
}

const FilterButton: React.FC<FilterButtonProps> = ({ label, type }) => {
    const addFilter = useStore((state) => state.addFilter);
    const removeFilter = useStore((state => state.removeFilter));

    const [isActive, setActive] = useState<boolean>(false);


    const handleClick = () => {
        setActive(!isActive);
        if (isActive) {
            addFilter({ type: type, value: label })
        } else {
            removeFilter({ type: type, value: label })
        }
    }

    const className = `filter-btn ${isActive ? "active" : ""}`;
    return (

        <div onClick={handleClick} className={className}>{label}</div>


    )
}

export default FilterButton;
