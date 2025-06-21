import React from 'react';
import styles from './dashboard-wrapper.module.scss';
import DashboardItem from '../dashboard-item/dashboard-item';
import Loader from '../loader/loader';
import HeaderCherxy from '../header-cheryx/header-cheryx';

const DashboardWrapper = ({ Link, listItems = [], loading, headerText = 'Dashboard'}) => {
    return (
        <div className={styles.wrapper}>
            <HeaderCherxy isAdmin Link={Link} MenuData={[]} showNavigator={false} />
            <h1 className={styles.header}>{headerText}</h1>
            <div className={styles.grid}>
                {listItems.map(item => (
                    <DashboardItem 
                        Link={Link} 
                        key={item.url || item.text} 
                        onClick={item.onClick} 
                        url={item.url} 
                        text={item.text} 
                    />
                ))}
            </div>
            {loading && <Loader />}
        </div>
    );
}

export default DashboardWrapper;