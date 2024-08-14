import { React, useEffect, useState } from 'react'
import IconBtn from './IconBtn'
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { setShow, setName } from '../../slices/searchSlice';
import { cities } from '../../data/cities';
import { TiDeleteOutline } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import { fetchAllCities } from '../../services/operation/TurfDetailsAPI';
import Spinner from './spinner/Spinner';

const Modal = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { show } = useSelector((state) => state.search);
    const [city, setCity] = useState("");
    const [view, setView] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setloading] = useState(false);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                setloading(true);
                const result = await fetchAllCities();
                console.log("result in modal: ", result);

                setData(result);
                setloading(false);

            }
            catch (error) {
                console.log(error.message);
                return;
            }
        }
        fetchCities();
    }, [])

    const filteredNames = data.filter(name =>
        name.toLowerCase().includes(city.toLowerCase())

    );
    const searchHandler = (e) => {
        e.preventDefault();
        console.log(city);
        console.log(filteredNames);
    }

    const listHandler = (name) => {
        dispatch(setName(name));
        navigate("/");
    }
    return (
        <>
            {
                loading ? (
                    <div>
                        <Spinner></Spinner> </div>) :
                    (<>  {show &&

                        <div className='md:block'>
                            <div className='w-11/12 max-w-[1150px] max-h-[800px] rounded-lg border border-richblack-400 bg-white p-6 z-50 fixed left-[50%] top-[40%] -translate-x-1/2 -translate-y-1/2'>
                                <div className='relative w-full'>
                                    <form action="" onSubmit={searchHandler}>
                                        <input onChange={(e) => setCity(e.target.value)} value={city} name='search' type="text" className='pl-10 text-lg border-gray-500 border py-3 w-full placeholder:text-xl' placeholder='Search for your city' />
                                    </form>
                                    <span className='absolute top-5 left-2 text-xl'><CiSearch className='text-gray-500'></CiSearch></span>
                                </div>

                                {
                                    city &&

                                    <div className='bg-white h-auto w-full drop-shadow-md shadow-neutral-700'>
                                        <ul className=' bg-white'>
                                            {filteredNames.map((name, index) => (
                                                <li onClick={() => listHandler(name)} className='p-2 px-4 text-black text-base w-full rounded-md cursor-pointer' key={index}>{name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                }

                                <div className='pt-2 flex justify-center items-center mb-5 flex-col'>
                                    <p className='p-3 text-xl'>Popular Cities</p>
                                    <div className='flex gap-x-10 flex-wrap cursor-pointer hover:text-black'>
                                        {
                                            cities.map((city, index) => (

                                                <div onClick={() => listHandler(city.name)} key={index} className='flex flex-wrap bg-cover bg-center h-32 flex-col justify-center z-10 items-center hover:text-black'>
                                                    <img className='hover:text-black' src={city.image} alt="" />
                                                    <p className='text-gray-400 font-bold hover:text-black'>{city.name}</p>
                                                </div>
                                            ))

                                        }

                                    </div>
                                </div>

                                <div className='flex justify-center absolute bottom-0 w-11/12 items-center h-auto'>
                                    {
                                        view ? (<p className='text-green-500 text-xl py-2 cursor-pointer' onClick={() => setView(false)}>Hide All Cities</p>) : (<p onClick={() => setView(true)} className='text-green-500 py-2 text-xl cursor-pointer'>View All Cities</p>)

                                    }
                                </div>

                                {
                                    view &&
                                    <div className='py-4'>
                                        <div className='flex justify-center items-center py-3 text-xl'>
                                            <p>Other Cities</p>
                                        </div>
                                        {
                                            data.length === 0 ? (<div>No City Found</div>) : (<div className='text-gray-500 flex flex-wrap px-5 gap-x-44 gap-y-1'>
                                                {
                                                    data.map((city, index) => (
                                                        <p key={index} className='hover:text-green-500 cursor-pointer' onClick={() => listHandler(city)}>{city}</p>
                                                    ))

                                                }
                                            </div>)
                                        }

                                    </div>

                                }
                                <div className='absolute top-[-10px] right-2'>

                                    <button id='cancle' className='text-2xl' onClick={() => dispatch(setShow(false), navigate("/"))}>
                                        <TiDeleteOutline></TiDeleteOutline>
                                    </button>
                                </div>
                            </div>

                            <div className='fixed inset-0 z-10 !mt-0 grid place-items-center overflow-auto bg-black bg-opacity-10 backdrop-blur-sm over'></div>

                        </div>
                    }
                    </>)
            }


        </>

    )
}

export default Modal