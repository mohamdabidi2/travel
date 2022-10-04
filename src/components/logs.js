import { useEffect ,useState} from 'react';
import res from './database'
const Logs = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        res.get("/logsRegueb.json").then((r) => {
            let x = Object.values(r.data)
            let y=Object.keys(r.data)
            let z=x.map((el,i)=>{return{...el,id:y[i]}})
            console.log(z)
            setData(z)})
 
    }, [])
    
    return ( <div className='logs-container'>
                <h1>Logs</h1>

        {data.map(el=><div className="log-title">{el.log}</div>)}
    </div> );
}
 
export default Logs;