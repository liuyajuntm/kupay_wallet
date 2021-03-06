/**
 * RedEnvHistory
 */
import { popNew } from '../../../../pi/ui/root';
import { getLang } from '../../../../pi/util/lang';
import { Forelet } from '../../../../pi/widget/forelet';
import { Widget } from '../../../../pi/widget/widget';
import { getInviteCodeDetail, querySendRedEnvelopeRecord } from '../../../net/pull';
import { getStore, register } from '../../../store/memstore';
import { PAGELIMIT } from '../../../utils/constants';

// ================================ 导出
// tslint:disable-next-line:no-reserved-keywords
declare var module: any;
export const forelet = new Forelet();
export const WIDGET_NAME = module.id.replace(/\//g, '-');
interface Props {
    recordList:any[];
    start:string; // 下一次从服务器获取记录时的start
    refresh:boolean; // 是否可以请求更多数据
    hasMore:boolean; // 是否还有更多记录
    showMoreTips:boolean; // 是否显示底部加载更多提示
    sendNumber:number; // 总发出红包个数
    scrollHeight:number;// 页面上滑的高度
    topRefresh:boolean; // 头部刷新按钮
}

export class RedEnvHistory extends Widget {
    public ok: () => void;
    public language:any;
    public state:Props;

    public async create() {
        super.create();
        this.language = this.config.value[getLang()];
        this.props = {
            recordList:[
                // { rid:'1111',rtype:0,ctypeShow:'KT',timeShow:'04-30 14:32:00',amount:1 },
                // { rid:'1111',rtype:0,ctypeShow:'KT',timeShow:'04-30 14:32:00',amount:1 },
                // { rid:'1111',rtype:0,ctypeShow:'KT',timeShow:'04-30 14:32:00',amount:1 }               
            ],
            start:undefined,
            refresh:true,
            hasMore:false, 
            showMoreTips:true, 
            sendNumber:0,  
            scrollHeight:0,
            topRefresh:false
        };
        this.initData();
    }

    /**
     * 更新数据
     */
    public async initData() {
        const data = await getInviteCodeDetail(); // 获取邀请红包记录
        if (data) {
            this.props.recordList.push({
                rid:'-1' ,
                rtype:2,
                ctypeShow:'ETH',
                timeShow:'',
                amount:0.5,
                curNum:data[1],
                totalNum:20
            });
        }

        const sHisRec = getStore('activity/luckyMoney/sends');
        if (sHisRec) {
            const hList = sHisRec.list;
            if (hList && hList.length > this.props.recordList.length) {
                console.log('load more from local');
                  
            } else {
                console.log('load more from server');
                querySendRedEnvelopeRecord(this.props.start);
            }
        } else {
            console.log('load more from server');
            querySendRedEnvelopeRecord(this.props.start);
        }
        this.loadMore(); 
        this.paint(); 
    }

    /**
     * 返回上一页
     */
    public backPrePage() {
        this.ok && this.ok();
    }

    // 实际加载数据
    public async loadMore() {
        const sHisRec = getStore('activity/luckyMoney/sends');
        if (!sHisRec) return;
        const hList = sHisRec.list;
        const start = this.props.recordList.length;

        this.props.recordList = this.props.recordList.concat(hList.slice(start,start + PAGELIMIT));
        this.props.sendNumber = sHisRec.sendNumber;
        this.props.start = sHisRec.start;
        this.props.hasMore = this.props.sendNumber > this.props.recordList.length;
        this.props.showMoreTips = this.props.sendNumber >= PAGELIMIT;
        this.initRedEn();
    }

    /**
     * 更新红包已领取数量
     */
    public async initRedEn() {
        for (const i in this.props.recordList) {
            this.props.recordList[i].outDate = Number(this.props.recordList[i].time) + (60 * 60 * 24 * 1000) < new Date().getTime();
            // const data = await queryDetailLog(getStore('user/conUid'),this.props.recordList[i].rid);
            // if (data) {
            //     this.props.recordList[i].curNum = data[2];
            //     this.props.recordList[i].totalNum = data[3];
            // } else {
            //     this.props.recordList[i].curNum = 0;
            //     this.props.recordList[i].totalNum = 0;
            // }
        }
        this.paint();
    }

    /**
     * 页面滑动，加载更多列表
     */
    public getMoreList() {
        const h1 = document.getElementById('redEnvHistory').offsetHeight; 
        const h2 = document.getElementById('historyRecords').offsetHeight; 
        const scrollTop = document.getElementById('redEnvHistory').scrollTop; 
        this.props.scrollHeight = scrollTop;
        if (this.props.hasMore && this.props.refresh && (h2 - h1 - scrollTop) < 20) {
            this.props.refresh = false;
            setTimeout(() => {
                this.loadMore();
                this.props.refresh = true;
            }, 500); 
        } 
        this.paint();
        
    }

    /**
     * 查看详情
     */
    public goDetail(ind:number) {
        popNew('app-view-earn-redEnvelope-redEnvDetail',this.props.recordList[ind]);
    }

    /**
     * 刷新页面
     */
    public refreshPage() {
        this.props.topRefresh = true;
        this.paint();
        setTimeout(() => {
            this.props.topRefresh = false;
            this.paint();
        }, 1000);
        querySendRedEnvelopeRecord('');
    }
}
// =====================================本地
register('activity/luckyMoney/sends', () => {
    const w: any = forelet.getWidget(WIDGET_NAME);
    if (w) {
        w.loadMore();
    }
});
