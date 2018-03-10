import * as React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { ListView, PullToRefresh } from 'antd-mobile';
import Load from 'Components/Load';
import Nav from 'Components/Navbar/index';
import BookItem from './components/bookitem/index';
import styles from './style.less';

function makeDataSource() {
    let ds;
    ds = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
    })
    return function (data) {
        return ds.cloneWithRows(data);
    };
}

const DataSource = makeDataSource();

function History(props) {
    // console.log(props)
    const { history } = props;
    const data = history.history;
    const { refreshing } = history;
    const dataSource = DataSource(data)
    return (
        <div>
            <Nav title="历史记录" onLeftClick={props.goBack} />
            <div className={styles.listContainer} >
                <ListView
                    dataSource={dataSource}
                    renderRow={(rowData) => {
                        const { book_cover, book_name, book_id } = rowData;
                        return (<BookItem
                                    bookCover={book_cover.url}
                                    bookName={book_name}
                                    bookId={book_id}
                                    read={props.readbooks}
                                />);
                    }}
                    pageSize={4}
                    initialListSize={4}
                    height={document.documentElement.clientHeight}
                    onEndReached={props.getMore}
                    pullToRefresh={<PullToRefresh refreshing={refreshing} onRefresh={props.refresh} />}
                />
            </div>

        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
        this.readbooks = this.readbooks.bind(this);
        this.getMore = this.getMore.bind(this);
        this.refresh = this.refresh.bind(this)
    }
    goBack() {
        router.push('/my');
    }
    componentDidMount() {
        document.querySelector('.am-list-view-scrollview').style.height = `${document.documentElement.clientHeight}px`;
        document.querySelector('.am-list-body').style.height = `${document.documentElement.clientHeight - 0.9 * Number.parseInt(document.documentElement.style.fontSize, 10)}px`;
    }
    componentWillUpdate() {
        console.log(23333)
    }
    readbooks(id) {
        router.push({
            pathname: '/readbooks',
            query: {
                id
            },
        })
    }
    getMore() {
        this.props.dispatch({
            type: 'history/getMore'
        });
    }
    refresh() {
        this.props.dispatch({
            type: 'history/refreshing'
        });
    }
    render() {
        return (
            <History
                {...this.props}
                goBack={this.goBack}
                readbooks={this.readbooks}
                getMore={this.getMore}
                refresh={this.refresh}
            />
        )
    }
}

const AppWithLoad = Load(App);

export default connect((state) => {
    return {
      history: state.history,
      loading: state.history.loading,
      globalLoading: state.global.loading,
    };
  })(AppWithLoad);