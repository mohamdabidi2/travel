import OutlinedInput from '@mui/material/OutlinedInput';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import ReservationTypeA from './createNew';
import "./res.css"
import Resvide from './resVide';
import SearchReservation from './searchforReservation';
import ReservationHotel from './resHotel';
import { useState } from 'react';
import VoyageOrganisee from './voyageOrganise';
import Omraa from './omraa';
const Reservation = ({routemanger}) => {
const [SearchBarEtat, setSearchBarEtat] = useState(false)
const [currentView, setCurrentView] = useState(0)
const hundelchangeEtat=(a)=>{
setSearchBarEtat(a)

}
const hundelCurrentview=(e)=>{
    setCurrentView(e)
}
let views=[<Resvide routemanger={routemanger}/>,<SearchReservation/> ,<ReservationHotel routemanger={routemanger} hundelchangeEtat={hundelchangeEtat}  hundelCurrentview={hundelCurrentview}/>,<VoyageOrganisee routemanger={routemanger}  hundelchangeEtat={hundelchangeEtat} hundelCurrentview={hundelCurrentview}/>,<Omraa routemanger={routemanger}  hundelchangeEtat={hundelchangeEtat} hundelCurrentview={hundelCurrentview}/>]

    return (
        <div className="caisse-container">
            <div className='reservation-container'>
                <div className="menu-reservation">
                    <p className="reservationkey">Reservation</p>
                </div>
                <div className="reser-2">
                   <div style={{display:"flex",justifyContent:"center"}} className="centerflex">
                    <ReservationTypeA hundelCurrentview={hundelCurrentview} hundelchangeEtat={hundelchangeEtat}/>
                    </div>
                </div>
                
       {views[currentView]}
          
            </div>
        </div>
    );
}

export default Reservation;