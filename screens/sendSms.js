import { encode as base64Encode } from 'base-64';
const sendSms = async(to, body)=> {


    const accountSid = 'AC3adc95325ef8d8f61b74fd772738a296';
    const authToken = 'adcec71ee8af6367bb08f83cde4f1615';
    const fromNumber = '+18336122192';
    //const toNumber = '+14692376435';
    const toNumber = to;
    //const message = 'TEST';
    const message = body;
    
    const encodedCredentials = Buffer.from(`${accountSid}:${authToken}`).toString('base64');
    
    fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `From=${fromNumber}&To=${toNumber}&Body=${message}`,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Message sent with SID:', data.sid);
      })
      .catch((error) => {
        console.error('Error sending message:', error);
      });
    
    };
      export default sendSms