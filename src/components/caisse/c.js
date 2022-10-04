import React, { useCallback, useMemo, useEffect, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import './caisse.css'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import res from "../database"
import { useReactToPrint } from 'react-to-print';

const Caiss = () => {
  const [Datestart, setDatestart] = useState("")
  const [Dateend, setDateend] = useState("")
  const [Recette, setRecette] = useState("")
  const [agents, setAgents] = useState([])
  const [Depense, setDepense] = useState("")
  const [agent, setAgent] = useState("Total")
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '80vh', width: '80vw' }), []);
  const defaultColDef = useMemo(() => {
    return {
      width: 100,
    };
  }, []);
  const componentRef = useRef()
  const handlePrint = useReactToPrint({

    content: () => componentRef.current,
  });
  const onBtPrinterFriendly = useCallback(() => {
    handlePrint()
  }, []);



  const [rowData, setRowData] = useState([]);

  const [columnDefs] = useState([
    { field: 'date', resizable: true, width: 120 },
    { field: 'Num_cli', resizable: true, width: 150 },
    { field: 'Des', resizable: true, width: 150 },
    { field: 'Moy_Paiement', resizable: true, width: 100 },
    { field: 'Montant', resizable: true, width: 100 },
    { field: 'TypeDepaiment', resizable: true, width: 150 },
    { field: 'agent', resizable: true, width: 150 },
    { field: 'type', resizable: true, width: 100 },
    { field: 'Remarque', resizable: true, suppressSizeToFit: true, width: 200 }

  ])
  const calculRes = (d) => {
    let y = 0
    let z = 0
    d.map(el => {
      if (el.type == "revenu") {
        y = y + Number(el.Montant)
      }
      else {
        z = z + Number(el.Montant)
      }
    })
    return {z,y}
  
  }
  const setfilter = () => {


    if (Datestart == "" || Dateend == "") {
      alert('select the two born of date')

    }
    else {
      let x = new Date(Datestart)
      let y = new Date(Dateend)

      let newdata = rowData.filter(el => {
        let dat = el.date.substr(6, 4) + '-' + el.date.substr(3, 2) + '-' + el.date.substr(0, 2)
        let d = new Date(dat)

        return (d >= x && d <= y)
      })
      setRowData(newdata)
      let h=calculRes(newdata)
      console.log(h)
      setDepense(h.z)
      setRecette(h.y)
    }

  }
  const resetRowData = () => {
    if (localStorage.getItem("rank") === "1") {

      res.get("/caisseRegueb.json").then((r) => {
        let x = Object.values(r.data)
        setRowData(x)
        let h=calculRes(x)
        console.log(h)
        setDepense(h.z)
        setRecette(h.y)
        setAgents(x.map(el => el.agent).filter(function (item, pos, self) {
          return self.indexOf(item) == pos;
        }))
        
        res.get("/caisseSousse.json").then((g) => {
          let x = Object.values(g.data)
          setRowData([...rowData,...x])
          let h=calculRes(x)
          console.log(h)
          setDepense(Depense+h.z)
          setRecette(Recette+h.y)
      
          setAgents([...agents,...x.map(el => el.agent)].filter(function (item, pos, self) {
            return self.indexOf(item) == pos;
          }))
  
         
  
        })
      })
    }

  }

  useEffect(() => {

    if (localStorage.getItem("rank") === "1") {
      res.get("/caisseRegueb.json").then((r) => {
        let x = Object.values(r.data)
        setRowData(x)
        let h=calculRes(x)
        setDepense(h.z)
        setRecette(h.y)
    
        setAgents(x.map(el => el.agent).filter(function (item, pos, self) {
          return self.indexOf(item) == pos;
        }))
      })

    }
    else {

      res.get("/caisseRegueb.json").then((r) => {
        let x = Object.values(r.data)
        setRowData(x.filter(el => el.agent == localStorage.getItem('agent')))
        let h=calculRes(x)
        console.log(h)
        setDepense(h.z)
        setRecette(h.y)
    

      })

    }

  }, [])
  const setAgence=(v)=>{
    if(v==="Regueb"){
      setAgent("Regueb")
      res.get("/caisseRegueb.json").then((r) => {
        let x = Object.values(r.data)
        setRowData(x)
        let h=calculRes(x)
        console.log(h)
        setDepense(h.z)
        setRecette(h.y)
    
        setAgents(x.map(el => el.agent).filter(function (item, pos, self) {
          return self.indexOf(item) == pos;
        }))



      })
    }
    else{
      setAgent("Sousse")
      res.get("/caisseSousse.json").then((r) => {
        console.log(r)
        if(r.data==null){
          setRowData([])
          setDepense(0)
          setRecette(0)
        }
        else{
          let x = Object.values(r.data)
          setRowData(x)
          let h=calculRes(x)
          console.log(h)
          setDepense(h.z)
          setRecette(h.y)
      
          setAgents(x.map(el => el.agent).filter(function (item, pos, self) {
            return self.indexOf(item) == pos;
          }))
        }


       

      })
    }
  }
  const agentSelected=(e)=>{
    setAgent(e)
    res.get("/caisseRegueb.json").then((r) => {
      let x = Object.values(r.data)
      setRowData(x.filter(el=>el.agent===e))
      let h=calculRes(x.filter(el=>el.agent===e))
      console.log(h)
      setDepense(h.z)
      setRecette(h.y)
      setAgents(x.map(el => el.agent).filter(function (item, pos, self) {
        return self.indexOf(item) == pos;
      }))
    })

  }
  return (
    <div style={containerStyle}>
      <div>
{localStorage.getItem('rank')==="1"?        <div className='btncafficheur' >
          <select  onChange={(e)=>agentSelected(e.target.value)} className='inputdesign prix-dachat' name="" id="">
            <option disabled selected value="">sélectionner un agent</option>
            {agents.map(el => <option value={el}>{el}</option>)}
          </select>
          <select className='inputdesign prix-dachat' name="" id="" onChange={(e)=>setAgence(e.target.value)}>
            <option disabled selected value="">sélectionner une agence</option>
            <option value="Regueb">Regueb</option>
            <option value="Sousse">Sousse</option>
          </select>
          <input className='inputdesign prix-dachat' min="1997-01-01" max="2030-12-31" value={Datestart} type="date" onChange={(e) => setDatestart(e.target.value)} />
          <input className='inputdesign prix-dachat' min="1997-01-01" max="2030-12-31" value={Dateend} type="date" onChange={(e) => setDateend(e.target.value)} />
          <button className='btn-ce' onClick={setfilter}>Apply</button>
          <button className='btn-ce' onClick={resetRowData}>Reset</button>
          <button className='btn-ce' onClick={onBtPrinterFriendly}>Print</button>
        </div>:<></>}

      </div>
      <div ref={componentRef} id='myGrid' className="ag-theme-alpine" style={gridStyle} >

        <h1 className='alicenter'>Caisse {localStorage.getItem('rank')==="1"?agent:"de "+localStorage.getItem('agent')}</h1>
        <div className='btncafficheur'>

          <p className='affichageRec' style={{ backgroundColor: "#d6ffd4" }}>Recette :{Recette} </p>
          <p className='affichageRec' style={{ backgroundColor: "#ffa2a2" }}>Depense : {Depense} </p>
          <p className='affichageRec' style={{ backgroundColor: "#d4ecff" }}>Solde : {Recette - Depense} </p>
        </div>
        {/* <AgGridReact ref={gridRef}
           
               rowData={rowData}
               columnDefs={columnDefs}
               defaultColDef={defaultColDef}>
           </AgGridReact> */}


        <table id="memberProfile" ref={gridRef}>

          <tr>
            {columnDefs.map(el => <th><strong>{el.field}</strong></th>)}
          </tr>

          {rowData.map(el => <tr>
            <td>{el.date}</td>
            <td>{el.Num_cli}</td>
            <td>{el.Des}</td>
            <td>{el.Moy_Paiement}</td>
            <td>{el.Montant}</td>
            <td>{el.TypeDepaiment}</td>
            <td>{el.agent}</td>
            <td>{el.type}</td>
            <td>{el.Remarque}</td>


          </tr>)}


        </table>
      </div></div>
  );
};
export default Caiss



