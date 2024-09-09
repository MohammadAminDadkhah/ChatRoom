export default function Delete({classes}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className={`icon icon-tabler icons-tabler-outline icon-tabler-trash-x hidden ${classes}`}
            viewBox="0 0 24 24"
        >
            <path stroke="none" d="M0 0h24v24H0z"></path>
            <path d="M4 7h16M5 7l1 12a2 2 0 002 2h8a2 2 0 002-2l1-12M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3M10 12l4 4m0-4l-4 4"></path>
        </svg>
    );
}
