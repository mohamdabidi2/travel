import { useEffect, useState } from 'react';
import Alertpop from '../alertmessage';
import res from "../database"
const Omraa = ({ hundelchangeEtat, hundelCurrentview,routemanger }) => {
    const [datenow, setDatenow] = useState("")
    const [premiertranche, setPremiertranche] = useState(false)
    const [NomCli, setNomCli] = useState('')
    const [peixAch, setPeixAch] = useState(0)
    const [PrixVente, setPrixVente] = useState(0)
    const [TypeDepaiment, setTypeDepaiment] = useState("")
    const [ModeDePaiment, setModeDePaiment] = useState("")
    const [alertmsg, setAlertmsg] = useState("")
    const [alertetat, setAlertetat] = useState(false)
    const [PremTranche, setPremTranche] = useState(0)
    const [Vol, setVol] = useState("")
    const [Visa, setVisa] = useState("")
    const [Pass, setPass] = useState('')
    const [Raba, setRaba] = useState('')
    const [HotelMakka, setHotelMakka] = useState("")
    const [HotelMedina, setHotelMedina] = useState("")
    const [Portablea, setPortablea] = useState('')
    const [TypedeChambre, setTypedeChambre] = useState("")
    const [Remarque, setRemarque] = useState("pas de remarque")

    useEffect(() => {
       

    }, [])
    const openalert = (e) => {
        setAlertetat(true)
        setAlertmsg(e)
        setTimeout(() => {
            setAlertetat(false)

        }, 3000);
    }
    const verif = () => {
        if (datenow.length < 2) {
            openalert("date de vol est obligatoire")
            return false
        }
        if (NomCli.length < 2) {
            openalert("nom de client est obligatoire")
            return false
        }
        if (Vol==="") {
            openalert("verifier le champ de vol")
            return false
        }

        if (Number(PrixVente) < Number(peixAch)) {
            openalert("verifier le prix de vente")
            return false
        }
        if (TypeDepaiment == 'Par Tranche') {
            if (PremTranche <= 0) {
                openalert("verifier la valeur de premier tranche")
                return false
            }
        }
        if (ModeDePaiment === "") {
            openalert("choisir un mode de paiment")
            return false
        }
        if (Visa === "") {
            openalert("verifier le champ visa")
            return false
        }
        if (Pass == "") {
            openalert("verifier le champ Pass")
            return false
        }
        if (Raba === "") {
            openalert("verifier le champ Raba")
            return false
        }
        if (HotelMakka === "") {
            openalert("verifier le champ Hotel Makka")
            return false
        }
        if (HotelMedina === "") {
            openalert("verifier le champ Hotel Medina")
            return false
        }
        if (Portablea === "") {
            openalert("verifier le champ Portable")
            return false
        }
        if (TypedeChambre === "") {
            openalert("verifier le champ Type de Chambre")
            return false
        }

    }
    const sendtodatabase = () => {
        if(verif()==false){
            return ;
                }
                else{
        let date=(new Date()).toLocaleDateString('en-GB')
        let d =new Date()
        res.post('/logsRegueb.json',{log:d.toLocaleString()+" : "+localStorage.getItem('agent')+" passé une réservation Omraa Pour le client : "+NomCli})
        res.post('/caisseRegueb.json',{Num_cli:Math.round(Math.random()*100)*1985,date:date,agent:localStorage.getItem('agent'),Des:NomCli,TypeDepaiment,Moy_Paiement:ModeDePaiment,Montant:premiertranche?PremTranche:PrixVente,Remarque,type:"revenu"})
        res.post('/omraaRegueb.json',{agent:localStorage.getItem('agent'),datenow,NomCli,Vol,PrixVente,peixAch,TypeDepaiment,ModeDePaiment,Visa,Pass,Raba,HotelMakka,HotelMedina,Portablea,TypedeChambre,deposit:premiertranche?PremTranche:PrixVente})
        routemanger(0)
    }}
    return (
        <div className="reservation-hotel-container-box">
            <div className="reservation-hotel-container">
                <h1>Création de nouvelle réservation Omraa</h1>

              
                <div>
                        <label className="label-for-inputdesign" htmlFor="">Date :</label><br />
                        <input type="date" className="inputdesign disableddate" onChange={(e) => {setDatenow(e.target.value)}} placeholder="Entrer le pass" />
                    </div>
                    <div>
                        <label className="label-for-inputdesign" htmlFor="">Pass :</label><br />
                        <input type="text" className="inputdesign disableddate" onChange={(e) => {setPass(e.target.value)}} placeholder="Entrer le pass" />
                    </div>
                    <div>
                        <label className="label-for-inputdesign" htmlFor="">Nom de client :</label><br />
                        <input type="text" className="inputdesign disableddate" onChange={(e) => setNomCli(e.target.value)} placeholder="Entrer le nom de client" />
                    </div>
                    <div>
                        <label className="label-for-inputdesign" htmlFor="">Portable :</label><br />
                        <input type="number" onChange={(e) => setPortablea(e.target.value)} className="inputdesign  disableddate" placeholder="Entrer le numero de telephone portable" />
                    </div>
           

                <div>
                    <label className="label-for-inputdesign" htmlFor="">Raba/Agen :</label><br />
                    <input onChange={(e) => setRaba(e.target.value)} type="text" className="inputdesign disableddate" />
                </div>
                <h3 className="tileomra">Pack Omra</h3>
                <div>
                    <label className="label-for-inputdesign" htmlFor="">Visa :</label><br />
                    <div className="groupinpiut">
                        <div className="radiobtnwithkeys">
                            <input value={"Oui"} onClick={(e) => {setVisa(e.target.value) }} type="radio" name="f1" className="inputdesign1" />
                            <p className="key-radio-label">Oui</p></div>

                        <div className="radiobtnwithkeys" >
                            <input  onClick={(e) => {setVisa(e.target.value) }} value={"Non"} type="radio" name="f1" className="inputdesign1" />
                            <p className="key-radio-label">Non</p></div>
                    </div>
                    <label className="label-for-inputdesign" htmlFor="">Vol :</label><br />

                    <div className="groupinpiut">
                        <div className="radiobtnwithkeys">
                            <input value={"Oui"} onClick={(e) => {setVol(e.target.value) }} type="radio" name="f2" className="inputdesign1" />
                            <p className="key-radio-label">Oui</p></div>

                        <div className="radiobtnwithkeys" >
                            <input onClick={(e) => {setVol(e.target.value) }} value={"Non"} type="radio" name="f2" className="inputdesign1" />
                            <p className="key-radio-label">Non</p></div>
                    </div>                    


                </div>
                <div >
                    <label className="label-for-inputdesign" htmlFor="">Hotel Medina :</label><br />
                    <input onChange={(e) => {setHotelMedina(e.target.value)}} type="text" className="inputdesign disableddate" />
                </div>
                <div>
                    <label className="label-for-inputdesign" htmlFor="">Hotel Makka :</label><br />
                    <input onChange={(e) => {setHotelMakka(e.target.value)}} type="text" className="inputdesign disableddate" />
                </div>
                <div>
                    <label className="label-for-inputdesign" htmlFor="">Type de Chambre :</label><br />
                    <input onChange={(e) => {setTypedeChambre(e.target.value)}} type="text" className="inputdesign disableddate" />
                </div>
                <h3  className="tileomra">Rembourcement</h3>
                <div className="groupinpiut">
                    <div>
                        <label className="label-for-inputdesign" htmlFor="">Prix d'achat :</label><br />
                        <input onChange={(e) => setPeixAch(e.target.value)} type="number" className="inputdesign prix-dachat" />
                    </div>
                    <div>
                        <label className="label-for-inputdesign" htmlFor="">Prix de vente :</label><br />
                        <input onChange={(e) => setPrixVente(e.target.value)} type="number" className="inputdesign  prix-dachat" />
                    </div>
                </div>
                <div className="groupinpiut">
                    <div className="group-inside">
                        <div className="radiobtnwithkeys"> <input value={"Montant Total"} onClick={(e) => {
                            setTypeDepaiment(e.target.value)
                            setPremiertranche(false)
                        }} type="radio" name="f3" className="inputdesign1" /> <p className="key-radio-label">Montant Total</p></div>
                        <br />
                        <div className="radiobtnwithkeys" >  <input onClick={(e) => { setTypeDepaiment(e.target.value); setPremiertranche(true) }} value={"Par Tranche"} type="radio" name="f3" className="inputdesign1" /> <p className="key-radio-label">Par Tranche</p></div>
                        <br />
                        {premiertranche ? <input onChange={(e) => setPremTranche(e.target.value)} type="number" className="inputdesign  nbrnuit" placeholder='Première tranche' /> : <></>}

                    </div>
                    {alertetat ? <Alertpop alertmsg={alertmsg} /> : <></>}
                    <div className="">
                        <label className="label-for-inputdesign" htmlFor="">Mode de paiment :</label><br />
                        <select className="inputdesign selectpaiment" onChange={(e) => setModeDePaiment(e.target.value)} name="" id="">
                            <option disabled selected value="">choisi un mode de paiement</option>
                            <option value="Chèque">Chèque</option>
                            <option value="Espèce">Espèce</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label className="label-for-inputdesign" htmlFor="">Remarque :</label><br />
                    <input onChange={(e) => setRemarque(e.target.value)} type="text" className="inputdesign  disableddate" />
                </div>

                <div className="btns-res">
                    <button className="btn-ce" onClick={sendtodatabase}>Passer une réservation</button>
                    <button className="btn-ce" onClick={() => { hundelchangeEtat(false); hundelCurrentview(0) }}>Annuler</button></div>
            </div>
            <div>
            </div>


        </div>
    );
}

export default Omraa;