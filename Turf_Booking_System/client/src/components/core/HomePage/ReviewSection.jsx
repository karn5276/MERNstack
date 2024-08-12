import {React,useState,useEffect} from 'react';
import Slider from "../../common/Slider";
import { ratingsEndpoints } from '../../../services/apis';
import { apiConnector } from '../../../services/apiConnector';
import RatingStars from '../../common/RatingStars';
import { useSelector } from 'react-redux';
import Spinner from '../../common/spinner/Spinner';
export default function ReviewSection() {

    const [Reviews, setReviews] = useState([]);
    const [Loading, setLoading] = useState(true);
    const [isdata,setIsdata]=useState(false);
    const {name}=useSelector((state)=>state.search);

    useEffect(() => {
        const getReviews = async () => {
            setLoading(true);
            
            try {
                const res = await apiConnector("GET",ratingsEndpoints.REVIEWS_DETAILS_API);
                const turfs = res.data.data;

                const data = turfs.filter(turf=>turf.city === name );
                console.log("data: ",turfs);
                if(turfs.length>0){
                    setIsdata(true);
                }
                setReviews(res.data.data);
                console.log("LOGGING REVIEWS",res);
            } catch (error) {
                console.log("LOGGING Review ERROR",error);
            } finally {
                setLoading(false);
            }
        }
        getReviews();
    }, [])
    
    return (
        <div>
            {
                Loading ? (<><Spinner></Spinner></>):(
                <div className='pt-5'>
                    <div className='w-full border border-t-2 mb-3 flex align-middle items-center justify-center' >
                        <p className='md:text-[2rem] font-bold mx-1 pb-1 underline underline-offset-4'>Customers Review</p>
                    </div>
                    <div>
                        {
                            isdata? (<div><Slider Courses={Reviews}></Slider></div>):(<div></div>)
                        }
                    </div>
                </div>
            )
            }
            
        </div>
    )
}
