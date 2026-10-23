"use strict"; 
// Sample event data.
 // These are demonstration entries, not verified official listings. const races
  = [ 
 { name: "Italian Grand Prix",
  location: "Mugello Circuit, Italy",
   date: "Sample date — verify before publishing", 
   flag: "🇮🇹", code: "ITA",
    price: 85 }, 
    
 { name: "Dutch TT", 
 location: "TT Circuit Assen, Netherlands", 
 date: "Sample date — verify before publishing",
  flag: "🇳🇱", 
  code: "NED", 
  price: 95 },
  
  { name: "Catalan Grand Prix", 
  location: "Barcelona-Catalunya, Spain",
   date: "Sample date — verify before publishing", 
   flag: "🇪🇸", code: "CAT", 
   price: 79 }, 
   
  { name: "British Grand Prix", 
  location: "Silverstone Circuit, United Kingdom", 
  date: "Sample date — verify before publishing",
   flag: "🇬🇧", 
  code: "GBR", 
  price: 110 }, 
  
  { name: "San Marino Grand Prix", 
  location: "Misano World Circuit, Italy", 
  date: "Sample date — verify before publishing",
   flag: "🇸🇲", code: "SMR", 
  price: 90 }, 
  
  { name: "Valencia Grand Prix",
   location: "Circuit Ricardo Tormo, Spain",
    date: "Sample date — verify before publishing", 
    flag: "🇪🇸", 
    code: "VAL", 
    price: 105 } ]; 
    
  // Ticket price additions for each category. const ticketPrices
   = { general: 0, grandstand: 65, vip: 210 };
   let selectedRace = null;
   // Get HTML elements. const raceGrid =
    document.getElementById("raceGrid"); const bookingModal = document.getElementById("bookingModal"); const confirmationModal = document.getElementById("confirmationModal"); const bookingForm = document.getElementById("bookingForm"); const ticketType = document.getElementById("ticketType"); const quantityInput = document.getElementById("quantity"); const totalPrice = document.getElementById("totalPrice"); const selectedRaceText = document.getElementById("selectedRace"); const customerName = document.getElementById("customerName"); const customerEmail = document.getElementById("customerEmail");
    
     // Format the demonstration prices.
      function formatPrice(amount) 
      { return new Intl.NumberFormat("en-IE",
{ style: "currency", currency: "EUR", maximumFractionDigits: 2 }).
           format(amount); } 
           
           // Display race cards. 
           function displayRaces()
            { raceGrid.replaceChildren();
             races.forEach((race, index) =>
 { const card = document.createElement("article"); 
 card.className = "race-card"; 
 const banner = document.createElement("div");
  banner.className = "race-banner";
   const flag = document.createElement("span"); 
   flag.className = "flag";
    flag.textContent = race.flag;
     const code = document.createElement("span"); 
     code.textContent = race.code; banner.append(flag, code); 
     const details = document.createElement("div"); details.className = "race-details"; 
     const heading = document.createElement("h3"); heading.textContent = race.name;
      const info = document.createElement("p"); 
      info.className = "race-info"; 
      info.textContent = `Location: ${race.location}. ${race.date}.`; 
      
      const bottom = document.createElement("div"); bottom.className = "race-bottom";
       const price = document.createElement("div");
        price.className = "race-price"; price.textContent = formatPrice(race.price); 
        const small = document.createElement("small"); small.textContent = "Sample starting price"; price.appendChild(small);
         const button = document.createElement("button"); button.type = "button";
          button.className = "select-button";
           button.textContent = "Select Tickets"; button.addEventListener("click", ()
    { openBooking(index); });
     bottom.append(price, button); 
     details.append(heading, info, bottom);
      card.append(banner, details); 
      raceGrid.appendChild(card); }); 
      }
       // Open the booking form.
        function openBooking(index)
         { selectedRace = races[index]; selectedRaceText.textContent = `${selectedRace.name} — ${selectedRace.location}`; 
         ticketType.value = "general";
          quantityInput.value = "1"; updateTotal(); bookingModal.showModal(); }
           // Calculate the ticket total.
            function updateTotal()
             { if (!selectedRace)
      { totalPrice.textContent = formatPrice(0);
       return; } const quantity = Number(quantityInput.value); const category = ticketType.value;
        const extra = ticketPrices[category]; 
        if ( !Number.isInteger(quantity) 
     || quantity < 1 || quantity > 10 || extra === undefined )
             { totalPrice.textContent = "Check quantity"; return; } 
             const total = (selectedRace.price + extra) quantity; totalPrice.textContent = formatPrice(total); }
              // Update total when ticket options change.
               ticketType.addEventListener("change", updateTotal);
                quantityInput.addEventListener("input", updateTotal);
                
   // Close the booking window. document.getElementById("closeModal") 
   .addEventListener("click", () => 
       { bookingModal.close(); });
       
        // Show a booking preview. 
        // No payment is processed and no booking is saved.
         bookingForm.addEventListener("submit", (event) => { event.preventDefault(); 
    if (!bookingForm.reportValidity()) 
    { return; }
     if (!selectedRace) { return; } 
     const quantity = Number(quantityInput.value); 
     const category = ticketType.value; 
     if ( !Number.isInteger(quantity)
          || quantity < 1 || quantity > 10 || ticketPrices[category] === undefined ) { quantityInput.setCustomValidity( "Choose a quantity between 1 and 10." ); 
          quantityInput.reportValidity(); quantityInput.setCustomValidity(""); 
          return; } const total = (selectedRace.price + ticketPrices[category]) * quantity;
            const message = document.getElementById( "confirmationMessage" );
            
           // textContent is used rather than inserting customer input // 
           as HTML, reducing the risk of HTML/script injection. message.textContent = `Thank you, ${customerName.value.trim()}. ` + `You selected ${quantity} 
           ${category} ticket(s) for ` + `${selectedRace.name}. ` + `Estimated total: ${formatPrice(total)}. ` + `This is a demo only;
            no ticket has been purchased.`; bookingModal.close();
            confirmationModal.showModal(); });
             // Close confirmation. document.getElementById("finishBooking") .addEventListener("click", () => { confirmationModal.close(); }); 
             // Mobile navigation. const menuToggle = document.getElementById("menuToggle");
              const navLinks = document.getElementById("navLinks"); menuToggle.addEventListener("click", () => { const isOpen = navLinks.classList.toggle("open"); menuToggle.setAttribute("aria-expanded", String(isOpen)); }); navLinks.querySelectorAll("a").forEach((link) => { link.addEventListener("click", () => { navLinks.classList.remove("open"); menuToggle.setAttribute("aria-expanded", "false"); }); });
               // Display the current year. document.getElementById("year").textContent = new Date().getFullYear(); 
       // Initialize the website. displayRaces(); 
