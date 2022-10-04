export const ctime=()=>{
    var d = new Date();
        var n = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit',second:'2-digit' })
       return n.substring(0,(n.length)-2)
}
export const current_Date=()=>{
    var today = new Date();
    
    var year=today.getUTCFullYear()
    var month=today.toLocaleString('default', { month: 'long' })
   return month+"  "+year
}