import React, { useEffect, useState } from 'react'
import { fetchSpecificCityTurfs } from '../../../services/operation/TurfDetailsAPI'
import homesectionImage from "../../../assets/images/homesectionImage.jpeg"
import { useSelector,useDispatch } from 'react-redux'
import TurfCard from './TurfCard';
import { CiLocationOn } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { setShow } from '../../../slices/searchSlice';
import CitySelector from '../../common/citySelector';



export default function TurfsSection() {

    const {name}=useSelector((state)=>state.search);
    const [turfs,setTurfs]=useState([]);
    const dispatch = useDispatch();
  useEffect(()=>{
    const fetchTurfs = async()=>{
        try{
            const data = {cityName:name}
            const result = await fetchSpecificCityTurfs(data);
            setTurfs(result);

        }
        catch(error){
            console.log(error);
            return;
        }
    }
    fetchTurfs();
  },[])
  return (
    <div className='mt-3'>
        <div className='flex justify-end sm:hidden'>
            <Link to='/searchCity' className='text-blue-600 flex gap-1 items-center pr-2' >

                <span><CiLocationOn className='text-2xl'></CiLocationOn></span>
                <p className='underline text-xl'>{name}</p>

            </Link>
        </div>
        <div className='p-2 w-11/12 h-auto mt-2  m-auto'>
            <p className='text-3xl text-black px-2 font-bold'>Recommended Turfs</p>
        </div>
        <div className='md:p-2 md:w-11/12 w-full m-auto  mt-2 flex flex-wrap' >
            {
                turfs?.length? (
                    turfs.map((turf,index)=>(
                    <>
                        
                        <TurfCard key={index} turf={turf} Height={"lg:h-[250px] h-[100px]"}></TurfCard>
                        {
                            index===3 && (
                                <div className='w-full hidden md:block h-40 mb-5 relative rounded-3xl'>
                                    <img className='w-full h-full rounded-2xl' src={homesectionImage} alt=''></img>
                                    <p className='text-yellow-500 text-7xl left-7 absolute top-5'>Book<br></br>   <span className='ml-28'>Now</span></p>
                                    <p className='absolute top-6 right-20 text-white text-5xl'>Continuous sports enjoyment, available <br></br>anytime, anywhere</p>
                                </div>
                            )
                        }
                    </>
                        
                    ))

                ):(<div className="bg-white m-auto p-6 rounded-lg shadow-md max-w-lg w-full text-center">
                    <h2 className="text-2xl font-bold mb-4">Turf Not Available</h2>
                    <p className="text-gray-700 mb-4">Sorry, we couldn't find the Turf you're looking for.</p>
                    <img
                      src="https://via.placeholder.com/300?text=No+Data+Available"
                      alt="No Data Available"
                      className="w-full h-auto object-cover rounded-md"
                    />
                  </div>)
                
            }
        </div>
    </div>
  )
}
