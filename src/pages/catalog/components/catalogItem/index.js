import styles from './style.less';

export default function CatalogItem(props) {
    return (
        <div className={styles.itemContainer} >
            <div className={styles.title} >{props.name}</div>
            <div className={styles.button} onClick={props.clickButton} >
                点击阅读本章
            </div>
        </div>
    )
}