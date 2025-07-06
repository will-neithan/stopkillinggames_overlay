// Signatures goal number
let goalSignatures = 1000000;
// New signature goal number after goal is reached
let newGoalSignatures = 1000000;
//
// *** FUN SECTION *** //
//
// Comment out the "goalSignature" line above and uncomment the "goalSignatures" line below 
//    if you want to see fireworks.
// Don't forget to change it back and save it afterwards!
//
//let goalSignatures = 400000;
//
// *** END FUN SECTION *** //
//
// Deadline date adjusted to Belgium time UTC+2, so UTC deadline needs to be -2 hours to match
const countDownDate = new Date("2025-07-31T21:59:59Z").getTime();
// Upper case checkbox true/false variable
let upperCaseCountdown = false;
// Boolean variable so that end-goal video plays only once every widget load
let goalVideoPlayed = false;
// Border radius for end-goal video so it matches background
let fireworksVideoBorderRadius = null;

// Fetch petition data (at interval) from official petition site (AI generated, edited)
(() => {
function fetchData() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://eci.ec.europa.eu/045/public/api/report/progression", true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Parse JSON and extract signature count data
      const signatureCount = JSON.parse(xhr.responseText).signatureCount;
      // Format numbers with spaces
      const goalSignaturesFormatted = formatWithSpaces(goalSignatures);
      const signatureCountFormatted = formatWithSpaces(signatureCount);

      // Add signature count and goal numbers to HTML elements
      $('#progress .endgame .amount').text(goalSignaturesFormatted);
      $('#progress .loading .amount').text(signatureCountFormatted);
      // Set divider opacity to 100%. Code is placed here so the divider shows
      //    after the post-goal new goal (1.2M) update
      if (goalVideoPlayed) {
        $('#divider').css(
          {
            'opacity': 1
          });
      }
      // Calculate progress in percent for progress bar visuals
      const percentLoading = doPercent(signatureCount, goalSignatures);
      // Edit width of progress bar according to the percentage in css
      $('#progress .loading').css(
      {
        'width': percentLoading + '%'
      });
      
      // Checking if signature goal is reached to play celebration video, if video has not been played yet this widget session
      if (signatureCount >= goalSignatures && !goalVideoPlayed) {
        // change the variable to true to block celebration video at next interval data fetch
        goalVideoPlayed = true;
        // add video element to HTML with link and properties
        const fireworksDiv = document.getElementById("fireworks");
        fireworksDiv.innerHTML = `
        <video id="fireworksVideo" muted autoplay loop>
          <source src="https://customer-b8r4q0hmujdj1xhm.cloudflarestream.com/4b390c31e921fd4203e14413c2845ccb/downloads/default.mp4" type="video/mp4">
        </video>
        `;
        // I coundn't make the #fireworks element or its child elements to stretch
        //    based on #progress element dimensions, so I hardcoded width and height
        //    of the #progress element to the #fireworksVideo video element
        const widgetWidth = document.getElementById("progress").offsetWidth;
        const widgetHeight = document.getElementById("progress").offsetHeight;
        if (widgetWidth) {
          $('#fireworksVideo').css(
          {
            'width': widgetWidth + 'px'
          });
        }
        if (widgetHeight) {
          $('#fireworksVideo').css(
          {
            'height': widgetHeight + 'px'
          });
        }
        // Add border radius to the video element according to widget border radius
        if (fireworksVideoBorderRadius) {
          $('#fireworksVideo').css(
          {
            'border-radius': fireworksVideoBorderRadius + 'px'
          });
        }
        
        // Fade in (3s transition) the celebration video after 5s delay to leave it time to load
        const fireworkVideoDiv = document.getElementById("fireworksVideo");
        setTimeout(
          () => {
            fireworkVideoDiv.classList.toggle('fadeIn');
          }
        ,5000);
        // Fade out the video after 35 seconds
        setTimeout(
          () => {
            fireworkVideoDiv.classList.toggle('fadeOut');
            // Remove video HTML element after 3s (because fade out transition takes 3s)
            setTimeout(
              () => {
                fireworkVideoDiv.remove();
              }
            ,3000);
          }
        ,35000);

        // Adjust progress bar to new signature goal after goal is reached to encourage
        //    people to keep signing the petition
        goalSignatures = newGoalSignatures;
        const barWidth = document.getElementById("bar").offsetWidth;
        const goalWidth = document.getElementById("goal").offsetWidth;
        if (barWidth && widgetWidth) {
          // Position the divider before the goal number on progress bar
          const dividerPosition = barWidth - goalWidth - (goalWidth / 3);
          $('#divider').css(
          {
            'left': dividerPosition + 'px',
          });
        }

      }
    }
  };
  xhr.send();
}

// First call
fetchData();

// Call at interval
setInterval(fetchData, 30000);
})();

