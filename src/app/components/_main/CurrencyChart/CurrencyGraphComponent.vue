<template>
    <div class="currency-graph">
      <div class="inputs">
        <label for="from">De:</label>
        <select id="from" v-model="fromSymbol">
            <option v-for="(name, code) in currencies" :value="code" :key="code">{{ code }}</option>
        </select>

        <label for="to">Para:</label>
        <select id="to" v-model="toSymbol">
            <option v-for="(name, code) in currencies" :value="code" :key="code">{{ code }}</option>
        </select>

        <label for="period">Período:</label>
        <select id="period" v-model="selectedPeriod">
            <option value="1D">1D</option>
            <option value="5D">5D</option>
            <option value="1M">1M</option>
            <option value="6M">6M</option>
            <option value="1Y">1A</option>
            <option value="5Y">5A</option>
        </select>
  
        <button @click="fetchExchangeRateData">Conferir gráfico</button>
      </div>
  
      <div class="chart">
        <canvas id="myChart"></canvas>
      </div>
    </div>
</template>
<script>
  import axios from 'axios';
  import Chart from 'chart.js';
  
  export default ({
    name: "CurrencyGraphComponent",
    data() {
      return {
        fromSymbol: 'USD',
        toSymbol: 'BRL',
        selectedPeriod: '1M',
        currencies: {},
      };
    },
    mounted() {
        this.fetchCurrencies();
        // Commented out to prevent the API call on mount
    //   this.fetchExchangeRateData();
    },
    methods: {
        async fetchCurrencies() {
            try {
                const response = await axios.get('https://api.frankfurter.app/currencies');
                this.currencies = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        async fetchExchangeRateData() {
            const options = {
            method: 'GET',
            url: 'https://real-time-finance-data.p.rapidapi.com/currency-time-series',
            params: {
                from_symbol: this.fromSymbol,
                to_symbol: this.toSymbol,
                period: this.selectedPeriod,
                language: 'en',
            },
            headers: {
                'X-RapidAPI-Key': '4bb2d4be51msh5035f94a6f52d8dp1c9d57jsn82034b433f83',
                'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com',
            },
            };
    
            try {
            const response = await axios.request(options);
            const timeSeriesData = response.data.data.time_series;
            const dates = Object.keys(timeSeriesData);
            const exchangeRates = Object.values(timeSeriesData).map(entry => entry.exchange_rate);
    
            this.createChart(dates, exchangeRates);
            } catch (error) {
            console.error(error);
            }
      },
      createChart(dates, exchangeRates) {
        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: dates,
            datasets: [{
              label: 'Exchange Rate',
              data: exchangeRates,
              backgroundColor: 'rgba(0, 123, 255, 0.5)',
              borderColor: 'rgba(0, 123, 255, 1)',
              borderWidth: 1,
            }],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'day',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Exchange Rate',
                },
              },
            },
          },
        });
      },
    },
  });
</script>
<style scoped>
  .currency-graph {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .inputs {
    margin-bottom: 20px;
  }
  
  .chart {
    width: 800px;
    height: 400px;
  }
</style>