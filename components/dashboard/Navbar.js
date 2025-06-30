import style from "./navbar.module.css";
import { FaSearch } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";

export default function DashboardNavbar() {
  return (
    <div className={style.navbar}>
      <div className={style.left}>
        <h2>DASHBOARD</h2>
      </div>

      <div className={style.right}>
        <FaSearch className={style.icon} />
        <FaBell className={style.icon} />
        <IoPersonCircleOutline className={style.icon} />
      </div>
    </div>
  );
}
