import { useAuth } from '../context/AuthContext';

// This is a simple re-export so any component can do:
// import { useAuth } from '../hooks/useAuth'
// instead of importing directly from context

export { useAuth };