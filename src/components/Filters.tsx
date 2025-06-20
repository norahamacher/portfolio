
import React, { useState } from 'react'

import './Filters.css'
import { useStore } from '../state';
import FilterButton from './FilterButton';
import Tag from './Tag';
import { Category } from '../domain';



const Filters: React.FC = () => {
    const availableFilters = useStore((state) => state.availableFilters);
    const activeFilters = useStore((state) => state.filters);

    const [open, toggleOpen] = useState(false);
    const arrow = open ? " △ " : " ▽ ";
    const dropDownClasses = `filters ${open ? "open" : "closed"}`;

    const categories = Object.values(Category);
    return (
        <div className="menu">
            <div className="anchor" onClick={() => toggleOpen(!open)}>
                <span>Filters</span>
                {activeFilters.map((filter) => (
                    <Tag title={filter.value} type={filter.type} key={filter.value} closeable></Tag>
                ))}
                <div id="arrow">{arrow}</div>
            </div>
            <div className={dropDownClasses}>
                {categories.map((category) => (
                    <div key={category} className="categories">
                        <p className="category-title">{category}</p>

                        {availableFilters.filter(f => f.type === category).sort((a, b) => a.value.localeCompare(b.value)).map((filter) => (
                            <FilterButton
                                key={filter.value} type={filter.type} value={filter.value}></FilterButton>
                        ))}
                    </div>

                ))}

            </div>
        </div>

    )
}

export default Filters;
