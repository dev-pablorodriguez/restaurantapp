import app from 'firebase/compat/app'
import 'firebase/compat/firestore'

import firebaseConfig from './config'

class Firebase {
    constructor() {
        if(!app.apps.length){
            app.initializeApp(firebaseConfig);
        }

        //se utiliza para esperar la carga de registros y no recibir el error de 10 segundos
        app.firestore().settings({ experimentalForceLongPolling: true, merge: true })
        this.db = app.firestore();
    }
}

const firebase = new Firebase();

export default firebase;