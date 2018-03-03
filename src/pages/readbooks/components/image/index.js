import styles from './style.less'

export default function Image(props) {
    const { url } = props
    return (
        <div style={props.style} className={styles.imageContainer} >
            <img alt="" src={url} />
        </div>
    )
}