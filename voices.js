const voice = require("elevenlabs-node");

const apiKey = "2f2d4d428e6e64fa378fab33718882e2"; // Your API key from Elevenlabs

voice.getVoices(apiKey).then((res) => {
  console.log(res);
});

let x = 8, y = 0, a = 5;

while (x > 1) {
    y = x + a;
    x = x/2;
    a = a + x + y;
}

console.log(a)