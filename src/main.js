import { createApp } from 'vue'
import App from './app/App.vue'
import router from './app/AppRouter'
import store from './app/shared/vuex/store'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import FlagIcon from 'vue-flag-icon'
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faExchangeAlt)


const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon);

app.config.productionTip = false;

app.use(router);
app.use(store);
app.use(FlagIcon) // Para usar o FlagIcon globalmente


app.mount('#app');
