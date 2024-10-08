import React, { useEffect } from 'react'
import { matchPath, useLocation } from 'react-router-dom';
import logo from "../../assets/logo/Main_Logo.png";
import { Link } from 'react-router-dom';
import { NavbarLinks } from "../../data/navbar-links";
import { useDispatch, useSelector } from 'react-redux';
import ProfileDropDown from '../core/auth/ProfileDropDown';
import { GiHamburgerMenu } from 'react-icons/gi';
import { CiLocationOn } from "react-icons/ci";
import { useRef } from 'react';
import { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { setShow } from '../../slices/searchSlice';
import { useNavigate } from 'react-router-dom';
import { setShownavbar,setshowlogo } from '../../slices/searchSlice';


export default function Navbar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [showlogo2,setshowlogo2]=useState(false);

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { name, shownavbar,showlogo2} = useSelector((state) => state.search);

    const show = useRef();
    const overlay = useRef();

    const location = useLocation()

    const matchRoutes = (routes) => {
        // if(location.pathname==="/"){
        //     setshowlogo2(true);
        // }
        return matchPath({ path: routes }, location.pathname)
    }

    useEffect(()=>{
        console.log("location: ",location.pathname);
        if(location.pathname==="/"){
            // setshowlogo2(true);
            dispatch(setshowlogo(true));
            console.log("setshowlogo2 true: ",showlogo2);
        }
        else{
            // setshowlogo2(false);
            dispatch(setshowlogo(false));
            console.log("setshowlogo2: ",showlogo2);
        }
    },[location.pathname])


    const shownav = () => {
        show.current.classList.toggle('navshow');
        overlay.current.classList.toggle('hidden');
    }

    const handleSearch = () => {
        navigate("/homeSearch");
        dispatch(setShownavbar(false));
    }

    return (
        <div>
            {shownavbar && <div className='flex h-15 justify-center items-center border-b-[1px] border-b-white-100'>
                <div className='flex w-full sm:w-11/12 max-w-Content justify-between items-center'>
                    {/* logo image  */}
                    { showlogo2 &&
                        <Link to='/login' className='hidden sm:flex mr-[5%]'>
                        <img className='md:w-[160] md:h-[42] sm:flex' src={logo} width={140} alt="Turf" height={38}></img>
                    </Link>
                    }
                    
                    {
                        showlogo2 ? (<div className='sm:hidden justify-center relative items-center w-full py-2 pl-4'>
                            <span className='absolute top-5 left-5 text-xl'><CiSearch></CiSearch></span>
                            <input type="text" onClick={handleSearch} className='py-2 px-8 border border-gray-700 text-xl outline-none w-full' placeholder='Search' />
                        </div>):(<><Link to='/login' >
                                            <img className='md:w-[160] md:h-[42] sm:flex' src={logo} width={140} alt="Turf" height={38}></img>
                                            </Link></>)
                    }


                    {/* mobile navbar  */}


                    <div className={`flex md:hidden z-50 relative gap- flex-row`}>
                        
                        <GiHamburgerMenu className={`w-16 h-8 fill-richblack-25 absolute -bottom-4 ${!showlogo2 &&('left-36')}  sm:ml-60`} onClick={shownav} />
                        
                        <div ref={overlay} className='fixed top-0 bottom-0 left-0 z-50 right-0 bg w-[100vw] hidden h-[100vh] overflow-y-hidden bg-[rgba(0,0,0,0.2)] ' onClick={shownav}></div>
                        <div ref={show} className='mobNav bg-white border-red-600  z-50'>
                            <nav className=' items-center flex flex-col  absolute w-[200px] -left-[80px] -top-7  glass2' ref={show}>
                                {
                                    token == null && (
                                        <Link to='/login' className='' >
                                            <button onClick={shownav} className=' mt-4 text-center text-[15px] px-6 py-2 rounded-md font-semibold bg-yellow-50 text-black hover:scale-95 transition-all duration-200'>
                                                Login
                                            </button>
                                        </Link>
                                    )
                                }
                                {
                                    token == null && (
                                        <Link to='/signup' className='text-yellow-50'>
                                            <button onClick={shownav} className='mt-4 text-center text-[15px] px-5 py-2 rounded-md font-semibold bg-yellow-50 text-black hover:scale-95 transition-all duration-200' >
                                                Signup
                                            </button>
                                        </Link>

                                    )
                                }

                                {
                                    token != null && (
                                        <div className=' mt-2' >
                                            <ProfileDropDown />
                                        </div>
                                    )
                                }
                                <div className=' mt-4 mb-4 bg-black w-[200px] h-[2px]'></div>
                                <div className=' flex flex-col items-end pr-4'>
                                    <Link to='/' onClick={() => { shownav() }} className="p-2">
                                        <p className=' text-black '>
                                            Home
                                        </p>
                                    </Link>
                                </div>
                                <div className=' mt-4 mb-4 bg-black w-[200px] h-[2px]'></div>
                                <Link to='/about' onClick={() => { shownav() }} className="p-2">
                                    <p>
                                        About
                                    </p>
                                </Link>
                                <Link to='/contact' onClick={() => { shownav() }} className="p-2">
                                    <p>
                                        Contact
                                    </p>
                                </Link>
                            </nav>
                        </div>
                    </div>




                    {/* nav links  */}
                    {/* Desktop  */}

                    { showlogo2 &&   
                        <div className='md:flex hidden  justify-center relative items-center w-1/2 mr-5'>
                        <span className='absolute top-3 left-1 text-xl'><CiSearch></CiSearch></span>
                        <input type="text" onClick={handleSearch} className='py-2 px-8 border border-gray-500 text-xl outline-none w-full' placeholder='Search' />
                    </div>
                    }

                    <nav className='w-1/4 h-full'>
                        <ul className=' flex-row gap-x-6 text-black gap-3 hidden md:flex justify-around'>
                            {
                                NavbarLinks?.map((element, index) => (
                                    <li key={index}>
                                        {
                                            <Link to={element?.path} className='font-bold'>
                                                <p className={`${matchRoutes(element?.path) ? 'text-green-500 underline underline-offset-8' : 'text-black'}`} >
                                                    {element?.title}
                                                </p>
                                            </Link>
                                        }
                                    </li>
                                ))
                            }
                        </ul>
                    </nav>

                    {/* login/signup/dashboard  */}


                    <div className='flex-row gap-3 hidden w-1/5 md:flex items-center justify-around pl-3'>
                        <div>
                            <Link to='/search' onClick={() => dispatch(setShow(true))} className='text-blue-600 md:flex gap-1 hover:scale-150 transition-all items-center hidden' >

                                <span><CiLocationOn className='text-xl'></CiLocationOn></span>
                                <p>{name}</p>

                            </Link>
                        </div>
                        {
                            token == null && (
                                <Link to='/login' >
                                    <button className='rounded-[8px]  bg-green-500 border border-richblack-700 px-[8px] py-[5px]  lg:px-[10px] lg:py-[5px] text-black'>
                                        Login
                                    </button>
                                </Link>
                            )
                        }
                        {
                            token == null && (
                                <Link to='/signup' className='text-richblack-25' >
                                    <button className=' bg-green-500 rounded-[8px] border border-richblack-700 px-[8px] py-[5px] lg:px-[10px] lg:py-[5px] text-black' >
                                        Signup
                                    </button>
                                </Link>
                            )
                        }
                        {
                            token !== null && (
                                <div className=' pt-2' >
                                    <ProfileDropDown />
                                </div>
                            )
                        }
                    </div>


                </div>
            </div>}


        </div>

    )
}
