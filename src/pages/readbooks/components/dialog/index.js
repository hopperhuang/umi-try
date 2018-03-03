import Image from '../image/index';
import styles from './style.less'

export default function Dialog(props) {
    const { type, name, avatar, content } = props;
    const reg = /\.(png|svg|jpg|gif|bmp|jpeg)$/;
    const isImage = !!reg.exec(content)
    return (
        <div className={type === 1 ? styles.mainContainer : styles.minorContainer } >
            <div className={styles.avatar} ><img alt="" src={avatar} /></div>
            <div className={styles.nameAndContent} >
                <div className={styles.name} >{name}</div>
                <div className={styles.content} >
                    {isImage ? <Image style={{width: '100%'}} url={content} /> : content}
                    <div className={styles.conner} />
                </div>
            </div>
        </div>
    );
}