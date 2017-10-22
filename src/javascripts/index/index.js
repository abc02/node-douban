import './index.scss'
import EventCenter from 'module/EventCenter'
import TopicMerge from 'module/TopicMerge'
import Visibility from 'module/Visibility'
import { FetchDataBase, FetchOnlineData } from 'module/Fetch'

$(function () {
    const TOPIC_DOM = $('.topic-wrapper')
    const MORE_DOM = $('.more')
    const SWITCH_DOM = $('.switch-button')
    const TIP_DOM = $('.tip')
    let isLoad = false,
        isLocal = true,
        pages = 0,
        items = 0

    // 节流
    function throttle(func, awit) {
        clearTimeout(func.timer)
        func.timer = setTimeout(() => {
            func() && func.call(null)
        }, awit)
    }

    // 判定 more  & load 再次获取数据
    function scrollhandler() {
        console.log('scrollhandler')
        EventCenter.trigger('visibility')
        if (Visibility(MORE_DOM) && !isLoad) {
            isLoad = true
            EventCenter.trigger('fetchData')
        }
    }

    $(window).scroll(() => {
        throttle(scrollhandler, 200)
    })
    SWITCH_DOM.click((e) =>{
        if (isLocal) {
            // // 切换在线爬取数据
            if (window.confirm("在线爬取数据可能会被和谐且速度较慢....")) {
                isLocal = false;
                TIP_DOM.text('读取在线数据中....')
                TOPIC_DOM.empty()
                items = 0
                EventCenter.trigger('fetchData')
            }
        } else {
            isLocal = true;
            TIP_DOM.text('读取本地数据中....')
            TOPIC_DOM.empty()
            pages = 0
            EventCenter.trigger('fetchData')
        }
    })


    EventCenter.on('fetchData', async e => {
        console.log('fetchData')
        let data
        if (isLocal) {
            items = 10
            data = await FetchDataBase(pages, items)
        } else {
            data = await FetchOnlineData(items)
        }
        if (data.length === 0) return alert('没有数据了或被DouBan和谐了，请稍后')
        TopicMerge.load(TOPIC_DOM, data)
        isLoad = false
        console.log(isLocal);
        isLocal ? (
            pages++
        ) : (
            items = items + 25
        )
    })

    // 获取第一次数据
    EventCenter.trigger('fetchData')

})