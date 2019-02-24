<template>
  <div id="app">
    <header-app></header-app>
    <div class="row">
      <div class="col-sm-8 offset-sm-2">
        <h2>Consulta por Matrícula</h2>
    <hr/>
    <div class="form-group input-group">
      <div class="input-group-prepend">
        <label for="search" class="input-group-text">Buscar</label>
      </div>
      <input type="text" class="form-control" placeholder="Presione enter para buscar" id="search" v-model="srch" @keypress.enter="search"/>
    </div>
      </div>
    </div>
  <div v-if="progress">
    <spinner></spinner>
  </div>
<div  class="row" v-if="!progress && credito">
 <div class="col-sm-8 offset-sm-2">
    <div class="card border-dark">
      <h5 class="card-header bg-primary text-white">Datos de: {{credito.nombre}}</h5>
  <div class="card-body">
  <p class="card-text"><b>Matrícula:</b> {{credito.matricula}}</p>
  <p class="card-text"><b>Carrera:</b> {{credito.carrera}}</p>
  <p class="card-text"><b>Monto a Financiar:</b> {{credito.montoFinanciar}}</p>
  <p class="card-text"><b>Plazo de Pago:</b> {{credito.plazoPago}}</p>
  <p class="card-text"><b>Cédula Garante:</b> {{credito.cedulaGarante}}</p>
  <p class="card-text"><b>Sueldo Garante: </b>{{credito.sueldoGarante}}</p>
 </div>
  </div>
</div>
</div>
    </div>
</template>

<script>
import Header from "./components/Layout/Header";
import Spinner from "./components/Form/Form";
import axios from "axios";
import swal from "sweetalert";
export default {

  data () {
    return {
     srch:"",
     progress:false,
     credito:""
    }
  },
  methods:{
    search(e){
      this.progress = true;
      axios.get(`http://localhost:5000/credito/${e.target.value.trim()}`)
          .then((res)=> {
            this.credito = res.data;
            console.log(res.data);
            this.progress = false;
          })
          .catch((e)=>{
             swal({title:"Error",text:"Ocurrió un error",icon:"error"
          });
          this.progress = false;
          });
    }
  },
  components:{
    headerApp:Header,
    spinner: Spinner
  }
}
</script>
