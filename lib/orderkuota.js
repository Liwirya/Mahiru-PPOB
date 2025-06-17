require("../setting.js");
const axios = require("axios");

class OrderKuota {
    constructor() {
        this.apitoken = global.keyorkut;
        this.urlQris = global.codeqr;
        this.merchantId = global.merchant;
    }

    async createPayment(amount) {
        const response = await axios(`https://linecloud.my.id/api/orkut/createpayment?apikey=verlang&amount=${amount}&codeqr=${global.codeqr}`);
        if (response.statusText !== "OK") throw new Error("Error")
        return response.data.result
    }
    
    async cekStatus() {
        const response = await axios(`https://linecloud.my.id/api/orkut/cekstatus?apikey=verlang&merchant=${global.merchant}&keyorkut=${global.keyorkut}`);
        if (response.statusText !== "OK") throw new Error("Error")
        return response.data;
    }
}

module.exports = { OrderKuota };