import { db } from '../firebase.js'
function getAllUsers() {
   return new Promise((resolve, reject) => {
      db.collection("users").get().then((allUsers) => {
           resolve(allUsers);
      }).catch((e) => {
           reject(e);
      })
   })
}
export default { getAllUsers }