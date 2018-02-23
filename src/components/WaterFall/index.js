import ScrollView from 'Components/ScrollView/index'
import './style.less';

function WaterFall(props) {
    const { height, scrollToEnd, dataGroup, renderItem } = props;
    const firstRowData = [];
    const secondRowData = [];
    for (let index = 0; index < dataGroup.length; index++) {
        const element = dataGroup[index];
        if (index % 2 === 0) {
            firstRowData.push(element)
        } else {
            secondRowData.push(element)
        }
    }
    return (
        <ScrollView
            height={height}
            scrollToEnd={scrollToEnd}
        >
            <div className="youdustory-waterfall-container" >
                <div className="youdustory-waterfall-first-row" >
                    {firstRowData.map(renderItem)}
                </div>
                <div className="youdustory-waterfall-second-row" >
                    {secondRowData.map(renderItem)}
                </div>
            </div>
        </ScrollView>
    )
}

export default WaterFall;