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
    const {name}=useSelector((state)=>state.search);

    useEffect(() => {
        const getReviews = async () => {
            setLoading(true);
            
            try {
                const res = await apiConnector("GET",ratingsEndpoints.REVIEWS_DETAILS_API);
                const turfs = res.data.data

                const data = turfs.filter(turf=>turf.city === name );
                console.log("data: ",turfs);
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
                Loading ? (<><Spinner></Spinner></>):(<div>
                    <Slider Courses={Reviews}></Slider>
                </div>)
            }
            
        </div>
    )
}
