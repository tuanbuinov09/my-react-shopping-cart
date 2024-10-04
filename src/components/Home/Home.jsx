import Card from "../Card/Card";
import { products } from "../../data/mock-data";
import * as style from './Home.module.css';

function Home() {
    return (
        <div className={style.container}>
            {products.map((item) => <Card key={item.id} product={item} />)}
        </div >
    )
}

export default Home;