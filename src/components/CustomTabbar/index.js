import * as React from 'react';
import { TabBar } from 'antd-mobile';
import './styles.less'

class CustomTabbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {};
        this.pressHandler = this.pressHandler.bind(this);
    }
    pressHandler() {
        console.log('pressed')
    }
    render() {
        const { selectedKey, configs } = this.props
        console.log(selectedKey)
        return (
            <div
                className="youdu_commonTabbarComtainer"
            >
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                >
                    {configs.map(config => (
                        <TabBar.Item
                            selected={config.ownKey === selectedKey}
                            onPress={config.pressed}
                            key={config.key}
                            title={config.title}
                            icon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: `url(${config.icon}) center center /  21px 21px no-repeat`
                                }}
                                />
                            }
                            selectedIcon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: `url(${config.selectedIcon}) center center /  21px 21px no-repeat`
                                }}
                                />
                            }
                        />
                    ))}
                </TabBar>
            </div>
        )
    }
}

export default CustomTabbar;