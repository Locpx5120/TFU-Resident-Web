import {useEffect, useState} from "react";
import {Card} from "primereact/card";
import {Carousel} from "primereact/carousel";
import {responsiveOptions} from "./NewsConstant";
import { Dialog } from 'primereact/dialog';
import "../../styles/News.css";
const PostNews = (deepClass = "content") => {
    const [listNews, setListNews] = useState([
        {
            title: 'aasdas',
            applyDate: '10/12/2024',
            applyTime: '10:08:00',
            content: 'content troll Việt Nam',
            image: 'https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/2015_7_8_635719749908307959_game_Virus_Troll_8_7(1).png'
        },
        {
            title: 'aasdas',
            applyDate: '10/12/2024',
            applyTime: '10:08:00',
            content: 'content troll Việt Nam',
            image: 'https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/2015_7_8_635719749908307959_game_Virus_Troll_8_7(1).png'
        },
        {
            title: 'aasdas',
            applyDate: '10/12/2024',
            applyTime: '10:08:00',
            content: 'content troll Việt Nam',
            image: 'https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/2015_7_8_635719749908307959_game_Virus_Troll_8_7(1).png'
        },
        {
            title: 'aasdas',
            applyDate: '10/12/2024',
            applyTime: '10:08:00',
            content: 'content troll Việt Namcontent troll Việt Namcontent troll Việt Namcontent troll Việt Namcontent troll Việt Namcontent troll Việt Namcontent troll Việt Namcontent troll Việt Nam',
            image: 'https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/2015_7_8_635719749908307959_game_Virus_Troll_8_7(1).png'
        },
    ]);
    const [visible, setVisible] = useState(false);
    const [chooseNews, setChooseNews] = useState({});
    useEffect(() => {

    }, []);
    const fetchListNews = () => {

    }
    const newsTemplate = (news) => {
        return (
            <>
                <div className="col-12">
                    <img src={news.image} alt={news.title} className="w-full"/>
                    <div className="mt-2">
                       <span className="font-semibold text-sm"> {news.applyTime} - {news.applyDate} </span>
                    </div>
                    <div className="text-lg mt-2" onClick={() => openModal(news)}>
                        <a>{news.title}</a>
                    </div>
                    <div className="text-base mt-2">
                        <p className="text-wrap">
                        {news.content}
                        </p>
                    </div>
                </div>
            </>
        )
    }
    const openModal = (news) => {
        setVisible(true);
        setChooseNews(news)
    }
    const newsHeaderTemplate = () => {
        return (
            <>
                <div className="">
                    <p>
                        {chooseNews.title}
                    </p>
                </div>
            </>
        )
    }

    return (
        <>
            <Card className={deepClass}>
                <Carousel value={listNews} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions}
                          itemTemplate={newsTemplate} circular />
            </Card>
            <Dialog header={newsHeaderTemplate} visible={visible} style={{ width: '50vw' }} draggable={false}
                    onHide={() => {if (!visible) return; setVisible(false); }}
            >
                <img src={chooseNews.image} alt={chooseNews.title} className="w-full"/>
                <p className="m-0">
                    {chooseNews.content}
                </p>
            </Dialog>
        </>
    )
}
export default PostNews;
