const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/', (req, res) => {
  const body = req.body;
  const intentName = body.queryResult ? body.queryResult.intent.displayName : "Necunoscut";
  const params = body.queryResult ? body.queryResult.parameters : {};
  const session = body.session;

  console.log("--------------------------------------------------");
  console.log("Intent primit:", intentName);
  console.log("Parametri:", JSON.stringify(params));

  if (intentName === 'Curs valutar - Suma (Euro)' || intentName === 'Curs valutar - Suma (Dolar)') {
      
      const lei = params.suma_lei;
      let curs, moneda, simbol;

      if (intentName.includes('Euro')) {
          curs = 4.97;
          moneda = 'Euro';
          simbol = 'EUR';
      } else {
          curs = 4.50;
          moneda = 'Dolari';
          simbol = 'USD';
      }

      const rezultat = (lei / curs).toFixed(2);
      
      const mesaj = `Calcul Replit: ${lei} Lei înseamnă aproximativ ${rezultat} ${simbol} (la un curs de ${curs}).\n\nDorești să revii la meniul principal sau să oferi feedback?`;

      return res.json({
          fulfillmentText: mesaj,
          outputContexts: [
              {
                  name: `${session}/contexts/secondary-menu`,
                  lifespanCount: 5
              }
          ]
      });
  }

  res.json({
      fulfillmentText: 'Salut! Serverul merge, dar nu am recunoscut comanda.'
  });
});

app.listen(5000, '0.0.0.0', () => {
  console.log('Serverul a pornit cu succes pe portul 5000! Aștept comenzi...');
});
