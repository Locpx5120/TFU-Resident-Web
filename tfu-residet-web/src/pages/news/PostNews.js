import {useEffect, useState} from "react";
import {Card} from "primereact/card";
import {Carousel} from "primereact/carousel";
import {responsiveOptions} from "./NewsConstant";
import {Dialog} from 'primereact/dialog';
import "../../styles/News.css";
import {getUserNoti} from "../../services/NewsService";
import {getDetailImage} from "./BussinessNews";
import dayjs from "dayjs";
import image from './images.png';
const PostNews = (deepClass = "content") => {
    const [listNews, setListNews] = useState([]);
    const [visible, setVisible] = useState(false);
    const [chooseNews, setChooseNews] = useState({});
    useEffect(() => {
        fetchListNews();
    }, []);
    const fetchListNews = async () => {
        try {
            const response = await getUserNoti();
            const data = await Promise.all(response.data.map(async (item) => {
                let img = item.imgBaseId ? await getDetailImage(item.imgBaseId, 'base64') : image;
                return {
                    ...item,
                    applyDate: dayjs(item.time).format('DD/MM/YYYY'),
                    applyTime: dayjs(item.time).format('HH:mm:ss'),
                    image: img,
                    content: item.shortContent
                }
            }));
            // console.log( test);
            setListNews(data);
        } catch (e) {
            console.log(e);
        }
    }
    const newsTemplate = (news) => {
        return (
            <>
                <div className="col-12">
                    <img src={news.image} alt={news.title} className="w-full h-30rem"/>
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
            <Card className={deepClass} title="Bản tin">
                <Carousel value={listNews} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions}
                          itemTemplate={newsTemplate} circular autoplayInterval={3000}/>
            </Card>
            <Dialog header={newsHeaderTemplate} visible={visible} style={{width: '50vw'}} draggable={false}
                    onHide={() => {
                        if (!visible) return;
                        setVisible(false);
                    }}
            >
                <img src={chooseNews.image} alt={chooseNews.title} className="w-full"/>
                 <div className="mt-2">
                        <span className="font-semibold text-sm"> {chooseNews.applyTime} - {chooseNews.applyDate} </span>
                    </div>
                <p className="m-0 font-semibold text-lg">
                    {chooseNews.content}
                </p>
                  <div dangerouslySetInnerHTML={{__html: chooseNews.longContent}}/>
            </Dialog>
        </>
    )
}
export default PostNews;
