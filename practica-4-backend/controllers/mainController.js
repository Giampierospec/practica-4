const {ProcessJsonUtil} = require('../utils/processJson');
const {ValidationUtil} = require('../utils/validationUtil');
const MainCtrl = (()=>{
    let index = (req,res,next)=>{
        ValidationUtil.validate(req.body,(err)=>{
            if(err)
                return res.status(400).send(err);
            else{
                ProcessJsonUtil.genJson(req.body,(err,body)=>{
                    if(err)
                        return res.status(400).send(err);
                    else
                        return res.status(200).send(body);
                })
            }
        })
    };
    let credito = (req,res,next)=>{
        ProcessJsonUtil.getCredito(req.params.matricula,(err,cr)=>{
            if(err)
                return res.status(400).send(err);
            else
                return res.status(200).send(cr);
        });
    };
    return {
        index,
        credito
    };
})();

module.exports = {MainCtrl};