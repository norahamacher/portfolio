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
  const theme = useStore((state) => state.theme);
  const toggleTheme = useStore((state) => state.toggleTheme);

  const hasData = filteredData.length > 0;
  const notFoundClass = `not-found ${hasData ? "hidden" : ""}`;
  
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    const loadData = async () => {
      try {
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
      <button 
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
      <h2>Nora's Projects</h2>
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