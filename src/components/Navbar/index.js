import { NavBar, Icon } from 'antd-mobile';
import styles from './style.less';

export default function Nav(props) {
    const { title, onLeftClick } = props
    return (
        <div className={styles.navbarConainter} >
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={onLeftClick}
                rightContent={[
                    <Icon key="ellipsis" type="ellipsis" />,
                ]
                }>
                {title}
                </NavBar>
        </div>
    );
}