import { ActivityIndicator } from 'antd-mobile'

export default function Load(Comp) {
    return function (props) {
        // console.log(props.globalLoading);
        // console.log(props.loading)
        // 添加globalLoading属性，确保首次进入时，checklogin已经完成。
        // console.log(props.loading)
        return (props.loading || props.globalLoading )? <ActivityIndicator text="正在加载中" /> : <Comp {...props} />
    }
}