import PropTypes from 'prop-types';
import classNames from 'classnames';

const Button = ({
  primary = true,
  seconday,
  danger,
  success,
  warning,
  isLoading = false,
  title = '',
  children,
  ...props
}) => {
  const classes = classNames('rounded-lg shadow-md font-semibold text-zinc-50 border px-4 py-2 m-2 max-w-max', {
    'bg-red-600': danger,
    'bg-green-700': success,
    'bg-yellow-600': warning,
    'bg-blue-600': primary,
    'bg-gray-600': seconday,
    'hover:bg-red-500': danger,
    'hover:bg-green-600': success,
    'hover:bg-yellow-500': warning,
    'hover:bg-blue-500': primary,
    'hover:bg-gray-500': seconday,
  });
  
  let buttonTitle = title;
  if (isLoading) {
    buttonTitle = 'Loading...';
  }

  return (
    <button className={classes} {...props}>
      <div className="flex">
        {isLoading && <svg class="animate-spin w-6 h-6 fill-white mr-2 " viewBox="0 0 24 24">
          <path className="opacity-20" d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z">
          </path>
          <path d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z">
          </path>
        </svg>}
        {buttonTitle}
        {children}
      </div>
    </button>
  );
}

Button.propTypes = {
  primary: PropTypes.bool,
  seconday: PropTypes.bool,
  danger: PropTypes.bool,
  success: PropTypes.bool,
  warning: PropTypes.bool,
  isLoading: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Button;