import * as React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import Load from 'Components/Load';
import Nav from 'Components/Navbar/index';
import CatalogItem from './components/catalogItem/index';
import styles from './style.less';

function Catalog(props) {
    return (
        <div  className={styles.catalogContainer} style={{ minHeight: document.documentElement.clientHeight}} >
            <Nav title="目录" onLeftClick={props.goBack} />
            <div className={styles.itemContainer} >
                {props.chapters.map(element => (
                    <CatalogItem
                        key={element.chapter_id}
                        name={`${element.chapter_name}章`}
                        clickButton={() => props.readBook(element.book_id, element.chapter_id) }
                    />
                ))}
            </div>
        </div>
    )
}

class Pages extends React.Component {
    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
        this.readBook = this.readBook.bind(this);
    }
    goBack() {
        router.push('/')
    }
    readBook(id, chapterId) {
        router.push({
            pathname: '/readbooks',
            query: {
                id,
                chapterId
            },
        })
    }
    render() {
        const { model } = this.props;
        const { chapters } = model;
        // console.log(model);
        return (
            <Catalog {...this.props} goBack={this.goBack} chapters={chapters} readBook={this.readBook} />
        )
    }
}

const AppWithLoad = Load(Pages);
export default connect((state) => {
    return {
      loading: state.catalog.loading,
      model: state.catalog,
      globalLoading: state.global.loading,
    };
  })(AppWithLoad);