import { useContext } from "react";
import classNames from "classnames";
import NavigationContext from "../context/navigation";
import useNavigation from "../hooks/use-navigation";

const Link = ({ to, children, className, activeClassName, ...props }) => {
  const { navigate, currentPath } = useNavigation();

  const classes = classNames(className, currentPath === to && activeClassName);

  const handleClick = (event) => {
    // prevent default unless user is holding down cmd/ctrl
    if (event.metaKey || event.ctrlKey) {
      return;
    }
  
    event.preventDefault();
    navigate(to);
  }

  return (
    <a onClick={handleClick} href={to} className={classes} {...props}>
      {children}
    </a>
  );
};

export default Link;