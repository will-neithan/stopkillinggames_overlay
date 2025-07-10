// Signatures main goal number
let signatureMainGoal = null;
// Signature secondary goal number after main goal is reached
let signatureSecondaryGoal = null;
// Current goal stage. Either main or secondary.
let signatureCurrentGoal = null;
// Deadline date adjusted to Belgium time UTC+2, so UTC deadline needs to be -2 hours to match
const countDownDate = new Date("2025-07-31T21:59:59Z").getTime();
// Upper case checkbox true/false variable
let upperCaseCountdown = null;
// Boolean variable so that end-goal video for main goal plays only once
let goalMainVideoPlayed = null;
// Boolean variable so that end-goal video for secondary goal plays only once
let goalSecondaryVideoPlayed = null;
// Boolean variable for setting if main/secondary flat goal divider is active
let goalDividerFlat = null;
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
      //
      // TESTING
      //
      // For testing the widget behavior under different signature counts,
      //   comment out the above definition of "signatureCount", uncomment
      //   the below definition of "signatureCount" and change the value
      //   to fit your test case.
      //const signatureCount = 1500000;
      //
      // I am drawing the progress bar here at the beginning because if goal is reached,
      //   I want the new secondary goal be drawn after goal video is played
      drawProgressBar (signatureCount,signatureCurrentGoal);
      
      // Checking if current signature goal is reached to play celebration video.
      if (signatureCount >= signatureCurrentGoal) {
        // Check which goal stage is now, main or secondary based on videoplayed variables
        if (!goalMainVideoPlayed) {
          // Change the variable to true to block celebration video at next interval data fetch
          goalMainVideoPlayed = true;
          // Change external setting, so end video doesn't play at next reload
          SE_API.setField('developerMainGoalReached', true, false);
          // Play end goal celebration video.
          playGoalVideo();
          // Push current goal to secondary stage, if setup
          if (signatureSecondaryGoal) {
            signatureCurrentGoal = signatureSecondaryGoal;
          }
        } else if (!goalSecondaryVideoPlayed) {
          // Change the variable to true to block celebration video at next interval data fetch
          goalSecondaryVideoPlayed = true;
          // Change external setting, so end video doesn't play at next reload
          SE_API.setField('developerSecondaryGoalReached', true, false);
          // Play end goal celebration video.
          playGoalVideo();
        }
      //
      // These else clauses serve to reset the external settings.
      //   Otherwise if new counter is setup the old settings would remain
      //   For example, secondary goal is reached and consecutively updated
      //   to higher number. In that case I need to reset the secondary
      //   videoplayed and goalreached to false. This logic should cover
      //   all possible options with main and secondary goals.
      //
      // Checking if current goal is in main stage or secondary
      } else if (signatureCount < signatureMainGoal) {
        // Current signature count is lower than main goal so videoplayed
        //   and goal reached need to be set to false.
        goalMainVideoPlayed = false;
        goalSecondaryVideoPlayed = false;
        SE_API.setField('developerMainGoalReached', false, false);
        SE_API.setField('developerSecondaryGoalReached', false, false);
        // Reset current goal to main goal
        signatureCurrentGoal = signatureMainGoal;
        // Redraw the progress bar with current goal
        drawProgressBar (signatureCount,signatureCurrentGoal);
      } else {
        // Current signature count is above main goal but bellow current goal
        //   so it is in secondary goal stage. Therefore reset secondary variables,
        //   so they can get activated when the secondary goal is reached.
        goalSecondaryVideoPlayed = false;
        SE_API.setField('developerSecondaryGoalReached', false, false);
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

// Play goal video function. The length of goal video is tied a bit to the interval
//   of fetchData function. I want the progress bar secondary goal to be updated
//   sometime near the end of the goal video, so when fetchData is 30 secs and 
//   goal video 35 secs, the secondary goal is drawn near the video end.
function playGoalVideo() {
  // Add video element to HTML with link and properties
  const fireworksDiv = document.getElementById("fireworks");
        fireworksDiv.innerHTML = `
        <video id="fireworksVideo" muted autoplay loop>
          <source src="https://customer-b8r4q0hmujdj1xhm.cloudflarestream.com/4b390c31e921fd4203e14413c2845ccb/downloads/default.mp4" type="video/mp4">
        </video>
        `;
        // I coundn't make the #fireworks element or its child elements to stretch
        //   based on #progress element dimensions, so I hardcoded width and height
        //   of the #progress element to the #fireworksVideo video element
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
}

// Draw progress bar
function drawProgressBar(count, goal) {
  // Add formatted signature count and goal numbers to HTML elements
  $('#progress .endgame .amount').text(formatWithSpaces(goal));
  $('#progress .loading .amount').text(formatWithSpaces(count));
  // Set divider opacity to 100%. Divides the main and secondary goals
  
  // Edit width of secondary goal progress bar according to the progress percentage.
  //   Even if secondary stage is not applicaple or not active yet, the bar is
  //   hidden behind the main stage progress bar, so I can adjust it constantly.
  $('#progress .loadingSecondary').css(
  {
    'width': doPercent(count, goal) + '%'
  });
  // If "signatureCurrentGoal" that goes into input to this function changes
  //   to secondary goal, I want the main goal progress bar stuck on 100% of
  //   the main goal signature count. I don't want the main goal bar to
  //   strech to full width of the progress bar.
  if (goalMainVideoPlayed) {
    $('#progress .loading').css(
    {
      'width': doPercent(signatureMainGoal, goal) + '%'
    });
  // Edit width of main goal progress bar according to the progress percentage.
  } else {
    $('#progress .loading').css(
    {
      'width': doPercent(count, goal) + '%'
    });
  }
  // Set divider opacity to 100% to switch from round divider to flat.
  //   Divider works only in secondary goal stage.
  if (goalMainVideoPlayed && signatureSecondaryGoal && goalDividerFlat) {
    $('#divider').css(
    {
      'opacity': 1
    });
  // Set divider opacity to 0% if conditions are not met.
  } else {
    $('#divider').css(
    {
      'opacity': 0
    });
  }
}

// Format numbers with spaces by thousands
function formatWithSpaces(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// Percentage calculation for progress bar visuals, always from 1% to 100%
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

// Calculation and HTML modification of countdown of petition deadline
//   (Function runs at 1s interval.. Potential performance issues? I have no idea.)
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

// Fuction that runs when the widget loads.
window.addEventListener('onWidgetLoad', function (obj) { 
  // Get field data for widget
  const fieldData = obj.detail.fieldData;
  //
  // VARIABLES
  //
  // Save countdown upper case checkbox state to variable
  upperCaseCountdown = fieldData.countdownUpperCase;
  // Save signature main goal from settings to variable
  signatureMainGoal = fieldData.widgetSignatureMainGoal;
  // Save signature secondary goal from settings to variable
  //   but only if secondary goal is bigger number than main goal.
  //   Otherwise it stays null as defined at top of this document.
  if (fieldData.widgetSignatureSecondaryGoal > signatureMainGoal) {
    signatureSecondaryGoal = fieldData.widgetSignatureSecondaryGoal;
  }
  // Save main goal end-video played (signature threshhold reached) from settings to variable
  goalMainVideoPlayed = fieldData.developerMainGoalReached;
  // Save secondary goal end-video played (signature threshhold reached) from settings to variable
  goalSecondaryVideoPlayed = fieldData.developerSecondaryGoalReached;
  // Set current signature goal stage, either main or secondary.
  //   Based on if secondary goal is setup and goalMainVideoPlayed variable.
  //   Yes, yes, I know.. but this structure is more clear for me.
  if (signatureSecondaryGoal) {
    if (goalMainVideoPlayed) {
      signatureCurrentGoal = signatureSecondaryGoal;
    } else {
      signatureCurrentGoal = signatureMainGoal;
    }
  } else {
    signatureCurrentGoal = signatureMainGoal;
  }
  // Save goal divider checkbox settings to variable
  goalDividerFlat = fieldData.progressBarGoalDividerFlat;
  //
  //
  // VISUALS
  //
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
