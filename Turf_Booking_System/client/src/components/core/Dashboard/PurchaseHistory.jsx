import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { getUserTurfs as getUserBuyTurfs } from '../../../services/operation/profileAPI';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import ReviewModal from '../ViewTurf/ReviewModal';
import Spinner from '../../common/spinner/Spinner';

export default function PurchaseHistory() {

  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const [buyTurfs, setBuyTurfs] = useState([]);

  const [turfId,setTurfId]=useState("");

  const [reviewModel , setReviewModal]=useState(false);

  const getBuyTurfs = async () => {
    setLoading(true);
    console.log("token: ",token);
    if(!token){
      return toast.error("Session Expire, Please Login First");
    }
    const response = await getUserBuyTurfs(token);

    if(response.length==0){
      return toast.error("Session Expire, Please Login First");
    }
    console.log("purschase history: ", response);
    setLoading(false);
    setBuyTurfs(response?.history);

  }

  const reviewHandler = (id)=>{
    setReviewModal(true);
    setTurfId(id);

  }

  useEffect(() => {
    getBuyTurfs();
    console.log("buyTurf.length: ",buyTurfs.length);
    
  }, []);

  return (
    <div>
      {
        loading ? (<>
        <Spinner></Spinner></>):(<>
          <div><p className='md:text-3xl font-bold p-2 ml-5 text-2xl md:ml-4 md:p-4'>PurchaseHistory</p></div>

<div>
  {
    !buyTurfs.length ? (<div className='p-3 text-3xl mt-5 text-center'>Empty</div>) : (buyTurfs.map((turf, index) => (
      <div key={index} className='flex p-4 md:mt-4 mt-2 gap-4 flex-wrap border-b-2 border-gray-200'>

        <div className='w-full md:w-[240px]'>
          <img className="md:h-[188px] w-full md:w-[240px] aspect-video rounded-lg object-cover" src={turf.turfId.image}></img>
        </div>

        <div className='gap-y-5 pl-1'>
          <p className='font-bold md:pb-3 md:text-2xl'>{turf.turfId.turfName}</p>
          <p ><span className='font-medium md:text-lg'>Booked at:</span> &nbsp;
            {new Date(turf.turfId?.createdAt || turf.turfId?.updatedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <div className='flex flex-col md:text-lg'>
            <div>
              <span className='font-medium'>Amount: </span> <span>{turf.price}</span>
            </div>
            <div>
              <span className='font-medium'>Time: </span>
              <span>
                {turf.time}
                {
                  (parseInt(turf.time.split(':')[0]) == 10) || (parseInt(turf.time.split(':')[0]) == 11) ? (<span> PM</span>) : (<span> AM</span>)
                }
              </span>
            </div>
          </div>

          <div className='md:mt-4 mt-3'>
            <span className='rounded px-3 py-2 text-white bg-green-500'>
              <button onClick={()=>reviewHandler(turf.turfId._id)}>Rate & Review</button>
            </span>
          </div>

        </div>

      </div>
    )))

  }
</div>
{reviewModel && <ReviewModal setReviewModal={setReviewModal} turfId={turfId}></ReviewModal>}
        </>)
      }

      
    </div>
  )
}
