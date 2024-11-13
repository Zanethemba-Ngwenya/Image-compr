# Advanced Image Compressor

## Overview
The Advanced Image Compressor is a simple web-based tool designed to help you compress your images efficiently. It allows you to upload a single image, select the desired compression quality, adjust the output size, and choose the format in which you want to save the compressed image (JPEG, PNG, or WebP). After compression, you can preview and download the result.

### Features
- **Single Image Compression**: Upload and compress a single image at a time.
- **Adjustable Compression Quality**: Control the quality of the compressed image via a slider.
- **Size Control**: Set the target size for your compressed image in megabytes (MB).
- **Multiple Format Support**: Choose between JPEG, PNG, or WebP for the output format.
- **Live Progress Indicator**: Monitor the compression process with a progress bar and loading spinner.
- **Preview**: View a preview of the compressed image before downloading.
- **Custom Filename**: Enter a custom name for the output file before saving.

  
### How to Use

**Upload an Image**:

Click on the Drag & Drop area or select an image using the file input button to choose the image you want to compress. Only one image can be uploaded at a time.

**Set Desired Compression Size**:

In the Desired Size (MB) field, enter the target size for your image. The input field is pre-set to a value of 1 MB, but you can adjust it to any value based on your needs.

**Adjust Compression Quality**:

Use the Compression Quality slider to adjust the quality of your compressed image. The lower the quality, the smaller the file size, but this might reduce the image quality.


**Select Output Format**:

Choose the desired output format for the image from the dropdown menu. You can select JPEG, PNG, or WebP.


**Enter a Filename**:

Provide a custom name for the compressed image in the Save As (Filename) input field.


**Compress the Image**:

Click on the Compress Image button to start the compression process. A progress bar will show the current status, and a loading spinner will appear until the process is complete.


**Preview and Download**:

Once compression is complete, you will see a preview of the compressed image. You can then click the Download Compressed Image button to save the result.


### Installation

To use this tool, you only need to open the HTML file in a browser. There is no need for any server-side setup or additional software.

**Clone the repository or download the files**.
Open the index.html file in your browser.

Example file structure:

```bash
git clone https://github.com/ZanethembaN/Image-compr.git
cd image-compr```


### Technologies Used

**HTML5**: Structure of the web page.
**CSS3**: Styling the layout for a clean and user-friendly interface.
**JavaScript**: Image compression functionality, file handling, and user interaction.
**JSZip**: Library for creating and managing zip files (if supporting batch downloads in future versions).
**FileSaver.js**: For downloading the compressed image.

### Customization
You can customize the following:

**Max File Size**: Adjust the file size constraint or limits for compression.
**Quality & Format Defaults**: Change the default compression quality or the format options available.
**UI Styling**: Modify styles.css to change the appearance or layout of the app.

### Known Issues
Only single image compression is supported at this time.
The tool uses an aggressive compression algorithm, so the resulting image quality may degrade at very high compression ratios.
