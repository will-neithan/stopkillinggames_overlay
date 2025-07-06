# Stop Killing Games overlay
Stop Killing Games initiative petition stream overlay. I am not associated with any organizers of Stop Killing Games.

- [About](#about)
- [Installation](#installation)
    - [1. Direct Link](#1-direct-link)
    - [2. Copy/Paste Source Files](#2-copypaste-source-files)
- [Integration (OBS Studio)](#integration-obs-studio)
- [Image Guides](#image-guides)
    - [1. Installation (screenshots)](#1-installation-screenshots)
    - [2. Integration (screenshots)](#2-integration-screenshots)

## About
Stream overlay tracking the current signature count of Stop Killing Games EU petition. Created in Streamelement. 
Almost fully customizable in Streamelements editor UI, text, fonts, sizes, colors, backgrounds.
- choose, if to make the overlay blend in or flashy
<img src="readme_images/overlay_inconspicuous_conspicuous_v3.png" alt="overlay visibility comparison" />

## Installation
Both installation methods require you to have Streamelements account and be logged in your account.

### 1. Direct link
Click on the link below (opens in current tab) or copy and paste the URL to the browser address bar. 
You will be redirected to your Streamelements overlay page with "Stop Killing Games Overlay (unofficial) v1.2.0" already imported.

<a href="https://streamelements.com/dashboard/overlays/share/686a77dc97c384d09bddf063" target="_blank">https://streamelements.com/dashboard/overlays/share/686a77dc97c384d09bddf063</a>

### 2. Copy/Paste source files
If for any reason the direct link does not work, you need to create new custom widget and paste the source files there.
1. Log into your Streamelements account and navigate to _Streaming tools_ -> _Overlays_
2. Click the _NEW OVERLAY_ button
3. Set overlay resolution to **1080p** and click _START_
4. Click the "_+_" button
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
12. In the _Save overlay_ popup type in new overlay name and click the _SAVE_ button then refresh the page (F5 key or browser button)
13. If the overlay does not load properly after page reload, click the _OPEN EDITOR_ again
14. Close it right away by clicking the _DONE_ button
15. Then click the _SAVE_ button again and once more refresh the page. The overlay should be properly loaded now.
16. Go to _Settings_ in the left UI panel and customize the values of the overlay to fit your style

## Integration (OBS Studio)

Adding the overlay to OBS Studio works the same as adding any other overlay

1. Copy the overlay URL by clicking the link icon
2. In OBS Studio, click the _+_ button in _Sources_ dock
3. Click the _Browser_ option
4. In the _Create/Select Source_ popup, type in name for the overlay and click _OK_ button
5. In the _Properties_ popup clear the _URL_ field and paste in the **overlay URL**, clear _Width_ field and type in value **1920**, clear the _Height_ field and type in **1080**.
6. Click the _OK_ button and the overlay should be visible in the _Preview_
7. Resize the overlay by moving the corners of its bouding box and drag the overlay to desired position

## Image guides

The same guides for installation and integration but accompanied by screenshots.

### 1. Installation (screenshots)

1. Log into your Streamelements account and navigate to _Streaming tools_ -> _Overlays_
<img src="readme_images/1. Log into your Streamelements account and navigate to Streaming tools-Overlays.png" alt="installation step 1" />

2. Click the _NEW OVERLAY_ button
<img src="readme_images/2. Click the NEW OVERLAY button.png" alt="installation step 2" />

3. Set overlay resolution to **1080p** and click _START_
<img src="readme_images/3. Set overlay resolution to 1080p and click START.png" alt="installation step 3" />

4. Click the "_+_" button
<img src="readme_images/4. Click the + button.png" alt="installation step 4" />

5. Navigate to _STATIC/CUSTOM_ and click the _Custom widget_
<img src="readme_images/5. Navigate to STATICCUSTOM and click the Custom widget.png" alt="installation step 5" />

6. In the left user interface go to _Position, size and style_ and set _Width_ to **1920** and _Height_ to **1080**, also _Top_ to **0** and _Left_ to **0**
<img src="readme_images/6. In the left user interface go to Position, size and style and set Width to 1920 and Height to 1080, also Top to 0 and Left to 0.png" alt="installation step 6" />

7. In Settings section of the UI, click on _OPEN EDITOR_
<img src="readme_images/7. In Settings section of the UI, click on OPEN EDITOR.png" alt="installation step 7" />

8. Delete everything under the tabs _HTML_, _CSS_, _JS_, _FIELDS_, and also _DATA_
<img src="readme_images/8. Delete everything under the tabs HTML, CSS, JS, FIELDS, and also DATA.png" alt="installation step 8" />

9. Then copy the entire content of the source files in this repository and paste them to respective tabs in Streamelements editor. 
**skg_widget_html.html** to _HTML_, **skg_widget_css.css** to _CSS_, **skg_widget_js.js** to _JS_, **skg_widget_json.json** to _FIELDS_, _DATA_ tab stays empty (generated automatically)
<img src="readme_images/9. Then copy the entire content of the source files in this repository and paste them to respective tabs in Streamelements editor.png" alt="installation step 9" />

10. When done pasting, click the _DONE_ button
<img src="readme_images/10. When done pasting, click the DONE button.png" alt="installation step 10" />

11. Click the _SAVE_ button
<img src="readme_images/11. Click the SAVE button.png" alt="installation step 11" />

12. In the _Save overlay_ popup type in new overlay name and click the _SAVE_ button then refresh the page (F5 key or browser button)
<img src="readme_images/12. In the Save overlay popup type in new overlay name and click the SAVE button then refresh the page (F5 key).png" alt="installation step 12" />

13. If the overlay does not load properly after page reload, click the _OPEN EDITOR_ again
<img src="readme_images/13. If the overlay does not load properly after page reload, click the OPEN EDITOR again.png" alt="installation step 13" />

14. Close it right away by clicking the _DONE_ button
<img src="readme_images/14. Close it right away by clicking the DONE button.png" alt="installation step 14" />

15. Then click the _SAVE_ button again and once more refresh the page. The overlay should be properly loaded now.
<img src="readme_images/15. Then click the SAVE button again and once more refresh the page. The overlay should be properly loaded now..png" alt="installation step 15" />

16. Go to _Settings_ in the left UI panel and customize the values of the overlay to fit your style
<img src="readme_images/16. Go to Settings in the left UI panel and customize the values of the overlay to fit your style.png" alt="installation step 16" />

</br>
</br>
</br>
</br>
</br>
</br>
</br>

### 2. Integration (screenshots)

1. Copy the overlay URL by clicking the link icon
<img src="readme_images/1. Copy the overlay URL by clicking the link icon.png" alt="integration step 1" />

2. In OBS Studio, click the _+_ button in _Sources_ dock
<img src="readme_images/2. In OBS Studio, click the + button in Sources dock.png" alt="integration step 2" />

3. Click the _Browser_ option
<img src="readme_images/3. Click the Browser option.png" alt="integration step 3" />

4. In the _Create/Select Source_ popup, type in name for the overlay and click _OK_ button
<img src="readme_images/4. In the CreateSelect Source popup, type in name for the overlay and click OK button.png" alt="integration step 4" />

5. In the _Properties_ popup clear the _URL_ field and paste in the **overlay URL**, clear _Width_ field and type in value **1920**, clear the _Height_ field and type in **1080**
<img src="readme_images/5. In the Properties popup clear the URL field and paste in the overlay URL, clear Width field and type in value 1920, clear the Height field and type in 1080.png" alt="integration step 5" />

6. Click the _OK_ button and the overlay should be visible in the _Preview_
<img src="readme_images/6. Click the OK button and the overlay should be visible in the Preview.png" alt="integration step 6" />

7. Resize the overlay by moving the corners of its bouding box and drag the overlay to desired position
<img src="readme_images/7. Resize the overlay by moving the corners of its bouding box and drag the overlay to desired position.png" alt="integration step 7" />

