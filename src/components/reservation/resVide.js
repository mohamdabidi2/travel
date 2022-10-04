import MosqueIcon from '@mui/icons-material/Mosque';
import HotelIcon from '@mui/icons-material/Hotel';
import DateRangeIcon from '@mui/icons-material/DateRange';

const Resvide = ({routemanger}) => {
    return ( 
        <div className="reservation-3">
        <p className="reservation-nothing">
<div className="menu-links">
<div onClick={() => { routemanger(3) }} className="menu-item omrabg">
                    <MosqueIcon fontSize="large" className='menu-item-icon' />
                    <p className="menu-item-text">Omraa</p>
                </div>
                <div onClick={() => { routemanger(4) }} className="menu-item Hotbg">
                    <HotelIcon fontSize="large" className='menu-item-icon' />
                    <p className="menu-item-text">Hotellerie</p>
                </div>
                <div onClick={() => { routemanger(5) }} className="menu-item voyorgbg">
                    <DateRangeIcon fontSize="large" className='menu-item-icon' />
                    <p className="menu-item-text">voyage organisé</p>
                </div>
</div>
        </p>
    </div>
     );
}
 
export default Resvide;