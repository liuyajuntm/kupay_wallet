/**
 * ExchangeDetail
 */
import { Json } from '../../../../pi/lang/type';
import { getLang } from '../../../../pi/util/lang';
import { Forelet } from '../../../../pi/widget/forelet';
import { Widget } from '../../../../pi/widget/widget';
import { uploadFileUrlPrefix } from '../../../config';
import { getUserList, queryDetailLog } from '../../../net/pull';

// ================================ 导出
// tslint:disable-next-line:no-reserved-keywords
declare var module: any;
export const forelet = new Forelet();
export const WIDGET_NAME = module.id.replace(/\//g, '-');

export class ExchangeDetail extends Widget {
    public ok: () => void;
    public language:any;

    public setProps(props: Json, oldProps?: Json)  {
        super.setProps(props,oldProps);
        this.language = this.config.value[getLang()];
        this.props = {
            ...this.props,
            message:this.props.message ? this.props.message :this.language.defaultMess,
            redBagList:[
                // { cuid:111,amount:1,timeShow:'04-30 14:32:00' },
                // { cuid:111,amount:1,timeShow:'04-30 14:32:00' },
                // { cuid:111,amount:1,timeShow:'04-30 14:32:00' }                    
            ],
            scroll:false,
            showPin:this.props.rtype === 1,  // 0 等额红包  1 拼手气红包
            userName:'',
            userHead:'../../../res/image/default_avater_big.png',
            curNum:0,
            totalNum:0,
            totalAmount:0,
            greatUser:-1,
            greatAmount:0
        };
        this.initData();
    }

    public backPrePage() {
        this.ok && this.ok();
    }

    /**
     * 页面滑动
     */
    public pageScroll() {
        if (document.getElementById('exchangeDetail').scrollTop > 0) {
            this.props.scroll = true;
        } else {
            this.props.scroll = false;
        }
        this.paint();
        
    }

    public async initData() {
        const value = await queryDetailLog(this.props.suid,this.props.rid);
        if (!value) return;
        this.props.redBagList = value[0];        
        this.props.message = value[1];
        this.props.curNum = value[2];
        this.props.totalNum = value[3];
        this.props.totalAmount = value[4];

        const user = await getUserList([this.props.suid]);
        if (!user) return;
        this.props.userName = user.nickName ? user.nickName :this.language.defaultUserName;
        this.props.userHead = user.avatar ? `${uploadFileUrlPrefix}${user.avatar}` :'../../../res/image/default_avater_big.png';

        const redBagList = value[0];
        for (let i = 0;i < redBagList.length;i++) {
            const user = await getUserList([redBagList[i].cuid]);
            this.props.redBagList[i].userName = user.nickName ? user.nickName :this.language.defaultUserName;
            // tslint:disable-next-line:max-line-length
            this.props.redBagList[i].avatar = user.avatar ? `${uploadFileUrlPrefix}${user.avatar}` :'../../res/image/default_avater_big.png';
            if (this.props.rtype === 1 && redBagList.length === this.props.totalNum && this.props.greatAmount < redBagList[i].amount) {
                this.props.greatAmount = redBagList.amount;
                this.props.greatUser = i;
            }
        }
        this.paint();
    }
}
