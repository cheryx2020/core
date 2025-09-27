import React from "react";
import Loader from "../loader/loader";
import Page from "../page/page";

export default function PagePreviewModal({ isOpen, onClose, data, loading, router, useRouter, Link, Image }) {
    if (!isOpen) {
        return null;
    }

    const modalStyles = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'white',
        zIndex: 1000,
        overflowY: 'auto',
        boxSizing: 'border-box',
    };

    const closeButtonStyles = {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '10px 20px',
        backgroundColor: '#343a40',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        zIndex: 1010,
        fontSize: '16px',
        fontWeight: 'bold',
    };

    return (
        <div style={modalStyles}>
            <button style={closeButtonStyles} onClick={onClose}>
                &times; Close Preview
            </button>

            {loading && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}><Loader /></div>}

            <Page {...(data ?? { page: {}})} useRouter={useRouter} router={router} Link={Link} Image={Image} />
             {!loading && !data && <div style={{ padding: '50px', textAlign: 'center' }}>Error: Could not load preview data.</div>}
        </div>
    );
}