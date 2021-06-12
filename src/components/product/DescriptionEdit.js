import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './style.scss'

const Description = (props) => {
    const [text, setText] = useState(props.value)

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    }

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]

    const handleChange = value => {
        setText(value)
        props.update(value)
    }

    return (
        <div className="description-container row mb-2 mb-lg-3">
            <div className="col-12">
                <ReactQuill
                    theme="snow"
                    value={text}
                    onChange={handleChange}
                    modules={modules}
                    formats={formats}
                />
            </div>
        </div>
    );
};

export default Description;