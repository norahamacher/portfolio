import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const repoName = 'portfolio'; // Replace with your actual repository name

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: `/${repoName}/`
})
