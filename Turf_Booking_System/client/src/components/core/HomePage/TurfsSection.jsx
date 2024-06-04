import React, { useEffect, useState } from 'react'
import { fetchSpecificCityTurfs } from '../../../services/operation/TurfDetailsAPI'
import homesectionImage from "../../../assets/images/homesectionImage.jpeg"
import { useSelector } from 'react-redux'
import TurfCard from './TurfCard';

export default function TurfsSection() {

    const {name}=useSelector((state)=>state.search);
    const [turfs,setTurfs]=useState([]);
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
        <div className='p-2 w-11/12 h-auto mt-2  m-auto'>
            <p className='text-3xl text-black px-2 font-bold'>Recommended Turfs</p>
        </div>
        <div className='md:p-2 md:w-11/12 w-full m-auto  mt-2 flex flex-wrap' >
            {
                turfs?.length&& (
                    turfs.map((turf,index)=>(
                    <>
                        
                        <TurfCard key={index} turf={turf} Height={"lg:h-[250px] h-[100px]"}></TurfCard>
                        {
                            index==3 && (
                                <div className='w-full hidden md:block h-40 mb-5 relative rounded-3xl'>
                                    <img className='w-full h-full rounded-2xl' src={homesectionImage}></img>
                                    <p className='text-yellow-500 text-7xl left-7 absolute top-5'>Book<br></br>   <span className='ml-28'>Now</span></p>
                                    <p className='absolute top-6 right-20 text-white text-5xl'>Continuous sports enjoyment, available <br></br>anytime, anywhere</p>
                                </div>
                            )
                        }
                    </>
                        
                    ))

                )
                
            }
        </div>
    </div>
  )
}
