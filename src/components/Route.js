import { useContext } from 'react';
import NavigationContext from '../context/navigation';
import useNavigation from '../hooks/use-navigation';

const Route = ({ path, component, children }) => {
  const { currentPath } = useNavigation();

  return currentPath === path ? children : null;
};

export default Route;