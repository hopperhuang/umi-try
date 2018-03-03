import Dialog from '../dialog/index';
import Descriptions from '../descriptions/index';
import styles from './style.less';

export default function Content(props) {
    const { roleId, content, type, name, avatar } = props;
    return (
        <div className={styles.contentBox} key={props.id} >
            {roleId ? <Dialog type={type} name={name} avatar={avatar} content={content} /> :
                <Descriptions content={content} />}
        </div>
    );
}