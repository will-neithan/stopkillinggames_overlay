# Stop Killing Games overlay
Stop Killing Games initiative petition stream overlay. I am not associated with any organizers of Stop Killing Games.

## About
Stream overlay tracking the current signature count of Stop Killing Games EU petition. Created in Streamelement. 
Almost fully customizable in Streamelements editor UI, text, fonts, sizes, colors, backgrounds.
- choose, if to make the overlay blend in or flashy
<img src="readme_images/overlay_inconspicuous_conspicuous.png" alt="overlay visibility comparison" height="300"/>

## Installation
Both installation methods require you to have Streamelements account and be logged in your account.

### 1. Direct link
Click on the link below (opens in current tab) or copy and paste the URL to the browser address bar. 
You will be redirected to your Streamelements overlay page with "Stop Killing Games Overlay (unofficial)" already imported.

<a href="https://streamelements.com/dashboard/overlays/share/685014487d511fdc08946009" target="_blank">https://streamelements.com/dashboard/overlays/share/685014487d511fdc08946009</a>

### 2. Copy/Paste source files
If for any reason the direct link does not work, you need to create new custom widget and paste the source files there.
1. Log into your Streamelements account and navigate to _Streaming tools_ -> _Overlays_
2. Click the _NEW OVERLAY_ button
3. Set overlay resolution to **1080p** and click _START_
4. Click the _+_ button
5. Navigate to _STATIC/CUSTOM_ and click the _Custom widget_
6. In the left user interface go to _Position, size and style_ and set _Width_ to **1920** and _Height_ to **1080**, also _Top_ to **0** and _Left_ to **0**
7. In Settings section of the UI, click on _OPEN EDITOR_
8. Delete everything under the tabs _HTML_, _CSS_, _JS_, _FIELDS_, and also _DATA_
9. Then copy the entire content of the source files in this repository and paste them to respective tabs in Streamelements editor

    - [**skg_widget_html.html**](skg_widget_html.html) to _HTML_
    - [**skg_widget_css.css**](skg_widget_css.css) to _CSS_
    - [**skg_widget_js.js**](skg_widget_js.js) to _JS_
    - [**skg_widget_json.json**](skg_widget_json.json) to _FIELDS_
    - _DATA_ tab stays empty (generated automatically)

10. When done pasting, click the _DONE_ button
11. Click the _SAVE_ button
12. In the _Save overlay_ popup type in new overlay name and click the _SAVE_ button then refresh the page (F5 key)
13. If the overlay does not load properly after page reload, click the _OPEN EDITOR_ again
14. Close it right away by clicking the _DONE_ button
15. Then click the _SAVE_ button again and once more refresh the page. The overlay should be properly loaded now.
16. Go to _Settings_ in the left UI panel and customize the values of the overlay to fit your style
