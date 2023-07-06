import "leaflet/dist/leaflet.css";
import * as mapStyle from "./HomeStyle";
import L from "leaflet";
import axios from 'axios';
import CurrencyComponent from "../../components/_main/CurrencyConverter/CurrencyConvComponent.vue";

export default ({
  name: "HomeComponent",
  components: {
    CurrencyComponent
  },
  data() {
    return {
      flag: "",
      idh: localStorage.getItem("idh"),
      moeda: localStorage.getItem("moeda"),
      continente: localStorage.getItem("continente"),
      lingua: localStorage.getItem("lingua"),
      estimPop: localStorage.getItem("estimPop"),
      popupContent: "",
      map: null,
      homeStyle: mapStyle.home,
      mapContainer: mapStyle.mapContainer
    }
  },
  async mounted() {
    await this.createMapLayer(this.map);
  },
  beforeDestroy() {
    if (this.map) {
      this.map.remove();
    }
  },
  methods: {
    async createMapLayer(map) {
      map = L.map("mapContainer").setView([0, 0], 3).setMinZoom(3);

      L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
        noWrap: true
      }).addTo(map);
			
      const corner1 = L.latLng(-90, -180)
      const corner2 = L.latLng(90, 180)
      const bounds = L.latLngBounds(corner1, corner2)
      map.setMaxBounds(bounds);
      map.on('drag', function() {
          map.panInsideBounds(bounds, { animate: false });
      });

      var filtro = ''; 
      if(this.idh == null || this.moeda == null || this.continente == null || this.lingua == null || this.estimPop == null){
        const response = await axios.get('https://paises-em-foco-backend.vercel.app/api/paises');
        filtro = response.data;
        console.log(filtro);
      }
      if(this.idh != null){
        const res = await axios.get("https://paises-em-foco-backend.vercel.app/api/paises-por-nivel-idh/" + this.idh);
        filtro = res.data;
        console.log(filtro);
      }
      if(this.moeda != null){
        const res = await axios.get("https://paises-em-foco-backend.vercel.app/api/paises-por-moeda/" + this.moeda);
        filtro = res.data;
        console.log(filtro);
      }
      if(this.continente != null){
        const res = await axios.get("https://paises-em-foco-backend.vercel.app/api/paises-por-continente/" + this.continente);
        filtro = res.data;
        console.log(filtro);
      }
      if(this.lingua != null){
        const res = await axios.get("https://paises-em-foco-backend.vercel.app/api/paises-por-lingua/" + this.lingua);
        filtro = res.data;
        console.log(filtro);
      }
      if(this.estimPop != null){
        const res = await axios.get("https://paises-em-foco-backend.vercel.app/api/paises-por-estimativa-populacional/" + this.estimPop);
        filtro = res.data;
        console.log(filtro);
      }

      const onEachFeature = async(feature, layer) => {
        let moedas = feature.properties.moeda.map(moeda => `${moeda.abreviacao} - ${moeda.nome}`);
        let moedasString = moedas.join(", ");

        let conteudo = `
        <p class="fs-4">${
          feature.properties.nome_br
        } </p> 
        <b>Capital: </b> ${
            feature.properties.capital
        }
        <br><b>Moedas: </b> ${moedasString}
        <br><b>Sigla: </b> ${
          feature.properties.sigla
        }     
        <br><b>Continente: </b> ${
          feature.properties.continente
        }
        <br><b>Línguas: </b> ${
          feature.properties.linguas
        }             
        <br><b>Estimativa populacional: </b> ${Number(feature.properties.estimativa_populacional.$numberDecimal).toLocaleString()}
        <br><b>Código telefone: </b> ${
          feature.properties.cod_telefone
        }  
        <br><b>IDH (2021):</b> ${
            feature.properties.nivel_IDH_2021
        }`;
           
      //layer.bindPopup(popupContent);
      layer.on('click', () => {
        var onClick;
        onClick = document.getElementById("btn").click();
        this.popupContent = conteudo;
        console.log(this.popupContent);
        this.flag = feature.properties.sigla;
        //localStorage.setItem("currency", feature.properties.moeda[0].abreviacao);
      });
    }

    L.geoJSON(filtro, {
      style() {
        return mapStyle.sectionStyle;
      },
      onEachFeature: onEachFeature,
    }).addTo(map);
  }
}
});
