import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import LockIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import './home.css'
import { useEffect, useState } from 'react';
import Accuiel from './accueil';
import { ctime } from "../utils/Services/Time"
import Caisse from './caisse/caisse';
import Reservation from './reservation/reservation';
import Hotellerie from './hotellerie';
import ListOmra from './listeOmraa';
import ListVoyage from './listedevoyageorganisee';
import Logs from './logs';
import Caiss from './caisse/c';
const Home = () => {
    const [currentTiket, setCurrentTiket] = useState(0)
    const routemanger = (e) => {
        setCurrentTiket(e)
        console.log(e)
    }
    const [time, setTime] = useState(ctime)
    const [pages, setPages] = useState([<Accuiel routemanger={routemanger} />, <div className="caisse-container">
        <Caiss />
    </div>,<Reservation routemanger={routemanger}/>,<div className="caisse-container"><ListOmra routemanger={routemanger}/></div>,<div className="caisse-container"><Hotellerie routemanger={routemanger}/></div>,<div className="caisse-container"><ListVoyage routemanger={routemanger}/></div>,<div className="caisse-container"><Logs/></div>])
   
    useEffect(() => {
        setInterval(() => {
            setTime(ctime)
        }, 1000);
    }, [])
    let navigate = useNavigate();
    return (

        <div className='homepage'>
            <div className="parthome">
                <p className="time">{time}</p>
                <div className="parthome-level1">
                    <img src="https://cdn-icons-png.flaticon.com/128/236/236832.png" alt="" className="profile-pic" />
                    <p className="agent-name">{localStorage.getItem('agent')}</p>
                </div>
                <div className="parthome-level2">
                    <div  onClick={()=>{routemanger(0)}} className="links"><HomeIcon className="links-icon-mdd" /><p className='link-cont'  > Accueil</p></div>
                    <div className="links"><SettingsIcon className="links-icon-mdd" /><p className='link-cont'> Réglages</p></div>
                    <div className="links"><LockIcon className="links-icon-mdd" /><p className='link-cont'> Sécurité</p></div>
                </div>
                <div onClick={()=>{localStorage.setItem("agent","");navigate('/')}}  className="links logout"><LogoutIcon className="links-icon-mdd" /><p className='link-cont'>Déconnexion</p></div>
            </div>


            {pages[currentTiket]}
        </div>
    );
}

export default Home