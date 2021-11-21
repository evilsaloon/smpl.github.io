(function() {
    // get all data in form and return object
    function getFormData(form) {
      var elements = form.elements;
      var honeypot;
  
      var fields = Object.keys(elements).map(function(k) {
        if(elements[k].name !== undefined) {
          return elements[k].name;
        // special case for Edge's html collection
        }else if(elements[k].length > 0){
          return elements[k].item(0).name;
        }
      }).filter(function(item, pos, self) {
        return self.indexOf(item) == pos && item;
      });
  
      var formData = {};
      fields.forEach(function(name){
        var element = elements[name];
        
        // singular form elements just have one value
        formData[name] = element.value;
        formData['type'] = document.querySelector('.btn.btn-secondary.dropdown-toggle').textContent
  
        // when our element has multiple items, get their values
        if (element.length) {
          var data = [];
          for (var i = 0; i < element.length; i++) {
            var item = element.item(i);
            if (item.checked || item.selected) {
              data.push(item.value);
            }
          }
          formData[name] = data.join(', ');
        }
      });
  
      // add form-specific values into the data
      // formData.formDataNameOrder = JSON.stringify(fields);
      formData.formDataNameOrder = "[\"type\",\"minecraft\",\"discord\",\"about\"]"
      formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
      formData.formGoogleSendEmail
        = form.dataset.email || ""; // no email by default
  
      return {data: formData, honeypot: honeypot};
    }
  
    function handleFormSubmit(event) {  // handles form submit without any jquery
      event.preventDefault();           // we are submitting via xhr below
      var form = document.querySelector("form");
      var formData = getFormData(form);
      var data = formData.data;
      console.log(data)
      var req = true;
      // If a honeypot field is filled, assume it was done so by a spam bot.
      if (!data.discord.includes('#')) {
        document.querySelector("#discord").style.border = "3px solid red"
        req = false;
      }else document.querySelector("#discord").style.border = "3px solid black"
      if (data.minecraft == "" || data.minecraft.includes(' ')) {
        document.querySelector("#minecraft").style.border = "3px solid red"
        req = false;
      } else document.querySelector("#minecraft").style.border = "3px solid black"
      if (data.about == "") {
        document.querySelector("#about").style.border = "3px solid red"
        req = false;
      } else document.querySelector("#about").style.border = "3px solid black"
      if (data.type.includes('\n')) {
        document.querySelector('.btn.btn-secondary.dropdown-toggle').style.border = "3px solid red"
        req = false;
      } else document.querySelector('.btn.btn-secondary.dropdown-toggle').style.border = "3px solid black"
      if (!document.querySelector('#flexCheckDefault').checked) {
        document.querySelector('.form-check').style.border = "3px solid red"
        req = false;
      } else document.querySelector('#flexCheckDefault').style.border = "3px solid black"

      if(!req)return false;
      var url = 'https://script.google.com/macros/s/AKfycbwEaDRTESp6-d3vy9s-UppjSv8JXV4UOMPFSMzw9_adaeqc3XiwtKqM_OC1_zF3iyV4/exec';
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
            form.reset();
            form.style.display= "none";
            document.querySelector(".message").style.display = "block";
            
          }
      };
      var encoded = Object.keys(data).map(function(k) {
          return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
      }).join('&');
      xhr.send(encoded);
    }
    function loaded() {
        document.querySelector(".form-button").addEventListener("click", handleFormSubmit, false);
      // }
    };
    document.addEventListener("DOMContentLoaded", loaded, false);
    // function disableAllButtons(form) {
    //   var buttons = form.querySelectorAll(".form-button");
    //   for (var i = 0; i < buttons.length; i++) {
    //     buttons[i].disabled = true;
    //   }
    // }
  })();