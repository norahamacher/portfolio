import { useEffect } from 'react'

import './App.css'
import { useStore } from './state';

import type { Project } from './domain';
import Card from './components/Card';

function App() {
  const filteredData = useStore((state) => state.filteredData);
  //const availableFilters = useStore((state => state.availableFilters));
  const init = useStore((state) => state.init);
  //const [loading, setLoading] = useState(true);

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
        // You might want to set an error state here in a real app
      } finally {
        //  setLoading(false);
      }
    };

    loadData();

  }, [])
  return (
    <>
      <h2>My Projects</h2>
      <div id="card-container">
        {filteredData.map((project) => (
          <Card key={project.id} data={project}></Card>
        ))}
      </div>
    </>
  )
}

export default App


/*      {availableFilters.map((item, index) => (
        <FilterButton label={item.value} type={item.type}></FilterButton>
      ))}*/