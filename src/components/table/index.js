import React from "react";
import { useState, useEffect } from "react";
import { APIService } from "@cheryx2020/api-service";
import { getValueObjectByPath } from "@cheryx2020/utils"
import Input from "../input";
import styles from './Table.module.scss';
import Loader from "../loader/loader";
const Table = ({
    addButtonText = "Add",
    listApi,
    listDataPath = "data.data",
    addApi,
    editApi,
    deleteApi,
    formFields = [] }) => {
    if (!listApi) {
        return <div data-testid="error-missing-list-api">Missing <strong>listApi</strong> property</div>
    }
    if (!formFields || (Array.isArray(formFields) && formFields.length === 0)) {
        return <div data-testid="error-invalid-form-fields">Missing or invalid <strong>formFields</strong> property</div>
    }
    const [formData, setFormData] = useState(
        formFields.reduce((acc, field) => {
            acc[field.id] = '';
            return acc;
        }, {})
    );
    const resetFormData = () => {
        const initialFormData = formFields.reduce((acc, field) => {
            acc[field.id] = '';
            return acc;
        }, {});
        setFormData(initialFormData);
    };
    const [loading, setLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isShowConfirmDelete, setIsShowConfirmDelete] = useState(false);
    const [selectedIdDelete, setSelectedIdDelete] = useState("");
    const [listData, setListData] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!loading) {
            const bodyFormData = new FormData();

            // Iterate over formData keys and set them in bodyFormData
            Object.keys(formData).forEach(key => {
                if (formData[key]) {
                    bodyFormData.set(key, formData[key]);
                }
            });

            let apiCall = APIService.post;
            if (formData._id) {
                bodyFormData.set("_id", formData._id);
                apiCall = APIService.put;
            }
            setLoading(true);
            try {
                await apiCall(`${formData._id ? editApi : addApi}`, bodyFormData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
                setIsEdit(false);
                getListData();
            }
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };
    const onClickEdit = (id) => {
        const itemToEdit = listData.find(item => item._id === id);
        if (itemToEdit) {
            setFormData(itemToEdit);
            setIsEdit(true);
        }
    };
    const getListData = () => {
        setLoading(true);
        APIService.get(listApi).then(res => {
            setListData(getValueObjectByPath(res, listDataPath, []));
        }).catch(e => {
            setErrorMessage(JSON.stringify(e))
        }).finally(() => {
            setLoading(false);
        });
    }
    const onClickDelete = (id) => {
        setIsShowConfirmDelete(true);
        setSelectedIdDelete(id);
    }
    const resetDeleteConfirm = () => {
        setIsShowConfirmDelete(false);
        setSelectedIdDelete("");
    }
    const handleCancelDelete = () => {
        resetDeleteConfirm();
    }
    const handleConfirmDelete = async () => {
        try {
            APIService.delete(`${deleteApi}?_id=${selectedIdDelete}`);
        } catch (e) {
            console.log(e);
        } finally {
            getListData();
            setLoading(false);
            resetDeleteConfirm();
        }
    }
    useEffect(() => {
        getListData();
    }, []);
    const canEditOrDelete = editApi || deleteApi;
    const listVisibleFields = formFields.filter(item => !item.hidden);
    return <div data-testid="table" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        {errorMessage ? <div data-testid="error-message">{errorMessage}</div> : null}
        {loading && <Loader />}
        {isShowConfirmDelete && (
            <div className={styles.confirmDeleteModal}>
                <div className={styles.modalContent}>
                    <p>Are you sure you want to delete?</p>
                    <div className={styles.buttonGroup}>
                        <button className={styles.yesButton} onClick={handleConfirmDelete}>Yes</button>
                        <button className={styles.noButton} onClick={handleCancelDelete}>No</button>
                    </div>
                </div>
            </div>
        )}
        {isEdit ? (
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <button className={styles.closeButton} onClick={() => { setIsEdit(false) }}>×</button>
                    <form onSubmit={handleSubmit}>
                        {listVisibleFields.map((field) => (
                            <Input
                                key={field.id}
                                id={field.id}
                                type={field.type}
                                value={formData[field.id] || ''}
                                onChange={handleChange}
                                required={field.require}
                            />
                        ))}
                        <button type="submit" className={styles.submitButton}>Submit</button>
                    </form>
                </div>
            </div>
        ) : (
            <div className={styles["table-container"]}>
                {addApi ? <button data-testid="add-button" onClick={() => {
                    resetFormData();
                    setIsEdit(true);
                }}>{addButtonText}</button> : null}
                <table data-testid="table-element">
                    <thead>
                        <tr>
                            {listVisibleFields.map(field => (
                                <th key={field.id}>{field.id.charAt(0).toUpperCase() + field.id.slice(1)}</th>
                            ))}
                            {canEditOrDelete && <th>Action</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {listData.map((item, index) => (
                            <tr key={index}>
                                {listVisibleFields.map(field => (
                                    <td key={field.id}>{item[field.id]}</td>
                                ))}
                                {canEditOrDelete && <td>
                                    {editApi ? <button onClick={() => { onClickEdit(item._id); }} className={styles.edit}>Edit</button> : null}
                                    {deleteApi ? <button onClick={() => { onClickDelete(item._id); }} className={styles.delete}>Delete</button> : null}
                                </td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
    </div>
}
export default Table