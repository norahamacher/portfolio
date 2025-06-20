import { useEffect } from 'react'

import './App.css'
import { useStore } from './state';

import type { Project } from './domain';
import Card from './components/Card';
import Filters from './components/Filters';
import { AnimatePresence } from 'framer-motion';
function App() {
  const filteredData = useStore((state) => state.filteredData);
  const init = useStore((state) => state.init);

  const hasData = filteredData.length > 0;
  const notFoundClass = `not-found ${hasData ? "hidden" : ""}`;
  useEffect(() => {
    const loadData = async () => {
      try {
        // Path relative to your 'public' folder
        const response = await fetch('./data.json', {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        const data: { projects: Project[] } = await response.json();
        init(data.projects);
      } catch (err) {
        console.error("Failed to load local JSON:", err);
      } finally {
      }
    };

    loadData();

  }, [])
  return (
    <>
      <h2>Nora Hamacher's Projects</h2>
      <Filters></Filters>
      <div id="card-container">
        <AnimatePresence>
          {filteredData.map((project) => (
            <Card key={project.id} data={project}></Card>
          ))}
        </AnimatePresence>
      </div>
      <div className={notFoundClass}> No projects found for the selected filters.</div>
    </>
  )
}

export default App


/*      {availableFilters.map((item, index) => (
        <FilterButton label={item.value} type={item.type}></FilterButton>
      ))}*/