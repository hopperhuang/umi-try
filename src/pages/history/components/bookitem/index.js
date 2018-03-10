import styles from './style.less';
import { Button } from 'antd-mobile'

export default function BookItem(props) {
    const { bookCover, bookName, bookId, read } = props;
    return (
        <div className={styles.item} >
            <div className={styles.cover} >
                <img src={bookCover} alt="" />
            </div>
            <div className={styles.nameAndButton} >
                <div className={styles.name} >{bookName}</div>
                <div className={styles.see} >
                <Button onClick={() => read(bookId)} type="primary" >继续观看</Button>
                </div>
            </div>
        </div>
    )
}