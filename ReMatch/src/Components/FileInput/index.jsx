import { useState, useRef } from 'react'
import { CloudUploadOutlined } from '@ant-design/icons'


import './styles.scss'

// drag drop file component
const FileInput = ({ file, setFile }) => {


  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);
  

  // handle drag events
  const handleDrag = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  // triggers when file is dropped
  const handleDrop = function(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  };
  
  // triggers when file is selected with click
  const handleChange = function(e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  };
  
// triggers the input when the button is clicked
  const onButtonClick = e => {
    e.stopPropagation()
    inputRef.current.click();
  };
  
  return (
    <form className="drag-drop-file-input" onDragEnter={handleDrag} onSubmit={ e => e.preventDefault() }>
      <input ref={inputRef} type="file" onChange={handleChange} />
      <label htmlFor="input-file-upload" className={dragActive ? "drag-active" : "" } onClick={onButtonClick}>
        <CloudUploadOutlined className='icon' />
        <span className='text'>
          <button onClick={onButtonClick} className="upload-button">Choose a file </button> or drag it here
        </span>
        { file && <p>{ file.name }</p> }
      </label>
      { dragActive && <div className='drag-file-element' onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
    </form>
  );
};

export default FileInput