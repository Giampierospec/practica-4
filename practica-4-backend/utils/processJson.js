const fs = require('fs');
const path = require('path');
const {ProcessDbUtil} = require('./processDb');
let props = ["tipoRegistro","universidad","matricula",
        "nombre","carrera","montoFinanciar","plazoPago","cedulaGarante","sueldoGarante"]
let ProcessJsonUtil = (()=>{
    /**
     * Genera el json
     * @param {Object} body 
     * @param {(err:string,body:object)} callback 
     */
    let genJson = (body, callback) => {
        body.universidad = "Universidad Apec";
        Object.keys(body).forEach((k)=>{
            if(typeof body[k] === "string")
                body[k] = body[k].toUpperCase();
        });
        let keys = Object.keys(body);
        let pr = props.filter((x)=> keys.indexOf(x) === -1);
        if(pr.length)
            callback(`Las siguientes propiedades no están presentes en el objeto: ${pr.join('\n')}`);
        else
            ProcessDbUtil.saveObj(body, (e, b) => {
                if (e)
                    callback("Ocurrió un Error al insertar en la BD");
                else
                    callback(null, b);
            })
    };
    /**
     * Consigue el credito en base a una matricula
     * @param {string} matricula 
     * @param {(err:string,cr:Object)} callback 
     */
      let getCredito = (matricula, callback) => {
        ProcessDbUtil.getObj(matricula,(err,cr)=>{
            if(err)
                callback(err);
            else
                callback(null,cr);
        });
      };
  
    return{
        genJson,
        getCredito
    };

})();

module.exports = {ProcessJsonUtil};