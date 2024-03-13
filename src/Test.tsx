// const Test = () => {
//   return (
//     <div>
//       <ul style={{ width: "fit-content" }}>
//         <li className="nav-item dropdown dropend">
//           <a
//             className="nav-link"
//             href="#"
//             role="button"
//             data-bs-toggle="dropdown"
//             aria-expanded="false"
//             // data-bs-auto-close="false"
//           >
//             Dropdown
//           </a>
//           <ul className="dropdown-menu">
//             <ul>
//               <li className="nav-item dropdown">
//                 <a
//                   className="nav-link"
//                   href="#"
//                   role="button"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                   data-bs-auto-close="false"
//                 >
//                   Dropdown
//                 </a>
//                 <ul className="dropdown-menu">
//                   <ul>
//                     <li className="nav-item dropdown">
//                       <a
//                         className="nav-link"
//                         href="#"
//                         role="button"
//                         data-bs-toggle="dropdown"
//                         aria-expanded="false"
//                         data-bs-auto-close="false"
//                       >
//                         Dropdown
//                       </a>
//                       <ul className="dropdown-menu">
//                         <li>
//                           <a className="dropdown-item" href="#">
//                             Action
//                           </a>
//                         </li>
//                         <li>
//                           <a className="dropdown-item" href="#">
//                             Another action
//                           </a>
//                         </li>
//                         <li>
//                           <a className="dropdown-item" href="#">
//                             Something else here
//                           </a>
//                         </li>
//                       </ul>
//                     </li>
//                   </ul>
//                   <li>
//                     <a className="dropdown-item" href="#">
//                       Another action
//                     </a>
//                   </li>
//                   <li>
//                     <a className="dropdown-item" href="#">
//                       Something else here
//                     </a>
//                   </li>
//                 </ul>
//               </li>
//             </ul>
//             <li>
//               <a className="dropdown-item" href="#">
//                 Another action
//               </a>
//             </li>
//             <li>
//               <a className="dropdown-item" href="#">
//                 Something else here
//               </a>
//             </li>
//           </ul>
//         </li>
//       </ul>
//     </div>
//   );
// };

import { Link } from "react-router-dom";
import { BackIcon } from "./utils/SvgElements";
import { IoIosAddCircleOutline } from "react-icons/io";

const Test = () => (
  <div className="sm-cate-container">
    <div className="cat-head d-flex align-items-center">
      <button title="Back">{BackIcon}</button>
      <div className="title">Categories</div>
    </div>
    <hr className="m-0" />
    <section className="sm-cate-body">
      <div className="top-cat">All Categories</div>
      <ul>
        <li>
          <span className="sm-cate-list">
            <Link to="" className="sm-list-link">
              Face & Skin
            </Link>
            <div className="more-list-icon">
              <IoIosAddCircleOutline />
            </div>
          </span>
        </li>
        <li>
          <span className="sm-cate-list">
            <Link to="" className="sm-list-link">
              Face & Skin
            </Link>
            <div className="more-list-icon">
              <IoIosAddCircleOutline />
            </div>
          </span>
        </li>
        <li>
          <span className="sm-cate-list">
            <Link to="" className="sm-list-link">
              Face & Skin
            </Link>
            <div className="more-list-icon">
              <IoIosAddCircleOutline />
            </div>
          </span>
        </li>
        <li>
          <span className="sm-cate-list">
            <Link to="" className="sm-list-link">
              Face & Skin
            </Link>
            <div className="more-list-icon">
              <IoIosAddCircleOutline />
            </div>
          </span>
        </li>
      </ul>
    </section>
  </div>
);
//

export default Test;
