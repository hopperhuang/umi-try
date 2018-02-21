import CustomTabbar from './CustomTabbar/index';
import router from 'umi/router';

const configs = [
    {
        title: '首页',
        key: 'index',
        ownKey: '/',
        pressed() {
            router.push('/')
        },
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg',
        selectedIcon: 'https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg'
    },
    {
        title: '我的',
        key: 'my',
        ownKey: '/list',
        pressed() {
            router.push('/list')
        },
        icon: 'https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg',
        selectedIcon: 'https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg'
    }
]

export default function Tabbar({ selectedKey }) {
    return (
        <CustomTabbar
            selectedKey={selectedKey}
            configs={configs}
        />
    )
}