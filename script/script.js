const generateEmails = () => {
  const apiUrl = "https://flynn.boolean.careers/exercises/api/random/mail";
  const emailListelements = document.getElementById("emailList");

  // Array per memorizzare le richieste
  const promises = [];

  // Genera 10 richieste API
  for (let i = 0; i < 10; i++) {
    promises.push(
      axios
        .get(apiUrl)
        .then((response) => {
          if (response.data.success) {
            return response.data.response; // Restituisci l'email
          } else {
            throw new Error("Errore nella risposta API");
          }
        })
        .catch((error) => {
          console.error("Errore durante la richiesta:", error);
          return "Errrore nella generazione"; // Ritorna un messaggio di errore al posto dell'email
        })
    );
  }

  // Controllo richieste
  console.log(promises);

  // Quando tutte le richieste sono complete
  Promise.all(promises).then((emails) => {
    // Aggiungi ogni email alla lista
    emails.forEach((email, index) => {
      const li = document.createElement("li");
      li.textContent = `Email ${index + 1}: ${email}`;
      emailListelements.appendChild(li);
    });
  });
};

const handleButtonClick = () => {
  const emailListelements = document.getElementById("emailList");
  emailListelements.innerHTML = "";
  generateEmails(); // Chiama la funzione per generare nuove email
};

// Esegui la funzione quando la pagina viene caricata
window.onload = generateEmails;

// Associa l'evento click al bottone
document
  .getElementById("generateEmailsButton")
  .addEventListener("click", handleButtonClick);
