import React, { useState, useRef } from "react";
import { iconCollective } from "../../Constant/Constant";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import TextIncreaseRoundedIcon from "@mui/icons-material/TextIncreaseRounded";
import TextDecreaseRoundedIcon from "@mui/icons-material/TextDecreaseRounded";
import styles from "./Home.module.css";
import jsPDF from "jspdf";
import ImageIcon from "@mui/icons-material/Image";
import html2canvas from "html2canvas";

function Home() {
  const [zoomLevel, setZoomLevel] = useState(100);

  function handleIncreaseFontSize() {
    document.execCommand("fontSize", false, "7");
  }

  function handleDecreaseFontSize() {
    document.execCommand("fontSize", false, "3");
  }

  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const img = document.createElement("img");
      img.src = reader.result;
      img.className = styles.UploadedImageStyling;
      img.contentEditable = false;
      const range = window.getSelection().getRangeAt(0);
      range.insertNode(img);
      range.collapse(false);
    };
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  function handleClick(element) {
    document.execCommand(`${element.iconFunctionality}`);
  }

  function handleColorChange(color) {
    document.execCommand("foreColor", false, color);
  }

  function handleBackColorChange(color) {
    document.execCommand("backColor", false, color);
  }

  //   function handleDownload() {
  //     const sheetContent = document.querySelector(`.${styles.sheet}`).innerHTML;
  //     const pdfDoc = new jsPDF();
  //     pdfDoc.text(sheetContent, 10, 10);
  //     pdfDoc.save("document.pdf");
  //   }

  async function handleDownload() {
    const sheetContent = document.querySelector(`.${styles.TextSheet}`);
    const canvas = await html2canvas(sheetContent, { dpi: 300 });
    const imageData = canvas.toDataURL("image/png", 1.0);
    const pdfDoc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: false,
    });
    pdfDoc.addImage(imageData, "PNG", 0, 0, 210, 297, "", "FAST");
    pdfDoc.save("document.pdf");
  }

  return (
    <div className={styles.MainContainer}>
      <div className={styles.IconContainer}>
        <select
          value={zoomLevel}
          onChange={(e) => setZoomLevel(parseInt(e.target.value))}
          className={styles.ZoomDropdown}
        >
          <option className={styles.ZoomOption} value={50}>
            50%
          </option>
          <option className={styles.ZoomOption} value={75}>
            75%
          </option>
          <option className={styles.ZoomOption} value={90}>
            90%
          </option>
          <option className={styles.ZoomOption} value={100}>
            100%
          </option>
          <option className={styles.ZoomOption} value={125}>
            125%
          </option>
          <option className={styles.ZoomOption} value={150}>
            150%
          </option>
        </select>
        {iconCollective.map((element, index) => (
          <button
            onClick={() => handleClick(element)}
            key={index}
            className={styles.MappedIcons}
          >
            {element.iconName}
          </button>
        ))}
        <div className={styles.TextSizeIconsContainer}>
          <TextIncreaseRoundedIcon
            className={styles.TextIncreaseIcon}
            onClick={handleIncreaseFontSize}
          />
          <TextDecreaseRoundedIcon
            className={styles.TextDecreaseIcon}
            onClick={handleDecreaseFontSize}
          />
        </div>
        <input
          type="color"
          onChange={(event) => handleColorChange(event.target.value)}
          className={styles.TextColorInputBox}
        />
        <input
          type="color"
          onChange={(event) => handleBackColorChange(event.target.value)}
          className={styles.TextFillInputBox}
        />
        <ImageIcon className={styles.ImageIcon} onClick={handleImageClick} />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          style={{ display: "none" }}
          value=""
        />
      </div>

      <div
        className={styles.TextSheetContainer}
        style={{
          transform: `scale(${zoomLevel / 100})`,
          marginTop:
            zoomLevel > 125 ? "20rem" : zoomLevel > 100 ? "10rem" : "0",
        }}
      >
        <div
          className={styles.TextSheet}
          contentEditable="true"
          style={{ fontSize: "17px" }}
        >
          {" "}
          <div>
            {image ? (
              <img
                className={styles.ImageContainer}
                src={image}
                alt="uploaded"
              />
            ) : (
              ""
            )}{" "}
          </div>
        </div>
      </div>
      <div onClick={handleDownload} className={styles.DownloadIconContainer}>
        <DownloadRoundedIcon className={styles.DownloadIcon} />
      </div>
    </div>
  );
}

export default Home;