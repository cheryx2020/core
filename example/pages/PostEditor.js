import React, { useState } from "react";
import Select from "react-select"; // 1. Import react-select
import PostEditor from "../../src/components/post-editor/post-editor";

// 2. Define the options for the language dropdown
const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'vi', label: 'Vietnamese' }
];

const PostEditorPage = () => {
    const [editorLanguage, setEditorLanguage] = useState('en');

    const handleLanguageChange = (selectedOption) => {
        setEditorLanguage(selectedOption.value);
    };

    const selectedLanguageOption = languageOptions.find(option => option.value === editorLanguage);

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}> 
            <div style={{ marginBottom: '25px', maxWidth: '300px', padding: "0px 20px" }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
                    Select Language
                </label>
                <Select
                    options={languageOptions}
                    value={selectedLanguageOption}
                    onChange={handleLanguageChange}
                    isSearchable={false}
                />
            </div>

            <PostEditor language={editorLanguage} />
        </div>
    );
};

export default PostEditorPage;