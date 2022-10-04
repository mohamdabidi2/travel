import { useEffect, useState } from "react";
import {current_Date} from "../../utils/Services/Time"
import DataTable,{createTheme} from "react-data-table-component";
import { db } from "../../utils/firebase";
import { collection, getDocs } from "firebase/firestore"; 
import "react-data-table-component-extensions/dist/index.css";
import DataTableExtensions from "react-data-table-component-extensions";
import "./caisse.css"
import res from "../database"

const Caisse = () => {
  const [Datestart, setDatestart] = useState("")
  const [Dateend, setDateend] = useState("")
  const [Recette, setRecette] = useState("")
  const [Depense, setDepense] = useState("")
    createTheme('solarized', {
        text: {
          primary: '#000',
          secondary: '#000',
        },
        background: {
          default: '#d7e3ff',
        },
        context: {
          background: '#cb4b16',
          text: '#FFFFFF',
        },
        divider: {
          default: '#073642',
        },
        action: {
          button: 'rgba(0,0,0,.54)',
          hover: 'rgba(0,0,0,.08)',
          disabled: 'rgba(0,0,0,.12)',
        },
      });
    const [data, setData] = useState([])
    const [date, setDate] = useState(current_Date)
    const  caisseColumns = [
        {
            name: "Date",
            selector: "date",
            sortable: true
        },
        {
            name: "N° Recu",
            selector: "Num_cli",
            sortable: true
        },
        {
            name: "Designation",
            selector: "Des",
            sortable: true
        },
        
        {
            name: "Moyen de Paiement",
            selector: "Moy_Paiement",
            sortable: true
        },
        {
          name: "Montant",
          selector: "Montant",
          sortable: true
      },
      {
        name: "Type De paiement",
        selector: "TypeDepaiment",
        sortable: true
    },
        {

          name: "agent",
          selector: "agent",
          sortable: true
      },
      {
        name: "type",
        selector: "type",
        sortable: true
    },
        {
            name: "Remarque",
            selector: "Remarque",
            sortable: true
        }
       ]
       const tableData = {
        caisseColumns,
        data,
      };
    const caisseCollectionRef = collection(db, "caisse");
    useEffect(() => {
        
      res.get("/caisse.json").then((r) => {
        let x = Object.values(r.data)
        setData(x)
        let y=0
        let z=0
        data.map(el=>{
          if(el.type=="revenu"){
            y=y+Number(el.Montant)
          }
          else{
            z=z+Number(el.Montant)
          }
        })
        setDepense(z)
        setRecette(y)
        
    })

    }, [Depense,Recette])
    const setfilter=()=>{
      
      if(Datestart==""||Dateend==""){
        alert('select the two born of date')

      }
      else{
        let x=new Date(Datestart)
let y=new Date(Dateend)

let newdata=data.filter(el=>{
  let dat=el.date.substr(6,4)+'-'+el.date.substr(3,2)+'-'+el.date.substr(0,2)
  let d=new Date(dat)

  return (d>=x && d<=y)
})
setData(newdata)
      }

    }
  const  resetdata=()=>{
      res.get("/caisse.json").then((r) => {
        let x = Object.values(r.data)
        setData(x)
        let y=0
        let z=0
        data.map(el=>{
          if(el.type=="revenu"){
            y=y+Number(el.Montant)
          }
          else{
            z=z+Number(el.Montant)
          }
        })
        setDepense(z)
        setRecette(y)
        
    })
    }
    const PrintSvc=()=>{

    }
    return (   
        <div className="">
<div>
<div>
<input min="1997-01-01" max="2030-12-31" value={Datestart} type="date" onChange={(e)=>setDatestart(e.target.value)}/>
<input min="1997-01-01" max="2030-12-31" value={Dateend} type="date" onChange={(e)=>setDateend(e.target.value)}/>
<button onClick={setfilter}>Apply</button>
<button onClick={resetdata}>Reset</button>
<button onClick={PrintSvc}>Print</button>
</div>
<div>

  <p>Recette :{Recette} </p>
  <p>Depense : {Depense} </p>
  <p>Solde : {Recette-Depense} </p>
</div>
</div>
                <DataTable
         theme="solarized"
                    responsive
                    columns={caisseColumns}
                    data={data}
                    title={`Caisse ${date}`}
                    defaultSortField="date"
                    defaultSortAsc={false}
                    pagination
                    highlightOnHover
                />
    
        </div>
     );
}
 
export default Caisse;