export default {
    name: 'FooterComponent',
    mounted() {
        this.restoreValuesFromLocalStorage();
        
    },
    methods: {
        saveValue(key, value) {
            localStorage.setItem(key, value);
        },
        restoreValuesFromLocalStorage() {
            const selectedValue = localStorage.getItem('idh');
            const selectedValue2 = localStorage.getItem('moeda');
            const selectedValue3 = localStorage.getItem('continente');
            const selectedValue4 = localStorage.getItem('lingua');
            const selectedValue5 = localStorage.getItem('estimPop');
            if (selectedValue) {
                const radioInput = document.querySelector(`input[type="radio"][value="${selectedValue}"]`);
                if (radioInput) {
                  radioInput.checked = true;
                }  
            }
            if (selectedValue2) {
                const radioInput = document.querySelector(`input[type="radio"][value="${selectedValue2}"]`);
                if (radioInput) {
                  radioInput.checked = true;
                }  
            }
            if (selectedValue3) {
                const radioInput = document.querySelector(`input[type="radio"][value="${selectedValue3}"]`);
                if (radioInput) {
                  radioInput.checked = true;
                }  
            }
            if (selectedValue4) {
                const radioInput = document.querySelector(`input[type="radio"][value="${selectedValue4}"]`);
                if (radioInput) {
                  radioInput.checked = true;
                }  
            }
            if (selectedValue5) {
                const radioInput = document.querySelector(`input[type="radio"][value="${selectedValue5}"]`);
                if (radioInput) {
                  radioInput.checked = true;
                }  
            }
        },
        handleRadioChange() {
            window.location.reload();
        },
        limparFiltro(){
            localStorage.clear();
            window.location.reload();
        }
    }
}
  