const {Credito} = require('../models/Credito');

let ProcessDbUtil = (()=>{
    /**
     * Guardar el nuevo objeto
     * @param {Object} body 
     * @param {(err:string,b:Object)=>function} callback 
     */
    let saveObj = (body,callback)=>{
        
        Credito.findOne({matricula:body.matricula}).then((cr)=>{
            if(!cr)
            {
                let credito = new Credito(body);
                 credito.save()
                     .then((b) => callback(null, b))
                     .catch((e) => callback(e));
            }
            else{
               cr.universidad = body.universidad;
               cr.matricula = body.matricula;
               cr.nombre = body.nombre;
               cr.carrera = body.carrera;
               cr.montoFinanciar = body.montoFinanciar;
               cr.plazoPago = body.plazoPago;
               cr.cedulaGarante = body.cedulaGarante;
               cr.sueldoGarante = body.sueldoGarante;
               cr.save();
               callback(null,cr);
                
            }
                
    
        }).catch((e)=> callback(e))
       
    };
    /**
     * Consigue el objeto en base a la  matricula
     * @param {string} matricula 
     * @param {(err:string,body:object)} callback 
     */
    let getObj = (matricula,callback)=>{
         Credito.findOne({matricula})
         .then((cr)=> callback(null,cr))
         .catch((e)=> callback(e));
    };
    return {
        saveObj,
        getObj
    };
})();

module.exports = {ProcessDbUtil};