// Format numbers with spaces by thousands
function formatWithSpaces(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// Percentage calculation for progress bar visuals
function doPercent( total, goal ) {
  const perc = total / goal;
  let amount = perc * 100;
  if ( amount < 1 ) {
    amount = 1;
  }
  if ( amount > 100 ) {
    amount = 100;
  }
  return amount;
}

// Calculation and HTML modification of countdown of petition deadline (function runs at 1s interval.. potential performance issues??)
const x = setInterval(function() {

  const now = new Date().getTime();

  // Get time left to deadline  
  const distance = countDownDate - now;
  
  // Split remaining time into d/h/m/s
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  // Print remaining days/hour/minutes/seconds accordingly to HTML element
  if (days >= 1) {
  	if (days === 1) {
  		document.getElementById("countdown").innerHTML = days + upperCaseOrNot(" day left!");
    } else {
    	document.getElementById("countdown").innerHTML = days + upperCaseOrNot(" days left!");
        }
  } else if (hours >= 1) {
  	if (hours === 1) {
    	document.getElementById("countdown").innerHTML = hours + upperCaseOrNot(" hour left!");
    } else {
    	document.getElementById("countdown").innerHTML = hours + upperCaseOrNot(" hours left!");
    }
  } else if (minutes >= 1) {
  	if (minutes === 1) {
  		document.getElementById("countdown").innerHTML = minutes + upperCaseOrNot(" minute left!");
    } else {
    	document.getElementById("countdown").innerHTML = minutes + upperCaseOrNot(" minutes left!");
    }
  } else {
  	if (seconds === 1) {
    	document.getElementById("countdown").innerHTML = seconds + upperCaseOrNot(" second left!");
    } else if (seconds < 1) {
    	document.getElementById("countdown").innerHTML = upperCaseOrNot("Thank you, everyone!");
    } else {
        document.getElementById("countdown").innerHTML = seconds + upperCaseOrNot(" seconds left!");
    }	
  }
  
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = upperCaseOrNot("Thank you, everyone!");
  }
  
}, 1000);

// Use upper case letters in countdown text based on checkbox in settings
function upperCaseOrNot(text) {
  return upperCaseCountdown ? text.toUpperCase() : text;
}

window.addEventListener('onWidgetLoad', function (obj) {
  
  // Get field data for widget
  const fieldData = obj.detail.fieldData;

  // Save countdown upper case checkbox state to variable
  upperCaseCountdown = fieldData.countdownUpperCase;

  // Save signature goal from settings to variable
  newGoalSignatures = fieldData.widgetSignatureGoal;
  
  // Draw and apply background settings if background checkbox is checked
  if (fieldData.widgetBackgroundEnabled) {
    // If background color setting is filled out, add it to css
    if (fieldData.widgetBackgroundColor) {
      $('#progress').css(
        {
          'background': fieldData.widgetBackgroundColor
        });
    // If background color setting is empty, add default value to css
    } else {
      $('#progress').css(
        {
          'background': 'rgba(0,0,0,0)'
        });
    }
    // If background padding size setting is filled out, add it to css
    if (fieldData.widgetBackgroundPadding) {
      $('#progress').css(
        {
          'padding': fieldData.widgetBackgroundPadding
        });
    // If background padding size setting is empty, add default value to css
    } else {
      $('#progress').css(
        {
          'padding': 0 + 'px'
        });
    }
    // If background radius size setting is filled out, add it to css
    if (fieldData.widgetBackgroundRadius) {
      $('#progress').css(
        {
          'border-radius': fieldData.widgetBackgroundRadius + 'px'
        });
      // Change value for goal-end video
      fireworksVideoBorderRadius = fieldData.widgetBackgroundRadius;
    // If background radius size setting is empty, add default value to css
    } else {
      $('#progress').css(
        {
          'border-radius': 0 + 'px'
        });
    }
  // If background checkbox is unchecked, remove all background visuals in css
  } else {
    $('#progress').css(
        {
          'background': 'rgba(0,0,0,0)',
          'padding': 0 + 'px',
          'border-radius': 0 + 'px'
        });
    // Change value for goal-end video
    fireworksVideoBorderRadius = null;
  }
  // Calculate and apply website label paddings from one value from settings if field is filled out
  if (fieldData.websiteBackgroundPadding) {
    $('#progress .label').css(
      {
        'padding': Math.round(fieldData.websiteBackgroundPadding * 0.7) + 'px' 
          + ' ' + fieldData.websiteBackgroundPadding + 'px'
      });
    $('#countdown').css(
      {
        'padding': Math.round(fieldData.websiteBackgroundPadding * 0.7) + 'px' 
          + ' ' + fieldData.websiteBackgroundPadding + 'px'
      });
  // Apply default paddings if settings field is empty
  } else {
    $('#progress .label').css(
      {
        'padding': 11 + 'px' + ' ' + 16 + 'px'
      });
    $('countdown').css(
      {
        'padding': 11 + 'px' + ' ' + 16 + 'px'
      });
  }  

});
