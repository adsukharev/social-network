import React, {
  useState, useContext, Fragment,
} from 'react';
import { Redirect } from 'react-router-dom';
import ReactCrop from 'react-image-crop';
import deleteIcon from '../../images/elliot.jpg';
import 'react-image-crop/dist/ReactCrop.css';
import {UserContext} from "../../contexts/UserContext";
import api from "../../api";


export default function EditAvatarModal(props) {
  const { closeModalWindow } = props;
  const {
    userInfo, changed, setChanged,
  } = useContext(UserContext);

  const [src, setSrc] = useState(null);

  const [crop, setCrop] = useState({
    unit: '%',
    width: 30,
    aspect: 1 / 1.5,
  });
  const fileUrl = null;
  const [redirect, setRedirect] = useState(false);
  const [imageRef, setImageRef] = useState(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [finalImage, setFinalImage] = useState(null);


  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setSrc(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  // If you setState the crop in here you should return false.
  const onImageLoaded = (image) => {
    setImageRef(image);
  };

  function getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );
    setFinalImage(canvas.toDataURL('image/jpeg'));
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          // reject(new Error('Canvas is empty'));
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(fileUrl);
        resolve(window.URL.createObjectURL(blob));
      }, 'image/jpeg');
    });
  }
  const onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    setCrop(crop);
  };

  const makeClientCrop = async (crop) => {
    if (imageRef && crop.width && crop.height) {
      const croppedImage = await getCroppedImg(
        imageRef,
        crop,
        'newFile.jpeg',
      );
      setCroppedImageUrl(croppedImage);
    }
  };
  const onCropComplete = (crop) => {
    makeClientCrop(crop);
  };


  const sendToServer = async () => {
    const data = new FormData();
    data.append('avatar', finalImage);
    await api().put(`users/${userInfo.user_id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    }).then(
      (data) => {
        setChanged(!changed);
        closeModalWindow();
      },
    ).catch(err => console.log(err));
  };

  const handleRedirect = () => {
    if (redirect) {
      return (<Redirect to={`/users/${userInfo.user_id}`} />);
    }
    return null;
  };
  return (
    <div className="ModalWindowBackground" >
      {handleRedirect()}
      <div className="ModalWindowWhiteDiv">
        <div className="DivTitleAndCloseInModalWindow">
          <p className="TextTitleInModalWindow">Изменить фото</p>
          <button type="button" className="CloseButtonInModalWindow" onClick={closeModalWindow}>
            <img src={deleteIcon} alt="delete" className="ImgCloseButtonInModalWindow" />
          </button>
        </div>
        <div>
          <input
            type="file"
            onChange={(e) => {
              onSelectFile(e);
            }}
          />
        </div>
        {src && (
          <Fragment>
            <ReactCrop
              src={src}
              crop={crop}
              onImageLoaded={onImageLoaded}
              onComplete={onCropComplete}
              onChange={onCropChange}
            />
          </Fragment>
        )}
        {croppedImageUrl && (
          <div className="ApplyButtonContainer">
            {/* <img alt="Crop" style={{ maxWidth: '30%' }} src={croppedImageUrl} /> */}
            <button
              className="ApplyButton"
              type="button"
              onClick={async () => sendToServer()}
            >
сохранить
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
