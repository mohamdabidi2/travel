import { useEffect, useState } from "react";
import { current_Date } from "../utils/Services/Time"
import DataTable, { createTheme } from "react-data-table-component";
import { db } from "../utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import "react-data-table-component-extensions/dist/index.css";
import DataTableExtensions from "react-data-table-component-extensions";
import res from "./database"
import "./caisse.css"
import Edit2 from './Edit2';
const ListOmra = ({routemanger}) => {
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
    const [data, setData] = useState()
    const [date, setDate] = useState(current_Date)
    const caisseColumns = [

        {
            name: "Date",
            selector: "datenow",
            sortable: true
        },
        {
     
            name: "Hotel Makka",
            selector: "HotelMakka",
            sortable: true
        },
        {
            
            name: "Hotel Medina",
            selector: "HotelMedina",
            sortable: true
        },
        {
    
            name: "Mode De Paiment",
            selector: "ModeDePaiment",
            sortable: true
        },
        {
      
            name: "Client",
            selector: "NomCli",
            sortable: true
        },
        {
       
            name: "Pass",
            selector: "Pass",
            sortable: true
        },
        {
         
            name: "Portable",
            selector: "Portablea",
            sortable: true
        },
        {
         
            name: "peixAch",
            selector: "peixAch",
            sortable: true
        },
        {
            
            name: "PrixVente",
            selector: "PrixVente",
            sortable: true
        },
        {
      
            name: "Raba",
            selector: "Raba",
            sortable: true
        },
        {
       
            name: "Type De paiment",
            selector: "TypeDepaiment",
            sortable: true
        },
        {
      
            name: "Type de Chambre",
            selector: "TypedeChambre",
            sortable: true
        },
        {
   
            name: "Visa",
            selector: "Visa",
            sortable: true
        },
        {
            
            name: "Vol",
            selector: "Vol",
            sortable: true
        },

        {
     
            name: "deposit",
            selector: "deposit",
            sortable: true
        },
        {
            name: "Actions",
            cell: (row) =>row.TypeDepaiment==="Par Tranche"? <Edit2 routemanger={routemanger} id={row.id} row={row}  mtr={row.deposit}/>:<></>
          }
    
    ]

    const caisseCollectionRef = collection(db, "caisse");
    useEffect(() => {
        res.get("/omraaRegueb.json").then((r) => {
            let x = Object.values(r.data)
            let y=Object.keys(r.data)
            let z=x.map((el,i)=>{return{...el,id:y[i]}})
            console.log(z)
            if(localStorage.getItem('rank')==="1"){
                setData(z)
              }
              else{
                setData(z.filter(el=>el.agent===localStorage.getItem('agent')))
              }
        })


    }, [])

    return (
        <div className="">

            <DataTable
                theme="solarized"
                responsive
                columns={caisseColumns}
                data={data}
                title={`Liste des réservation Omraa `}
                defaultSortField="date"
                defaultSortAsc={false}
                pagination
                highlightOnHover
            />

        </div>
    );
}

export default ListOmra;