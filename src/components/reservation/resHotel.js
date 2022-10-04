
import { Verified } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alertpop from '../alertmessage';
import res from "../database"

const ReservationHotel = ({hundelchangeEtat,hundelCurrentview,routemanger}) => {
    let navigate = useNavigate();
    const [datenow, setDatenow] = useState(null)
    const [premiertranche, setPremiertranche] = useState(false)
    const [NomCli, setNomCli] = useState('')
    const [NomHotel, setNomHotel] = useState("")
    const [dateEntree, setDateEntree] = useState("")
    const [Datesortie, setDatesortie] = useState("")
    const [nnuitees, setNnuitees] = useState(1)
    const [peixAch, setPeixAch] = useState(0)
    const [PrixVente, setPrixVente] = useState(0)
    const [TypeDepaiment, setTypeDepaiment] = useState("")
    const [ModeDePaiment, setModeDePaiment] = useState("")
    const [alertmsg, setAlertmsg] = useState("")
    const [alertetat, setAlertetat] = useState(false)
    const [PremTranche, setPremTranche] = useState(0)
const [Remarque, setRemarque] = useState("pas de remarque")
    
    useEffect(() => {
        setDatenow((new Date()).toLocaleDateString('en-GB'))

    }, [])
 const  openalert=(e)=>{
    setAlertetat(true)
    setAlertmsg(e)
    setTimeout(() => {
        setAlertetat(false)
            
        }, 3000);
    }
const verif=()=>{
if(NomCli.length<2){
openalert("nom de client est obligatoire")
return false
}
if(NomHotel.length<2){
openalert("nom de l'hotel est obligatoire")
return false
}

if(dateEntree==""||Datesortie==""){
openalert("verifier la date d'entree et la date de sortie")
return false
}
if(Number(PrixVente)<Number(peixAch)){
openalert("verifier le prix de vente")
return false
}
if(TypeDepaiment=='Par Tranche'){
if(PremTranche<=0 && PremTranche<PrixVente){
    openalert("verifier la valeur de premier tranche")
    return false
}
}
if(ModeDePaiment==""){
    openalert("choisir un mode de paiment")
    return false
    }

}
const sendtodatabase=()=>{
    if(verif()==false){
return ;
    }
    else{
        let d =new Date()
        res.post('/logsRegueb.json',{log:d.toLocaleString()+" : "+localStorage.getItem('agent')+" passé une réservation D'hotel Pour le client : "+NomCli})
        res.post("/caisseRegueb.json",{Num_cli:Math.round(Math.random()*100)*1985,date:datenow,agent:localStorage.getItem('agent'),Des:NomCli,TypeDepaiment,Moy_Paiement:ModeDePaiment,Montant:premiertranche?PremTranche:PrixVente,Remarque,type:"revenu"})
        res.post("/hotelsRegueb.json",{date:datenow,agent:localStorage.getItem('agent'),NomCli,NomHotel,dateEntree,Datesortie,nnuitees,prixAch:peixAch,PrixVente,TypeDepaiment,ModeDePaiment,deposit:premiertranche?PremTranche:PrixVente,Remarque})
        routemanger(0)
    }
     
}
    return (
        <div className="reservation-hotel-container-box">
            <div className="reservation-hotel-container">
                <h1>Création de nouvelle réservation hôtel</h1>
                <div>
                    <label className="label-for-inputdesign" htmlFor="">Date :</label><br />
                    <input disabled value={datenow} className="inputdesign disableddate" placeholder="n" type="text" />
                </div>
                <div className="groupinpiut">
                    <div>
                        <label className="label-for-inputdesign" htmlFor="">Nom de client :</label><br />
                        <input type="text" className="inputdesign nomcli" onChange={(e)=>setNomCli(e.target.value)} placeholder="Entrer le nom de client" />
                    </div>
                    <div>
                        <label className="label-for-inputdesign" htmlFor="">Nom d'hotel :</label><br />
                        <input type="text"  onChange={(e)=>setNomHotel(e.target.value)} className="inputdesign  nomhotel" placeholder="Entrer le nom d'hotel" />
                    </div>
                </div>
                <div className="groupinpiut">
                    <div>
                        <label className="label-for-inputdesign" htmlFor="">Date d'entrée :</label><br />
                        <input  onChange={(e)=>setDateEntree(e.target.value)} type="date" className="inputdesign date-ent-sort" />
                    </div>
                    <div>
                        <label className="label-for-inputdesign" htmlFor="">Date de sortie  :</label><br />
                        <input  onChange={(e)=>setDatesortie(e.target.value)} type="date" className="inputdesign  date-ent-sort" />
                    </div>
                    <div>
                        <label className="label-for-inputdesign" htmlFor="">Nombre des nuitées :</label><br />
                        <input  onChange={(e)=>setNnuitees(e.target.value)} type="number" className="inputdesign nbrnuit" defaultValue={1} />
                    </div>
                </div>
                <div className="groupinpiut">
                    <div>
                        <label className="label-for-inputdesign" htmlFor="">Prix d'achat :</label><br />
                        <input  onChange={(e)=>setPeixAch(e.target.value)} type="number" className="inputdesign prix-dachat" />
                    </div>
                    <div>
                        <label className="label-for-inputdesign" htmlFor="">Prix de vente :</label><br />
                        <input  onChange={(e)=>setPrixVente(e.target.value)} type="number" className="inputdesign  prix-dachat" />
                    </div>
                </div>
                <div className="groupinpiut">
                    <div className="group-inside">
                        <div className="radiobtnwithkeys"> <input value={"Montant Total"} onClick={(e) => {
                            setTypeDepaiment(e.target.value)
                            setPremiertranche(false)}} type="radio" name="f1" className="inputdesign1" /> <p className="key-radio-label">Montant Total</p></div>
                        <br />
                        <div className="radiobtnwithkeys" >  <input onClick={(e) =>{setTypeDepaiment(e.target.value); setPremiertranche(true)}} value={"Par Tranche"} type="radio" name="f1" className="inputdesign1" /> <p className="key-radio-label">Par Tranche</p></div>
                        <br />
                        {premiertranche ? <input  onChange={(e)=>setPremTranche(e.target.value)}  type="number" className="inputdesign  nbrnuit" placeholder='Première tranche' /> : <></>}

                    </div>
                    {alertetat?<Alertpop  alertmsg={alertmsg}/>:<></>} 
                    <div className="">
                        <label className="label-for-inputdesign" htmlFor="">Mode de paiment :</label><br />
                        <select className="inputdesign selectpaiment" onChange={(e)=>setModeDePaiment(e.target.value)} name="" id="">
                            <option disabled selected value="">choisi un mode de paiement</option>
                            <option value="Chèque">Chèque</option>
                            <option value="Espèce">Espèce</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label className="label-for-inputdesign" htmlFor="">Remarque :</label><br />
                    <input  onChange={(e)=>setRemarque(e.target.value)} type="text" className="inputdesign  disableddate" />
                </div>

                <div className="btns-res">
                    <button className="btn-ce" onClick={sendtodatabase}>Passer une réservation</button>
                    <button className="btn-ce"  onClick={()=>{hundelchangeEtat(false);hundelCurrentview(0)}}>Annuler</button></div>
            </div>
            <div>
            </div>

            
        </div>
    );
}

export default ReservationHotel;