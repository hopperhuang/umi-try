import Image from '../image/index';
import styles from './style.less';

export default function Descriptions({content}) {
    const reg = /\.(png|svg|jpg|gif|bmp|jpeg)$/;
    const isImage = !!reg.exec(content)
    return (
        <div className={styles.descriptionsContainer} >
            {isImage ? <Image url={content} /> :
                <div>{content}</div>}
        </div>
    );
}