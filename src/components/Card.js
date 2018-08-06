import React from 'react';
// import './Card.less';
import styles from './Card.less';

export default function Card(props) {
    return <div className={`${props.className ? props.className : ''} ${styles.card}`} style={props.style}>
        <div className={styles['card-title']}>{props.title}</div>
        <div className={styles['card-content']}>{props.children}</div>
    </div>
}
