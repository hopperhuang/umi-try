import * as React from 'react';
import { connect } from 'dva';
import router from 'umi/router'; 
import Load from 'Components/Load';
import Nav from './components/navbar/index';
import Content from './components/content/index';
import styles from './style.less';



function ReadBooks(props) {
    console.log(props.nextBookCover);
    return (
        <div className={styles.readbooksContainer} >
            <Nav title={props.title} onLeftClick={props.goBack } />
            <div style={{ minHeight: document.documentElement.clientHeight}} className={styles.contentContainer} onClick={props.setLoaction}  >
                {props.showContent.map(element => (<Content
                    key={element.content_id}
                    id={element.content_id}
                    content={element.content}
                    roleId={element.role_id}
                    type={element.role.protagonist_type}
                    name={element.role.role_name}
                    avatar={element.role.role_avatar_img}
                />))}
            </div>
            {props.isEnd ? 
                <div
                    className={styles.readNextContainer}
                    style={{
                        backgroundImage: `url(${props.nextBookCover})`,
                        backgroundColor: '#000000',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '100% auto', 
                    }}
                >
                    <div className={styles.readNextButton} >继续阅读</div>
                </div> : 
            ''}
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.goBack = this.goBack.bind(this);
        this.setLoaction = this.setLoaction.bind(this);
        this.state = {
            location: 1
        }
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     return this.state.location !== nextState.location;
    // }
    setLoaction() {
        const { location } = this.state;
        const { content } = this.props.model.chapter.ret;
        const { length } = content;
        const self = this;
        if (location < length) {
             this.setState({
                 location: location + 1,
             }, () => {
                 // 将页面下拉到底部。
                window.scrollTo(0,document.body.scrollHeight);
             })
        } else {
            const { isEnd } = this.state;
            if (!isEnd) {
                this.props.dispatch({
                    type: 'readbooks/getNext',
                }).then(() => {
                    self.setState({
                        isEnd: true,
                    }, () => {
                        // 将页面下拉到底部。
                        window.scrollTo(0, document.body.scrollHeight);
                    });
                });
            }
        }
    }
    goBack() {
        router.push('/');
    }
    render() {
        const { model } = this.props;
        const { chapter, nextBookCover } = model
        const { ret } = chapter;
        const chapterInfo = ret.chapter;
        const title = `${chapterInfo.chapter_name}章`;
        const { content } = ret;
        const { location , isEnd } = this.state;
        const show = content.slice(0, location)
        return (
            <ReadBooks
                {...this.props}
                setLoaction={this.setLoaction}
                goBack={this.goBack}
                title={title}
                showContent={show}
                isEnd={isEnd}
                nextBookCover={nextBookCover}
            />
        )
    }
}

const AppWithLoad = Load(App);

export default connect((state) => {
    return {
      loading: state.readbooks.loading,
      model: state.readbooks
    };
  })(AppWithLoad);