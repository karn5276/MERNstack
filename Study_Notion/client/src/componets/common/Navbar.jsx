import React, { useState } from 'react'

import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { matchPath } from 'react-router-dom'
import { NavbarLinks } from '../../data/NavbarLinks'
import {categories} from '../../services/apis';

const NavBar = () => {

    const [sublinks,setsublinks]=useState([]);
    const location = useLocation()
    const matchRoutes = (routes) => {
        return matchPath({ path: routes }, location.pathname)
    }

    const fetchSublinks = async () => {
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            if (result?.data?.data?.length > 0) {
                setsublinks(result?.data?.data);
            }
            localStorage.setItem("sublinks", JSON.stringify(result.data.data));

        } catch (error) {
            // setsublinks(JSON.parse(localStorage.getItem("sublinks")));
            // console.log("could not fetch sublinks",localStorage.getItem("sublinks"));
            console.log(error);
        }
    }

    useEffect(() => {
        fetchSublinks();
    }, []);

    return (
        <div>
            <div >
                

                {/* Desktop Navbar */}
                <nav>
                    <ul>
                        {
                            NavbarLinks?.map((element, index) => (
                                <li key={index} >
                                    {
                                        element.title === "Catalog" ? (<div></div>) : (

                                            <Link to={element?.path}>
                                                <p className={`${matchRoutes(element?.path) ? " text-yellow" : " text-richblack "}`} >
                                                    {element?.title}
                                                </p>
                                            </Link>
                                        )
                                    }
                                </li>
                            ))
                        }
                       
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default NavBar