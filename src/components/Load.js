import { ActivityIndicator } from 'antd-mobile'

export default function Load(Comp) {
    return function (props) {
        return props.loading ? <ActivityIndicator text="正在加载中" /> : <Comp {...props} />
    }
}