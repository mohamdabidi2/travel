import { useState } from 'react';

const SearchReservation = () => {
   const [Reservations, setReservations] = useState(['hello'])
    return ( 
        <div>
{Reservations.map(el=>el)}
        </div>
     );
}
 
export default SearchReservation;