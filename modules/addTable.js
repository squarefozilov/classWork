console.log("btn")

$("#add-btn").on("click", function(event) {
      event.preventDefault();
      var newCharacter = {
        name  : $("#name").val().trim(),
        phone : $("#phone").val().trim(),
        email: $("#email").val().trim(),
        id  : $("#id").val().trim()
        
      };

      // Question: What does this code do??
      $.post("/reserve", newCharacter)
        .then(function(data) {
          console.log("add.html", data);
          alert("Adding character...");
        });
});

