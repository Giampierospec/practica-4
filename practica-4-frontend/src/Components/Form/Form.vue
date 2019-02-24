<template>
<div>
    <app-header></app-header>
<div class="row" v-if="!progress">
    <div class="col-sm-8 offset-sm-2">
        <h2>Envío Datos</h2>
        <hr/>
            <form>
  <div class="form-group">
    <label for="tipoRegistro">Tipo Registro</label>
    <input type="text" class="form-control" id="tipoRegistro"  placeholder="Introduzca tipo registro" v-model="credito.tipoRegistro" @keypress="restrictLength($event,1)">
  </div>
  <div class="form-group">
    <label for="universidad">Universidad</label>
    <input type="text" class="form-control" id="universidad" readonly="true" v-model="credito.universidad">
  </div>
   <div class="form-group">
    <label for="matricula">Matrícula</label>
    <input type="number" class="form-control" id="matricula" v-model="credito.matricula" @keypress="restrictLength($event,9)">
  </div>
  <div class="form-group">
    <label for="nombre">Nombre</label>
    <input type="text" class="form-control" id="nombre" v-model="credito.nombre">
  </div>
    <div class="form-group">
    <label for="nombre">Carrera</label>
    <input type="text" class="form-control" id="carrera" v-model="credito.carrera">
  </div>
   <div class="form-group">
    <label for="montof">Monto a Financiar</label>
    <input type="number" class="form-control" id="montof" v-model="credito.montoFinanciar">
  </div>
  <div class="form-group">
    <label for="plazo">Plazo de Pago</label>
    <input type="number" class="form-control" id="plazo" v-model="credito.plazoPago">
  </div>
  <div class="form-group">
    <label for="plazo">Cédula Garante</label>
    <input type="number" class="form-control" id="plazo" v-model="credito.cedulaGarante" @keypress="restrictLength($event,11)">
  </div>
  <div class="form-group">
    <label for="sgarante">Sueldo Garante</label>
    <input type="number" class="form-control" id="sgarante" v-model="credito.sueldoGarante">
  </div>
  <button type="button" class="btn btn-primary" @click="sendToApi">Enviar</button>
</form>
    </div>
</div>
<div v-if="progress">
    <spinner></spinner>
</div>
</div>
</template>
<script>
import Header from "../Layout/Header";
import Spinner  from "./Spinner";
import axios from "axios";
import swal from "sweetalert";
export default {
    data(){
        return{
             credito:{
            tipoRegistro:"",
            universidad: "Universidad Apec",
            matricula:"",
            nombre:"",
            carrera:"",
            montoFinanciar:0,
            plazoPago:0,
            cedulaGarante:"",
            sueldoGarante:0
        },
        progress:false,
        errors:[],
        validLengths:{
            tipoRegistro: 1,
            cedulaGarante: 11,
            universidad: 16
        }
        }
    },
    components:{
        appHeader:Header,
        spinner: Spinner
    },
    methods:{
        restrictLength(e,length){
            if(e.target.value.length === length)
                e.preventDefault();
        },
        sendToApi(){
          this.checkObj(this.credito);
          if(!this.errors.length)
            axios.post("http://localhost:5000/genjson",this.credito)
              .then((res)=>{
                swal({
                  title:"Envío",
                  text:"Datos procesados correctamente",
                  icon:"success"
                }).then((val)=>{
                  this.$router.push("/");
                });
              }).catch((e)=> this.errors.push(e.response.data));
        },
        checkObj(obj){
            this.errors = [];
        Object.keys(obj).forEach(k=>{
            if(typeof k === 'object')
                this.checkObj(obj);
            else if(!obj[k])
                this.errors.push(`El campo ${k} está vacío`);
            else if(this.validLengths[k] && (obj[k].length !== this.validLengths[k]))
                this.errors.push(`El campo ${k} no tiene la longitud requerida de ${this.validLengths[k]}`);
        });
        }
    },
     watch:{
        errors(value){
            if(value.length)
                swal({
                    title: 'Ocurrió un Error',
                    text: this.errors.join('\n'),
                    icon: "error"
                });
        }
     }
}
</script>
