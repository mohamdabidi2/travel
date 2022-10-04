import { useEffect, useState } from "react";
import { current_Date } from "../utils/Services/Time"
import DataTable, { createTheme } from "react-data-table-component";
import { db } from "../utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import "react-data-table-component-extensions/dist/index.css";
import DataTableExtensions from "react-data-table-component-extensions";
import res from "./database"
import "./caisse.css"
import Edit3 from "./Edit3";
const ListVoyage = ({routemanger}) => {
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
            selector: "date",
            sortable: true
        },
        {

            name: "Client",
            selector: "NomCli",
            sortable: true
        },
        {

            name: "destination",
            selector: "destination",
            sortable: true
        },
        {

            name: "agent",
            selector: "agent",
            sortable: true
        }, 
         {

            name: "date Entree",
            selector: "dateEntree",
            sortable: true
        },
        {

            name: "Date sortie",
            selector: "Datesortie",
            sortable: true
        },
        {

            name: "prix d'ach",
            selector: "prixAch",
            sortable: true
        },
        {

            name: "Prix Vente",
            selector: "PrixVente",
            sortable: true
        },

      
        {

            name: "Deposit",
            selector: "deposit",
            sortable: true
        },
        {

            name: "Type De Paiment",
            selector: "TypeDepaiment",
            sortable: true
        },
        {

            name: "Mode De Paiment",
            selector: "ModeDePaiment",
            sortable: true
        },
        {
            name: "Actions",
            cell: (row) =>row.TypeDepaiment==="Par Tranche"? <Edit3 routemanger={routemanger} id={row.id} row={row}  mtr={row.deposit}/>:<></>
          }

    ]

    const caisseCollectionRef = collection(db, "caisse");
    useEffect(() => {
        res.get("/voyageorgRegueb.json").then((r) => {
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
                title={`Liste des réservation des Voyages organisés `}
                defaultSortField="date"
                defaultSortAsc={false}
                pagination
                highlightOnHover
            />

        </div>
    );
}

export default ListVoyage;