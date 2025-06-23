
import React, { useState } from 'react'

import styles from './Filters.module.css'
import { useStore } from '../state';
import FilterButton from './FilterButton';
import Tag from './Tag';
import { Category } from '../domain';
import { AnimatePresence, motion, type Transition } from 'framer-motion';


const Filters: React.FC = () => {
    const availableFilters = useStore((state) => state.availableFilters);
    const activeFilters = useStore((state) => state.filters);
    const clearFilters = useStore((state) => state.clearFilters);
    const projectCount = useStore((state) => state.projectCount);
    const [open, toggleOpen] = useState(false);
    const arrow = open ? " △ " : " ▽ ";

    const categories = Object.values(Category);

    function onClearFilters(e: React.MouseEvent) {
        e.stopPropagation();
        clearFilters();
    }

    const filterVariants = {
        hidden: {
            height: 0, // Start with 0 height
            opacity: 0,
            y: -10, // A slight lift might enhance the slide effect
            overflow: 'hidden' // Hide overflowing content
        },
        visible: {
            height: 'auto', // Animate to auto height
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 18,
                stiffness: 120,
                duration: 0.3,
                when: "beforeChildren", // Animate this container first, then children
                // Stagger children might be nice here if you have many
                // staggerChildren: 0.05
            } as Transition,
        },
        exit: {
            height: 0, // Animate back to 0 height
            opacity: 0,
            y: -10,
            transition: {
                type: "tween", // Tween for exit for a direct collapse
                duration: 0.2,
                when: "afterChildren", // Animate children out first, then container
            } as Transition,
        },
    };

    const foundProjectString = `Filters (${projectCount} project${projectCount !== 1 ? "s" : ""})`
    return (
        <div className={styles.menu}>
            <div className={styles.anchor} onClick={() => toggleOpen(!open)}>
                <span>{foundProjectString}</span>
                <div className={styles["filter-tags"]}>
                    <AnimatePresence>
                        {activeFilters.map((filter) => (

                            <Tag title={filter.value} type={filter.type} key={filter.value} closeable></Tag>

                        ))}
                    </AnimatePresence>
                </div>
                <h4 className={styles.title}>Nora's Projects</h4>
                <div className={styles.actions}>
                    <button disabled={activeFilters.length === 0} onClick={onClearFilters} id={styles["clear-filters"]}>Clear Filters</button>
                    <div id={styles.arrow}>{arrow}</div>
                </div>
            </div>
            <AnimatePresence>
                {open && (
                    <motion.div
                        key={styles.filterDropdown}
                        variants={filterVariants}
                        initial="hidden" // Start from the 'hidden' state
                        animate={"visible"}
                        exit={"exit"}

                    >
                        <div className={styles.filters}>
                            {categories.map((category) => (
                                <div key={category} className={styles.categories}>
                                    <p className={styles["category-title"]}>{category}</p>
                                    <div className={styles["category-entries"]}>
                                        {availableFilters.filter(f => f.type === category).sort((a, b) => a.value.localeCompare(b.value)).map((filter) => (
                                            <FilterButton
                                                key={filter.value} type={filter.type} value={filter.value}></FilterButton>
                                        ))}
                                    </div>
                                </div>

                            ))}

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

    )
}

export default Filters;
