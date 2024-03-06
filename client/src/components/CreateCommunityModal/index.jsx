import React, { useState } from 'react';
import { FaRegTrashCan } from "react-icons/fa6";
import styles from "./styles.module.scss";
import Dropzone from 'react-dropzone';

const CreateCommunityModal = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [idea, setIdea] = useState('');
  const [description, setDescription] = useState('');
  const [industry, setIndustry] = useState('');
  const [coverPhoto, setCoverPhoto] = useState(null);

  const handleCreateCommunity = () => {
    console.log('Community created:', { title, idea, description, industry, coverPhoto });

    setTitle('');
    setIdea('');
    setDescription('');
    setIndustry('');
    setCoverPhoto('');
    onClose();
  };

  const handleDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setCoverPhoto(acceptedFiles[0]);
    }
  };

  const handleDeleteImage = () => {
    setCoverPhoto(null);
  };

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <span className={styles.close} onClick={onClose}>&times;</span>
        <div className={styles.title}>Create Community</div>
        <label>
          <div className={styles.fieldName}>Title:</div>
          <input className={styles.inputField} type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          <div className={styles.fieldName}>Idea:</div>
          <input className={styles.inputField} type="text" value={idea} onChange={(e) => setIdea(e.target.value)} />
        </label>
        <label>
          <div className={styles.fieldName}>Industry:</div>
          <input className={styles.inputField} type="text" value={industry} onChange={(e) => setIndustry(e.target.value)} />
        </label>

        {!coverPhoto ? (
          <>
            <p>Cover Photo:</p>
            <Dropzone onDrop={handleDrop}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className={styles.dropzone}>
                  <input className={styles.inputField}
                    {...getInputProps()} />
                  <p>Drag 'n' drop or click to select</p>
                </div>
              )}
            </Dropzone>
          </>
        ) : (
          <div className={styles.preview}>
            <p>Selected Cover Photo:</p>
            <img src={URL.createObjectURL(coverPhoto)} alt="Cover" />
            <button className={styles.deleteButton} onClick={handleDeleteImage}>
              <FaRegTrashCan className={styles.deleteIcon}/>
            </button>
          </div>
        )}
        <button className={styles.createBtn} onClick={handleCreateCommunity}>Create Community</button>
      </div>
    </div>
  );
};

export default CreateCommunityModal;