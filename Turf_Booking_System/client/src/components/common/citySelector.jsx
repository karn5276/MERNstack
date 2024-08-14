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

const moreCities = [
    "Aalo", "Abohar", "Abu Dhabi", "Abu Road", "Achampet", 
    "Acharapakkam", "Adilabad", "Adimali"
];

const CitySelector = () => {
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
        <>{
            loading ? (<><Spinner></Spinner></>):(<>
            {
                <div className="p-4">
                <h1 className="text-lg font-semibold mb-2">Select your city</h1>
                <div className="mb-4">
                    <form action="" className='relative' onSubmit={searchHandler}>
                    <span className='absolute top-3 left-2 text-xl'><CiSearch className='text-gray-500'></CiSearch></span>
                        <input
                            onChange={(e) => setCity(e.target.value)} 
                            value={city} 
                            name='search'
                            type="text"
                            placeholder="Search for your city"
                            className="w-full pl-8 py-2 border rounded-md"

                        />
                    </form>
                </div>

                {
                    city &&

                    <div className='bg-white h-auto mt-[-10px] w-full drop-shadow-md shadow-neutral-700'>
                        <ul className=' bg-white'>
                            {filteredNames.map((name, index) => (
                                <li onClick={() => listHandler(name)} className='p-2 px-4 text-black text-base w-full rounded-md cursor-pointer' key={index}>{name}</li>
                            ))}
                        </ul>
                    </div>
                }
                
                <div>
                    <h2 className="text-md font-medium mb-2">Popular cities</h2>
                    <div className="grid grid-cols-4 sm:grid-cols-4 gap-2 sm:gap-4">
                        {cities.map((city,index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center p-1 border rounded-md cursor-pointer hover:bg-gray-100"
                                onClick={() => listHandler(city.name)}
                            >
                                <div className="text-xl"><img src={city.image} alt="" /></div>
                                <div className="text-center text-sm mt-2">{city.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-6">
                    <h2 className="text-md font-medium mb-2">More cities</h2>
                    <div className="divide-y divide-gray-200">
                        {data.length === 0 ? (<div>No City Found</div>):(<>
                        {
                            data.map((city, index) => (
                                <div
                                    key={index}
                                    className="py-2 flex justify-between items-center cursor-pointer hover:bg-gray-100"
                                    onClick={() => listHandler(city)}
                                >
                                    <span>{city}</span>
                                    <span className="text-xl">&gt;</span>
                                </div>
                            ))
                        }
                        </>)
                        }
                    </div>
                </div>
            </div>
            }</>)
          }
        </>

    );
};

export default CitySelector;