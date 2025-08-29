const express = require('express');
const app = express();

app.use(express.json());

const FULL_NAME = 'buduri_veera_shankara_anjan_teja';        
const DOB_DDMMYYYY = '21082005';     
const EMAIL = 'rameezanjan123@gmail.com';        
const ROLL_NUMBER = '22BCE20141';    

function isNumericString(s) { return typeof s === 'string' && /^[0-9]+$/.test(s); }
function isAlphabeticString(s) { return typeof s === 'string' && /^[A-Za-z]+$/.test(s); }

function alternatingCapsReverseConcat(alphaItems) {
  const letters = [];
  for (const item of alphaItems) for (const ch of item) letters.push(ch);
  const reversed = letters.reverse();
  return reversed.map((ch, idx) => (idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase())).join('');
}

app.post('/bfhl', (req, res) => {
  try {
    const body = req.body || {};
    const data = Array.isArray(body.data) ? body.data : null;

    if (!data) {
      return res.status(200).json({
        is_success: false,
        user_id: `${FULL_NAME}_${DOB_DDMMYYYY}`,
        email: EMAIL,
        roll_number: ROLL_NUMBER,
        odd_numbers: [],
        even_numbers: [],
        alphabets: [],
        special_characters: [],
        sum: "0",
        concat_string: ""
      });
    }

    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;

    for (const item of data) {
      const s = typeof item === 'string' ? item : String(item);

      if (isNumericString(s)) {
        const num = parseInt(s, 10);
        sum += num;
        if (num % 2 === 0) even_numbers.push(s);
        else odd_numbers.push(s);
      } else if (isAlphabeticString(s)) {
        alphabets.push(s.toUpperCase());
      } else if (s.length > 0) {
        special_characters.push(s);
      }
    }

    const originalAlphabeticTokens = (data || [])
      .map(v => (typeof v === 'string' ? v : String(v)))
      .filter(isAlphabeticString);

    const concat_string = alternatingCapsReverseConcat(originalAlphabeticTokens);

    return res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB_DDMMYYYY}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: String(sum),
      concat_string
    });
  } catch (e) {
    return res.status(200).json({
      is_success: false,
      user_id: `${FULL_NAME}_${DOB_DDMMYYYY}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers: [],
      even_numbers: [],
      alphabets: [],
      special_characters: [],
      sum: "0",
      concat_string: ""
    });
  }
});

app.get('/', (req, res) => res.status(200).json({ status: 'ok' }));

const PORT = process.env.PORT || 3000;
if (process.env.LOCAL_DEV === 'true') {
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
}

module.exports = app;
