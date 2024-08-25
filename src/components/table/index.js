import React from "react";
import { useState, useEffect } from "react";
import { APIService } from "@cheryx2020/api-service";
import { getValueObjectByPath } from "@cheryx2020/utils"
import Input from "../input";
import styles from './Table.module.scss';
import Loader from "../loader/loader";
const Table = ({
    listApi = "v2/email",
    listDataPath = "data.data",
    addApi = "v2/email/create",
    editApi = "v2/email/edit",
    deleteApi = "v2/email",
    formFields = [{
        id: "_id",
        type: "text",
        hidden: true,
    }, {
        id: "title",
        type: "text",
        require: true,
    }, {
        id: "patternId",
        type: "text",
        require: true,
    }, {
        id: "content",
        type: "textarea",
        require: true,
    }, {
        id: "mainImage",
        type: "text",
        require: true,
    }] }) => {
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
            console.log(e);
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
        } catch(e) {
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
    const listVisibleFields = formFields.filter(item => !item.hidden);
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
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
            <div>
                {listData?.length === 0 && <div onClick={() => { setIsEdit(true) }}>Add</div>}
                {listData?.length && <div className={styles["table-container"]}>
                    <button onClick={() => {
                        resetFormData();
                        setIsEdit(true);
                    }}>Add Template</button>
                    <table>
                        <thead>
                            <tr>
                                {listVisibleFields.map(field => (
                                    <th key={field.id}>{field.id.charAt(0).toUpperCase() + field.id.slice(1)}</th>
                                ))}
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listData.map((item, index) => (
                                <tr key={index}>
                                    {listVisibleFields.map(field => (
                                        <td key={field.id}>{item[field.id]}</td>
                                    ))}
                                    <td>
                                        <button onClick={() => { onClickEdit(item._id); }} className={styles.edit}>Edit</button>
                                        <button onClick={() => { onClickDelete(item._id); }} className={styles.delete}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>}
            </div>
        )}
    </div>
}
export default Table