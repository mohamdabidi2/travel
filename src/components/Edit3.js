import res from './database';

const Edit3 = ({ id, mtr, row, routemanger }) => {

    const editmethode = () => {
        let value = prompt('Donner le montant de tranche')
        let tp = prompt('chéque ou espéce')

        if (Number(value) > 0) {
            console.log(Number(value) + Number(row.deposit), Number(row.PrixVente))
            if ((Number(value) + Number(row.deposit)) >= Number(row.PrixVente)) {
                if ((Number(value) + Number(row.deposit)) > Number(row.PrixVente)) {
                    alert('vous avez dépassé le montant autorise')
                }
                else {
                    let d = new Date()
                    res.post('/logsRegueb.json', { log: d.toLocaleString() + " : " + row.NomCli + " payer le reste ( " + value + "Dt ) de sa réservation 'voyage organisé' à : " + localStorage.getItem('agent') })
                    res.put("/voyageorgRegueb.json/" + id + '.json', { ...row, deposit: Number(mtr) + Number(value), TypeDepaiment: "(payée)" })
                    res.post("/caisseRegueb.json", { Num_cli: row.Num_cli, date: (new Date()).toLocaleDateString('en-GB'), agent: localStorage.getItem('agent'), Des: row.NomCli, TypeDepaiment: row.TypeDepaiment, Moy_Paiement: tp, Montant: value, Remarque: "payée une tranche", type: "revenu" })
                    routemanger(0)
                }

            }
            else {
                let d = new Date()
                res.post('/logsRegueb.json', { log: d.toLocaleString() + " : " + row.NomCli + " payer une Tranche ( " + value + "Dt ) de sa réservation 'voyage organisé' à : " + localStorage.getItem('agent') })
                res.post("/caisseRegueb.json", { Num_cli: Math.round(Math.random() * 100) * 1985, date: (new Date()).toLocaleDateString('en-GB'), agent: localStorage.getItem('agent'), Des: row.NomCli, TypeDepaiment: row.TypeDepaiment, Moy_Paiement: tp, Montant: value, Remarque: "payée une tranche", type: "revenu" })

                res.put("/voyageorgRegueb.json/" + id + '.json', { ...row, deposit: Number(mtr) + Number(value) })
                routemanger(0)
            }
        }

    }
    return (
        <div>
            <button onClick={editmethode}>nouvelle tranche</button>


        </div>
    );
}

export default Edit3;