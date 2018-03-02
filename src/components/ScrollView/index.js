import * as React from 'react';
import './style.less';

const takeLatest = (function () {
    let timeout;
    return (method, ms) => {
        if (!timeout) {
            timeout = setTimeout(method, ms)
        } else {
            clearTimeout(timeout);
            timeout = setTimeout(method, ms)
        }
    }
})()

// height: scrollview的height属性
//scrollToEnd: 拉到底部时候的回调函数
class ScrollView extends React.Component {
    constructor(props) {
        super(props)
        this.scrollHander = this.scrollHander.bind(this);
    }
    scrollHander() {
        const { scrollHeight, scrollTop, clientHeight } = this.scrollContainer;
        const { scrollToEnd } = this.props
        const method = () => {
            if (scrollHeight < scrollTop + clientHeight + 10) {
                console.log('to the bottem')
                if (scrollToEnd) {
                    scrollToEnd()
                }
            }
        }
        takeLatest(method, 1000);
    }
    render() {
        const { height } = this.props
        return (
            <div
                onScroll={this.scrollHander}
                style={{ height: height }}
                className="youdustory-pullContainer"
                ref={(com) => { this.scrollContainer = com; }}

            >
                {this.props.children}
            </div>
        )
    }
}

export default ScrollView;