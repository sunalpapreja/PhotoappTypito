# PhotoApp



Photo App is an online photo gallery in which user can upload images to an online server, either by select and browse or by drag and drop.
It can be used as an online photo sharing app. Users just have to upload them and every user's data will be availabe in a common link (URL).
It has a good UI to view the uploaded images and even a full image preview is available. All the images are gouped by their date of uploading so that they are easily distinguishable, accessible and searchable. 


# Considerations - 

  - The home page should show both the options to upload that is select and browse and drag and drop seperately. So that user can directly drag and drop from the already open window even without opening the window from browser.
  - To view uploaded images, server should serve the uploaded images as a static files instead of sending the full image files as a response.
  - As images are static files, image url will depend on website url.
  - All the images in a grid are grouped by their date of uploading. The date of every group should appear on the top of that group. So that every group is easily distinguishable.
  - In the full screen preview of a image, image should be fully fit in the window screen without getting stretched and without getting enlarged.
  - Progress bar should show combine percentage of all the images to be uploaded.
  - While uploading the image i considered about saving the date and time of the uploading image as an another variable or by making another directory naming it the date of uploading. But i chose to rename the image itself by adding a prfix of the date of uploading to their name which can be retrieved later whenever needed.





> The overriding design goal for PhotosApp
> is to make an online gallery which is
> public and common for all users.

# Trade off's

* If we directly access the viewImages url, it will directly show all the images which is not a good practice.
* To share the link of the image from grid view to full screen view, React-redux state is used. React context API is also a good option which is easy to use but redux store has more advantages as it will be common for all the components.
*  Progressbar can only show the percentage of the progress of uploading, not of making of renditions of image (240 and 720) due to which view images are updated after few seconds of uploading.
* There is also a problem with react-redux state that whenever the page the page is refreshed, the state gets lost. It can be resolved either by accessing the local storage which is not a good practice or by using a redux-persist external library which isn't used because it's an external library and requires many different dependencies to install.

# Todos

 - User should be able to download the uploaded image again by just clicking on a download button in a full image preview rather than by right click and saving image as.
 - Both the upload options should have a single combined upload button.
 - In the view component, all the images should be gouped under a folder with a name of the date on which they were uploaded, rather than showing all the images at a same time.
 - To access local storage or redux-persist external library to persist the data even after refresh.

