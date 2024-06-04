import React, { useEffect, useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { useNavigate, Link } from "react-router-dom";
import { setShownavbar } from '../../slices/searchSlice';
// import { fetchSpecificCityTurfs } from '../../services/operation/TurfDetailsAPI';
import { fetchSpecificCityTurfs } from '../../services/operation/TurfDetailsAPI';
import { useSelector, useDispatch } from "react-redux";
import Spinner from './spinner/Spinner';

export default function HomeSearch() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchData, setSearchData] = useState("");

    const [turfs, setTurfs] = useState([]);
    const { name } = useSelector((state) => state.search);
    const [loading, setLoading] = useState(false);
    // const [filterData, setFilterData] = useState([]);
    const handlerCancle = () => {
        dispatch(setShownavbar(true));
        navigate("/");
    }
    useEffect(() => {
        const fetchTurfs = async () => {
            try {
                setLoading(true);
                const data = { cityName: name }
                const result = await fetchSpecificCityTurfs(data);
                console.log("result: ", result);
                setTurfs(result);
                setLoading(false);

            }
            catch (error) {
                console.log(error);
                return;
            }
        }
        fetchTurfs();
    }, []);


    const filteredNames = turfs.filter(name =>
        (name.turfName).toLowerCase().includes(searchData.toLowerCase())
    );

    // console.log(filteredNames);s

    const listHandler = (turfName, id) => {
        console.log(turfName);
        console.log(id);
    }

    return (
        <div>
            {
                loading ? (<><Spinner></Spinner></>) : (<>
                    <div className='flex justify-between w-full items-center bg-neutral-100 sm:p-2 p-5'>
                        <div onClick={handlerCancle}><span className='text-3xl cursor-pointer'> <IoIosArrowBack></IoIosArrowBack>  </span></div>
                        <div className='w-2/3'>
                            <input onChange={(e) => setSearchData(e.target.value)} value={searchData} type="text" placeholder='Search TurfName' className='bg-white p-3 sm:p-1 placeholder:px-2 text-xl outline-0 border w-11/12  border-neutral-100' />
                        </div>
                        <div onClick={handlerCancle}><span className='text-3xl cursor-pointer'><RxCross1></RxCross1></span></div>
                        {
                            searchData &&

                            <div className='absolute top-28 w-full px-2 ml-1 drop-shadow-md shadow-neutral-700'>
                                <ul>
                                    {filteredNames.map((name, index) => (
                                        <Link to={`/turfs/${name._id}`} onClick={() => dispatch(setShownavbar(true))} className='w-full'>

                                            <div className={`${index == 0 ? ('bg-neutral-200') : ('bg-white')} flex w-7/12 md:ml-64 p-2 border-b-2 `}>
                                                <img src={name.image} className='w-[60px] mt-2 h-[60px]' alt="" />
                                                <li onClick={() => listHandler(name.turfName, name._id)} className='p-2 px-4 text-black text-base mt-3 w-full rounded-md cursor-pointer' key={index}>{name.turfName}</li>
                                            </div>
                                        </Link>

                                    ))}
                                </ul>
                            </div>
                        }
                    </div>

                    <div className='p-5 flex gap-2 flex-col justify-center  w-full'>
                        {
                            turfs.map((turf, index) => (
                                <Link to={`/turfs/${turf._id}`} onClick={() => dispatch(setShownavbar(true))} >

                                    <div className=' flex justify-center w-1/4'>
                                        <li className='list-none cursor-pointer'>{turf.turfName}</li>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>

                </>)
            }



        </div>
    )
} 
