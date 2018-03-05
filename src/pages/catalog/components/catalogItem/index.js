export default function CatalogItem(props) {
    return (
        <div>
            <div>{props.name}</div>
            <div onClick={props.clickButton} >阅读本章节</div>
        </div>
    )
}