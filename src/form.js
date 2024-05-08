
  document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById("contact-form");
    var submitButton = document.querySelector(".button-order");
    const output = document.getElementById("output");

    submitButton.addEventListener("click", function(event) {
      event.preventDefault(); // Prevent form submission

      const phoneInput = document.getElementById("phone");
      const emailInput = document.getElementById("email");
      const nameInput = document.getElementById("name");

      var phonePattern = /^\d{3}-\d{2}-\d{3}-\d{4}$/; // Regular expression for the phone number format
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation

      var phoneValid = phonePattern.test(phoneInput.value);
      var emailValid = true; // Assume email is valid by default
      
      if (phoneValid && emailInput.value !== "") {
        emailValid = emailPattern.test(emailInput.value);
      }

      // Remove existing error messages
      var errorMessages = document.querySelectorAll(".error-message");
      errorMessages.forEach(function(errorMessage) {
        errorMessage.remove();
      });

      if (phoneValid && emailValid) {
        // Successful registration
        form.innerHTML='<p class="succes">Ваш заказ был оформлен.<br>Мы с вами свяемся в ближайшее время!</p>';
        output.innerHTML= '';
        phoneInput.value="";
        emailInput.value="";
        nameInput.value="";
      } else {
        // Display error messages
        if (!phoneValid) {
          output.innerHTML = '<p class="error">Пожалуйста, введите номер в формате "375-xx-xxx-xxx"</p>';
          phoneInput.value="";
        }
        if (!emailValid & emailInput.value !== "") {
            output.innerHTML = '<p class="error">Пожалуйста, введите корректный адрес электронной почты</p>';
            emailInput.value="";
        }
      } 
    });
  });
//Ваш заказ был оформлен. Мы с вами свяемся в ближайшее время! 