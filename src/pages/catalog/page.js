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
                        clickButton={() => console.log('233333')}
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
    }
    goBack() {
        router.push('/')
    }
    render() {
        const { model } = this.props;
        const { chapters } = model;
        return (
            <Catalog {...this.props} goBack={this.goBack} chapters={chapters} />
        )
    }
}

const AppWithLoad = Load(Pages);
export default connect((state) => {
    return {
      loading: state.catalog.loading,
      model: state.catalog
    };
  })(AppWithLoad);