const http = require("https");

const sendEmail = (subject, email, text) => {
  if (subject == "" || email === "") {
    subject = "feedback";
    email = "feedback@email.com";
  }
  const options = {
    method: "POST",
    hostname: "rapidprod-sendgrid-v1.p.rapidapi.com",
    port: null,
    path: "/mail/send",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": "rapidprod-sendgrid-v1.p.rapidapi.com",
    },
  };

  const req = http.request(options, function (res) {
    const chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      const body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });

  req.write(
    JSON.stringify({
      personalizations: [
        {
          to: [
            {
              email: "earleustacio@gmail.com",
            },
          ],
          subject: subject,
        },
      ],
      from: {
        email: email,
      },
      content: [
        {
          type: "text/plain",
          value: text,
        },
      ],
    })
  );
  req.end();
};
module.exports = sendEmail;
