import { Link } from "react-router-dom"
import { UserContext } from "../UserContext";
import { useContext } from "react";


export default function Header(){
  const {user} = useContext(UserContext);
return (<header className="flex items-center justify-between">
<span className="font-bold text-xl">Infinite Page</span>

<div className="relative flex items-center">
  <Link to={'/login'} className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 mt-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
    <div className="text-black rounded-full border border-gray-500">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
        />
      </svg>
    </div>
    {!!user && (
      <div>
        {user.name}
      </div>
    )}
  </Link>
</div>
</header>)

}