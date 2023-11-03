import Link from "./Link";

function ListItem({
    label = '',
    to = '',
    ...props
}) {
    return (
        <Link {...props}>
          <div className="font-semibold">
            {label}
          </div>
        </Link>
    );
}

export default ListItem;