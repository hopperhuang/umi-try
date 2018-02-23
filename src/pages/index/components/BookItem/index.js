import styles from './style.less'

export default function BookItem(props) {
    const { clickHandler, cover, name } = props;
    return (
        <div className={styles.bookItemContainer} onClick={() => { clickHandler() }} >
            <div className={styles.coverContainer} >
                <img alt="cover" src={cover} />
            </div>
            <div className={styles.bookName} >{name}</div>
        </div>
    )
}